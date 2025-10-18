export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent passing Zustand store values as props',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      noZustandPropDrilling:
        'Zustand store value "{{storeName}}.{{property}}" should not be passed as a prop. Import the store directly in the child component instead.',
      noZustandStorePropDrilling:
        'Zustand store "{{storeName}}" or its properties should not be passed as props. Import the store directly in the child component instead.',
    },
    schema: [],
  },

  create(context) {
    // Track Zustand store usage
    const zustandStores = new Map();
    const storeVariables = new Set();

    return {
      // Track store imports and usage
      ImportDeclaration(node) {
        // Check if this is a Zustand store import
        if (
          node.source.value.includes('Store') ||
          node.source.value.includes('store')
        ) {
          node.specifiers.forEach((specifier) => {
            if (specifier.type === 'ImportSpecifier') {
              // Named import like { useSongsStore }
              zustandStores.set(specifier.local.name, {
                name: specifier.imported.name,
                source: node.source.value,
              });
            }
          });
        }
      },

      // Track store hook calls and their destructured values
      VariableDeclarator(node) {
        // Check if this is a Zustand store hook call
        if (
          node.init &&
          node.init.type === 'CallExpression' &&
          node.init.callee.type === 'Identifier' &&
          zustandStores.has(node.init.callee.name)
        ) {
          const storeName = node.init.callee.name;

          // Handle object destructuring from store
          if (node.id.type === 'ObjectPattern') {
            node.id.properties.forEach((prop) => {
              if (
                prop.type === 'Property' &&
                prop.value.type === 'Identifier'
              ) {
                storeVariables.add({
                  varName: prop.value.name,
                  storeName: storeName,
                  property: prop.key.name,
                });
              }
            });
          }
          // Handle direct store assignment
          else if (node.id.type === 'Identifier') {
            storeVariables.add({
              varName: node.id.name,
              storeName: storeName,
              property: null, // entire store
            });
          }
        }

        // Also check for arrow function selectors
        if (
          node.init &&
          node.init.type === 'CallExpression' &&
          node.init.callee.type === 'Identifier' &&
          zustandStores.has(node.init.callee.name) &&
          node.init.arguments.length > 0 &&
          node.init.arguments[0].type === 'ArrowFunctionExpression'
        ) {
          const storeName = node.init.callee.name;
          const selector = node.init.arguments[0];

          // Handle selector that returns specific properties
          if (
            selector.body.type === 'MemberExpression' &&
            selector.params.length > 0
          ) {
            if (node.id.type === 'Identifier') {
              storeVariables.add({
                varName: node.id.name,
                storeName: storeName,
                property: selector.body.property.name,
              });
            }
          }
        }
      },

      // Check JSX props for store values
      JSXAttribute(node) {
        if (!node.value) return;

        // Get the component name
        let componentName = null;
        if (node.parent && node.parent.type === 'JSXOpeningElement') {
          if (node.parent.name.type === 'JSXIdentifier') {
            componentName = node.parent.name.name;
          }
        }

        // Allow passing props to UI components and HTML elements
        const uiComponents = [
          'CurrencyInput',
          'PercentageInput',
          'Input',
          'Button',
          'Select',
          'Checkbox',
          'Radio',
          'Textarea',
          'Slider',
          'Switch',
          'TranslationSelector', // Bible translation selector UI component
          'input',
          'button',
          'select',
          'textarea',
          'a',
          'div',
          'span',
          'p',
          'img',
          'Link', // Next.js Link component
        ];

        if (componentName && uiComponents.includes(componentName)) {
          return;
        }

        let valueToCheck = null;
        let isSpreadProp = false;

        // Handle different prop value types
        if (node.value.type === 'JSXExpressionContainer') {
          valueToCheck = node.value.expression;
        }

        if (!valueToCheck) return;

        // Check if the prop value is from a Zustand store
        const checkIdentifier = (identifier) => {
          for (const storeVar of storeVariables) {
            if (storeVar.varName === identifier.name) {
              const message = storeVar.property
                ? 'noZustandPropDrilling'
                : 'noZustandStorePropDrilling';

              context.report({
                node: node,
                messageId: message,
                data: {
                  storeName: storeVar.storeName,
                  property: storeVar.property || '',
                },
              });
              return true;
            }
          }
          return false;
        };

        // Handle direct identifier
        if (valueToCheck.type === 'Identifier') {
          checkIdentifier(valueToCheck);
        }

        // Handle member expressions (e.g., store.property)
        if (valueToCheck.type === 'MemberExpression') {
          // Check if the object is a store variable
          if (valueToCheck.object.type === 'Identifier') {
            for (const storeVar of storeVariables) {
              if (
                storeVar.varName === valueToCheck.object.name &&
                !storeVar.property
              ) {
                // This is accessing a property from the whole store object
                context.report({
                  node: node,
                  messageId: 'noZustandPropDrilling',
                  data: {
                    storeName: storeVar.storeName,
                    property: valueToCheck.property.name,
                  },
                });
              }
            }
          }
        }
      },

      // Also check for spread props
      JSXSpreadAttribute(node) {
        if (node.argument.type === 'Identifier') {
          for (const storeVar of storeVariables) {
            if (storeVar.varName === node.argument.name && !storeVar.property) {
              context.report({
                node: node,
                messageId: 'noZustandStorePropDrilling',
                data: {
                  storeName: storeVar.storeName,
                },
              });
            }
          }
        }
      },
    };
  },
};
