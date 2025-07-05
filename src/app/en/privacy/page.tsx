import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | Train Tracker France",
  description: "Train Tracker France privacy policy. Personal data protection and GDPR compliance.",
  alternates: {
    canonical: "https://traintracker.fr/en/privacy/",
    languages: { "fr": "https://traintracker.fr/confidentialite/", "en": "https://traintracker.fr/en/privacy/" },
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString('en-US')}</p>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Data Collection</h2>
            <p>Train Tracker France only collects data necessary for service operation:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Anonymous browsing data via Google Analytics</li>
              <li>Language preferences stored locally</li>
              <li>Search history in local cache</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Data Usage</h2>
            <p>Collected data is only used to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Improve user experience</li>
              <li>Analyze service usage</li>
              <li>Optimize performance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Your GDPR Rights</h2>
            <p>In accordance with GDPR, you have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Right of access to your data</li>
              <li>Right of rectification</li>
              <li>Right to erasure</li>
              <li>Right to data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Contact</h2>
            <p>For any questions regarding this policy: contact@traintracker.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}