import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { WalletConnectionModal } from "@/components/WalletConnectionModal";
import { useWallet } from "@/contexts/WalletContext";

export default function Index() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { isWalletConnected, walletAddress } = useWallet();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isWalletConnected) {
      navigate("/dashboard");
    } else {
      setIsWalletModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav
        className="flex items-center justify-between px-8 lg:px-48 py-6 fixed w-full top-0 z-50"
        style={{
          background: "linear-gradient(180deg, #395B64 0%, #000 121.3%)",
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F1bea0cc41c084038a6a915a367aa70f5%2F04eb1088e2114c479fc8093c14f130fb?format=webp&width=800"
            alt="SentrySol Logo"
            className="w-16 h-16"
          />
          <span className="text-3xl lg:text-4xl font-semibold">SENTRYSOL</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-white hover:text-white/80 transition-colors text-2xl font-medium"
          >
            API
          </a>
          <a
            href="#"
            className="text-white hover:text-white/80 transition-colors text-2xl font-medium"
          >
            About
          </a>
          <a
            href="https://sentrysol.gitbook.io/sentrysol/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/80 transition-colors text-2xl font-medium"
          >
            Docs
          </a>
          <Link
            to="/pricing"
            className="text-white hover:text-white/80 transition-colors text-2xl font-medium"
          >
            Pricing
          </Link>
          <Button
            onClick={handleGetStarted}
            className="bg-white hover:bg-white/90 text-black text-2xl font-medium px-8 py-6 rounded-full"
          >
            {isWalletConnected
              ? walletAddress
                ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : "Connected"
              : "Start Demo"}
          </Button>
        </div>

        {/* Search Box */}
        <div className="hidden lg:block relative">
          <Input
            placeholder="I'am looking for..."
            className="w-64 bg-transparent border border-white/50 text-white placeholder:text-white/60 rounded-full px-6 py-3"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.4916 18.473L11.1916 12.173C10.6916 12.573 10.1166 12.8897 9.4666 13.123C8.8166 13.3564 8.12494 13.473 7.3916 13.473C5.57493 13.473 4.03744 12.8439 2.7791 11.5855C1.52077 10.3272 0.891602 8.78969 0.891602 6.97302C0.891602 5.15636 1.52077 3.61886 2.7791 2.36052C4.03744 1.10219 5.57493 0.473022 7.3916 0.473022C9.20827 0.473022 10.7458 1.10219 12.0041 2.36052C13.2624 3.61886 13.8916 5.15636 13.8916 6.97302C13.8916 7.70636 13.7749 8.39802 13.5416 9.04802C13.3083 9.69802 12.9916 10.273 12.5916 10.773L18.8916 17.073L17.4916 18.473ZM7.3916 11.473C8.6416 11.473 9.7041 11.0355 10.5791 10.1605C11.4541 9.28552 11.8916 8.22302 11.8916 6.97302C11.8916 5.72302 11.4541 4.66052 10.5791 3.78552C9.7041 2.91052 8.6416 2.47302 7.3916 2.47302C6.1416 2.47302 5.0791 2.91052 4.2041 3.78552C3.3291 4.66052 2.8916 5.72302 2.8916 6.97302C2.8916 8.22302 3.3291 9.28552 4.2041 10.1605C5.0791 11.0355 6.1416 11.473 7.3916 11.473Z"
                fill="white"
                fillOpacity="0.35"
              />
            </svg>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-sm border-t border-white/10 md:hidden">
            <div className="px-8 py-6 space-y-4">
              <a
                href="#"
                className="block text-white/70 hover:text-white transition-colors py-2"
              >
                API
              </a>
              <a
                href="#"
                className="block text-white/70 hover:text-white transition-colors py-2"
              >
                About
              </a>
              <a
                href="https://sentrysol.gitbook.io/sentrysol/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/70 hover:text-white transition-colors py-2"
              >
                Docs
              </a>
              <Link
                to="/pricing"
                className="block text-white/70 hover:text-white transition-colors py-2"
              >
                Pricing
              </Link>
              <Button
                onClick={handleGetStarted}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                {isWalletConnected
                  ? walletAddress
                    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                    : "Connected"
                  : "Start Demo"}
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 lg:px-48 pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/30 via-teal-950/10 to-black"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-light leading-[0.9] mb-12 tracking-tight">
            THE FASTEST WAY
            <br />
            TO TRUST
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
            Real-time AI threat intelligence for tracing illicit funds,
            detecting spoofed addresses, screening vulnerable smart contracts,
            and stopping scams across multiple chains.
          </p>
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="bg-[#00090B] hover:bg-[#00090B]/90 text-white border border-white/30 px-10 py-6 text-lg font-medium rounded-xl backdrop-blur-sm"
          >
            {isWalletConnected ? "GO TO DASHBOARD" : "START DEMO"}
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </section>

      {/* Blockchain Journey Section */}
      <section
        className="py-40 px-8 lg:px-48 relative"
        style={{
          background: "linear-gradient(180deg, #0B2228 0%, #000 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]"></div>
        </div>
        <div className="relative z-10 text-center mb-40">
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold leading-[0.85] mb-12 bg-gradient-to-r from-gray-700 via-white to-gray-700 bg-clip-text text-transparent uppercase tracking-wider">
            PROTECT THE ENTIRE
            <br />
            BLOCKCHAIN JOURNEY
          </h2>
          <p className="text-2xl md:text-4xl text-white/90 leading-relaxed max-w-6xl mx-auto font-light tracking-wide">
            Combines on-chain forensics + AI-powered threat scoring + compliance
            automation in one unified platform.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          <div className="bg-gradient-to-b from-white/8 to-white/2 border border-white/20 rounded-3xl p-10 text-center backdrop-blur-md shadow-2xl hover:shadow-teal-500/20 transition-all duration-300 group">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400/30 to-teal-600/30 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
              <div className="w-10 h-10 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50"></div>
            </div>
            <h3 className="text-2xl font-semibold mb-6 text-white">
              Compliance-Ready
              <br />
              Intelligence
            </h3>
            <p className="text-white/70 leading-relaxed text-lg">
              Advanced compliance framework with automated reporting and
              regulatory alignment.
            </p>
          </div>

          <div className="bg-gradient-to-b from-white/8 to-white/2 border border-white/20 rounded-3xl p-10 text-center backdrop-blur-md shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400/30 to-blue-600/30 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
              <div className="w-10 h-10 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
            </div>
            <h3 className="text-2xl font-semibold mb-6 text-white">
              Cross-Chain
              <br />
              Tracing
            </h3>
            <p className="text-white/70 leading-relaxed text-lg">
              Track and analyze transactions across multiple blockchain networks
              in real-time.
            </p>
          </div>

          <div className="bg-gradient-to-b from-white/8 to-white/2 border border-white/20 rounded-3xl p-10 text-center backdrop-blur-md shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400/30 to-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
              <div className="w-10 h-10 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
            </div>
            <h3 className="text-2xl font-semibold mb-6 text-white">
              Vulnerability
              <br />
              Scanning
            </h3>
            <p className="text-white/70 leading-relaxed text-lg">
              Comprehensive security assessment with automated vulnerability
              detection.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-32 px-8 lg:px-48 bg-black">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 max-w-7xl mx-auto">
          {/* Vision */}
          <div>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 leading-none">
              Vision
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed tracking-wide">
              We envision a Web3 future where users interact with decentralized
              applications confidently and securely. SentrySol is building the
              essential, intelligent, and privacy-preserving security layer
              needed to unlock the full potential of Web3 on mobile devices.
            </p>
          </div>

          {/* Mission */}
          <div>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 leading-none">
              Mission
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed tracking-wide">
              Empowering Users, Fostering trust and confidence in every Web3
              interaction.
              <br />
              <br />
              Securing the Ecosystem, Protecting against evolving threats like
              blind signing and wallet draining.
              <br />
              <br />
              Driving Adoption, Making Web3 accessible and safe for everyone.
            </p>
          </div>
        </div>

        {/* 3D Visual Element */}
        <div className="mt-32 flex justify-center">
          <div className="relative w-96 h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 grid grid-cols-4 gap-4 p-8">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-16 bg-gradient-to-br from-teal-400/30 to-blue-400/30 rounded-lg border border-teal-400/50"
                  style={{
                    transform: `perspective(1000px) rotateX(${(i % 4) * 15}deg) rotateY(${Math.floor(i / 4) * 15}deg)`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-8 lg:px-48 bg-gradient-to-b from-black to-teal-900/20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-light mb-8 leading-tight">
            Deploy and take control of blockchain risk — across chains, threats,
            and markets.
          </h2>
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="bg-[#00090B] hover:bg-[#00090B]/90 text-white border border-white/30 px-8 py-6 text-lg"
          >
            {isWalletConnected ? "GO TO DASHBOARD" : "Start Now"}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 lg:px-48 py-16" style={{ background: "#2C3333" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
          {/* Newsletter */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F1bea0cc41c084038a6a915a367aa70f5%2F04eb1088e2114c479fc8093c14f130fb?format=webp&width=800"
                  alt="SentrySol Logo"
                  className="w-10 h-10"
                />
                <span className="text-xl font-semibold">SENTRYSOL</span>
              </div>
              <p className="text-white/60 text-lg leading-relaxed max-w-md">
                SentrySol is an AI-native, on-device behavioral security
                framework built specifically for Web3 mobile environments,
                initially focusing on Solana Mobile Seeker.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Join a Newsletter</h4>
              <div className="flex gap-4 max-w-md">
                <Input
                  placeholder="Enter Your Email"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                />
                <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                  Submit
                </Button>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Explore</h4>
            <div className="space-y-4 text-white/60">
              <a href="#" className="block hover:text-white transition-colors">
                Press & Media
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Social Media
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <div className="space-y-4 text-white/60">
              <a href="#" className="block hover:text-white transition-colors">
                Whitepaper
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Documentation
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Integration
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                API Reference
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/15 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-white/60">
          <p>SentrySol, 2025</p>
        </div>
      </footer>

      {/* Wallet Connection Modal */}
      <WalletConnectionModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );
}
