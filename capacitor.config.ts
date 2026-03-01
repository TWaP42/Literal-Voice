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
  // DEV ONLY: Remove this block when deploying to the App Store / Play Store.
  // For local development, the native app loads directly from your running Express server.
  // iOS simulator uses 'localhost', Android emulator uses '10.0.2.2'.
  ...(isDev && {
    server: {
      url: "http://localhost:3000",
      cleartext: true,
    },
  }),
};

export default config;
