import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { navigation } from '@/config/navigation'
import { Logo } from './Logo'
import { getSiteSettings } from '@/lib/content'
export async function Footer() {
  const settings = await getSiteSettings()
  const email = settings.email || 'info@epubtrans.com'
  const phone = settings.phone || '+91 44 3136 3907'
  const location = settings.location || 'Chennai, India'
  return (
    <footer className="et-footer">
      <div className="et-container">
        <div className="et-footer-cta">
          <div>
            <p className="et-label">LET’S MAKE YOUR NEXT CHAPTER</p>
            <h2>
              Where will your
              <br />
              content take you?
            </h2>
          </div>
          <Link className="et-button et-button-light" href="/get-a-quote">
            Get a Quote <ArrowRight className="et-arrow" size={22} />
          </Link>
        </div>
        <div className="et-footer-grid">
          <div>
            <Logo />
            <p>
              Publishing, language, and digital content.
              <br />
              Connected through EPUBTRANS.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => (
              <Link key={item.label} href={item.href!}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div>
            <p className="et-label">GET IN TOUCH</p>
            <a href={`mailto:${email}`}>{email}</a>
            <a href={`tel:${phone.replace(/[^+0-9]/g, '')}`}>{phone}</a>
            <span>{location}</span>
          </div>
          <div>
            <p className="et-label">EXPLORE</p>
            <Link href="/work">Our work</Link>
            <Link href="/company">About EPUBTRANS</Link>
            <Link href="/company/careers">Careers</Link>
            <span>English · EN</span>
          </div>
        </div>
        <div className="et-footer-base">
          <span>© {new Date().getFullYear()} EPUBTRANS</span>
          <nav aria-label="Legal navigation">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/accessibility">Accessibility</Link>
          </nav>
          <span>Content. In every dimension.</span>
        </div>
      </div>
    </footer>
  )
}
