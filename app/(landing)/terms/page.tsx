import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | FeedLoop',
  description: 'Terms and conditions for using FeedLoop survey platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">Terms and Conditions</h1>
        <p className="text-muted-foreground text-center mb-12">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to FeedLoop ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our survey and feedback collection platform (the "Service"). By accessing or using FeedLoop, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
            <p>
              To use certain features of FeedLoop, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when creating your account and to update it promptly if it changes.
            </p>
            <p>
              You must be at least 18 years old to create an account and use our Service. By creating an account, you represent that you are at least 18 years old.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Use of Service</h2>
            <p> 
              FeedLoop allows you to create surveys, collect responses, and analyze feedback. You agree to use the Service only for lawful purposes and in accordance with these Terms. You may not:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use the Service to collect personally identifiable information without proper consent</li>
              <li>Create surveys that violate any applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
              <li>Use the Service to distribute spam, malware, or other harmful content</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
            </ul>
          </section>

 <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of FeedLoop and its licensors. The Service is protected by copyright, trademark, and other laws. You may not reproduce, distribute, modify, or create derivative works of our Service without our prior written consent.
            </p>
            <p>
              By submitting content to FeedLoop (such as survey questions or responses), you grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute such content in connection with providing the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Privacy</h2>
            <p>
              Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms by reference, explains how we collect, use, and protect your information. By using FeedLoop, you consent to our collection and use of information as outlined in our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Security and Retention</h2>
            <p>
              We implement reasonable security measures to protect your data. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
            </p>
            <p>
              You are responsible for maintaining backups of your survey data. We may retain your data for as long as necessary to provide the Service and comply with legal obligations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will cease immediately. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimers</h2>
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, as to the operation of the Service or the information, content, or materials included therein.
            </p>
            <p>
              We do not warrant that the Service will be uninterrupted or error-free, and we will not be liable for any interruptions or errors.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p>
              In no event shall FeedLoop, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
            </p>
            <p>
              Our total liability for any claim arising out of or relating to these Terms or the Service shall not exceed the amount paid by you for the Service in the 12 months preceding the claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless FeedLoop and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Your use and access of the Service</li>
              <li>Your violation of any term of these Terms</li>
              <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
            <p>
              These Terms shall be interpreted and governed by the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of any changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              Email: [Your Contact Email]<br />
              Address: [Your Business Address]
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}