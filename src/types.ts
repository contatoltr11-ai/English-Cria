export interface ShieldSecurityConfig {
  blockRightClick: boolean;
  blockShortcuts: boolean; // F12, Ctrl+U, Ctrl+Shift+I, Ctrl+S
  antiDevToolsDebugger: boolean;
  blockTextSelection: boolean;
  blockImageDrag: boolean;
  obfuscateDom: boolean;
  frameBusting: boolean; // Prevent being embedded in unauthorized iframes
  customWatermark: string;
  allowedDomains: string;
}

export interface ProtectedPageData {
  title: string;
  htmlContent: string;
  config: ShieldSecurityConfig;
  lastUpdated: string;
}
