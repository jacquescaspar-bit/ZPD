"use client";

import React, { useState } from "react";

const InvisibleLadderPost = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <article
      className="mb-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
      id="invisible-ladder-brain"
    >
      <header className="mb-6">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
          The Invisible Ladder in Your Child’s Brain (And Why 98% of Tutoring Is
          Climbing the Wrong Staircase)
        </h2>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <time dateTime="2025-11-16">16 November 2025</time>
          <span className="mx-2">•</span>
          <span>ZPD Learning Team</span>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Discover the Zone of Proximal Development (ZPD) and how
          teacher-partnered tutoring in Australia unlocks faster growth by
          aligning with your child's exact classroom needs.
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          Imagine a gigantic, foggy staircase stretching upward into the clouds.
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          Each step is made of a different school concept. Some steps are tiny –
          tying shoelaces, counting to ten. Others are absolute walls –
          simultaneous equations, the causes of the fall of Rome, writing a
          thesis statement that doesn’t make the teacher want to cry.
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          Your child is standing somewhere on that staircase right now. Not at
          the bottom, not at the top, but at some precise, ever-shifting
          altitude that only one person on earth truly knows in real time: their
          current classroom teacher.
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          Lev Vygotsky – the tragically short-lived Soviet psychologist who gave
          us the term <strong>Zone of Proximal Development</strong> or ZPD –
          noticed something weird in the 1920s while watching kids solve
          puzzles. When a task was too easy, they yawned. Too hard, they melted
          down. But there was this delicious band of difficulty where, with the
          right hint or question or scaffold, the child suddenly leapt forward
          like they’d been sandbagging the whole time.
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          He drew two circles:
        </p>
        <div className="flex justify-center items-center mb-6">
          <div className="relative w-32 h-32 border border-gray-600 dark:border-gray-400 rounded-full flex justify-center items-center">
            <div className="w-16 h-16 border-2 border-gray-600 dark:border-gray-400 rounded-full" />
          </div>
        </div>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          The space in between = pure learning rocket fuel.
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          Here’s the part that should make every parent sit bolt upright: almost
          the entire private tutoring industry operates completely outside of
          that sweet spot. They’re either teaching stuff the kid already knows
          (waste of money) or stuff that’s currently two, three, or ten steps
          above where the child actually is (waste of confidence).
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          How did we get here? <br />
          <button
            className="text-xl leading-normal text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-left cursor-pointer"
            onClick={togglePopup}
          >
            [Digression about the history of tutoring from 19th-century English
            gentlemen cramming Latin into bored aristocrats → modern franchise
            centres with 2016 workbooks → the rise of the 'I got 99.95 ATAR in
            2009' Instagram tutor who hasn't seen the inside of a Year 9
            classroom since the Gillard government]
          </button>
        </p>

        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          Which brings us to the single weird trick we do at ZPD Learning that
          sounds almost stupidly obvious once you hear it, yet literally no one
          else in Australia is doing systematically for K-12 tutoring:
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          We ring the teacher.
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          Not in a creepy way. With your permission, we have a short,
          professional conversation (or secure email exchange) with the one
          adult who has 20+ hours a week of fresh data on your child. We ask
          questions like:
        </p>
        <div className="ml-6 space-y-2 mb-6">
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 flex items-start">
            <span className="text-gray-400 mr-3 mt-1">•</span>
            Where is the class up to in this unit right now?
          </p>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 flex items-start">
            <span className="text-gray-400 mr-3 mt-1">•</span>
            Which specific misconceptions is this child showing?
          </p>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 flex items-start">
            <span className="text-gray-400 mr-3 mt-1">•</span>
            Can you send last week's writing sample or maths assessment?
          </p>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 flex items-start">
            <span className="text-gray-400 mr-3 mt-1">•</span>
            What does success look like for this child by the end of term?
          </p>
        </div>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          Fifteen minutes later, we have an x-ray of your child’s exact ZPD in
          the topic that’s currently causing homework wars – whether it’s
          reading comprehension in Year 3 or quadratic equations in Year 10.
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          Then – and only then – do we design a 45 – 60 minute diagnostic
          session built entirely around that intelligence. No generic quizzes;
          this is personalised ZPD learning at its core, probing the edges of
          what your child can almost do independently.
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          Then – and only then – do we match your child with a tutor who was
          literally standing in a classroom in your local government area last
          week, teaching the identical content as a casual or relief teacher.
          These aren’t retired educators or uni students; they’re active pros
          engaged with the current curriculum, ensuring relevance in every
          session.
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          The first session feels like watching someone hand your kid the exact
          missing Lego piece they’ve been searching for under the couch for six
          weeks. Tears turn to triumphs, and growth happens fast because we’re
          meeting them precisely where they are – thanks to that
          teacher-partnered tutoring approach.
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          This isn’t just theory; it’s how we transform unknown concepts into
          known strengths, session by session, across all K-12 subjects.
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          Want to find out where your child is really standing on their
          invisible ladder? Fill in the short contact form below, and we’ll
          start the (free) teacher conversation to uncover their ZPD and
          kickstart personalised growth.
        </p>
        {/* Contact Form CTA would be integrated here */}
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

export default InvisibleLadderPost;
