'use client'
import { useRef, useState } from 'react'
import Link from '@/components/i18n/LocalizedLink'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import {
  quoteServices,
  validateQuote,
  MAX_FILE_BYTES,
  MAX_TOTAL_BYTES,
  type QuoteData,
} from '@/lib/validation/quote'
const steps = ['Service', 'Languages', 'Project', 'Files', 'Contact', 'Review', 'Submit']
const initial: QuoteData = {
  service: '',
  sourceLanguage: '',
  targetLanguages: '',
  details: '',
  deadline: '',
  name: '',
  email: '',
  company: '',
  consent: false,
  website: '',
}
export function QuoteForm() {
  const [step, setStep] = useState(0),
    [data, setData] = useState(initial),
    [files, setFiles] = useState<File[]>([]),
    [errors, setErrors] = useState<Record<string, string>>({}),
    [pending, setPending] = useState(false),
    [message, setMessage] = useState(''),
    [reference, setReference] = useState('')
  const heading = useRef<HTMLHeadingElement>(null)
  const update = (key: keyof QuoteData, value: string | boolean) =>
    setData((current) => ({ ...current, [key]: value }))
  const go = (next: number) => {
    setStep(next)
    setMessage('')
    requestAnimationFrame(() => heading.current?.focus())
  }
  const advance = () => {
    const all = validateQuote(data)
    const fields =
      step === 0
        ? ['service']
        : step === 2
          ? ['details', 'deadline']
          : step === 4
            ? ['name', 'email', 'company']
            : step === 1
              ? ['sourceLanguage', 'targetLanguages']
              : []
    const relevant = Object.fromEntries(Object.entries(all).filter(([key]) => fields.includes(key)))
    setErrors(relevant)
    if (Object.keys(relevant).length) {
      setMessage('Check the highlighted fields before continuing.')
      return
    }
    go(step + 1)
  }
  const input = (
    key: 'sourceLanguage' | 'targetLanguages' | 'deadline' | 'name' | 'email' | 'company',
    label: string,
    type = 'text',
    required = false,
  ) => (
    <div className="et-field">
      <label htmlFor={key}>
        {label}
        {required ? ' *' : ''}
      </label>
      <input
        id={key}
        type={type}
        value={data[key]}
        onChange={(event) => update(key, event.target.value)}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
        maxLength={key === 'email' ? 254 : 200}
        autoComplete={
          key === 'name'
            ? 'name'
            : key === 'email'
              ? 'email'
              : key === 'company'
                ? 'organization'
                : 'off'
        }
      />
      {errors[key] && (
        <p id={`${key}-error`} className="et-field-error">
          {errors[key]}
        </p>
      )}
    </div>
  )
  const submit = async () => {
    const issues = validateQuote(data)
    setErrors(issues)
    if (Object.keys(issues).length) {
      setMessage('Complete the required information and consent.')
      return
    }
    setPending(true)
    setMessage('')
    const form = new FormData()
    Object.entries(data).forEach(([key, value]) => form.set(key, String(value)))
    files.forEach((file) => form.append('files', file))
    try {
      const response = await fetch('/api/quote', { method: 'POST', body: form })
      const result = await response.json()
      if (!response.ok) {
        setErrors(result.errors || {})
        setMessage(result.error || 'Your request could not be saved.')
        return
      }
      setReference(result.reference)
    } catch {
      setMessage('We could not reach the server. Your information is still here; please try again.')
    } finally {
      setPending(false)
    }
  }
  if (reference)
    return (
      <section className="et-quote-success" aria-live="polite">
        <Check size={40} />
        <p className="et-label" data-private>
          REQUEST SAVED / {reference}
        </p>
        <h2>
          Your next chapter
          <br />
          starts here.
        </h2>
        <p data-private>
          Your project request has been saved for EPUBTRANS to review. Keep reference {reference}{' '}
          when contacting the team.
        </p>
        <Link className="et-text-link" href="/services">
          Continue exploring →
        </Link>
      </section>
    )
  return (
    <div className="et-quote-layout">
      <aside>
        <p className="et-label">YOUR PROJECT / {String(step + 1).padStart(2, '0')} OF 07</p>
        <ol className="et-quote-progress">
          {steps.map((item, index) => (
            <li key={item} aria-current={index === step ? 'step' : undefined}>
              <span>{index < step ? <Check size={12} /> : String(index + 1).padStart(2, '0')}</span>
              {index < step ? <button onClick={() => go(index)}>{item}</button> : item}
            </li>
          ))}
        </ol>
        <p>
          Prefer a conversation?
          <br />
          <a href="mailto:info@epubtrans.com">info@epubtrans.com</a>
        </p>
      </aside>
      <form
        className="et-quote-panel"
        onSubmit={(event) => {
          event.preventDefault()
          if (step < 6) advance()
          else void submit()
        }}
        noValidate
      >
        <p className="et-label">{steps[step]}</p>
        <h2 ref={heading} tabIndex={-1}>
          {
            [
              'What do you have in mind?',
              'Which languages?',
              'Tell us about your project.',
              'Share your source files.',
              'How can we reach you?',
              'One last look.',
              'Ready for the next chapter?',
            ][step]
          }
        </h2>
        {step === 0 && (
          <fieldset>
            <legend className="sr-only">Choose a service</legend>
            <div className="et-service-options">
              {quoteServices.map((service) => (
                <label key={service}>
                  <input
                    type="radio"
                    name="service"
                    value={service}
                    checked={data.service === service}
                    onChange={() => update('service', service)}
                  />
                  <span>{service}</span>
                  <ArrowRight size={18} />
                </label>
              ))}
            </div>
            {errors.service && <p className="et-field-error">{errors.service}</p>}
          </fieldset>
        )}
        {step === 1 && (
          <>
            <p className="et-form-help">
              Optional. Leave these blank if your project doesn’t involve translation.
            </p>
            {input('sourceLanguage', 'Source language')}
            {input('targetLanguages', 'Target languages')}
          </>
        )}
        {step === 2 && (
          <>
            <div className="et-field">
              <label htmlFor="details">Project requirements *</label>
              <textarea
                id="details"
                rows={6}
                value={data.details}
                maxLength={5000}
                onChange={(event) => update('details', event.target.value)}
                aria-invalid={!!errors.details}
                aria-describedby="details-help"
              />
              <p id="details-help" className={errors.details ? 'et-field-error' : 'et-form-help'}>
                {errors.details ||
                  'Include your formats, approximate volume, audience and review requirements.'}
              </p>
            </div>
            {input('deadline', 'Preferred delivery date (optional)', 'date')}
          </>
        )}
        {step === 3 && (
          <>
            <p className="et-form-help">
              Optional. PDF, TXT or DOCX. Up to 3 files, 10 MB each, 20 MB total.
            </p>
            <div className="et-file-input">
              <label htmlFor="files">Choose project files</label>
              <input
                type="file"
                id="files"
                multiple
                accept=".pdf,.txt,.docx"
                onChange={(event) => {
                  const next = Array.from(event.target.files || [])
                  if (
                    next.length > 3 ||
                    next.some((file) => file.size > MAX_FILE_BYTES) ||
                    next.reduce((sum, file) => sum + file.size, 0) > MAX_TOTAL_BYTES
                  ) {
                    setMessage('Choose up to 3 files, 10 MB each and 20 MB total.')
                    event.target.value = ''
                    return
                  }
                  setFiles(next)
                  setMessage('')
                }}
              />
            </div>
            <ul className="et-file-list">
              {files.map((file, index) => (
                <li key={`${file.name}-${index}`}>
                  <span data-private>
                    {file.name} · {(file.size / 1024).toFixed(0)} KB
                  </span>
                  <button
                    type="button"
                    onClick={() => setFiles((current) => current.filter((_, i) => i !== index))}
                    data-private
                    aria-label={`Remove ${file.name}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
        {step === 4 && (
          <>
            {input('name', 'Full name', 'text', true)}
            {input('email', 'Email address', 'email', true)}
            {input('company', 'Company (optional)')}
          </>
        )}
        {step === 5 && (
          <dl className="et-review">
            {[
              ['Service', data.service],
              [
                'Languages',
                [data.sourceLanguage, data.targetLanguages].filter(Boolean).join(' → ') ||
                  'Not specified',
              ],
              ['Project', data.details],
              ['Preferred date', data.deadline || 'Not specified'],
              ['Files', files.map((file) => file.name).join(', ') || 'No files'],
              ['Contact', `${data.name} · ${data.email}`],
              ['Company', data.company || 'Not specified'],
            ].map(([title, value]) => (
              <div key={title}>
                <dt>{title}</dt>
                <dd data-private>{value}</dd>
              </div>
            ))}
          </dl>
        )}
        {step === 6 && (
          <>
            <p className="et-form-help">
              Your request will be saved for review. Scope, pricing and delivery dates are agreed
              separately.
            </p>
            <label className="et-consent">
              <input
                type="checkbox"
                checked={data.consent}
                onChange={(event) => update('consent', event.target.checked)}
              />
              <span>
                I agree that EPUBTRANS can use the details and files I submit to review and respond
                to my project request. <Link href="/privacy-policy">Privacy information</Link>
              </span>
            </label>
            {errors.consent && <p className="et-field-error">{errors.consent}</p>}
          </>
        )}
        <div className="et-honeypot" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            tabIndex={-1}
            autoComplete="off"
            value={data.website}
            onChange={(event) => update('website', event.target.value)}
          />
        </div>
        <p className="et-form-message" role="alert">
          {message}
        </p>
        <div className="et-form-actions">
          {step > 0 && (
            <button type="button" onClick={() => go(step - 1)} disabled={pending}>
              <ArrowLeft size={17} /> Back
            </button>
          )}
          <button type="submit" className="et-button" disabled={pending}>
            {pending ? 'Saving request…' : step === 6 ? 'Submit request' : 'Continue'}
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  )
}
