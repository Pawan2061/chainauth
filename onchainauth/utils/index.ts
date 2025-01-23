export const getProvider = () => {
  if (typeof window !== "undefined" && "solana" in window) {
    const provider: any = window.solana;
    if (provider?.isPhantom) {
      return provider;
    }
  }
  return null;
};
