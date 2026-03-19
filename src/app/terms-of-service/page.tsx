import React from "react";

export default function TermsOfService() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <section className="space-y-4">
        <p>
          Welcome to our website. By accessing or using our services, you agree to the following terms and conditions:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use of this site is subject to applicable laws and regulations.</li>
          <li>Your personal information is handled according to our Privacy Policy.</li>
          <li>We reserve the right to modify these terms at any time.</li>
          <li>All content is for informational purposes only and may change without notice.</li>
        </ul>
        <p>
          Please review these terms regularly. Continued use of the site constitutes acceptance of any changes.
        </p>
      </section>
    </main>
  );
}
