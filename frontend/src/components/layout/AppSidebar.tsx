import Link from 'next/link';
import { Share2 } from 'lucide-react';

export function AppSidebar() {
  return (
    <div className="hidden border-r bg-slate-100/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 transition-all hover:text-slate-900"
            >
              <Share2 />
              Data Mapping
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
} 