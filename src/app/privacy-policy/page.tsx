export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: March 2026</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with our policies and practices, please do not use our website.
          </p>
        </section>

        {/* Table of Contents */}
        <section className="mb-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
          <ul className="space-y-2 text-blue-600">
            <li>1. <a href="#information-collection" className="hover:underline">Information We Collect</a></li>
            <li>2. <a href="#use-information" className="hover:underline">Use of Your Information</a></li>
            <li>3. <a href="#disclosure" className="hover:underline">Disclosure of Your Information</a></li>
            <li>4. <a href="#google-ads" className="hover:underline">Third-Party Advertising & Google Ads</a></li>
            <li>5. <a href="#cookies" className="hover:underline">Cookies and Tracking Technologies</a></li>
            <li>6. <a href="#security" className="hover:underline">Security of Your Information</a></li>
            <li>7. <a href="#rights" className="hover:underline">Your Privacy Rights</a></li>
            <li>8. <a href="#contact" className="hover:underline">Contact Us</a></li>
          </ul>
        </section>

        {/* Section 1 */}
        <section id="information-collection" className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Information You Provide Directly</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We collect information you voluntarily provide when you use our services, including but not limited to:
          </p>
          <ul className="list-disc pl-8 space-y-2 text-gray-700 mb-6">
            <li>Account registration information (name, email, phone number)</li>
            <li>Restaurant booking and reservation details</li>
            <li>Payment and billing information</li>
            <li>Customer service inquiries and feedback</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">Information Collected Automatically</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            When you visit our website, we automatically collect certain information:
          </p>
          <ul className="list-disc pl-8 space-y-2 text-gray-700 mb-6">
            <li>Device information (browser type, IP address, operating system)</li>
            <li>Usage data (pages viewed, time spent, links clicked)</li>
            <li>Location information (with your permission)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section id="use-information" className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">2. Use of Your Information</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We use the information we collect for various purposes:
          </p>
          <ul className="list-disc pl-8 space-y-2 text-gray-700 mb-6">
            <li>To provide and improve our services</li>
            <li>To process your bookings and reservations</li>
            <li>To send transactional and promotional communications</li>
            <li>To analyze website usage and performance</li>
            <li>To personalize your experience</li>
            <li>To comply with legal obligations</li>
            <li>To prevent fraud and enhance security</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section id="disclosure" className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Disclosure of Your Information</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We may share your information in the following circumstances:
          </p>
          <ul className="list-disc pl-8 space-y-2 text-gray-700 mb-6">
            <li><strong>Service Providers:</strong> We share information with third-party service providers who assist us in operating our website and conducting our business.</li>
            <li><strong>Restaurant Partners:</strong> Your booking information is shared with the restaurant to fulfill your reservation.</li>
            <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights and safety.</li>
            <li><strong>Business Transfers:</strong> Information may be transferred in case of merger, acquisition, or sale of assets.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section id="google-ads" className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">4. Third-Party Advertising & Google Ads</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Our website uses Google AdSense to display advertisements. Google and other third-party vendors use cookies to serve ads based on your prior visits to our website and other sites. You can opt out of personalized advertising by:
          </p>
          <ul className="list-disc pl-8 space-y-2 text-gray-700 mb-6">
            <li>Visiting the <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Account settings</a></li>
            <li>Using the <a href="https://ads.google.com/intl/en_us/home/tools/ads-preferences/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ads Preferences Manager</a></li>
            <li>Installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Analytics Opt-out Browser Add-on</a></li>
          </ul>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mt-4">
            <p className="text-sm text-gray-700">
              Our website complies with Google&apos;s policies regarding data collection and usage. We maintain transparent records of how user data is handled and processed.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="cookies" className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Cookies and Tracking Technologies</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We use cookies and similar tracking technologies to enhance your experience on our website. These include:
          </p>
          <ul className="list-disc pl-8 space-y-2 text-gray-700 mb-6">
            <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
            <li><strong>Performance Cookies:</strong> Help us understand how users interact with our site</li>
            <li><strong>Targeting Cookies:</strong> Used for advertising and analytics purposes</li>
          </ul>
          <p className="text-gray-700 mb-4 leading-relaxed">
            You can control cookie settings through your browser preferences. Please note that disabling certain cookies may affect the functionality of our website.
          </p>
        </section>

        {/* Section 6 */}
        <section id="security" className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Security of Your Information</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is completely secure. We encourage you to use strong passwords and to contact us immediately if you suspect any unauthorized access.
          </p>
        </section>

        {/* Section 7 */}
        <section id="rights" className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">7. Your Privacy Rights</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Depending on your location, you may have the following rights:
          </p>
          <ul className="list-disc pl-8 space-y-2 text-gray-700 mb-6">
            <li><strong>Right to Access:</strong> You can request access to the personal information we hold about you</li>
            <li><strong>Right to Correction:</strong> You can request that we correct inaccurate information</li>
            <li><strong>Right to Deletion:</strong> You can request deletion of your personal information</li>
            <li><strong>Right to Opt-Out:</strong> You can opt-out of promotional communications</li>
            <li><strong>Right to Data Portability:</strong> You can request your data in a portable format</li>
          </ul>
          <p className="text-gray-700 mb-4 leading-relaxed">
            To exercise these rights, please contact us using the information provided in the Contact Us section below.
          </p>
        </section>

        {/* Section 8 */}
        <section id="contact" className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">8. Contact Us</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <p className="font-semibold text-gray-900 mb-3">Restaurant Booking Platform Support</p>
            <p className="text-gray-700 mb-2">📧 Email: <a href="mailto:userisdev404@gmail.com" className="font-mono text-blue-600 hover:underline">userisdev404@gmail.com</a></p>
            <p className="text-gray-700 mb-2">📞 Phone: <a href="tel:+94724872737" className="text-blue-600 hover:underline">+94 72 487 2737</a></p>
            <p className="text-gray-700">🌐 Website: <a href="https://testing-production-b116.up.railway.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">testing-production-b116.up.railway.app</a></p>
          </div>
        </section>

        {/* Changes Notice */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Updates to This Policy</h3>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page with a new &quot;Last updated&quot; date. Your continued use of our website following the posting of changes constitutes your acceptance of such changes.
          </p>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-white py-8 px-4 mt-12 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center text-gray-600 text-sm">
          <p>© 2026 Restaurant Booking Platform. All rights reserved.</p>
          <p className="mt-2">This website complies with industry standards for data privacy and protection.</p>
        </div>
      </div>
    </main>
  );
}
