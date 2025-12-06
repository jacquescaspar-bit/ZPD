import { experimentEvents } from './analytics';

// Experiment configuration
export interface Experiment {
  id: string;
  name: string;
  variants: Variant[];
  status: 'active' | 'paused' | 'completed';
  startDate: Date;
  endDate?: Date;
  targetAudience?: {
    userType?: string[];
    location?: string[];
    deviceType?: string[];
  };
}

export interface Variant {
  id: string;
  name: string;
  weight: number; // Percentage of traffic (0-100)
  config: Record<string, any>;
}

// Active experiments
const experiments: Experiment[] = [
  {
    id: 'enrollment_flow_v1',
    name: 'Enrolment Flow Optimization',
    status: 'active',
    startDate: new Date(),
    variants: [
      {
        id: 'control',
        name: 'Current Flow',
        weight: 50,
        config: {
          showValueDemo: true,
          pricingDisplay: 'standard',
          chatbotPersonality: 'professional',
        },
      },
      {
        id: 'variant_a',
        name: 'Simplified Flow',
        weight: 30,
        config: {
          showValueDemo: false,
          pricingDisplay: 'prominent',
          chatbotPersonality: 'friendly',
        },
      },
      {
        id: 'variant_b',
        name: 'Detailed Flow',
        weight: 20,
        config: {
          showValueDemo: true,
          pricingDisplay: 'detailed',
          chatbotPersonality: 'educational',
        },
      },
    ],
  },
];

// User assignment storage
const getUserExperimentKey = (experimentId: string, userId?: string) => {
  const identifier = userId || getAnonymousUserId();
  return `exp_${experimentId}_${identifier}`;
};

const getAnonymousUserId = (): string => {
  let userId = localStorage.getItem('anonymous_user_id');
  if (!userId) {
    userId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('anonymous_user_id', userId);
  }
  return userId;
};

// Variant assignment using weighted random selection
export const assignVariant = (experimentId: string, userId?: string): Variant | null => {
  const experiment = experiments.find(exp => exp.id === experimentId && exp.status === 'active');
  if (!experiment) return null;

  const storageKey = getUserExperimentKey(experimentId, userId);
  let assignedVariantId = localStorage.getItem(storageKey);

  if (!assignedVariantId) {
    // Assign new variant
    const random = Math.random() * 100;
    let cumulativeWeight = 0;

    for (const variant of experiment.variants) {
      cumulativeWeight += variant.weight;
      if (random <= cumulativeWeight) {
        assignedVariantId = variant.id;
        localStorage.setItem(storageKey, variant.id);

        // Track experiment view
        experimentEvents.experimentViewed(experimentId, variant.id);
        break;
      }
    }
  }

  const assignedVariant = experiment.variants.find(v => v.id === assignedVariantId);
  return assignedVariant || null;
};

// Get experiment configuration for current user
export const getExperimentConfig = (experimentId: string, userId?: string): Record<string, any> => {
  const variant = assignVariant(experimentId, userId);
  return variant?.config || {};
};

// Track experiment conversion
export const trackExperimentConversion = (
  experimentId: string,
  goal: string,
  userId?: string
): void => {
  const variant = assignVariant(experimentId, userId);
  if (variant) {
    experimentEvents.experimentConversion(experimentId, variant.id, goal);
  }
};

// Experiment management functions
export const getActiveExperiments = (): Experiment[] => {
  return experiments.filter(exp => exp.status === 'active');
};

export const getExperiment = (experimentId: string): Experiment | undefined => {
  return experiments.find(exp => exp.id === experimentId);
};

// Utility functions for common experiment use cases
export const useExperiment = (experimentId: string) => {
  const config = getExperimentConfig(experimentId);
  const variant = assignVariant(experimentId);

  return {
    config,
    variant: variant?.name || 'control',
    variantId: variant?.id || 'control',
    trackConversion: (goal: string) => trackExperimentConversion(experimentId, goal),
  };
};

// A/B test specific helpers
export const createExperiment = (
  id: string,
  name: string,
  variants: Omit<Variant, 'id'>[],
  options: Partial<Pick<Experiment, 'targetAudience' | 'endDate'>> = {}
): Experiment => {
  const experiment: Experiment = {
    id,
    name,
    status: 'active',
    startDate: new Date(),
    variants: variants.map((variant, index) => ({
      ...variant,
      id: `variant_${index}`,
    })),
    ...options,
  };

  experiments.push(experiment);
  return experiment;
};

export const pauseExperiment = (experimentId: string): boolean => {
  const experiment = experiments.find(exp => exp.id === experimentId);
  if (experiment) {
    experiment.status = 'paused';
    return true;
  }
  return false;
};

export const resumeExperiment = (experimentId: string): boolean => {
  const experiment = experiments.find(exp => exp.id === experimentId);
  if (experiment) {
    experiment.status = 'active';
    return true;
  }
  return false;
};

export const endExperiment = (experimentId: string): boolean => {
  const experiment = experiments.find(exp => exp.id === experimentId);
  if (experiment) {
    experiment.status = 'completed';
    experiment.endDate = new Date();
    return true;
  }
  return false;
};

// Statistical analysis helpers (basic implementation)
export const getExperimentStats = (experimentId: string) => {
  const experiment = getExperiment(experimentId);
  if (!experiment) return null;

  // In a real implementation, this would query analytics data
  // For now, return mock statistics
  return {
    experimentId,
    totalParticipants: 1000,
    variants: experiment.variants.map(variant => ({
      id: variant.id,
      name: variant.name,
      participants: Math.floor(1000 * (variant.weight / 100)),
      conversions: Math.floor(Math.random() * 100), // Mock data
      conversionRate: Math.random() * 20, // Mock data
    })),
  };
};

// Feature flags (simplified A/B testing for on/off features)
export const featureFlags = {
  newEnrollmentFlow: false,
  enhancedChatbot: true,
  detailedPricing: false,
  progressIndicators: true,
};

export const isFeatureEnabled = (featureName: keyof typeof featureFlags): boolean => {
  return featureFlags[featureName];
};

export const toggleFeature = (featureName: keyof typeof featureFlags, enabled: boolean): void => {
  featureFlags[featureName] = enabled;
};