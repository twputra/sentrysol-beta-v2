import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Menu, X, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { WalletConnectionModal } from "@/components/WalletConnectionModal";
import { useWallet } from "@/contexts/WalletContext";

export default function Pricing() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { isWalletConnected, walletAddress } = useWallet();
  const navigate = useNavigate();

  const handleConnect = () => {
    if (isWalletConnected) {
      navigate("/dashboard");
    } else {
      setIsWalletModalOpen(true);
    }
  };

  const pricingTiers = [
    {
      name: "Normies",
      description: "Perfect for students, Normies, & early adopters.",
      buttonText: "Get Started",
      features: [
        "Cross-chain trace ( SOL & ETH)",
        "Basic Risk Score & Wallet Screening",
        "5 address req/day",
        "Watermark fund flow",
      ],
    },
    {
      name: "Pro",
      description: "For independent investigators & small teams",
      buttonText: "$299 / month",
      features: [
        "Cross-chain tracing (up to 3 chains)",
        "Up to +100req/day",
        "Email support",
        "Fund flow visualization",
        "Monthly report export",
        "Email support",
      ],
    },
    {
      name: "Enterprise",
      description:
        "Perfect for enterprises, large teams, & advanced security needs.",
      buttonText: "Contact US",
      features: [
        "Unlimited cross-chain coverage",
        "AML & sanctions screening",
        "Media monitoring & OSINT tools",
        "Custom ML model fine-tuning",
        "Historical chain data access",
        "Custom API & webhook integration",
        "24/7 premium support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav
        className="flex items-center justify-between px-8 lg:px-48 py-6 fixed w-full top-0 z-50"
        style={{
          background: "linear-gradient(180deg, #395B64 0%, #000 121.3%)",
        }}
      >
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F1bea0cc41c084038a6a915a367aa70f5%2F04eb1088e2114c479fc8093c14f130fb?format=webp&width=800"
            alt="SentrySol Logo"
            className="w-16 h-16"
          />
          <span className="text-3xl lg:text-4xl font-semibold">SENTRYSOL</span>
        </Link>

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
            onClick={handleConnect}
            className="bg-white hover:bg-white/90 text-black text-2xl font-medium px-8 py-6 rounded-full"
          >
            {isWalletConnected
              ? walletAddress
                ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : "Connected"
              : "Connect"}
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
                onClick={handleConnect}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                {isWalletConnected
                  ? walletAddress
                    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                    : "Connected"
                  : "Connect"}
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-8 lg:px-48 text-center relative bg-gradient-to-b from-teal-900/30 to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold leading-tight mb-8 bg-gradient-to-r from-white/0 via-white/80 to-white/0 bg-clip-text text-transparent uppercase tracking-[0.2em]">
            Simple Plans
            <br />
            Powerful Protection
          </h1>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-8 lg:px-24 relative bg-gradient-to-b from-black to-teal-900/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-teal-500/10 to-transparent"></div>
        </div>

        <div className="relative z-10 grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              className="bg-gradient-to-b from-white/20 to-white/5 border border-white rounded-[3rem] p-12 backdrop-blur-[50px] flex flex-col"
            >
              {/* Header */}
              <div className="mb-12 min-h-[320px] flex flex-col">
                <h3 className="text-5xl lg:text-6xl font-light mb-6 text-white leading-tight tracking-tight">
                  {tier.name}
                </h3>
                <p className="text-white/80 text-xl leading-relaxed">
                  {tier.description}
                </p>
              </div>

              {/* CTA Button */}
              <div className="mb-6">
                <Button className="w-full bg-[#00090B] hover:bg-[#00090B]/90 text-white text-xl font-medium py-6 rounded-[30px] shadow-lg">
                  {tier.buttonText}
                </Button>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#8EFFD0] mb-6"></div>

              {/* Features */}
              <div className="flex-1">
                <h4 className="text-white text-[22px] font-medium mb-4">
                  Key features:
                </h4>
                <div className="space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-[#14F195] rounded-full"></div>
                      </div>
                      <span className="text-white/80 text-xl leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Wave Animation */}
        <div className="absolute bottom-0 left-0 w-full h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 to-transparent"></div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-32 px-8 lg:px-48 text-center bg-gradient-to-b from-teal-900/20 to-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-light mb-12 tracking-[4rem] text-white">
            F A Q s
          </h2>
          <Button className="bg-teal-500/20 hover:bg-teal-500/30 text-white border-0 text-2xl font-light px-12 py-6 rounded-[33px] tracking-wide">
            Read More
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
              <p className="text-white/60 text-lg leading-relaxed max-w-md mb-8">
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
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/60 rounded-xl"
                />
                <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl px-8">
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
