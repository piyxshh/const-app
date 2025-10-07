// app/page.tsx
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-grid-slate-700/[0.2]">
      <div className="max-w-3xl">
        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-b from-green-300 to-blue-400 text-transparent bg-clip-text mb-6">
          Samvidhan Sahayak : Your Constitution Coach
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Understand your rights and the laws of India in a simple, interactive way. Test your knowledge, and ask questions.
        </p>
        
        <Link 
          href="/dashboard"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-blue-600 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          Get Started
          <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </Link>
      </div>
    </main>
  );
}