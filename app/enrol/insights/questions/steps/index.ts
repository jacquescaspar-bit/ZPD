import { step1ParentGoals } from "@/enrol/insights/questions/step1-parent-goals";
import { step2ParentAcademic } from "@/enrol/insights/questions/step2-parent-academic";
import { step3ParentAvailability } from "@/enrol/insights/questions/step3-parent-availability";
import { step4DocumentUpload } from "@/enrol/insights/questions/step4-document-upload";
import { step5Scheduling } from "@/enrol/insights/questions/step5-scheduling";
import { step6Review } from "@/enrol/insights/questions/step6-review";

export interface Step {
  id: number;
  text: string;
  guidance: string;
  type: string;
}

export const steps: Step[] = [
  step1ParentGoals,
  step2ParentAcademic,
  step3ParentAvailability,
  step4DocumentUpload,
  step5Scheduling,
  step6Review,
];

export {
  step1ParentGoals,
  step2ParentAcademic,
  step3ParentAvailability,
  step4DocumentUpload,
  step5Scheduling,
  step6Review,
};
