"use client";

import { useEffect, useState, useRef } from "react";

const posts = [
  {
    id: "about-zpd-learning",
    title:
      "About ZPD Learning: Why We're Obsessed with Helping Kids Learn Better",
    date: "14 November 2025",
  },
  {
    id: "supporting-parents",
    title: "Supporting Parents: You're Not Alone in This Learning Journey",
    date: "15 October 2025",
  },
  {
    id: "perfect-tutor-match",
    title:
      "Finding the Perfect Tutor Match: It's More Than Just Subject Knowledge",
    date: "10 September 2025",
  },
  {
    id: "science-behind-zpd",
    title: "The Science Behind ZPD: Why This Learning Theory Actually Works",
    date: "12 August 2025",
  },
  {
    id: "educational-philosophy",
    title: "Our Educational Philosophy: Why We Do What We Do",
    date: "8 July 2025",
  },
  {
    id: "progress-tracking-helps-learning",
    title: "Why Tracking Progress Actually Helps Kids Learn Better",
    date: "10 June 2025",
  },
  {
    id: "certified-tutors-matter",
    title: "Why Certified Tutors Actually Matter (And Why You Should Care)",
    date: "15 May 2025",
  },
  {
    id: "personalised-learning",
    title:
      "Why Personalised Learning Actually Works (And Why Schools Struggle With It)",
    date: "20 April 2025",
  },
  {
    id: "zpd-zone-of-proximal-development",
    title:
      "The Zone of Proximal Development: That Sweet Spot Where Learning Actually Happens",
    date: "12 March 2025",
  },
];

const BlogNavigation = () => {
  const [activePost, setActivePost] = useState<string>("");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActivePost(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
    );

    posts.forEach((post) => {
      const element = document.getElementById(post.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activePost && navRef.current) {
      const activeElement = navRef.current.querySelector(
        `[href="#${activePost}"]`,
      ) as HTMLElement;
      if (activeElement) {
        const container = navRef.current;
        const containerRect = container.getBoundingClientRect();
        const elementRect = activeElement.getBoundingClientRect();
        const containerTop = containerRect.top;
        const elementTop = elementRect.top - containerTop;
        const elementBottom = elementTop + elementRect.height;
        const containerHeight = containerRect.height;

        // Check if element is not fully visible
        if (elementTop < 0 || elementBottom > containerHeight) {
          const scrollTop =
            container.scrollTop +
            elementTop -
            containerHeight / 2 +
            elementRect.height / 2;
          container.scrollTo({
            top: scrollTop,
            behavior: "smooth",
          });
        }
      }
    }
  }, [activePost]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Blog Posts
        </h3>
      </div>
      <div ref={navRef} className="h-[calc(100vh-6rem)] overflow-y-auto">
        <nav className="p-4">
          <ul className="space-y-2">
            {posts.map((post) => (
              <li key={post.id}>
                <a
                  className={`block p-2 rounded-lg transition-colors duration-200 group ${
                    activePost === post.id
                      ? "bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500"
                      : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  }`}
                  href={`#${post.id}`}
                >
                  <h4
                    className={`text-xs font-medium line-clamp-3 leading-tight ${
                      activePost === post.id
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    }`}
                  >
                    {post.title}
                  </h4>
                  <time
                    className={`text-xs mt-1 block ${
                      activePost === post.id
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {post.date}
                  </time>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BlogNavigation;
