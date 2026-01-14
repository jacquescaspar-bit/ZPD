"use client";

import React, { useState } from "react";
import Nav from "@/Nav";
import EnrollmentForm from "@/enrol/components/EnrollmentForm";
import EnrollmentAnalytics from "@/enrol/components/EnrollmentAnalytics";
import type { PlanType } from "@/lib/constants";

const EnrollPageClient: React.FC<{
  initialPlan: PlanType | undefined;
  initialPromoCode: string | undefined;
  initialStep: "plan" | "payment";
}> = ({ initialPlan, initialPromoCode, initialStep }) => {
  const [hideComparisonTable, setHideComparisonTable] = useState(false);

  return (
    <div className="relative">
      <Nav />
      <EnrollmentAnalytics />
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
      <div className="min-h-screen px-6 pt-16 pb-12 z-10">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Hero Section */}
          <section className="text-center pb-20">
            <h1
              className="text-4xl sm:text-6xl font-semibold mb-2 sm:mb-4 text-gray-900 dark:text-white text-center leading-tight"
              style={{ letterSpacing: "0.02em" }}
            >
              Start Your Learning Journey
            </h1>
            <p
              className="text-gray-600 dark:text-gray-400 text-base sm:text-lg font-normal mt-2 sm:mt-4 max-w-2xl mx-auto leading-relaxed"
              style={{ letterSpacing: "0.01em" }}
            >
              Term-Based Pricing for Primary, Secondary & ATAR Tutoring Success
            </p>
          </section>

          {/* Enrollment Form */}
          <section>
            <EnrollmentForm
              initialPlan={initialPlan}
              initialPromoCode={initialPromoCode}
              initialStep={initialStep}
              onPaymentProcessingChange={setHideComparisonTable}
            />
          </section>

          {/* Feature Comparison Table */}
          {!hideComparisonTable && (
            <section className="py-16">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                  Feature Comparison
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600">
                        <th className="p-4 text-left text-gray-900 dark:text-white">
                          Feature
                        </th>
                        <th className="p-4 text-center text-gray-900 dark:text-white">
                          Discovery
                        </th>
                        <th className="p-4 text-center text-gray-900 dark:text-white">
                          Online
                        </th>
                        <th className="p-4 text-center text-gray-900 dark:text-white">
                          Essential
                        </th>
                        <th className="p-4 text-center text-gray-900 dark:text-white">
                          Intensive
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                        <td className="p-4 text-gray-900 dark:text-white">
                          Sessions
                        </td>
                        <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                          1
                        </td>
                        <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                          10
                        </td>
                        <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                          10
                        </td>
                        <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                          20
                        </td>
                      </tr>
                      <tr className="border-t border-gray-200 dark:border-gray-600 bg-blue-50/30 dark:bg-gray-700/30 hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                        <td className="p-4 text-gray-900 dark:text-white">
                          Subjects
                        </td>
                        <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                          Diagnostic
                        </td>
                        <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                          1 subject
                        </td>
                        <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                          2 subjects
                        </td>
                        <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                          Unlimited
                        </td>
                      </tr>
                      <tr className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                        <td className="p-4 text-gray-900 dark:text-white">
                          Price
                        </td>
                        <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                          $129
                        </td>
                        <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                          $750
                        </td>
                        <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                          $950
                        </td>
                        <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                          $1700
                        </td>
                      </tr>
                      <tr className="border-t border-gray-200 dark:border-gray-600 bg-blue-50/30 dark:bg-gray-700/30 hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                        <td className="p-4 text-gray-900 dark:text-white">
                          Support
                        </td>
                        <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                          Email
                        </td>
                        <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                          Email
                        </td>
                        <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                          Priority
                        </td>
                        <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                          Direct Phone & Email Support
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrollPageClient;
