import { Link, useLocation } from "wouter";
import { MessageSquareText, Home, Clock } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();

  return (
    <>
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 safe-top" data-testid="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16 items-center">
            <Link href="/" className="flex items-center gap-2 group" data-testid="link-home-logo">
              <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <MessageSquareText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <span className="font-display font-bold text-lg sm:text-xl text-foreground tracking-tight">
                Literal<span className="text-primary">Voice</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors" data-testid="link-translate-desktop">
                Translate
              </Link>
              <Link href="/history" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors" data-testid="link-history-desktop">
                History
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t safe-bottom" data-testid="mobile-tab-bar">
        <div className="flex items-center justify-around h-16">
          <Link href="/" data-testid="link-translate-mobile">
            <div className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              <Home className="h-5 w-5" />
              <span className="text-xs font-medium">Translate</span>
            </div>
          </Link>
          <Link href="/history" data-testid="link-history-mobile">
            <div className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors ${location === '/history' ? 'text-primary' : 'text-muted-foreground'}`}>
              <Clock className="h-5 w-5" />
              <span className="text-xs font-medium">History</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
