'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { getTranslation } from '@/lib/i18n/utils';
import { Language } from '@/lib/i18n/translations';

interface ContactFormProps {
  lang: Language;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'support' | 'bug' | 'suggestion' | 'legal' | 'other';
}

export function ContactForm({ lang }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'support',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const t = (key: string) => getTranslation(lang, key);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would send the form data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'support',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.email && formData.subject && formData.message;

  return (
    <div className="bg-white rounded-2xl shadow-soft p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Formulaire de contact
      </h2>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-success-50 border border-success-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-success-600" />
            <div>
              <h3 className="font-medium text-success-800">Message envoyé !</h3>
              <p className="text-success-700 text-sm">
                Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
              </p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-danger-50 border border-danger-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-danger-600" />
            <div>
              <h3 className="font-medium text-danger-800">Erreur d'envoi</h3>
              <p className="text-danger-700 text-sm">
                Une erreur s'est produite. Veuillez réessayer ou nous contacter directement par email.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type of Request */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de demande *
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
            required
          >
            <option value="support">Support technique</option>
            <option value="bug">Signaler un bug</option>
            <option value="suggestion">Suggestion d'amélioration</option>
            <option value="legal">Question juridique/RGPD</option>
            <option value="other">Autre</option>
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom (optionnel)
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Votre nom"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="votre.email@exemple.com"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sujet *
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            placeholder="Résumé de votre demande"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Décrivez votre demande en détail..."
            rows={6}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none resize-vertical"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            * Champs obligatoires
          </p>
          
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Envoi...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Envoyer</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Privacy Notice */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 leading-relaxed">
          <strong>Protection des données :</strong> Les informations de ce formulaire sont utilisées uniquement 
          pour traiter votre demande. Elles sont conservées 3 ans maximum et ne sont jamais partagées avec des tiers. 
          Consultez notre <a href="/confidentialite" className="text-primary-600 hover:text-primary-700">politique de confidentialité</a> 
          pour plus d'informations.
        </p>
      </div>
    </div>
  );
}