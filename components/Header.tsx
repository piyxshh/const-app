import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-b from-green-300 to-blue-400 text-transparent bg-clip-text">
            Samvidhan Sahayak
          </Link>
          <nav>
            {/* Future navigation links can go here */}
          </nav>
        </div>
      </div>
    </header>
  );
}