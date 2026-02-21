import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="flex justify-center">
          <div className="p-4 bg-orange-100 rounded-full">
            <AlertTriangle className="h-12 w-12 text-orange-600" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-foreground">Page Not Found</h1>
          <p className="text-muted-foreground text-lg">
            We couldn't find the page you were looking for. It might have been moved or deleted.
          </p>
        </div>

        <Link href="/">
          <Button size="lg" className="w-full sm:w-auto">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
