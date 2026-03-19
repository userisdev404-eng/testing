import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <section className="space-y-4">
        <p>
          We value your privacy and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>We collect information you provide directly to us.</li>
          <li>Your data is used to improve our services and user experience.</li>
          <li>We do not share your information with third parties except as required by law.</li>
          <li>Cookies may be used to enhance site functionality.</li>
        </ul>
        <p>
          By using our site, you consent to this policy. Please review it periodically for updates.
        </p>
      </section>
    </main>
  );
}
