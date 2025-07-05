import React from 'react';
import { Metadata } from 'next';
import { Mail, MessageSquare, Clock, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: "Contact | Train Tracker France",
  description: "Contact the Train Tracker France team. Questions, suggestions or technical assistance.",
  alternates: {
    canonical: "https://traintracker.fr/en/contact/",
    languages: { "fr": "https://traintracker.fr/contact/", "en": "https://traintracker.fr/en/contact/" },
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">We're here to help</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>General question</option>
                  <option>Technical issue</option>
                  <option>Feature suggestion</option>
                  <option>Error report</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Send message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
              </div>
              <p className="text-gray-600 mb-2">contact@traintracker.com</p>
              <p className="text-sm text-gray-500">Response within 24-48h</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Availability</h3>
              </div>
              <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
              <p className="text-gray-600">Weekend: Delayed response</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <HelpCircle className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Support</h3>
              </div>
              <p className="text-gray-600 text-sm">
                For urgent questions about your travels, 
                please consult official SNCF sources directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}