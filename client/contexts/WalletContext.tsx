import React, { createContext, useContext, useEffect, useState } from "react";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";

interface WalletContextType {
  isWalletConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const { connected, publicKey, connect, disconnect, connecting } =
    useSolanaWallet();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    setIsWalletConnected(connected);
    setWalletAddress(publicKey ? publicKey.toString() : null);
  }, [connected, publicKey]);

  const connectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  const value: WalletContextType = {
    isWalletConnected,
    walletAddress,
    connectWallet,
    disconnectWallet,
    isConnecting: connecting,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
