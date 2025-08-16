import React, { useState } from "react";
import { X } from "lucide-react";

// TypeScript declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWallet } from "@/contexts/WalletContext";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton, useWalletModal } from "@solana/wallet-adapter-react-ui";

interface WalletConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletConnectionModal: React.FC<WalletConnectionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isWalletConnected, walletAddress, connectWallet, isConnecting } =
    useWallet();
  const { wallets } = useSolanaWallet();
  const { setVisible } = useWalletModal();
  const [selectedNetwork, setSelectedNetwork] = useState<"solana" | "ethereum">(
    "solana",
  );
  const [connecting, setConnecting] = useState(false);

  const handleWalletSelect = async (walletName: string) => {
    setConnecting(true);
    try {
      if (selectedNetwork === "solana") {
        // Use the official Solana wallet modal for proper wallet selection and connection
        setVisible(true);
        onClose(); // Close our custom modal to avoid overlapping UI
      } else if (selectedNetwork === "ethereum") {
        // Handle Ethereum wallet connection
        if (walletName === "metamask" && window.ethereum) {
          try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            onClose();
          } catch (error) {
            console.error("MetaMask connection failed:", error);
          }
        }
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
    } finally {
      setConnecting(false);
    }
  };

  React.useEffect(() => {
    if (isWalletConnected) {
      setConnecting(false);
      onClose();
    }
  }, [isWalletConnected, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-black/95 border border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-white text-center mb-6">
            Connect Your Wallet
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4 text-white" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <div className="space-y-8 py-4">
          <p className="text-white/70 text-center text-lg">
            Choose your preferred network and connect your wallet to start using
            SentrySol's advanced security features.
          </p>

          {/* Network Selection */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg text-center">
              Select Network
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => setSelectedNetwork("solana")}
                className={`h-16 text-lg font-medium rounded-xl border-2 transition-all ${
                  selectedNetwork === "solana"
                    ? "bg-[#00090B] border-[#00090B] text-white"
                    : "bg-transparent border-white/20 text-white/70 hover:border-white/40"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Fb362352d7ea84bc3a397619b43158846%2F0249a2e91e4040e8a79e4c08f55ff8a4?format=webp&width=800"
                    alt="Solana"
                    className="w-5 h-5"
                  />
                  <span>Solana</span>
                </div>
              </Button>

              <Button
                onClick={() => setSelectedNetwork("ethereum")}
                className={`h-16 text-lg font-medium rounded-xl border-2 transition-all ${
                  selectedNetwork === "ethereum"
                    ? "bg-[#00090B] border-[#00090B] text-white"
                    : "bg-transparent border-white/20 text-white/70 hover:border-white/40"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Fb362352d7ea84bc3a397619b43158846%2Fa54dcb0ca37d4e3caff41466e55fa0d9?format=webp&width=800"
                    alt="Ethereum"
                    className="w-5 h-5"
                  />
                  <span>Ethereum</span>
                </div>
              </Button>
            </div>
          </div>

          {/* Wallet Selection */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg text-center">
              {selectedNetwork === "solana"
                ? "Solana Wallets"
                : "Ethereum Wallets"}
            </h3>

            {selectedNetwork === "solana" ? (
              <div className="space-y-3">
                <Button
                  onClick={() => handleWalletSelect("phantom")}
                  disabled={connecting || isConnecting}
                  className="w-full bg-[#00090B] hover:bg-[#00090B]/90 text-white border border-white/20 rounded-xl px-6 py-4 text-lg font-medium min-h-[60px] disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2Fb362352d7ea84bc3a397619b43158846%2Fa0ee3721c6204611aff0d26a60c15edd?format=webp&width=800"
                      alt="Phantom"
                      className="w-5 h-5"
                    />
                    <span>Phantom Wallet</span>
                  </div>
                </Button>
                <Button
                  onClick={() => handleWalletSelect("solflare")}
                  disabled={connecting || isConnecting}
                  className="w-full bg-[#00090B] hover:bg-[#00090B]/90 text-white border border-white/20 rounded-xl px-6 py-4 text-lg font-medium min-h-[60px] disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2Fb362352d7ea84bc3a397619b43158846%2F0ef7749742f14bd8aaf4ac6ef43c7111?format=webp&width=800"
                      alt="Solflare"
                      className="w-5 h-5"
                    />
                    <span>Solflare Wallet</span>
                  </div>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  onClick={() => handleWalletSelect("metamask")}
                  disabled={connecting || isConnecting}
                  className="w-full bg-[#00090B] hover:bg-[#00090B]/90 text-white border border-white/20 rounded-xl px-6 py-4 text-lg font-medium min-h-[60px] disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <span>🦊</span>
                    <span>MetaMask</span>
                  </div>
                </Button>
              </div>
            )}

            {connecting && (
              <div className="text-center space-y-2 mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="text-blue-400 text-lg font-semibold">
                  🔄 Connecting...
                </p>
                <p className="text-white/60 text-sm">
                  Please approve the connection in your wallet
                </p>
              </div>
            )}

            {isWalletConnected && walletAddress && (
              <div className="text-center space-y-2 mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <p className="text-green-400 text-lg font-semibold">
                  ✓ Wallet Connected
                </p>
                <p className="text-white/80 text-sm font-mono">
                  {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                </p>
              </div>
            )}
          </div>

          <div className="text-center space-y-2 text-sm">
            <p className="text-white/50">
              Secure connection via official wallet extensions
            </p>
            <p className="text-white/40">
              By connecting, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
