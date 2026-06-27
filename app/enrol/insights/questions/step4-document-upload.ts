import {
  TEACHER_EMAIL_INTRO,
  TEACHER_EMAIL_QUESTION_DISPLAY,
} from "@/enrol/lib/teacherEmailQuestion";

export const step4DocumentUpload = {
  id: 4,
  text: `${TEACHER_EMAIL_INTRO} '${TEACHER_EMAIL_QUESTION_DISPLAY}'`,
  guidance: `Teacher insights are crucial for creating an effective tutoring programme. Please reach out to your child's teacher and ask them the question above. Their professional assessment, combined with the uploaded documents and your parental insights, will help us develop targeted support for your child's learning needs.

In the text area above, please enter your teacher's response verbatim. This will help us understand:
  • Specific concepts or topics that may need additional attention
  • Areas where your child excels or struggles
  • Skills requiring reinforcement or extension
  • Any individual learning preferences or needs

Additionally, please upload the following documents to provide context for your child's current abilities:
  • **Term Overview**: Shows the curriculum and learning objectives for the upcoming term
  • **Most recent Report Card**: Indicates current academic performance and achievements
  • **Work samples**: Recent assignments, homework sheets, or projects that demonstrate your child's current ability

These documents help us assess your child's starting point and create a personalized tutoring plan that builds on their existing strengths.`,
  type: "document_upload",
};
