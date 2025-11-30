// Componente de formulários acessíveis para teste com usuários com deficiência
import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const AccessibleForms = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    message: '',
    newsletter: false,
    terms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro quando usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email deve ter um formato válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'Data de nascimento é obrigatória';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Endereço é obrigatório';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    if (!formData.terms) {
      newErrors.terms = 'Você deve aceitar os termos de uso';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    if (validateForm()) {
      try {
        // Simular envio
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          birthDate: '',
          address: '',
          message: '',
          newsletter: false,
          terms: false
        });
      } catch (error) {
        setSubmitStatus('error');
      }
    } else {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="stat-card p-6 rounded-lg mb-6">
      <div className="text-lg font-bold nav-text mb-6">
        Formulários
      </div>

      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-4">
          Este formulário demonstra práticas de acessibilidade para usuários com deficiência,
          incluindo validação em tempo real, feedback claro e navegação por teclado.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <div className="block text-sm font-medium nav-text mb-2">
            <User className="inline h-4 w-4 mr-2" />
            Nome Completo <span className="text-red-600">*</span>
          </div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full p-3 border rounded-lg border-border"
          />
        </div>

        <div>
          <div className="block text-sm font-medium nav-text mb-2">
            <Mail className="inline h-4 w-4 mr-2" />
            Endereço de Email <span className="text-red-600">*</span>
          </div>
          <input
            type="text"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full p-3 border rounded-lg border-border"
          />
        </div>

        <div>
          <div className="block text-sm font-medium nav-text mb-2">
            <Phone className="inline h-4 w-4 mr-2" />
            Telefone <span className="text-red-600">*</span>
          </div>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full p-3 border rounded-lg border-border"
          />
        </div>

        <div>
          <div className="block text-sm font-medium nav-text mb-2">
            <Calendar className="inline h-4 w-4 mr-2" />
            Data de Nascimento <span className="text-red-600">*</span>
          </div>
          <input
            type="text"
            value={formData.birthDate}
            onChange={(e) => handleInputChange('birthDate', e.target.value)}
            className="w-full p-3 border rounded-lg border-border"
          />
        </div>

        <div>
          <div className="block text-sm font-medium nav-text mb-2">
            <MapPin className="inline h-4 w-4 mr-2" />
            Endereço <span className="text-red-600">*</span>
          </div>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            rows={3}
            className="w-full p-3 border rounded-lg resize-none border-border"
          />
        </div>

        <div>
          <div className="block text-sm font-medium nav-text mb-2">
            <FileText className="inline h-4 w-4 mr-2" />
            Mensagem <span className="text-red-600">*</span>
          </div>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={4}
            className="w-full p-3 border rounded-lg resize-none border-border"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={formData.newsletter}
              onChange={(e) => handleInputChange('newsletter', e.target.checked)}
              className="mt-1"
            />
            <div className="text-sm nav-text cursor-pointer">
              Desejo receber newsletters e atualizações por email
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={formData.terms}
              onChange={(e) => handleInputChange('terms', e.target.checked)}
              className="mt-1"
            />
            <div className="text-sm nav-text cursor-pointer">
              Aceito os <a href="#" className="text-primary hover:underline">termos de uso</a> e
              <a href="#" className="text-primary hover:underline"> política de privacidade</a>
              <span className="text-red-600"> *</span>
            </div>
          </div>
        </div>

        {submitStatus === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="text-sm text-green-800">
                Formulário enviado com sucesso! Obrigado pelo seu contato.
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div className="text-sm text-red-800">
                Erro ao enviar formulário. Verifique os campos e tente novamente.
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Formulário'}
        </button>
      </form>
    </div>
  );
};

export default AccessibleForms;
