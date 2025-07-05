import React from 'react';
import { Metadata } from 'next';
import { Mail, MessageSquare, Clock, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: "Contact | Train Tracker France",
  description: "Contactez l'équipe de Train Tracker France. Questions, suggestions ou assistance technique.",
  alternates: {
    canonical: "https://traintracker.fr/contact/",
    languages: { "fr": "https://traintracker.fr/contact/", "en": "https://traintracker.fr/en/contact/" },
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
          <p className="text-lg text-gray-600">Nous sommes là pour vous aider</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Question générale</option>
                  <option>Problème technique</option>
                  <option>Suggestion d'amélioration</option>
                  <option>Signalement d'erreur</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Envoyer le message
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
              <p className="text-sm text-gray-500">Réponse sous 24-48h</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Disponibilité</h3>
              </div>
              <p className="text-gray-600">Lundi - Vendredi : 9h - 18h</p>
              <p className="text-gray-600">Week-end : Réponse différée</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <HelpCircle className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Support</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Pour les questions urgentes concernant vos voyages, 
                consultez directement les sources officielles SNCF.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}