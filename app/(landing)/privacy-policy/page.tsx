import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// PRIVACY POLICY PAGE — Next.js App Router (app/privacy-policy/page.tsx)
// ---------------------------------------------------------------------------
// 1. Fill in every [bracketed] placeholder below with your real details.
// 2. This is a strong starting template, not legal advice. Have a lawyer
//    review it before shipping to production, especially if you serve
//    users in the EU (GDPR), California (CCPA/CPRA), or process payments.
// 3. Update "Last updated" whenever you materially change this policy.
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Privacy Policy | FeedLoop",
  description:
    "Learn how FeedLoop collects, uses, and protects your personal data.",
};

const LAST_UPDATED = "July 6, 2026"; // update this whenever the policy changes
const COMPANY_NAME = "FeedLoop";
const PRODUCT_NAME = "FeedLoop";
const CONTACT_EMAIL = "privacy@feedloop.ai";
const COMPANY_ADDRESS = "123 Main Street, Anytown, USA 12345";
const GOVERNING_LAW = "Delaware, USA";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        {/* Header */}
        <header className="mb-12 border-b border-neutral-200 pb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-neutral-500">
            Last updated: {LAST_UPDATED}
          </p>
          <p className="mt-4 text-neutral-600 leading-relaxed">
            This Privacy Policy explains how {COMPANY_NAME} (&quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;) collects, uses, discloses, and
            safeguards your information when you use {PRODUCT_NAME} (the
            &quot;Service&quot;). By accessing or using the Service, you agree
            to the terms of this Privacy Policy.
          </p>
        </header>

        {/* Table of contents */}
        <nav className="mb-12 rounded-lg border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Contents
          </h2>
          <ol className="space-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="space-y-12">
          <Section id="information-we-collect" title="1. Information We Collect">
            <p>We collect information in the following ways:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Information you provide directly:</strong> name,
                email address, billing details, company name, and any content
                you upload, submit, or create using the Service.
              </li>
              <li>
                <strong>Account and authentication data:</strong>{" "}
                credentials, login timestamps, and session data — including
                data from third-party sign-in providers (e.g. Google,
                GitHub) if you use them.
              </li>
              <li>
                <strong>Usage data:</strong> pages visited, features used,
                clicks, and interactions within the Service, collected
                automatically via cookies and similar technologies.
              </li>
              <li>
                <strong>Device and log data:</strong> IP address, browser
                type, operating system, device identifiers, and referring
                URLs.
              </li>
              <li>
                <strong>Payment information:</strong> processed by our
                third-party payment processor ([e.g. Stripe, Paddle, Lemon
                Squeezy]). We do not store full payment card numbers on our
                own servers.
              </li>
            </ul>
          </Section>

          <Section id="how-we-use-information" title="2. How We Use Your Information">
            <p>We use collected information to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Provide, operate, and maintain the Service</li>
              <li>Process transactions and send billing-related communications</li>
              <li>Authenticate users and secure accounts</li>
              <li>Respond to support requests and communicate service updates</li>
              <li>Monitor usage to improve performance, features, and UX</li>
              <li>Detect, prevent, and address fraud, abuse, or security issues</li>
              <li>Comply with legal obligations</li>
              <li>
                Send marketing communications, where permitted, with an
                option to opt out at any time
              </li>
            </ul>
          </Section>

          <Section id="legal-basis" title="3. Legal Basis for Processing (EEA/UK Users)">
            <p>
              If you are located in the European Economic Area or United
              Kingdom, we process your personal data under one or more of the
              following legal bases: performance of a contract with you,
              compliance with a legal obligation, our legitimate interests
              (e.g. improving the Service, preventing fraud), and, where
              required, your consent.
            </p>
          </Section>

          <Section id="cookies" title="4. Cookies & Tracking Technologies">
            <p>
              We use cookies, local storage, and similar technologies to keep
              you signed in, remember preferences, and analyze usage. Types
              of cookies we may use:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Strictly necessary:</strong> required for core
                functionality (authentication, security)
              </li>
              <li>
                <strong>Performance/analytics:</strong> e.g. Google
                Analytics, Vercel Analytics, PostHog — help us understand
                usage patterns
              </li>
              <li>
                <strong>Preference:</strong> remember settings like theme or
                language
              </li>
            </ul>
            <p>
              You can control cookies through your browser settings. Blocking
              some cookies may affect Service functionality.
            </p>
          </Section>

          <Section id="sharing" title="5. How We Share Your Information">
            <p>We do not sell your personal data. We may share information with:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Service providers/subprocessors:</strong> hosting
                (e.g. Vercel), database (e.g. Supabase), payment processing,
                email delivery, and analytics providers who process data on
                our behalf under contractual confidentiality obligations
              </li>
              <li>
                <strong>Legal compliance:</strong> when required by law,
                subpoena, or to protect the rights, safety, or property of
                {" "}{COMPANY_NAME}, our users, or the public
              </li>
              <li>
                <strong>Business transfers:</strong> in connection with a
                merger, acquisition, or sale of assets, subject to
                confidentiality commitments
              </li>
              <li>
                <strong>With your consent:</strong> when you explicitly
                authorize sharing (e.g. integrations you connect)
              </li>
            </ul>
          </Section>

          <Section id="data-retention" title="6. Data Retention">
            <p>
              We retain personal data for as long as your account is active
              or as needed to provide the Service, comply with legal
              obligations, resolve disputes, and enforce our agreements. When
              no longer needed, data is deleted or anonymized.
            </p>
          </Section>

          <Section id="data-security" title="7. Data Security">
            <p>
              We implement industry-standard technical and organizational
              measures — including encryption in transit (TLS), access
              controls, and secure hosting infrastructure — to protect your
              data. However, no method of transmission or storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </Section>

          <Section id="your-rights" title="8. Your Privacy Rights">
            <p>
              Depending on your location, you may have the right to: access
              the personal data we hold about you; request correction or
              deletion; object to or restrict certain processing; request
              data portability; and withdraw consent at any time (where
              processing is based on consent).
            </p>
            <p>
              <strong>EEA/UK users (GDPR):</strong> you may lodge a complaint
              with your local data protection authority.
            </p>
            <p>
              <strong>California users (CCPA/CPRA):</strong> you have the
              right to know what personal information is collected, request
              deletion, opt out of the sale/sharing of personal information
              (we do not sell data), and not be discriminated against for
              exercising these rights.
            </p>
            <p>
              To exercise any of these rights, contact us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-blue-600 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section id="international-transfers" title="9. International Data Transfers">
            <p>
              Your information may be transferred to, stored, and processed
              in countries other than your own, including the United States.
              Where required, we rely on appropriate safeguards such as
              Standard Contractual Clauses to protect data transferred
              internationally.
            </p>
          </Section>

          <Section id="childrens-privacy" title="10. Children's Privacy">
            <p>
              The Service is not directed to individuals under the age of 16.
              We do not knowingly collect personal data from children. If you
              believe a child has provided us with personal data, please
              contact us so we can delete it.
            </p>
          </Section>

          <Section id="third-party-links" title="11. Third-Party Links & Services">
            <p>
              The Service may contain links to third-party websites or
              integrate with third-party services. We are not responsible for
              the privacy practices of those third parties. We encourage you
              to review their privacy policies independently.
            </p>
          </Section>

          <Section id="changes" title="12. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Material
              changes will be communicated via email or a notice within the
              Service. Continued use of the Service after changes take effect
              constitutes acceptance of the revised policy.
            </p>
          </Section>

          <Section id="contact" title="13. Contact Us">
            <p>
              If you have questions about this Privacy Policy or wish to
              exercise your privacy rights, contact us at:
            </p>
            <p className="mt-2">
              {COMPANY_NAME}
              <br />
              {COMPANY_ADDRESS}
              <br />
              Email:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-blue-600 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="mt-4 text-sm text-neutral-500">
              This Privacy Policy is governed by the laws of {GOVERNING_LAW},
              without regard to its conflict of law provisions.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Helper components/data
// ---------------------------------------------------------------------------

const sections = [
  { id: "information-we-collect", title: "1. Information We Collect" },
  { id: "how-we-use-information", title: "2. How We Use Your Information" },
  { id: "legal-basis", title: "3. Legal Basis for Processing" },
  { id: "cookies", title: "4. Cookies & Tracking Technologies" },
  { id: "sharing", title: "5. How We Share Your Information" },
  { id: "data-retention", title: "6. Data Retention" },
  { id: "data-security", title: "7. Data Security" },
  { id: "your-rights", title: "8. Your Privacy Rights" },
  { id: "international-transfers", title: "9. International Data Transfers" },
  { id: "childrens-privacy", title: "10. Children's Privacy" },
  { id: "third-party-links", title: "11. Third-Party Links & Services" },
  { id: "changes", title: "12. Changes to This Policy" },
  { id: "contact", title: "13. Contact Us" },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-4 text-xl font-semibold tracking-tight">{title}</h2>
      <div className="space-y-3 leading-relaxed text-neutral-700">
        {children}
      </div>
    </section>
  );
}