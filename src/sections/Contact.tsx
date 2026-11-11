import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../hooks/useLanguage';
import { SectionHeading } from '../components/common/SectionHeading';
import { ScrollReveal } from '../components/common/ScrollReveal';
import type { ContactFormData, ContactFormErrors } from '../types';

// ── Configuration ──────────────────────────────────────────────────────────
// Initialize EmailJS
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const MAIL_TO = import.meta.env.VITE_MAIL_TO || 'mulugetadaba719@gmail.com';

// Initialize EmailJS on component mount
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

const CONTACT_FORM_ENABLED = !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const validate = (data: ContactFormData, t: Record<string, string>): ContactFormErrors => {
  const errors: ContactFormErrors = {};
  if (!data.name.trim()) errors.name = t.contact_error_name_required;
  else if (data.name.trim().length < 2) errors.name = t.contact_error_name_min;
  if (!data.email.trim()) errors.email = t.contact_error_email_required;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = t.contact_error_email_invalid;
  if (!data.subject.trim()) errors.subject = t.contact_error_subject_required;
  if (!data.message.trim()) errors.message = t.contact_error_message_required;
  else if (data.message.trim().length < 20) errors.message = t.contact_error_message_min;
  return errors;
};

const INITIAL_FORM: ContactFormData = { name: '', email: '', subject: '', message: '' };

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form, t as unknown as Record<string, string>);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (!CONTACT_FORM_ENABLED) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    try {
      const emailParams = {
        to_email: MAIL_TO,
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailParams
      );
      
      setStatus('success');
      setForm(INITIAL_FORM);
      setErrors({});
      // Auto-reset after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Email send failed:', error);
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-bg-elevated)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text-primary)',
  };

  const labelStyle: React.CSSProperties = { color: 'var(--color-text-secondary)' };

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 pt-8"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading title={t.contact_section_title} subtitle={t.contact_section_subtitle} />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info column */}
          <ScrollReveal delay={100} direction="left" className="lg:col-span-2">
            <div className="space-y-6">
              <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {t.contact_intro}
              </p>

              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.103-.253-.448-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.548 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.308.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                  ),
                  label: t.contact_github,
                  value: 'mulee721',
                  href: 'https://github.com/mulee721',
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ),
                  label: t.contact_linkedin,
                  value: 'mulee127',
                  href: 'https://www.linkedin.com/in/mulee127/',
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: t.contact_email_label,
                  value: MAIL_TO,
                  href: `mailto:${MAIL_TO}`,
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 group"
                  style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,185,129,0.35)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-emerald-muted)', color: 'var(--color-emerald)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-text-secondary)', opacity: 0.6 }}>{item.label}</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </ScrollReveal>

          {/* Form column */}
          <ScrollReveal delay={200} direction="right" className="lg:col-span-3">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'rgba(16,185,129,0.3)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(16,185,129,0.15)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--color-emerald)' }} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2" style={{ color: 'var(--color-text-primary)' }}>{t.contact_success_title}</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>{t.contact_success_message}</p>
                <button onClick={() => setStatus('idle')} className="mt-6 px-5 py-2 rounded-lg text-sm font-semibold border transition-colors" style={{ color: 'var(--color-emerald)', borderColor: 'var(--color-emerald)', backgroundColor: 'transparent' }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5 p-6 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }} aria-label="Contact form">
                {!CONTACT_FORM_ENABLED && status === 'error' && (
                  <div className="p-4 rounded-xl text-sm" style={{ backgroundColor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#F59E0B' }}>
                    Email service not configured. Please add your EmailJS credentials to .env.local
                  </div>
                )}
                {CONTACT_FORM_ENABLED && status === 'error' && (
                  <div className="p-4 rounded-xl text-sm" style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444' }}>
                    {t.contact_error_message}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 -mx-1">
                  {[
                    { name: 'name', label: t.contact_name, placeholder: t.contact_name_placeholder, type: 'text' },
                    { name: 'email', label: t.contact_email, placeholder: t.contact_email_placeholder, type: 'email' },
                  ].map((field) => (
                    <div key={field.name} className="px-1">
                      <label htmlFor={field.name} className="block text-xs font-medium mb-1.5" style={labelStyle}>{field.label}</label>
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={form[field.name as keyof ContactFormData]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 rounded-lg border text-xs transition-colors duration-200 outline-none"
                        style={{ ...inputStyle, borderColor: errors[field.name as keyof ContactFormErrors] ? '#EF4444' : 'var(--color-border)' }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-emerald)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = errors[field.name as keyof ContactFormErrors] ? '#EF4444' : 'var(--color-border)'; }}
                        aria-invalid={!!errors[field.name as keyof ContactFormErrors]}
                        aria-describedby={errors[field.name as keyof ContactFormErrors] ? `${field.name}-error` : undefined}
                      />
                      {errors[field.name as keyof ContactFormErrors] && (
                        <p id={`${field.name}-error`} className="mt-1 text-xs" style={{ color: '#EF4444' }} role="alert">
                          {errors[field.name as keyof ContactFormErrors]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1.5" style={labelStyle}>{t.contact_subject}</label>
                  <input
                    id="subject" name="subject" type="text"
                    value={form.subject} onChange={handleChange}
                    placeholder={t.contact_subject_placeholder}
                    className="w-full px-4 py-3 rounded-xl border text-sm transition-colors duration-200 outline-none"
                    style={{ ...inputStyle, borderColor: errors.subject ? '#EF4444' : 'var(--color-border)' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-emerald)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = errors.subject ? '#EF4444' : 'var(--color-border)'; }}
                    aria-invalid={!!errors.subject}
                  />
                  {errors.subject && <p className="mt-1 text-xs" style={{ color: '#EF4444' }} role="alert">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5" style={labelStyle}>{t.contact_message}</label>
                  <textarea
                    id="message" name="message" rows={5}
                    value={form.message} onChange={handleChange}
                    placeholder={t.contact_message_placeholder}
                    className="w-full px-4 py-3 rounded-xl border text-sm transition-colors duration-200 outline-none resize-none"
                    style={{ ...inputStyle, borderColor: errors.message ? '#EF4444' : 'var(--color-border)' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-emerald)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = errors.message ? '#EF4444' : 'var(--color-border)'; }}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="mt-1 text-xs" style={{ color: '#EF4444' }} role="alert">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, var(--color-emerald), var(--color-teal))' }}
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      {t.contact_sending}
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      {t.contact_send}
                    </>
                  )}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
