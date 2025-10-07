'use client';

import Header from "@../../../components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <aside className="w-64 bg-slate-800 p-4 border-r border-slate-700">
          <nav className="flex flex-col space-y-2">
            <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Modules</h3>
            <Button 
              variant={pathname === '/dashboard' ? 'secondary' : 'ghost'} 
              className="w-full justify-start" 
              asChild
            >
              <Link href="/dashboard">Constitution Coach</Link>
            </Button>
            <Button 
              variant={pathname === '/dashboard/modules' ? 'secondary' : 'ghost'} 
              className="w-full justify-start" 
              asChild
            >
              <Link href="/dashboard/modules">Learning Modules</Link>
            </Button>
            <Button 
              variant={pathname === '/dashboard/quiz' ? 'secondary' : 'ghost'} 
              className="w-full justify-start" 
              asChild
            >
              <Link href="/dashboard/quiz">Interactive Quiz</Link>
            </Button>
          </nav>
        </aside>
        <main className="flex-1 p-8 bg-slate-900/50">
          {children}
        </main>
      </div>
    </div>
  );
}