

"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createForm } from "@/redux/slices/distributorship/distributorshipThunks";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function DistributorshipForm() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    candidateName: "",
    positionDistrict: false,
    positionZonal: false,
    districtName: "",
    mobile: "",
    address: "",
    pinCode: "",
    dob: "",
    pan: "",
    aadhar: "",
    occupation: "",
    experience: "",
    description: "",
    startDate: "",
    agentDuration: "",
    signDate: "",
    signature: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await dispatch(createForm(formData)).unwrap();
      toast.success("Form Sent Successfully");

      setFormData({
        candidateName: "",
        positionDistrict: false,
        positionZonal: false,
        districtName: "",
        mobile: "",
        address: "",
        pinCode: "",
        dob: "",
        pan: "",
        aadhar: "",
        occupation: "",
        experience: "",
        description: "",
        startDate: "",
        agentDuration: "",
        signDate: "",
        signature: "",
      });
    } catch (error) {
      toast.error("Failed to submit the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-3xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg rounded-lg border border-gray-100'>
      <h2 className='text-center text-2xl font-bold text-gray-800 mb-4'>
        Distributorship Nomination Form
      </h2>

      <form className='space-y-4' onSubmit={handleSubmit}>
        {/* Name of Candidate */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-1'>
            Name of Candidate:
          </label>
          <input
            type='text'
            name='candidateName'
            value={formData.candidateName}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-400 rounded-lg'
          />
        </div>

        {/* Position */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-1'>
            Position Nominated For:
          </label>
          <div className='flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0'>
            <label className='flex items-center space-x-2'>
              <input
                type='checkbox'
                name='positionDistrict'
                checked={formData.positionDistrict}
                onChange={handleChange}
                className='w-5 h-5'
              />
              <span className='text-gray-700'>District Distributor</span>
            </label>
            <label className='flex items-center space-x-2'>
              <input
                type='checkbox'
                name='positionZonal'
                checked={formData.positionZonal}
                onChange={handleChange}
                className='w-5 h-5'
              />
              <span className='text-gray-700'>Zonal Partner</span>
            </label>
          </div>
        </div>

        {/* District & Mobile */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-1'>
              Name of District for Apply:
            </label>
            <input
              type='text'
              name='districtName'
              value={formData.districtName}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-400 rounded-lg'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-1'>
              Mobile No.:
            </label>
            <input
              type='text'
              name='mobile'
              value={formData.mobile}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-400 rounded-lg'
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-1'>
            Address:
          </label>
          <textarea
            name='address'
            value={formData.address}
            onChange={handleChange}
            rows='2'
            className='w-full px-3 py-2 border border-gray-400 rounded-lg'
          />
        </div>

        {/* Pin & DOB */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-1'>
              Pin Code:
            </label>
            <input
              type='text'
              name='pinCode'
              value={formData.pinCode}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-400 rounded-lg'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-1'>
              Date of Birth:
            </label>
            <input
              type='date'
              name='dob'
              value={formData.dob}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-400 rounded-lg'
            />
          </div>
        </div>

        {/* PAN & Aadhar */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-1'>
              Pan No.:
            </label>
            <input
              type='text'
              name='pan'
              value={formData.pan}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-400 rounded-lg'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-1'>
              Aadhaar card No.:
            </label>
            <input
              type='text'
              name='aadhar'
              value={formData.aadhar}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-400 rounded-lg'
            />
          </div>
        </div>

        {/* Occupation */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-1'>
            Current Occupation:
          </label>
          <input
            type='text'
            name='occupation'
            value={formData.occupation}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-400 rounded-lg'
          />
        </div>

        {/* Experience */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-1'>
            Total Experience (Years):
          </label>
          <input
            type='number'
            name='experience'
            value={formData.experience}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-400 rounded-lg'
          />
        </div>

        {/* Description */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-1'>
            Describe yourself (Under 150 words):
          </label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            rows='3'
            className='w-full px-3 py-2 border border-gray-400 rounded-lg'
          />
        </div>

        {/* Start Date */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-1'>
            Expected date for starting the work:
          </label>
          <input
            type='date'
            name='startDate'
            value={formData.startDate}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-400 rounded-lg'
          />
        </div>

        {/* Agent Duration */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-1'>
            Expected duration to appoint all field agents:
          </label>
          <div className='flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0'>
            {["Within 1 Week", "2 Weeks", "3 Weeks", "4 Weeks"].map((option) => (
              <label key={option} className='flex items-center space-x-2'>
                <input
                  type='radio'
                  name='agentDuration'
                  value={option}
                  checked={formData.agentDuration === option}
                  onChange={handleChange}
                  className='w-5 h-5'
                />
                <span className='text-gray-700'>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date & Signature */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-1'>
              Date:
            </label>
            <input
              type='date'
              name='signDate'
              value={formData.signDate}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-400 rounded-lg'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-1'>
              Signature:
            </label>
            <input
              type='text'
              name='signature'
              value={formData.signature}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-400 rounded-lg'
            />
          </div>
        </div>

        {/* Submit */}
        <div className='text-center'>
          <button
            type='submit'
            disabled={loading}
            className={`px-6 py-2 text-white font-semibold rounded-lg transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

