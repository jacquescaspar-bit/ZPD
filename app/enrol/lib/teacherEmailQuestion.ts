export const TEACHER_EMAIL_INTRO = "Please email your child's teacher:";

export const TEACHER_EMAIL_QUESTION_DISPLAY =
  "[Student] will be receiving weekly tutoring throughout the upcoming term. What are the key concepts and curriculum areas where they would benefit from additional support or extension?";

export const getTeacherEmailClipboardText = (
  studentLabel = "STUDENT",
): string =>
  `${studentLabel} will be receiving weekly tutoring throughout the upcoming term. What are the key concepts and curriculum areas where they would benefit from additional support or extension?`;
