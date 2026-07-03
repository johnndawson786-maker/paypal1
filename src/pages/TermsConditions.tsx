const TermsConditions = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-gray-600">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-8 lg:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using the Refund Management Portal ("Portal"), you agree to be bound by these Terms and Conditions. 
              If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Refund Eligibility</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Refunds are subject to verification and approval. To be eligible for a refund, you must:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Provide accurate and complete information in your refund request</li>
              <li>Have a valid transaction or order ID</li>
              <li>Submit your request within the applicable refund period</li>
              <li>Meet all conditions specified at the time of the original transaction</li>
              <li>Be a resident of the United States or Canada</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Refund Processing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Upon submission of a refund request:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>You will receive a unique Refund Ticket ID for tracking purposes</li>
              <li>Your request will be reviewed within 5-10 business days</li>
              <li>Additional documentation may be requested for verification</li>
              <li>Processing times may vary depending on your financial institution</li>
              <li>Approved refunds will be returned to the original payment method or specified bank account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Accuracy</h2>
            <p className="text-gray-700 leading-relaxed">
              You are responsible for ensuring that all information provided in your refund request is accurate, complete, and truthful. 
              Submitting false or misleading information may result in the rejection of your refund request and may constitute fraud. 
              We reserve the right to verify all information provided and to request additional documentation as needed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Privacy and Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We are committed to protecting your personal and financial information. All data submitted through the Portal is encrypted 
              and stored securely in accordance with industry standards and applicable privacy laws. Please refer to our Privacy Policy 
              for detailed information about how we collect, use, and protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Refund Denials</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to deny refund requests for the following reasons:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Incomplete or inaccurate information</li>
              <li>Failure to meet eligibility requirements</li>
              <li>Suspected fraudulent activity</li>
              <li>Violation of original terms of purchase</li>
              <li>Request submitted outside the applicable refund period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              The Portal and its operators shall not be liable for any delays in processing, technical errors, or issues related to 
              third-party financial institutions. We make every effort to process refunds accurately and promptly, but we cannot 
              guarantee specific timeframes or outcomes. Your sole remedy for any dissatisfaction with our services is to discontinue use of the Portal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed">
              Any disputes arising from the use of this Portal or refund processing shall be resolved through binding arbitration in 
              accordance with the laws of the jurisdiction where the Portal operates. Both parties agree to waive their right to a jury trial.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting 
              to the Portal. Your continued use of the Portal following any changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms and Conditions, please contact our support team through the Contact Support page 
              or email us at support@refundportal.com.
            </p>
          </section>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mt-8">
            <p className="text-sm text-gray-700">
              <strong className="text-blue-900">Important:</strong> By submitting a refund request through this Portal, you acknowledge 
              that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
