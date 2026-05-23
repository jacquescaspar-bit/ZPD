"use client";

import { useState, useEffect } from "react";

const items = [
  {
    id: "certified-tutors",
    iconColor: "from-red-500 to-orange-600",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Certified, Experienced, Local Tutors",
    text: "Our tutors aren't just subject matter experts - they're actively engaged in local schools, bringing fresh insights from the classroom to every session. This ensures they understand the current curriculum and teaching methods your child encounters daily.\n\nEvery tutor is rigorously vetted, participates in ongoing professional development, has at least 2 years of tutoring experience, and holds a current Working with Children Check.",
  },
  {
    id: "personalised-plans",
    iconColor: "from-purple-500 to-pink-600",
    iconPath:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    title: "Personalised Learning Plans",
    text: "No two students are alike, which is why we create individualised learning plans featuring weekly learning objectives, customised curriculum pacing, preferred teaching methodologies, and progress milestones that adapt to each student's unique needs, goals, and learning style.\n\nOur comprehensive assessment process ensures that every plan is tailored for maximum effectiveness and engagement, with regular plan reviews to maintain optimal progress.",
  },
  {
    id: "supporting-parents",
    iconColor: "from-teal-500 to-cyan-600",
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    title: "Parent Coaching and Support Sessions",
    text: "We empower parents to engage in their child's learning journey. By translating the content and cognitive sequence into lay terms, we allow parents to stay informed, focused, and connected.\n\nOur personalised coaching and support sessions help parents gain insight into what their child is experiencing, learn effective questions to ask, and discover the best ways to provide support at home.",
  },
  {
    id: "trinity-synergy",
    iconColor: "from-yellow-500 to-orange-600",
    iconPath:
      "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
    title: "Trinity Synergy",
    text: "At the heart of effective learning lies the powerful synergy between parents, teachers, and students. This trinity partnership creates a supportive ecosystem where each role is equally vital in nurturing academic growth and personal development.\n\nParents provide the foundation of values and encouragement, teachers offer expert guidance and knowledge, and students bring their unique perspectives and potential to the learning journey.\n\nOur Zone of Proximal Development (ZPD) method and expert tutors facilitate this partnership by bridging knowledge gaps and fostering collaborative learning environments that empower all participants.",
  },
  {
    id: "tutor-matching",
    iconColor: "from-indigo-500 to-purple-600",
    iconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    title: "Tailored Tutoring for Every Age and Subject",
    text: "From mastering 'Friends of Ten' in kindergarten to acing final exams in secondary school, we've got you covered.\n\nOur diverse network of tutors spans every subject, level and learning style, ensuring we expertly match your child with a tutor perfectly suited to their unique needs.",
  },
  {
    id: "zpd-approach",
    iconColor: "from-blue-500 to-purple-600",
    iconPath:
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    title: "ZPD Approach",
    text: "Our approach is rooted in Lev Vygotsky's Zone of Proximal Development theory, targeting the optimal learning zone where students achieve more with guidance than alone.\n\nWe provide challenging yet achievable tasks with support, gradually reducing guidance as competence increases, and emphasize potential over current ability.\n\nRather than just teaching content, we scaffold experiences that extend comfort zones while guaranteeing success, fostering accelerated learning, confidence through challenges, and independent problem-solving skills.",
  },
];

const Features = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (expandedId && Math.abs(currentScrollY - lastScrollY) > 80) {
        setExpandedId(null);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [expandedId, lastScrollY]);

  return (
    <section
      className="min-h-screen flex flex-col justify-center bg-gray-100 dark:bg-gray-900 px-6 z-10"
      id="features"
    >
      <div className="text-center py-16">
        <h2
          className="text-5xl font-light mb-12 text-gray-900 dark:text-white"
          style={{ letterSpacing: "0.1em" }}
        >
          The ZPD Difference
        </h2>
        <div className="space-y-12 max-w-3xl mx-auto text-left">
          {items.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => toggleExpand(item.id)}
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 flex-shrink-0">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${item.iconColor} rounded-full flex items-center justify-center`}
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d={item.iconPath}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p
                      className={`text-lg text-gray-600 dark:text-gray-300 leading-relaxed ${isExpanded ? "" : "line-clamp-4 md:line-clamp-2"}`}
                    >
                      {item.text.split("\n\n")[0]}
                    </p>
                    <div
                      className={`overflow-hidden transition-all duration-200 ease-out ${isExpanded ? "max-h-[700px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}
                    >
                      <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.text
                          .split("\n\n")
                          .slice(1)
                          .map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                      </div>
                    </div>
                    {!isExpanded && (
                      <div className="hidden md:block mt-1 text-sm text-gray-400 group-hover:text-gray-500 transition-opacity opacity-0 group-hover:opacity-100">
                        Show more
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
