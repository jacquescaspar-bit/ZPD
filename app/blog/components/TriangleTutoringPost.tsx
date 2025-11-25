"use client";

import React, { useState } from "react";

const TriangleTutoringPost = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <article
      className="mb-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
      id="triangle-tutoring"
    >
      <header className="mb-6">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
          The Triangle That Changed Everything (Why the Most Effective Tutoring
          on Earth Has Three Adults, Not One)
        </h2>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <time dateTime="2024-10-17">17 October 2024</time>
          <span className="mx-2">•</span>
          <span>ZPD Learning</span>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          In the world of education, we've long believed that one expert tutor
          is enough to turn things around. But what if the most powerful
          tutoring model involves not one, but three adults working in perfect
          harmony?
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          Traditional tutoring is a one-on-one affair: tutor and student. But at
          ZPD Learning, we've discovered that the real magic happens when we
          form a triangle of support – tutor, classroom teacher, and parent –
          each bringing their unique expertise to the table.
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          The tutor provides specialised, personalised instruction tailored to
          the child's ZPD. The classroom teacher offers invaluable insights into
          the current curriculum, assessment expectations, and the child's
          classroom dynamics. The parent ensures continuity between sessions,
          reinforces learning at home, and provides emotional support.
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          This trinity synergy creates a comprehensive support network that
          addresses every aspect of the child's learning journey. It's not just
          about academic improvement; it's about building confidence, developing
          study skills, and creating sustainable learning habits.
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          Why does this work so well? Because learning isn't linear – it's a
          complex interplay of knowledge, skills, and motivation. One adult
          can't possibly cover all bases. But three? That's a force to be
          reckoned with.
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          Ready to experience the power of the triangle?
        </p>
        <button
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={togglePopup}
        >
          Get Started Today
        </button>
      </div>

      {isPopupOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-1 z-40"
            onClick={togglePopup}
          />
          <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={togglePopup}
          >
            <div
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-3xl max-h-[80vh] border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-8 pb-4 flex-shrink-0">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Tutoring History Rabbit Hole
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
                  onClick={togglePopup}
                >
                  ×
                </button>
              </div>
              <div className="px-8 pb-8 overflow-y-auto flex-1">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Picture the 19th century. Tutoring wasn't for struggling
                    kids – it was for posh English boys cramming Latin and Greek
                    into their brains so they could pass Oxford entrance exams
                    and become colonial administrators or something equally
                    imperial. Think Jane Austen novels: a governess arrives with
                    a ruler and a stack of dusty books, drilling conjugations
                    into little Charlotte until she can recite Virgil in her
                    sleep. No ZPD here – just rote memorization, because the
                    goal wasn't deep understanding; it was social signaling.
                    "Look, my heir knows dead languages!"
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Fast-forward to the early 20th century. Public education
                    explodes in the West, but tutoring becomes a side hustle for
                    underpaid teachers or university students. In Australia,
                    post-WWII, it's all about "extra help" for kids falling
                    behind in the new mass schooling system. But it's haphazard:
                    a neighbor who's good at maths shows up with worksheets from
                    the library. No teacher partnership, no diagnostic precision
                    – just generic drills.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Then the 1980s hit, and tutoring goes corporate. Kumon
                    arrives from Japan like a mathematical missionary, preaching
                    self-paced worksheets. Franchise centres pop up everywhere:
                    rows of kids hunched over identical booklets, ticking boxes
                    on long division or comprehension passages. It's efficient,
                    scalable, and… utterly blind to the individual child's ZPD.
                    Why? Because these systems use standardized placement tests
                    from years ago. Your Year 5 kid gets plopped into "Level E"
                    based on a quiz that hasn't been updated since the Howard
                    era. Meanwhile, their actual classroom is deep into the
                    Australian Curriculum Version 8.4 (or whatever the latest
                    tweak is), with new emphases on inquiry-based learning and
                    digital tools.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    By the 2010s, the internet supercharges this. Apps like Khan
                    Academy promise "personalised learning," but it's
                    algorithm-driven guesswork: watch a video, do a quiz,
                    repeat. Great for motivated adults, meh for a 10-year-old
                    who needs human scaffolding. Then come the Instagram tutors
                    – "I got 99.95 ATAR in 2009! DM for sessions!" They're
                    passionate, sure, but their mental map of the curriculum is
                    fossilized. Remember when NAPLAN was brand new and everyone
                    freaked out about persuasive texts? These tutors do –
                    because that's when they last studied it. But the syllabus
                    has evolved: more STEM integration, Indigenous perspectives
                    woven in, sustainability themes in science. Your child's
                    teacher knows this intimately; the ATAR whiz from a decade
                    ago? Not so much.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    And don't get me started on the pandemic pivot. COVID turns
                    tutoring virtual overnight, amplifying the disconnect. Zoom
                    sessions with generic tutors mean even less alignment with
                    the child's real classroom. Parents report kids zoning out
                    because "the tutor's explaining fractions differently than
                    Miss Lee does at school." Cue frustration, cue wasted hours.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    This whole evolution – from aristocratic cramming to
                    franchise factories to gig-economy Zoom calls – has one
                    thing in common: it ignores the teacher in the room. The
                    actual classroom teacher, who sees your child's work samples
                    daily, tracks their running records, analyzes their NAPLAN
                    data, and plans units around the exact curriculum sequence
                    happening right now. They're the air traffic controller of
                    your child's learning journey, yet traditional tutoring
                    treats them like a black box.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    It's like trying to fix a car engine by asking the owner
                    "What's wrong?" instead of popping the hood and talking to
                    the mechanic who services it weekly.
                  </p>
                  <button
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={togglePopup}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </article>
  );
};

export default TriangleTutoringPost;
