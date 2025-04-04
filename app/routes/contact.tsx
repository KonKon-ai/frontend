import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Konkon.ai - Contact Us" },
    { name: "description", content: "Get in touch with the Konkon.ai team." },
  ];
};

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message. We'll get back to you soon!");
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-[#180525]">
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-5xl font-bold mb-8 font-ethnocentric text-white tracking-wider">CONTACT US</h1>
        <p className="text-white font-ocr mb-8">For any enquiries, please fill out the form</p>
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
            <label htmlFor="subject" className="block mb-2 text-sm font-ocr text-white">Subject</label>
            <input 
              type="text" 
              id="subject" 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#180525] border border-gray-600 rounded-md focus:outline-none focus:border-white text-white font-ocr"
              placeholder="Subject"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-ocr text-white">Message (250 Words max)</label>
            <textarea 
              id="message" 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 bg-[#180525] border border-gray-600 rounded-md focus:outline-none focus:border-white text-white font-ocr"
              placeholder="Message"
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