import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const [refundData, setRefundData] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (ticketId) {
      const data = localStorage.getItem(`refund_${ticketId}`);
      if (data) {
        setRefundData(JSON.parse(data));
      } else {
        navigate('/');
      }
    }
  }, [ticketId, navigate]);

  const copyToClipboard = () => {
    if (ticketId) {
      navigator.clipboard.writeText(ticketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!refundData) return;

    const receipt = `
PAYPAL REFUND REQUEST CONFIRMATION
=====================================

Refund Ticket ID: ${ticketId}
Submitted: ${new Date(refundData.submittedAt).toLocaleString()}

CUSTOMER INFORMATION
-------------------------------------
Name: ${refundData.fullName}
Email: ${refundData.email}
Phone: ${refundData.phone}

PAYPAL TRANSACTION INFORMATION
-------------------------------------
PayPal Order ID: ${refundData.transactionId}
Transaction Amount: $${refundData.refundAmount}
Purchase Date: ${new Date(refundData.purchaseDate).toLocaleDateString()}

BILLING ADDRESS
-------------------------------------
${refundData.streetAddress}
${refundData.city}, ${refundData.state} ${refundData.zipCode}
${refundData.country}

BANK INFORMATION
-------------------------------------
Bank Name: ${refundData.bankName}

REFUND REASON
-------------------------------------
${refundData.refundReason}

STATUS
-------------------------------------
${refundData.status}

Please retain this confirmation for your records.

=====================================
PayPal Refund Center
© ${new Date().getFullYear()} All Rights Reserved
    `.trim();

    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Refund-Receipt-${ticketId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  if (!refundData) {
    return null;
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6 shadow-xl animate-bounce-slow">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            PayPal Refund Request Submitted
          </h1>
          <p className="text-lg text-gray-600">
            Your PayPal refund request has been received and is being processed
          </p>
        </div>

        {/* Ticket ID Card */}
        <div className="bg-gradient-to-br from-[#0070ba] via-[#005ea6] to-[#003087] rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="text-center">
            <p className="text-blue-200 text-sm font-medium mb-2">Your Refund Ticket ID</p>
            <div className="text-5xl lg:text-6xl font-bold tracking-wider mb-6 font-mono">
              {ticketId}
            </div>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-all duration-300 border border-white/30"
            >
              {copied ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold">Copy Ticket ID</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Customer Notice */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Important Notice</h3>
              <p className="text-amber-800">
                Please retain your Refund Ticket ID for future reference. We recommend reviewing your banking information and account statements periodically while your request remains under review.
              </p>
            </div>
          </div>
        </div>

        {/* Request Details */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-[#0070ba]/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Full Name</p>
              <p className="text-lg text-gray-900">{refundData.fullName}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Email</p>
              <p className="text-lg text-gray-900">{refundData.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Phone</p>
              <p className="text-lg text-gray-900">{refundData.phone}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">PayPal Order ID</p>
              <p className="text-lg text-gray-900 font-mono">{refundData.transactionId}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Transaction Amount</p>
              <p className="text-lg font-bold text-[#0070ba]">${refundData.refundAmount}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Purchase Date</p>
              <p className="text-lg text-gray-900">{new Date(refundData.purchaseDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Bank Name</p>
              <p className="text-lg text-gray-900">{refundData.bankName}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-gray-500 mb-1">Address</p>
              <p className="text-lg text-gray-900">
                {refundData.streetAddress}, {refundData.city}, {refundData.state} {refundData.zipCode}, {refundData.country}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-gray-500 mb-1">Submitted</p>
              <p className="text-lg text-gray-900">{new Date(refundData.submittedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-[#0070ba] text-white rounded-lg font-semibold hover:bg-[#005ea6] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Copy ID</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download</span>
          </button>

          <Link
            to="/track-refund"
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-[#003087] text-white rounded-lg font-semibold hover:bg-[#002a6f] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Track Status</span>
          </Link>
        </div>

        {/* Next Steps */}
        <div className="mt-12 bg-gradient-to-br from-[#e8f4fd] to-[#d4e9f7] rounded-2xl p-8 border border-[#0070ba]/20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#0070ba] text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Verification</h3>
                <p className="text-gray-600">Our team will verify your information and validate the refund request.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#0070ba] text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Processing</h3>
                <p className="text-gray-600">Your refund will be processed according to our standard procedures.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#0070ba] text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Notification</h3>
                <p className="text-gray-600">You'll receive email updates about your refund status at each stage.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#0070ba] text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Completion</h3>
                <p className="text-gray-600">Once approved, funds will be transferred to your specified bank account.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Return Home */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-[#0070ba] hover:text-[#005ea6] font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
