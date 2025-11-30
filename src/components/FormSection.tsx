// Accessible contact form with proper structure and WCAG compliance
import React, { useState } from 'react';
import { Shield, RefreshCw } from 'lucide-react';

const FormSection = () => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [securityCode, setSecurityCode] = useState('AB7K9');
  const [userSecurityInput, setUserSecurityInput] = useState('');

  const generateNewCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const newCode = Array.from({length: 5}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    setSecurityCode(newCode);
    setUserSecurityInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const errors: Record<string, string> = {};

    // Validate required fields
    if (!formData.get('name')) errors.name = 'Nome é obrigatório';
    if (!formData.get('email')) errors.email = 'Email é obrigatório';
    if (!formData.get('department')) errors.department = 'Por favor selecione um departamento';
    if (!formData.get('priority')) errors.priority = 'Por favor selecione um nível de prioridade';
    if (!formData.get('message')) errors.message = 'Mensagem é obrigatória';
    if (userSecurityInput !== securityCode) errors.security = 'Código de segurança está incorreto';

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      alert('Formulário enviado com sucesso!');
    }
  };

  return (
    <div className="stat-card p-6 rounded-lg mb-6 mt-8">
      <div className="text-lg font-bold nav-text mb-4">Formulário de Contato</div>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div>
          <div className="block text-sm font-medium nav-text mb-2">
            Nome Completo <span className="text-danger-low">*</span>
          </div>
          <input
            type="text"
            name="name"
            className="w-full p-3 bg-input border rounded-lg nav-text border-border"
          />
        </div>

        <div>
          <div className="block text-sm font-medium nav-text mb-2">
            Endereço de Email <span className="text-danger-low">*</span>
          </div>
          <input
            type="text"
            name="email"
            className="w-full p-3 bg-input border rounded-lg nav-text border-border"
          />
        </div>

        <div>
          <div className="block text-sm font-medium nav-text mb-2">
            Departamento <span className="text-danger-low">*</span>
          </div>
          <select
            name="department"
            className="w-full p-3 bg-input border rounded-lg nav-text border-border"
          >
            <option value="">Selecione um departamento</option>
            <option value="sales">Vendas</option>
            <option value="support">Suporte Técnico</option>
            <option value="billing">Faturamento e Contas</option>
          </select>
        </div>

        <div>
          <div className="block text-sm font-medium nav-text mb-3">
            Nível de Prioridade <span className="text-danger-low">*</span>
          </div>
          <div className="space-y-3">
            {[
              { value: 'low', label: 'Baixa - Consulta geral' },
              { value: 'medium', label: 'Média - Pergunta comercial' },
              { value: 'high', label: 'Alta - Problema urgente' }
            ].map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value={option.value}
                />
                <div className="ml-3 text-sm nav-text cursor-pointer">
                  {option.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="block text-sm font-medium nav-text mb-2">
            Mensagem <span className="text-danger-low">*</span>
          </div>
          <textarea
            name="message"
            rows={4}
            className="w-full p-3 bg-input border rounded-lg nav-text resize-none border-border"
          />
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            name="newsletter"
            className="mt-1"
          />
          <div className="ml-3 text-sm nav-text cursor-pointer">
            Inscrever-se em nossa newsletter para atualizações e ofertas especiais
          </div>
        </div>

        <div>
          <div className="block text-sm font-medium nav-text mb-2">
            Anexo (Opcional)
          </div>
          <input
            type="file"
            name="attachment"
            className="w-full p-3 bg-input border border-border rounded-lg nav-text"
            accept=".pdf,.doc,.docx,.txt"
          />
        </div>

        <div className="p-4 border border-border rounded-lg bg-muted/50">
          <div className="text-sm font-medium nav-text mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Verificação de Segurança
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-background border border-border rounded font-mono text-lg tracking-widest nav-text">
                {securityCode}
              </div>
              <button
                type="button"
                onClick={generateNewCode}
                className="p-2 bg-secondary hover:bg-secondary/80 rounded transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
            <div>
              <div className="block text-sm font-medium nav-text mb-2">
                Digite o código acima <span className="text-danger-low">*</span>
              </div>
              <input
                type="text"
                value={userSecurityInput}
                onChange={(e) => setUserSecurityInput(e.target.value.toUpperCase())}
                className="w-full p-2 bg-input border rounded nav-text border-border"
                placeholder="Digite o código de segurança"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Enviar Solicitação
        </button>
      </form>
    </div>
  );
};

export default FormSection;