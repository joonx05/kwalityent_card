"use client"
import Image from "next/image";
import { SaveContactButton } from "@/components/SaveContactButton";
import { useState } from "react";

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
  const [showExchangeForm, setShowExchangeForm] = useState(false);

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
          backgroundImage: 'url(/poster_image.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
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
                src="/profile_image.png"
                alt="Profile photo"
                fill
                sizes="112px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Name */}
          <h1 className="mb-2 text-center text-2xl font-semibold text-white">
            ALPESH B PRAJAPATI
          </h1>

          {/* Job Position - Elegantly Highlighted */}
          <div className="mb-2 text-center">
            <p className="text-lg font-bold leading-relaxed text-white uppercase">
              MANAGING DIRECTOR
            </p>
            <p className="text-lg font-medium leading-relaxed text-white">
              KWALITY ENTERPRISES
            </p>
          </div>

          {/* Interests */}
          <div className="mb-5 text-center">
            <p className="text-sm font-normal text-gray-400 leading-relaxed">
              Automobile enthusiast
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
            onClick={() => setShowExchangeForm(true)}
            className="flex-1 rounded-xl bg-[#2a2d3e] px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#35384a] active:scale-[0.98]">
              Exchange Contact
            </button>
            <SaveContactButton
              fullName="ALPESH B PRAJAPATI"
              firstName="ALPESH"
              lastName="PRAJAPATI"
              title="MANAGING DIRECTOR"
              org="KWALITY ENTERPRISES"
              phone="+91 9820643820"
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2a2d3e] text-white transition-all hover:bg-[#35384a] active:scale-[0.98]"
              aria-label="Save contact"
            />
          </div>
        </div>
      </div>
      <div className="pointer-events-none mx-auto -mt-6 h-10 max-w-sm rounded-b-2xl bg-[#1a1d2e]/70 blur-2xl opacity-70" />

      {/* Main Content - Positioned after card */}
      <main className="flex-1 flex flex-col px-4 pb-4">
        {/* Social Media Icons Grid */}
        <div className="mx-auto mt-6 grid max-w-sm grid-cols-4 gap-4 sm:mt-10 md:mt-12">
          {/* Personal Email */}
          <a
            href="mailto:alpeshprajapati286@gmail.com"
            className="group flex flex-col items-center gap-2 w-full"
            aria-label="Email alpeshprajapati286@gmail.com"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#4A9EFF] transition-transform group-active:scale-95 flex-shrink-0">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-sm text-white">Personal</span>
          </a>

          {/* LinkedIn */}
          <button className="group flex flex-col items-center gap-2 w-full">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#0077B5] transition-transform group-active:scale-95 flex-shrink-0">
            <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none"> <path d="M0 18.338C0 8.216 8.474 0 18.92 0h218.16C247.53 0 256 8.216 256 18.338v219.327C256 247.79 247.53 256 237.08 256H18.92C8.475 256 0 247.791 0 237.668V18.335z" fill="#069"></path> <path d="M77.796 214.238V98.986H39.488v115.252H77.8zM58.65 83.253c13.356 0 21.671-8.85 21.671-19.91-.25-11.312-8.315-19.915-21.417-19.915-13.111 0-21.674 8.603-21.674 19.914 0 11.06 8.312 19.91 21.169 19.91h.248zM99 214.238h38.305v-64.355c0-3.44.25-6.889 1.262-9.346 2.768-6.885 9.071-14.012 19.656-14.012 13.858 0 19.405 10.568 19.405 26.063v61.65h38.304v-66.082c0-35.399-18.896-51.872-44.099-51.872-20.663 0-29.738 11.549-34.78 19.415h.255V98.99H99.002c.5 10.812-.003 115.252-.003 115.252z" fill="#ffffff"></path> </g> </g></svg>
            </div>
            <span className="text-sm text-white">LinkedIn</span>
          </button>

          {/* Telegram */}
          <button className="group flex flex-col items-center gap-2 w-full">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#0088cc] transition-transform group-active:scale-95 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" aria-label="Telegram" role="img" viewBox="0 0 512 512" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect width="512" height="512" rx="15%" fill="#37aee2"></rect><path fill="#c8daea" d="M199 404c-11 0-10-4-13-14l-32-105 245-144"></path><path fill="#a9c9dd" d="M199 404c7 0 11-4 16-8l45-43-56-34"></path><path fill="#f6fbfe" d="M204 319l135 99c14 9 26 4 30-14l55-258c5-22-9-32-24-25L79 245c-21 8-21 21-4 26l83 26 190-121c9-5 17-3 11 4"></path></g></svg>
            </div>
            <span className="text-sm text-white">Telegram</span>
          </button>

          {/* Twitter/X */}
          <button className="group flex flex-col items-center gap-2 w-full">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#111827] border border-[#2b3548] transition-transform group-active:scale-95 flex-shrink-0">
              <svg
                className="h-10 w-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <span className="text-sm text-white">Twitter</span>
          </button>

          {/* Mobile Phone */}
          <a
            href="tel:+919820643820"
            className="group flex flex-col items-center gap-2 w-full"
            aria-label="Call +91 9820643820"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#25D366] transition-transform group-active:scale-95 flex-shrink-0">
              <svg
                className="h-9 w-9 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <span className="text-sm text-white">Mobile</span>
          </a>
          {/* Work Email */}
          <a
            href="mailto:support@kwalityent.com"
            className="group flex flex-col items-center gap-2 w-full"
            aria-label="Email support@kwalityent.com"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#4A9EFF] transition-transform group-active:scale-95 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Gmail" role="img" viewBox="0 0 512 512" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect width="512" height="512" rx="15%" fill="#ffffff"></rect><path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"></path><path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335"></path><path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"></path><path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"></path><path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"></path></g></svg>
            </div>
            <span className="text-sm text-white">Work</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/message/3SXZLL6QPJTJD1"
            className="group flex flex-col items-center gap-2 w-full"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#25D366] transition-transform group-active:scale-95 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" aria-label="WhatsApp" role="img" viewBox="0 0 512 512" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect width="512" height="512" rx="15%" fill="#25d366"></rect><path fill="#25d366" stroke="#ffffff" stroke-width="26" d="M123 393l14-65a138 138 0 1150 47z"></path><path fill="#ffffff" d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"></path></g></svg>
            </div>
            <span className="text-sm text-white">WhatsApp</span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/_alpesh_019?igsh=ZHI2ZmpoYWJ4M2gx"
            className="group flex flex-col items-center gap-2 w-full"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-xl transition-transform group-active:scale-95 flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-label="Instagram"
              role="img"
              viewBox="0 0 512 512"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <rect width="512" height="512" rx="15%" id="b" />
                <use fill="url(#a)" xlinkHref="#b" />
                <use fill="url(#c)" xlinkHref="#b" />
                <radialGradient id="a" cx=".4" cy="1" r="1">
                  <stop offset=".1" stopColor="#fd5" />
                  <stop offset=".5" stopColor="#ff543e" />
                  <stop offset="1" stopColor="#c837ab" />
                </radialGradient>
                <linearGradient id="c" x2=".2" y2="1">
                  <stop offset=".1" stopColor="#3771c8" />
                  <stop offset=".5" stopColor="#60f" stopOpacity="0" />
                </linearGradient>
                <g fill="none" stroke="#ffffff" strokeWidth="30">
                  <rect width="308" height="308" x="102" y="102" rx="81" />
                  <circle cx="256" cy="256" r="72" />
                  <circle cx="347" cy="165" r="6" />
                </g>
              </g>
            </svg>
            </div>
            <span className="text-sm text-white">Instagram</span>
          </a>

        </div>
        <footer className="mt-auto py-4 text-center text-xs text-gray-400">
          Made by <span className="font-medium">kwalityent.in</span>
        </footer>
      </main>
    </div>
  );
}