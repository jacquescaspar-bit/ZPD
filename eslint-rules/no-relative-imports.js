export default {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce absolute imports starting with @",
      recommended: true,
    },
    fixable: "code",
    schema: [],
    messages: {
      noRelativeImports:
        'Use absolute imports starting with "@" instead of relative imports. Use "@/{{suggestion}}" instead.',
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;

        // Check if the import starts with . or ..
        if (importPath.startsWith(".")) {
          // Get the current file path relative to app
          const filename = context.getFilename();
          const srcIndex = filename.indexOf("/app/");

          if (srcIndex !== -1) {
            // Calculate the absolute path
            const currentDir = filename.substring(
              srcIndex + 5,
              filename.lastIndexOf("/"),
            );
            const segments = currentDir.split("/");
            const importSegments = importPath.split("/");

            // Process the relative path
            const resultSegments = [...segments];
            for (const segment of importSegments) {
              if (segment === ".") {
                // Current directory, do nothing
                continue;
              } else if (segment === "..") {
                // Go up one directory
                resultSegments.pop();
              } else {
                // Add the segment
                resultSegments.push(segment);
              }
            }

            // Create the suggested absolute path
            const suggestedPath = resultSegments.join("/");

            context.report({
              node: node.source,
              messageId: "noRelativeImports",
              data: {
                suggestion: suggestedPath,
              },
              fix(fixer) {
                return fixer.replaceText(node.source, `'@/${suggestedPath}'`);
              },
            });
          } else {
            // If we can't determine the file location relative to app,
            // still report the error but without auto-fix
            context.report({
              node: node.source,
              messageId: "noRelativeImports",
              data: {
                suggestion: importPath.replace(/^\.\.?\//, ""),
              },
            });
          }
        }
      },
      ExportNamedDeclaration(node) {
        if (node.source && node.source.value.startsWith(".")) {
          const importPath = node.source.value;
          const filename = context.getFilename();
          const srcIndex = filename.indexOf("/app/");

          if (srcIndex !== -1) {
            const currentDir = filename.substring(
              srcIndex + 5,
              filename.lastIndexOf("/"),
            );
            const segments = currentDir.split("/");
            const importSegments = importPath.split("/");

            const resultSegments = [...segments];
            for (const segment of importSegments) {
              if (segment === ".") {
                continue;
              } else if (segment === "..") {
                resultSegments.pop();
              } else {
                resultSegments.push(segment);
              }
            }

            const suggestedPath = resultSegments.join("/");

            context.report({
              node: node.source,
              messageId: "noRelativeImports",
              data: {
                suggestion: suggestedPath,
              },
              fix(fixer) {
                return fixer.replaceText(node.source, `'@/${suggestedPath}'`);
              },
            });
          } else {
            context.report({
              node: node.source,
              messageId: "noRelativeImports",
              data: {
                suggestion: importPath.replace(/^\.\.?\//, ""),
              },
            });
          }
        }
      },
      ExportAllDeclaration(node) {
        if (node.source && node.source.value.startsWith(".")) {
          const importPath = node.source.value;
          const filename = context.getFilename();
          const srcIndex = filename.indexOf("/app/");

          if (srcIndex !== -1) {
            const currentDir = filename.substring(
              srcIndex + 5,
              filename.lastIndexOf("/"),
            );
            const segments = currentDir.split("/");
            const importSegments = importPath.split("/");

            const resultSegments = [...segments];
            for (const segment of importSegments) {
              if (segment === ".") {
                continue;
              } else if (segment === "..") {
                resultSegments.pop();
              } else {
                resultSegments.push(segment);
              }
            }

            const suggestedPath = resultSegments.join("/");

            context.report({
              node: node.source,
              messageId: "noRelativeImports",
              data: {
                suggestion: suggestedPath,
              },
              fix(fixer) {
                return fixer.replaceText(node.source, `'@/${suggestedPath}'`);
              },
            });
          } else {
            context.report({
              node: node.source,
              messageId: "noRelativeImports",
              data: {
                suggestion: importPath.replace(/^\.\.?\//, ""),
              },
            });
          }
        }
      },
      CallExpression(node) {
        // Handle dynamic imports: import('./module')
        if (
          node.callee.type === "Import" &&
          node.arguments.length > 0 &&
          node.arguments[0].type === "Literal" &&
          typeof node.arguments[0].value === "string" &&
          node.arguments[0].value.startsWith(".")
        ) {
          const importPath = node.arguments[0].value;
          const filename = context.getFilename();
          const srcIndex = filename.indexOf("/app/");

          if (srcIndex !== -1) {
            const currentDir = filename.substring(
              srcIndex + 5,
              filename.lastIndexOf("/"),
            );
            const segments = currentDir.split("/");
            const importSegments = importPath.split("/");

            const resultSegments = [...segments];
            for (const segment of importSegments) {
              if (segment === ".") {
                continue;
              } else if (segment === "..") {
                resultSegments.pop();
              } else {
                resultSegments.push(segment);
              }
            }

            const suggestedPath = resultSegments.join("/");

            context.report({
              node: node.arguments[0],
              messageId: "noRelativeImports",
              data: {
                suggestion: suggestedPath,
              },
              fix(fixer) {
                return fixer.replaceText(
                  node.arguments[0],
                  `'@/${suggestedPath}'`,
                );
              },
            });
          } else {
            context.report({
              node: node.arguments[0],
              messageId: "noRelativeImports",
              data: {
                suggestion: importPath.replace(/^\.\.?\//, ""),
              },
            });
          }
        }

        // Handle require calls: require('./module')
        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "require" &&
          node.arguments.length > 0 &&
          node.arguments[0].type === "Literal" &&
          typeof node.arguments[0].value === "string" &&
          node.arguments[0].value.startsWith(".")
        ) {
          const importPath = node.arguments[0].value;
          const filename = context.getFilename();
          const srcIndex = filename.indexOf("/app/");

          if (srcIndex !== -1) {
            const currentDir = filename.substring(
              srcIndex + 5,
              filename.lastIndexOf("/"),
            );
            const segments = currentDir.split("/");
            const importSegments = importPath.split("/");

            const resultSegments = [...segments];
            for (const segment of importSegments) {
              if (segment === ".") {
                continue;
              } else if (segment === "..") {
                resultSegments.pop();
              } else {
                resultSegments.push(segment);
              }
            }

            const suggestedPath = resultSegments.join("/");

            context.report({
              node: node.arguments[0],
              messageId: "noRelativeImports",
              data: {
                suggestion: suggestedPath,
              },
              fix(fixer) {
                return fixer.replaceText(
                  node.arguments[0],
                  `'@/${suggestedPath}'`,
                );
              },
            });
          } else {
            context.report({
              node: node.arguments[0],
              messageId: "noRelativeImports",
              data: {
                suggestion: importPath.replace(/^\.\.?\//, ""),
              },
            });
          }
        }
      },
    };
  },
};
