declare global {
  interface Window {
    selectService: (id: number) => void;
  }
}

export {};
