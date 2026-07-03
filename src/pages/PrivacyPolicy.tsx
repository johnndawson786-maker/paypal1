const PrivacyPolicy = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 p-8 lg:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              At Refund Management Portal, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our refund processing services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect the following types of information when you submit a refund request:
            </p>
            <div className="space-y-4 ml-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Personal Information:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Physical address (street, city, state/province, ZIP/postal code)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Transaction Information:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Order ID / Transaction ID</li>
                  <li>Refund amount</li>
                  <li>Refund reason</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Financial Information:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Bank name</li>
                  <li>Payment method details (as applicable)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Processing and verifying refund requests</li>
              <li>Communicating with you about your refund status</li>
              <li>Preventing fraud and ensuring transaction security</li>
              <li>Complying with legal and regulatory requirements</li>
              <li>Improving our services and customer experience</li>
              <li>Maintaining records for audit and compliance purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>SSL/TLS encryption for all data transmission</li>
              <li>Secure servers with restricted access</li>
              <li>Regular security audits and updates</li>
              <li>Employee training on data protection and privacy</li>
              <li>Compliance with PCI DSS standards for payment data</li>
              <li>Multi-factor authentication for system access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Service Providers:</strong> Trusted third-party vendors who assist in processing refunds and payments</li>
              <li><strong>Financial Institutions:</strong> Banks and payment processors necessary to complete refund transactions</li>
              <li><strong>Legal Compliance:</strong> When required by law, court order, or government regulation</li>
              <li><strong>Fraud Prevention:</strong> To detect, prevent, or investigate fraudulent activity</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
              comply with legal obligations, resolve disputes, and enforce our agreements. Refund request data is typically retained 
              for a minimum of 7 years in accordance with financial record-keeping requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Privacy Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal retention requirements)</li>
              <li><strong>Objection:</strong> Object to certain processing of your personal information</li>
              <li><strong>Data Portability:</strong> Request transfer of your data to another service provider</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for processing where applicable</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise any of these rights, please contact us at privacy@refundportal.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed">
              Our Portal may use cookies and similar tracking technologies to enhance user experience, analyze usage patterns, and 
              maintain security. You can control cookie settings through your browser preferences, though disabling cookies may affect 
              the functionality of certain features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              If you are accessing our Portal from outside the United States or Canada, please be aware that your information may be 
              transferred to, stored, and processed in these countries. We ensure that appropriate safeguards are in place to protect 
              your information in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our Portal is not intended for individuals under the age of 18. We do not knowingly collect personal information from 
              children. If we become aware that we have collected personal information from a child without parental consent, we will 
              take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
              We will notify you of any material changes by posting the updated policy on this page and updating the "Last Updated" date. 
              Your continued use of the Portal after such changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacy@refundportal.com</p>
                <p><strong>Support:</strong> support@refundportal.com</p>
                <p><strong>Hours:</strong> 24/7 Customer Support</p>
              </div>
            </div>
          </section>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg mt-8">
            <p className="text-sm text-gray-700">
              <strong className="text-green-900">Your Privacy Matters:</strong> We are committed to transparency and protecting your 
              personal information. If you have any questions about how we handle your data, please don't hesitate to reach out to our 
              privacy team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
