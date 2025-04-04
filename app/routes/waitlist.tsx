import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Konkon.ai - Join Waitlist" },
    { name: "description", content: "Join the Konkon.ai waitlist to be the first to try our cutting-edge AI technology." },
  ];
};

export default function Waitlist() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    reason: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for joining our waitlist. We'll be in touch soon!");
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      reason: ""
    });
  };

  return (
    <div className="min-h-screen bg-[#180525]">
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-5xl font-bold mb-8 font-ethnocentric text-white tracking-wider">JOIN WAITLIST</h1>
        <p className="text-white font-ocr mb-8">Be the first to experience our revolutionary AI technology</p>
      </div>
      
      <div className="container mx-auto px-4 pb-16 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block mb-2 text-sm font-ocr text-white">First name</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#180525] border border-gray-600 rounded-md focus:outline-none focus:border-white text-white font-ocr"
              placeholder="First name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block mb-2 text-sm font-ocr text-white">Last name</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#180525] border border-gray-600 rounded-md focus:outline-none focus:border-white text-white font-ocr"
              placeholder="Last name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-ocr text-white">Email(required)</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#180525] border border-gray-600 rounded-md focus:outline-none focus:border-white text-white font-ocr"
              placeholder="Email"
              required
            />
          </div>
          
          <div>
            <label htmlFor="reason" className="block mb-2 text-sm font-ocr text-white">Why are you interested in Konkon.ai?</label>
            <textarea 
              id="reason" 
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 bg-[#180525] border border-gray-600 rounded-md focus:outline-none focus:border-white text-white font-ocr"
              placeholder="Tell us why you're interested"
            ></textarea>
          </div>
          
          <div className="text-center pt-2">
            <button 
              type="submit"
              className="px-8 py-2 bg-white text-black rounded-md font-ocr text-sm hover:bg-gray-200 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 