import LegalContactInfo from "@/components/LegalContactInfo";
import { SITE_NAME } from "@/lib/constants";

const ContentSection = () => (
  <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
    <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed">
      <p className="text-base">
        At {SITE_NAME}, the safety and protection of children is our highest
        priority. We are committed to providing a safe environment for all
        children participating in our tutoring programs and comply with all
        relevant Australian laws and regulations.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-4">
        Working With Children Check (WWCC)
      </h2>
      <p>
        All tutors and staff members engaged by {SITE_NAME} must hold a current
        Working With Children Check clearance appropriate to their state or
        territory of operation.
      </p>

      <h3 className="text-base font-medium mt-6 mb-2">Requirements</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Initial clearance verification before engagement begins</li>
        <li>Regular renewal checks as required by legislation</li>
        <li>Immediate suspension if clearance expires or is revoked</li>
        <li>Background checks through authorised state/territory agencies</li>
      </ul>

      <h3 className="text-base font-medium mt-6 mb-2">
        State/Territory Coverage
      </h3>
      <p>
        We ensure compliance with requirements in all Australian jurisdictions
        where we operate.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-4">Mandatory Reporting</h2>
      <p>
        We comply with mandatory reporting obligations under Australian child
        protection laws.
      </p>

      <h3 className="text-base font-medium mt-6 mb-2">Legal Framework</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>NSW:</strong> Children and Young Persons (Care and Protection)
          Act 1998
        </li>
        <li>
          <strong>Other states/territories:</strong> Equivalent legislation in
          each jurisdiction
        </li>
        <li>
          <strong>Federal:</strong> Any applicable Commonwealth child protection
          laws
        </li>
      </ul>

      <h3 className="text-base font-medium mt-6 mb-2">Our Obligations</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          All staff and tutors trained in recognizing and reporting child abuse
          or neglect
        </li>
        <li>
          Immediate reporting to relevant authorities when reasonable suspicion
          exists
        </li>
        <li>Confidential handling of reports while ensuring child safety</li>
        <li>Follow-up support for affected children and families</li>
      </ul>

      <h2 className="text-lg font-semibold mt-8 mb-4">
        Our Child Protection Policies
      </h2>

      <h3 className="text-base font-medium mt-6 mb-2">Zero Tolerance Policy</h3>
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-400">
        <p className="font-medium text-red-800 dark:text-red-200">
          We maintain a zero-tolerance policy towards child abuse, neglect, or
          exploitation. Any violation of this policy will result in immediate
          termination of services and mandatory reporting to relevant
          authorities.
        </p>
      </div>

      <h3 className="text-base font-medium mt-6 mb-2">
        Safe Environment Standards
      </h3>
      <p>
        We ensure all tutoring interactions occur in safe, supervised
        environments:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Online sessions:</strong> Require active parental/guardian
          supervision at all times
        </li>
        <li>
          <strong>In-person sessions:</strong> Occur in public or monitored
          locations when applicable
        </li>
        <li>
          <strong>Communication protocols:</strong> Clear guidelines for
          parent/guardian involvement
        </li>
        <li>
          <strong>Session recording:</strong> For quality assurance and safety
          documentation purposes
        </li>
      </ul>

      <h3 className="text-base font-medium mt-6 mb-2">
        Parental Involvement Requirements
      </h3>
      <p>
        Parents and guardians play a crucial role in child protection and must:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Provide active supervision during all tutoring sessions</li>
        <li>Maintain open communication about their child's experiences</li>
        <li>
          Report any concerns about tutor conduct or child welfare immediately
        </li>
        <li>
          Provide accurate and complete information about their child's needs
        </li>
        <li>Ensure appropriate technical setup for online sessions</li>
      </ul>

      <h2 className="text-lg font-semibold mt-8 mb-4">Tutor Code of Conduct</h2>
      <p>
        All tutors must adhere to our strict code of conduct, which includes:
      </p>

      <h3 className="text-base font-medium mt-6 mb-2">
        Professional Standards
      </h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Maintain professional boundaries at all times during interactions
        </li>
        <li>
          Never be alone with a child outside of scheduled, supervised sessions
        </li>
        <li>Use appropriate, age-appropriate language and teaching methods</li>
        <li>Respect cultural, individual, and developmental differences</li>
        <li>Maintain confidentiality of student information</li>
      </ul>

      <h3 className="text-base font-medium mt-6 mb-2">Safety Protocols</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Report any concerns about child welfare to us immediately</li>
        <li>Follow all session protocols and supervision requirements</li>
        <li>Ensure all communications are professional and appropriate</li>
        <li>Adhere to our online safety guidelines</li>
      </ul>

      <h2 className="text-lg font-semibold mt-8 mb-4">
        Training and Education
      </h2>
      <p>
        All staff and tutors receive comprehensive, regular training in child
        protection and safety:
      </p>

      <h3 className="text-base font-medium mt-6 mb-2">
        Required Training Topics
      </h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Child protection laws and mandatory reporting obligations</li>
        <li>Recognizing signs of abuse, neglect, or child welfare concerns</li>
        <li>Creating and maintaining safe learning environments</li>
        <li>Cultural awareness and sensitivity in education</li>
        <li>Online safety protocols for digital tutoring platforms</li>
        <li>Emergency response procedures</li>
      </ul>

      <h3 className="text-base font-medium mt-6 mb-2">Training Frequency</h3>
      <p>
        All training is provided annually, with additional sessions as required
        by legislative changes or incidents.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-4">
        Incident Response Protocol
      </h2>
      <p>
        In the event of any child protection concern, we follow this structured
        response process:
      </p>
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          <strong>Immediate assessment:</strong> Evaluate the situation and
          ensure child safety
        </li>
        <li>
          <strong>Authority notification:</strong> Report to relevant child
          protection authorities if required by law
        </li>
        <li>
          <strong>Family support:</strong> Provide appropriate support and
          resources to the child and family
        </li>
        <li>
          <strong>Internal investigation:</strong> Conduct thorough review of
          the incident
        </li>
        <li>
          <strong>Policy improvement:</strong> Update procedures and training as
          necessary
        </li>
      </ol>

      <h2 className="text-lg font-semibold mt-8 mb-4">
        Liability and Responsibility
      </h2>

      <h3 className="text-base font-medium mt-6 mb-2">Tutor Status</h3>
      <p>
        All tutors engaged by {SITE_NAME} are independent contractors and not
        employees of our company. While we take all reasonable steps to ensure
        tutors hold appropriate clearances and training, {SITE_NAME} accepts no
        liability for the actions, omissions, or conduct of tutors outside of
        scheduled tutoring sessions.
      </p>

      <h3 className="text-base font-medium mt-6 mb-2">
        Parental Responsibility
      </h3>
      <p>
        Parents and guardians maintain ultimate responsibility for supervising
        their children during all interactions with tutors and our services.
        This includes ensuring appropriate online supervision and immediate
        reporting of any concerns.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-4">Reporting Concerns</h2>
      <p>
        If you have any concerns about child safety or suspect child
        abuse/neglect:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Contact us immediately:</strong> Report concerns to our child
          protection officer
        </li>
        <li>
          <strong>Urgent situations:</strong> Report directly to authorities or
          emergency services
        </li>
        <li>
          <strong>Confidentiality:</strong> All reports are treated with
          appropriate confidentiality
        </li>
        <li>
          <strong>Support:</strong> We provide guidance on next steps and
          available support services
        </li>
      </ul>

      <h2 className="text-lg font-semibold mt-8 mb-4">External Resources</h2>
      <p>For additional support and information about child protection:</p>

      <h3 className="text-base font-medium mt-6 mb-2">Emergency Contacts</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>NSW Child Protection Helpline:</strong> 132 111 (24/7 support)
        </li>
        <li>
          <strong>
            National Sexual Assault, Domestic Family Violence Counselling
            Service:
          </strong>{" "}
          1800 737 732
        </li>
      </ul>

      <h3 className="text-base font-medium mt-6 mb-2">Government Resources</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Office of the Children's Guardian:</strong>{" "}
          childrensguardian.nsw.gov.au
        </li>
        <li>
          <strong>Australian Institute of Family Studies:</strong> aifs.gov.au
        </li>
        <li>
          <strong>Department of Communities and Justice:</strong>{" "}
          dcsj.nsw.gov.au
        </li>
      </ul>

      <h2 className="text-lg font-semibold mt-8 mb-4">Contact Information</h2>
      <div className="mt-4">
        <LegalContactInfo role="Child Protection Officer" />
      </div>

      <h2 className="text-lg font-semibold mt-8 mb-4">
        Policy Review and Updates
      </h2>
      <p>
        This child protection policy is reviewed annually and updated as
        required by:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Changes in legislation or regulatory requirements</li>
        <li>Updates to best practices in child protection</li>
        <li>Lessons learned from incidents or near-misses</li>
        <li>Feedback from staff, tutors, parents, and authorities</li>
      </ul>
      <p>
        All updates are communicated to relevant stakeholders and training is
        provided as necessary.
      </p>
    </div>
  </section>
);

export default ContentSection;
