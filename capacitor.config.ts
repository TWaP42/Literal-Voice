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
  // DEV: native app loads from local Express server (localhost:3000)
  // PROD: static bundle is used; API calls go to VITE_API_BASE_URL (set at build time)
  ...(isDev && {
    server: {
      url: "http://localhost:3000",
      cleartext: true,
    },
  }),
};

export default config;
