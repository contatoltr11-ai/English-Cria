/**
 * Shield Engine - Proteções Ativas contra Clonadores e Inspecionar
 */

export interface ShieldOptions {
  blockRightClick: boolean;
  blockShortcuts: boolean;
  antiDevTools: boolean;
  blockSelection: boolean;
  blockImageDrag: boolean;
}

export const DEFAULT_SHIELD_CONFIG: ShieldOptions = {
  blockRightClick: true,
  blockShortcuts: true,
  antiDevTools: true,
  blockSelection: true,
  blockImageDrag: true,
};

export class ShieldEngine {
  private config: ShieldOptions;
  private onViolationCallback?: (type: string, detail: string) => void;
  private devToolsCheckInterval?: number;

  constructor(
    config: Partial<ShieldOptions> = {},
    onViolation?: (type: string, detail: string) => void
  ) {
    this.config = { ...DEFAULT_SHIELD_CONFIG, ...config };
    this.onViolationCallback = onViolation;
  }

  public updateConfig(newConfig: Partial<ShieldOptions>) {
    this.config = { ...this.config, ...newConfig };
  }

  public init() {
    this.setupContextMenu();
    this.setupKeyboardShortcuts();
    this.setupAntiDevTools();
    this.setupDragAndSelection();
    this.printConsoleWarning();
  }

  public destroy() {
    if (this.devToolsCheckInterval) {
      clearInterval(this.devToolsCheckInterval);
    }
  }

  private triggerViolation(type: string, detail: string) {
    if (this.onViolationCallback) {
      this.onViolationCallback(type, detail);
    }
  }

  private setupContextMenu() {
    window.addEventListener('contextmenu', (e) => {
      if (this.config.blockRightClick) {
        e.preventDefault();
        e.stopPropagation();
        this.triggerViolation(
          'right-click',
          'O clique com botão direito foi bloqueado para proteger os elementos e o código.'
        );
        return false;
      }
    }, true);
  }

  private setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (!this.config.blockShortcuts) return;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      // F12 (DevTools)
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        this.triggerViolation('shortcut', 'A tecla F12 (Inspecionar) está bloqueada neste App.');
        return false;
      }

      // Ctrl+Shift+I / Cmd+Option+I (Inspecionar)
      if (ctrlOrCmd && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
        e.preventDefault();
        e.stopPropagation();
        this.triggerViolation('shortcut', 'O atalho Inspecionar Elemento (Ctrl+Shift+I) está bloqueado.');
        return false;
      }

      // Ctrl+Shift+J / Cmd+Option+J (Console)
      if (ctrlOrCmd && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
        e.preventDefault();
        e.stopPropagation();
        this.triggerViolation('shortcut', 'O console do desenvolvedor está bloqueado.');
        return false;
      }

      // Ctrl+Shift+C / Cmd+Option+C (Inspecionar elemento direto)
      if (ctrlOrCmd && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
        e.preventDefault();
        e.stopPropagation();
        this.triggerViolation('shortcut', 'O seletor de elementos está bloqueado.');
        return false;
      }

      // Ctrl+U / Cmd+Option+U (Exibir Código Fonte)
      if (ctrlOrCmd && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) {
        e.preventDefault();
        e.stopPropagation();
        this.triggerViolation('shortcut', 'A visualização do código-fonte (Ctrl+U) foi neutralizada.');
        return false;
      }

      // Ctrl+S / Cmd+S (Salvar Página Completa)
      if (ctrlOrCmd && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
        e.preventDefault();
        e.stopPropagation();
        this.triggerViolation('shortcut', 'O salvamento de página offline (Ctrl+S) foi bloqueado.');
        return false;
      }

      // Ctrl+A (Selecionar Tudo) se blockSelection estiver ativo
      if (this.config.blockSelection && ctrlOrCmd && (e.key === 'a' || e.key === 'A' || e.keyCode === 65)) {
        const target = e.target as HTMLElement;
        if (target && target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          e.stopPropagation();
          this.triggerViolation('selection', 'A seleção total de texto foi desativada contra raspagem.');
          return false;
        }
      }
    }, true);
  }

  private setupDragAndSelection() {
    window.addEventListener('dragstart', (e) => {
      if (this.config.blockImageDrag) {
        const target = e.target as HTMLElement;
        if (target && (target.tagName === 'IMG' || target.closest('img') || target.tagName === 'A')) {
          e.preventDefault();
          this.triggerViolation('drag', 'O download por arrasto de imagens foi bloqueado.');
          return false;
        }
      }
    }, true);
  }

  private setupAntiDevTools() {
    if (!this.config.antiDevTools) return;

    // Detect open devtools via window dimension delta
    const threshold = 160;
    const checkDevTools = () => {
      if (!this.config.antiDevTools) return;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        this.triggerViolation(
          'devtools',
          'Painel de ferramentas do desenvolvedor detectado aberto.'
        );
      }
    };

    window.addEventListener('resize', checkDevTools);
    this.devToolsCheckInterval = window.setInterval(checkDevTools, 4000);
  }

  private printConsoleWarning() {
    try {
      console.clear();
      console.log(
        '%c🛡️ SHIELD ATIVO - CÓDIGO E CONTEÚDO PROTEGIDOS',
        'color: #d81b60; font-size: 20px; font-weight: 900; background: #fff0f6; padding: 10px 16px; border-radius: 8px; border: 2px solid #d81b60;'
      );
      console.log(
        '%cEsta página está sendo executada sob o motor protegido AppShield. Qualquer tentativa de inspeção, cópia de recursos, scripts ou clonagem de estrutura é bloqueada e monitorada.',
        'color: #475569; font-size: 13px; line-height: 1.5;'
      );
    } catch {
      // Ignore
    }
  }
}
