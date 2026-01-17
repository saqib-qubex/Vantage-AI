import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SMS Consent & Messaging Disclosures | Vantage',
  description: 'Information about SMS messaging consent, opt-out instructions, and disclosure requirements for Vantage users.',
  openGraph: {
    title: 'SMS Consent & Messaging Disclosures | Vantage',
    description: 'Information about SMS messaging consent, opt-out instructions, and disclosure requirements for Vantage users.',
    type: 'website',
  },
};

export default function SMSConsentPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="prose prose-neutral max-w-none">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            SMS Consent & Messaging Disclosures
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Last updated: {lastUpdated}
          </p>

          <div className="not-prose my-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
            <h2 className="text-base font-semibold text-blue-900 mb-3">
              Key Information
            </h2>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Message and data rates may apply</li>
              <li>• Message frequency varies by practice and patient interactions</li>
              <li>• Reply <strong>STOP</strong> to unsubscribe at any time</li>
              <li>• Reply <strong>HELP</strong> for assistance</li>
            </ul>
          </div>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              About Vantage Messaging
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Vantage (getvantage.tech) is a multi-tenant CRM and messaging platform used by clinical practices, including medical and dental offices. Healthcare providers use Vantage to send SMS text messages to patients for appointment reminders, scheduling updates, care-related notifications, and other practice communications.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              How Consent is Obtained
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By opting in to receive SMS messages from your healthcare provider, you consent to receive text messages sent through the Vantage platform. Opt-in may occur through various channels, including:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
              <li>Your healthcare provider's website</li>
              <li>Patient intake forms (digital or paper)</li>
              <li>In-office workflows during appointment check-in</li>
              <li>Phone-based enrollment with practice staff</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Your consent is recorded and maintained by your healthcare provider. You may withdraw your consent at any time by following the opt-out instructions below.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Message Frequency
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Message frequency varies depending on your healthcare provider's communication practices and your individual patient interactions. You may receive messages for appointment confirmations, reminders, rescheduling notifications, follow-up care instructions, and other practice-related communications.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Message & Data Rates
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Message and data rates may apply based on your mobile carrier's plan. Standard SMS charges from your wireless provider may apply. Please contact your mobile carrier for details about your messaging plan.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              How to Opt Out
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You may opt out of SMS messages at any time by replying <strong>STOP</strong> to any message you receive. Once you send the STOP command, you will receive one final confirmation message, and then no further messages will be sent to your mobile number unless you re-enroll.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Your opt-out request will be honored immediately, and your preference will be recorded in the system.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Getting Help
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you need assistance or have questions about the SMS messages you're receiving, reply <strong>HELP</strong> to any message, or contact your healthcare provider directly using the contact information they've provided to you.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Emergency Disclaimer
            </h2>
            <div className="not-prose rounded-lg border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm text-amber-900 font-medium">
                <strong>Important:</strong> SMS messaging is not intended for emergency communications. If you are experiencing a medical emergency, call 911 or your local emergency number immediately. Do not use SMS to request emergency assistance.
              </p>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Privacy & Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We take your privacy seriously. Information about how we collect, use, and protect your personal information, including your mobile phone number, is detailed in our{' '}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              By consenting to receive SMS messages, you acknowledge that you have read and agree to our{' '}
              <Link
                href="/terms"
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                Terms of Service
              </Link>
              .
            </p>
          </section>

          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Questions?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this SMS consent disclosure or Vantage's messaging practices, please contact your healthcare provider directly or reach out to Vantage support through your provider.
            </p>
          </section>
        </article>
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Vantage. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
