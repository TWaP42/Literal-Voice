import { CapacitorConfig } from "@capacitor/cli";

const isDev = process.env.NODE_ENV !== "production";

const config: CapacitorConfig = {
  appId: "com.literalvoice.app",
  appName: "LiteralVoice",
  webDir: "dist/public",
  plugins: {
    SplashScreen: {
      launchShowDuration: 0, // We handle our own splash screen in HTML
    },
    StatusBar: {
      backgroundColor: "#0ea5e9",
      style: "LIGHT",
      overlaysWebView: false,
    },
    Keyboard: {
      resize: "body",
      resizeOnFullScreen: true,
    },
  },
  ios: {
    allowsLinkPreview: false,
    scrollEnabled: true,
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: isDev,
  },
  // Always point the native app at the Railway backend.
  // The server is deployed there — no local server needed.
  server: {
    url: "https://vivacious-fascination-production-f568.up.railway.app",
    cleartext: false,
  },
};

export default config;
