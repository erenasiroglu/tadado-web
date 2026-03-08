'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function SupportForm() {
  const t = useTranslations('support.form')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, message })
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to send')
      }

      setStatus('success')
      setEmail('')
      setMessage('')
    } catch (err) {
      console.error('Support form error:', err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
          <svg className="h-7 w-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-zinc-50">{t('successTitle')}</h3>
        <p className="mt-2 text-zinc-400">{t('success')}</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm sm:p-8"
      aria-labelledby="support-form-title"
    >
      <h2 id="support-form-title" className="text-xl font-semibold text-zinc-50 mb-1">
        {t('title')}
      </h2>
      <p className="text-zinc-400 text-sm mb-6">
        {t('description')}
      </p>

      <div className="space-y-5">
        <div>
          <label htmlFor="support-email" className="block text-sm font-medium text-zinc-300 mb-2">
            {t('emailLabel')}
          </label>
          <input
            type="email"
            id="support-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('emailPlaceholder')}
            required
            autoComplete="email"
            disabled={status === 'sending'}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-zinc-100 placeholder-zinc-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-60"
          />
        </div>

        <div>
          <label htmlFor="support-message" className="block text-sm font-medium text-zinc-300 mb-2">
            {t('messageLabel')}
          </label>
          <textarea
            id="support-message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('messagePlaceholder')}
            required
            rows={5}
            minLength={10}
            maxLength={2000}
            disabled={status === 'sending'}
            className="w-full resize-y rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-zinc-100 placeholder-zinc-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-60 min-h-[120px]"
          />
          <p className="mt-1.5 text-xs text-zinc-400">
            {message.length} / 2000
          </p>
        </div>

        {status === 'error' && (
          <p className="text-sm text-red-600" role="alert">
            {t('error')}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full rounded-xl bg-white py-3.5 font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-60"
        >
          {status === 'sending' ? t('sending') : t('submit')}
        </button>
      </div>
    </form>
  )
}
