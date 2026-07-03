import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

const RefundTracking = () => {
  const [ticketId, setTicketId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!ticketId.trim()) {
      setError('Please enter a Refund Ticket ID');
      return;
    }

    if (ticketId.trim().length !== 5) {
      setError('Ticket ID must be 5 characters');
      return;
    }

    setError('');
    setIsSearching(true);
    setSearchResult(null);

    // Simulate search delay (approximately 5 seconds)
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Try to find the refund in localStorage
    const refundData = localStorage.getItem(`refund_${ticketId.toUpperCase()}`);
    
    if (refundData) {
      setSearchResult(JSON.parse(refundData));
    } else {
      setSearchResult({
        notFound: true,
        ticketId: ticketId.toUpperCase()
      });
    }

    setIsSearching(false);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0070ba] to-[#003087] rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Track PayPal Refund Status
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your 5-character Refund Ticket ID to check the status of your PayPal refund request.
          </p>
        </div>

        {/* Search Form */}
        {!searchResult && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-[#0070ba]/20 p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Refund Ticket ID
                </label>
                <input
                  type="text"
                  value={ticketId}
                  onChange={(e) => {
                    setTicketId(e.target.value.toUpperCase());
                    setError('');
                  }}
                  maxLength={5}
                  className={`w-full px-6 py-4 text-2xl font-mono font-bold text-center border rounded-lg focus:ring-2 focus:ring-[#0070ba] focus:border-transparent transition-all ${
                    error ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="X4P9K"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center justify-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#0070ba] to-[#003087] text-white rounded-lg font-semibold hover:from-[#005ea6] hover:to-[#002a6f] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSearching ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Track Refund</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Don't have a Ticket ID?{' '}
                <Link to="/refund-request" className="text-[#0070ba] hover:text-[#005ea6] font-semibold">
                  Submit a new refund request
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isSearching && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center space-y-6 animate-fadeIn">
              <div className="relative">
                <div className="w-20 h-20 mx-auto">
                  <svg className="animate-spin text-[#0070ba]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Retrieving Information</h3>
                <p className="text-gray-600">
                  Retrieving refund request details. Please wait...
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-[#0070ba] to-[#003087] h-2 rounded-full animate-progress"></div>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchResult && !searchResult.notFound && (
          <div className="space-y-8 animate-fadeIn">
            {/* Status Card - Processing Error */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-xl border-2 border-red-200 p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-red-900 mb-2">Refund Processing Error</h2>
                  <p className="text-red-800">
                    We were unable to complete the refund through the automated processing system due to a technical issue. Additional review may be required before the request can proceed.
                  </p>
                </div>
              </div>

              <div className="bg-white/60 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 font-semibold">Ticket ID</p>
                    <p className="text-gray-900 font-mono font-bold text-lg">{searchResult.ticketId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold">Status</p>
                    <p className="text-red-600 font-bold">{searchResult.status}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Details */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Refund Request Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Customer Name</p>
                  <p className="text-lg text-gray-900">{searchResult.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Email</p>
                  <p className="text-lg text-gray-900">{searchResult.email}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">PayPal Order ID</p>
                  <p className="text-lg text-gray-900 font-mono">{searchResult.transactionId}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Transaction Amount</p>
                  <p className="text-lg font-bold text-[#0070ba]">${searchResult.refundAmount}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Purchase Date</p>
                  <p className="text-lg text-gray-900">{new Date(searchResult.purchaseDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Bank Name</p>
                  <p className="text-lg text-gray-900">{searchResult.bankName}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Submitted</p>
                  <p className="text-lg text-gray-900">{new Date(searchResult.submittedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Available Actions */}
            <div className="bg-gradient-to-br from-[#e8f4fd] to-[#d4e9f7] rounded-2xl p-8 border border-[#0070ba]/20 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Contact Refund Manager</h3>
              <p className="text-gray-600 mb-6">To claim your refund manually.</p>
              
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-[#0070ba] text-white rounded-lg font-semibold hover:bg-[#005ea6] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Contact Refund Manager</span>
              </Link>
            </div>

            {/* Search Again */}
            <div className="text-center">
              <button
                onClick={() => {
                  setSearchResult(null);
                  setTicketId('');
                }}
                className="inline-flex items-center space-x-2 text-[#0070ba] hover:text-[#005ea6] font-semibold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search Another Ticket</span>
              </button>
            </div>
          </div>
        )}

        {/* Not Found Results */}
        {searchResult && searchResult.notFound && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ticket Not Found</h2>
              <p className="text-gray-600 mb-8">
                We couldn't find a refund request with Ticket ID: <span className="font-mono font-bold">{searchResult.ticketId}</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSearchResult(null);
                    setTicketId('');
                  }}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-[#0070ba] text-white rounded-lg font-semibold hover:bg-[#005ea6] transition-all duration-300 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Try Again</span>
                </button>

                <Link
                  to="/refund-request"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-[#0070ba] text-white rounded-lg font-semibold hover:bg-[#005ea6] transition-all duration-300 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Submit New Request</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RefundTracking;
