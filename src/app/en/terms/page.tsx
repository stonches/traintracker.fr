import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service | Train Tracker France",
  description: "Terms and conditions of use for Train Tracker France.",
  alternates: {
    canonical: "https://traintracker.fr/en/terms/",
    languages: { "fr": "https://traintracker.fr/conditions/", "en": "https://traintracker.fr/en/terms/" },
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString('en-US')}</p>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>By using Train Tracker France, you agree to these terms of service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
            <p>Train Tracker France is an independent real-time railway information service, not affiliated with SNCF.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Limitation of Liability</h2>
            <p>Information is provided for guidance only. Always verify critical information with official sources.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property</h2>
            <p>Site content is protected by copyright. SNCF data remains property of SNCF.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Governing Law</h2>
            <p>These terms are governed by French law.</p>
          </section>
        </div>
      </div>
    </div>
  );
}