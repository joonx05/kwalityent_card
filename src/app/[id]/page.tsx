"use client";
import Image from "next/image";
import { SaveContactButton } from "@/components/SaveContactButton";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

type CardData = {
  id: string;
  name: string;
  profession: string;
  Company: string;
  hobbie: string;
  profile_image_url: string;
  cover_image_url: string;
  personal_website_link: string | null;
  instagram: string | null;
  whatsapp: string | null;
  twitter: string | null;
  mobile: string | null;
  telegram: string | null;
  linkedin: string | null;
  gmail: string | null;
};

function ExchangeContactForm({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g. API call)
    onClose();
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full rounded-xl bg-[#2a2d3e] px-4 py-3.5 text-sm text-white placeholder-gray-500 border border-transparent focus:border-[#35384a] focus:outline-none transition-colors";
  const labelClass = "mb-1.5 block text-sm font-medium text-gray-300";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      {/* Form card */}
      <div className="relative w-full max-w-sm rounded-2xl bg-[#000000] p-8 shadow-2xl font-sans ring-1 ring-[#1a1d2e]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-[#2a2d3e] hover:text-white"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="mb-6 text-center text-xl font-semibold text-white">
          Exchange Contact
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="exchange-name" className={labelClass}>
              Name
            </label>
            <input
              id="exchange-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="exchange-email" className={labelClass}>
              Email
            </label>
            <input
              id="exchange-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="exchange-company" className={labelClass}>
              Company
            </label>
            <input
              id="exchange-company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="exchange-phone" className={labelClass}>
              Phone number
            </label>
            <input
              id="exchange-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234 567 8900"
              className={inputClass}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-[#2a2d3e] px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#35384a] active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-[#2a2d3e] px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#35384a] active:scale-[0.98]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CardPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;
  const [showExchangeForm, setShowExchangeForm] = useState(false);
  const [card, setCard] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Missing card id");
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    type ApiCardResponse = { success?: boolean; id?: string } & Partial<CardData>;
    fetch(`/api/cards/${encodeURIComponent(id)}`)
      .then((res) => res.json() as Promise<ApiCardResponse>)
      .then((data) => {
        if (cancelled) return;
        if (data.success && data.id) {
          setCard({
            id: data.id,
            name: data.name ?? "",
            profession: data.profession ?? "",
            Company: data.Company ?? "",
            hobbie: data.hobbie ?? "",
            profile_image_url: data.profile_image_url ?? "",
            cover_image_url: data.cover_image_url ?? "",
            personal_website_link: data.personal_website_link ?? null,
            instagram: data.instagram ?? null,
            whatsapp: data.whatsapp ?? null,
            twitter: data.twitter ?? null,
            mobile: data.mobile ?? null,
            telegram: data.telegram ?? null,
            linkedin: data.linkedin ?? null,
            gmail: data.gmail ?? null,
          });
          setError(null);
        } else {
          setCard(null);
          setError("Card not found");
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setCard(null);
          setError(err instanceof Error ? err.message : "Failed to load card");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#323335] text-white">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }
  if (error || !card) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#323335] text-white">
        <p className="text-gray-400">{error ?? "Card not found"}</p>
      </div>
    );
  }

  const linkEntries: { key: string; label: string; href: string; iconBg?: string }[] = [];
  if (card.gmail) linkEntries.push({ key: "gmail", label: "Email", href: `mailto:${card.gmail}`, iconBg: "#4A9EFF" });
  if (card.linkedin) linkEntries.push({ key: "linkedin", label: "LinkedIn", href: card.linkedin, iconBg: "#0077B5" });
  if (card.telegram) linkEntries.push({ key: "telegram", label: "Telegram", href: card.telegram, iconBg: "#0088cc" });
  if (card.twitter) linkEntries.push({ key: "twitter", label: "Twitter", href: card.twitter, iconBg: "#111827" });
  if (card.mobile) linkEntries.push({ key: "mobile", label: "Mobile", href: `tel:${card.mobile.replace(/\s/g, "")}`, iconBg: "#25D366" });
  if (card.whatsapp) linkEntries.push({ key: "whatsapp", label: "WhatsApp", href: card.whatsapp, iconBg: "#25D366" });
  if (card.instagram) linkEntries.push({ key: "instagram", label: "Instagram", href: card.instagram });
  if (card.personal_website_link) linkEntries.push({ key: "website", label: "Website", href: card.personal_website_link });

  return (
    <div className="flex flex-col min-h-screen bg-[#323335] text-white overflow-x-hidden">
      <ExchangeContactForm
        isOpen={showExchangeForm}
        onClose={() => setShowExchangeForm(false)}
      />
      {/* Cover Image Section - Full Width Top */}
      <div
        className="relative w-full min-h-[62vh] pb-40 sm:min-h-[70vh] sm:pb-32 md:pb-36"
        style={{
          backgroundImage: `url(${card.cover_image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Blur only behind the card area */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            maskImage: 'radial-gradient(ellipse 480px 300px at 50% 80%, black 50%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 480px 300px at 50% 80%, black 50%, transparent 75%)'
          }}
        />

        {/* Blur the bottom of the image */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            maskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 65%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 65%)'
          }}
        />
      </div>

      {/* Profile Card - Overlaps cover with responsive spacing */}
      <div className="relative z-10 -mt-66 px-3 sm:-mt-42">
        <div className="mx-auto max-w-sm rounded-2xl bg-[#000000] p-8 pt-16 shadow-2xl font-sans">
          {/* Profile Picture - Overlapping the cover */}
          <div className="mb-2 flex justify-center -mt-25">
            <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-[#1a1d2e]">
              <Image
                src={card.profile_image_url}
                alt={`${card.name} profile`}
                fill
                sizes="112px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Name */}
          <h1 className="mb-2 text-center text-2xl font-semibold text-white">
            {card.name}
          </h1>

          {/* Job Position - Elegantly Highlighted */}
          <div className="mb-2 text-center">
            <p className="text-lg font-bold leading-relaxed text-white uppercase">
              {card.profession}
            </p>
            <p className="text-lg font-medium leading-relaxed text-white">
              {card.Company}
            </p>
          </div>

          {/* Interests */}
          <div className="mb-5 text-center">
            <p className="text-sm font-normal text-gray-400 leading-relaxed">
              {card.hobbie}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowExchangeForm(true)}
              className="flex-1 rounded-xl bg-[#2a2d3e] px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#35384a] active:scale-[0.98]"
            >
              Exchange Contact
            </button>
            <SaveContactButton
              fullName={card.name}
              firstName={card.name.split(" ")[0] ?? card.name}
              lastName={card.name.split(" ").slice(1).join(" ") || card.name}
              title={card.profession}
              org={card.Company}
              phone={card.mobile ?? ""}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2a2d3e] text-white transition-all hover:bg-[#35384a] active:scale-[0.98]"
              aria-label="Save contact"
            />
          </div>
        </div>
      </div>
      <div className="pointer-events-none mx-auto -mt-6 h-10 max-w-sm rounded-b-2xl bg-[#1a1d2e]/70 blur-2xl opacity-70" />

      {/* Main Content - Positioned after card */}
      <main className="flex-1 flex flex-col px-4 pb-4">
        {/* Social / link icons – only those present on the card */}
        <div className="mx-auto mt-6 grid max-w-sm grid-cols-4 gap-4 sm:mt-10 md:mt-12">
          {linkEntries.map(({ key, label, href, iconBg }) => (
            <a
              key={key}
              href={href}
              className="group flex flex-col items-center gap-2 w-full"
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={label}
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-xl transition-transform group-active:scale-95 flex-shrink-0 border border-[#2b3548]"
                style={{ backgroundColor: iconBg ?? "#2a2d3e" }}
              >
                <svg
                  className="h-10 w-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <span className="text-sm text-white">{label}</span>
            </a>
          ))}
        </div>
        <footer className="mt-auto py-4 text-center text-xs text-gray-400">
          Made by <span className="font-medium">kwalityent.in</span>
        </footer>
      </main>
    </div>
  );
}