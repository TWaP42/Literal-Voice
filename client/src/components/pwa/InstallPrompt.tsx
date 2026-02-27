import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, X, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isIOSSafari(): boolean {
  const ua = navigator.userAgent;
  return /iP(hone|od|ad)/.test(ua) && /WebKit/.test(ua) && !/(CriOS|FxiOS|OPiOS|mercury)/.test(ua);
}

function isStandalone(): boolean {
  return window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as any).standalone === true;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showAndroid, setShowAndroid] = useState(false);
  const [showIOS, setShowIOS] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;

    const dismissed = sessionStorage.getItem("pwa-install-dismissed");
    if (dismissed) return;

    if (isIOSSafari()) {
      const iosDismissed = localStorage.getItem("pwa-ios-install-dismissed");
      if (!iosDismissed) {
        setShowIOS(true);
      }
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowAndroid(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowAndroid(false);
  };

  const handleDismiss = () => {
    setShowAndroid(false);
    setShowIOS(false);
    sessionStorage.setItem("pwa-install-dismissed", "true");
  };

  const handleDismissIOSPermanent = () => {
    setShowIOS(false);
    localStorage.setItem("pwa-ios-install-dismissed", "true");
  };

  if (showIOS) {
    return (
      <div
        className="fixed bottom-20 md:bottom-4 left-4 right-4 z-40 mx-auto max-w-md animate-in slide-in-from-bottom-4 duration-300"
        data-testid="install-prompt-ios"
      >
        <div className="p-4 bg-white rounded-2xl shadow-lg border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-xl shrink-0">
              <Share className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-sm text-foreground">Install LiteralVoice</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Tap the <span className="inline-flex items-center"><Share className="w-3 h-3 mx-0.5 inline" /></span> Share button in Safari, then tap <strong>"Add to Home Screen"</strong> to install.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismissIOSPermanent}
              className="h-8 w-8 p-0 shrink-0"
              data-testid="button-dismiss-ios-install"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!showAndroid) return null;

  return (
    <div
      className="fixed bottom-20 md:bottom-4 left-4 right-4 z-40 mx-auto max-w-md animate-in slide-in-from-bottom-4 duration-300"
      data-testid="install-prompt"
    >
      <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-lg border border-primary/20">
        <div className="p-2 bg-primary/10 rounded-xl shrink-0">
          <Download className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-sm text-foreground">Install LiteralVoice</p>
          <p className="text-xs text-muted-foreground">Add to your home screen for quick access</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button
            size="sm"
            onClick={handleInstall}
            className="h-8 px-3 text-xs"
            data-testid="button-install"
          >
            Install
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-8 w-8 p-0"
            data-testid="button-dismiss-install"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
