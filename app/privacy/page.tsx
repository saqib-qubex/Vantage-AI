import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vantage',
  description: 'Vantage Privacy Policy - Learn how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl mb-8">
          Privacy Policy
        </h1>
        <p className="text-gray-700">
          Privacy policy content goes here. This is a placeholder page.
        </p>
      </main>
    </div>
  );
}
