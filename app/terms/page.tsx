import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Vantage',
  description: 'Vantage Terms of Service - Our terms and conditions for using the platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl mb-8">
          Terms of Service
        </h1>
        <p className="text-gray-700">
          Terms of service content goes here. This is a placeholder page.
        </p>
      </main>
    </div>
  );
}
