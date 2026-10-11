// Minimal Web Speech recognition typings (Chrome exposes it as webkitSpeechRecognition).
export {};

declare global {
  interface GwSpeechAlternative {
    transcript: string;
    confidence: number;
  }
  interface GwSpeechResult {
    readonly isFinal: boolean;
    readonly length: number;
    [index: number]: GwSpeechAlternative;
  }
  interface GwSpeechResultList {
    readonly length: number;
    [index: number]: GwSpeechResult;
  }
  interface GwSpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: GwSpeechResultList;
  }
  interface GwSpeechRecognitionErrorEvent extends Event {
    readonly error: string;
  }
  interface GwSpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    onresult: ((ev: GwSpeechRecognitionEvent) => void) | null;
    onerror: ((ev: GwSpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
    onstart: (() => void) | null;
    start(): void;
    stop(): void;
    abort(): void;
  }
  type GwSpeechRecognitionCtor = new () => GwSpeechRecognition;
  interface Window {
    webkitSpeechRecognition?: GwSpeechRecognitionCtor;
    SpeechRecognition?: GwSpeechRecognitionCtor;
  }
}
