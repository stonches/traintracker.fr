'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, you would send the data to your API
      console.log('Form submitted:', formData);
      
      setStatus('success');
      setFormData({ nom: '', email: '', sujet: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Message envoyé avec succès !
        </h3>
        <p className="text-gray-600 mb-4">
          Merci pour votre message. Nous vous répondrons dans les 24 heures.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Votre nom"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="votre@email.com"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 mb-2">
          Sujet *
        </label>
        <select
          id="sujet"
          name="sujet"
          value={formData.sujet}
          onChange={handleChange}
          required
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Sélectionnez un sujet</option>
          <option value="probleme-technique">Problème technique</option>
          <option value="question-generale">Question générale</option>
          <option value="suggestion">Suggestion d'amélioration</option>
          <option value="donnees-incorrectes">Données incorrectes</option>
          <option value="nouvelle-fonctionnalite">Nouvelle fonctionnalité</option>
          <option value="partenariat">Partenariat</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
          placeholder="Décrivez votre question ou problème en détail..."
        />
        <p className="text-sm text-gray-500 mt-2">
          Minimum 10 caractères. Soyez précis pour nous aider à mieux vous répondre.
        </p>
      </div>

      {/* Error Message */}
      {status === 'error' && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm">{errorMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={status === 'loading' || !formData.nom || !formData.email || !formData.sujet || !formData.message}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          {status === 'loading' ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Envoi en cours...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Envoyer le message</span>
            </>
          )}
        </button>
      </div>

      {/* Privacy Notice */}
      <div className="text-sm text-gray-500">
        <p>
          En envoyant ce formulaire, vous acceptez que nous utilisions vos données pour répondre à votre demande. 
          Consultez notre <a href="/politique-confidentialite" className="text-blue-600 hover:text-blue-800">politique de confidentialité</a> pour plus d'informations.
        </p>
      </div>
    </form>
  );
}