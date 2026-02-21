import { Link } from "wouter";
import { MessageSquareText } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <MessageSquareText className="h-6 w-6 text-primary" />
            </div>
            <span className="font-display font-bold text-xl text-foreground tracking-tight">
              Literal<span className="text-primary">Voice</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Translate
            </Link>
            <Link href="/history" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              History
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
