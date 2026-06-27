import type { Metadata } from "next";
import TutorsContent from "@/tutors/TutorsContent";

export const metadata: Metadata = {
  title: "Our Tutors — Classroom-Active Teachers | ZPD Learning",
  description:
    "Classroom-active teachers delivering structured, term-based tutoring in the Zone of Proximal Development. Casual teachers: join our contractor network.",
  openGraph: {
    title: "Our Tutors — ZPD Learning",
    description:
      "Classroom-active teachers delivering structured tutoring. Teachers: join our contractor network.",
    type: "website",
  },
};

const TutorsPage = () => <TutorsContent />;

export default TutorsPage;
