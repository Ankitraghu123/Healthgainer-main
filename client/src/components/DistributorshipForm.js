'use client';

export default function DistributorshipForm() {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg rounded-lg border border-gray-100">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
        Distributorship Nomination Form
      </h2>

      <form className="space-y-4">
        {/* Name of Candidate */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Name of Candidate:
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Position Nominated For */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Position Nominated For:
          </label>
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-5 h-5 text-primary border-gray-400 rounded focus:ring-primary transition-all"
              />
              <span className="text-gray-700">District Distributor</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-5 h-5 text-primary border-gray-400 rounded focus:ring-primary transition-all"
              />
              <span className="text-gray-700">Zonal Partner</span>
            </label>
          </div>
        </div>

        {/* Name of District for Apply */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Name of District for Apply:
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Candidate KYC Section */}
        <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">Candidate KYC</h3>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Address:
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            rows="2"
          ></textarea>
        </div>

        {/* Pin Code and Date of Birth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Pin Code:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Date of Birth:
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Pan No. and Adhar No. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Pan No.:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Adhar No.:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Current Occupation */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Current Occupation:
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Total Experience */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Total Experience (Years):
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Describe Yourself */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Describe yourself (Under 150 words):
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            rows="3"
          ></textarea>
        </div>

        {/* Expected Date for Starting Work */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Expected date for starting the work:
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Expected Duration to Appoint Agents */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Expected duration to appoint all field agents:
          </label>
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
            {['Within 1 Week', '2 Weeks', '3 Weeks', '4 Weeks'].map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="duration"
                  className="w-5 h-5 text-primary border-gray-400 rounded-full focus:ring-primary transition-all"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date and Signature */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Date:
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Signature:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}