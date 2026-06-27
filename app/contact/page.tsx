import { Suspense } from "react";
import ContactContent from "@/contact/ContactContent";

const ContactPage = () => (
  <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    }
  >
    <ContactContent />
  </Suspense>
);

export default ContactPage;
