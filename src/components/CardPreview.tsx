"use client";

export const runtime = "edge";

/**
 * Configuration for the CardPreview component.
 * All display fields and optional style overrides for a highly customizable card.
 */
export type CardPreviewConfig = {
  /** Cover / banner image URL (e.g. from object URL or CDN) */
  coverImageUrl?: string | null;
  /** Profile / avatar image URL */
  profileImageUrl?: string | null;
  /** Full name as shown on the card */
  fullName?: string;
  /** Job title (e.g. "MANAGING DIRECTOR") */
  title?: string;
  /** Organization name */
  org?: string;
  /** Short interests line under role */
  interests?: string;
  /** Phone number */
  phone?: string;
  /** Personal email */
  personalEmail?: string;
  /** Work email */
  workEmail?: string;
  /** Social & messaging URLs */
  linkedInUrl?: string;
  telegramUrl?: string;
  twitterUrl?: string;
  whatsAppUrl?: string;
  instagramUrl?: string;

  // Optional style / layout overrides
  /** Card container background (CSS color) */
  cardBackgroundColor?: string;
  /** Banner min-height (e.g. "62vh", "200px") */
  bannerHeight?: string;
  /** Ring color around profile image */
  profileRingColor?: string;
  /** Name text color */
  nameColor?: string;
  /** Title/org text color */
  roleColor?: string;
  /** Interests text color */
  interestsColor?: string;
  /** Button/icon tile background color */
  buttonBgColor?: string;
  /** Whether to show the social/contact links grid (default true) */
  showSocialLinks?: boolean;
};

const defaultConfig: Required<
  Omit<
    CardPreviewConfig,
    | "coverImageUrl"
    | "profileImageUrl"
    | "fullName"
    | "title"
    | "org"
    | "interests"
    | "phone"
    | "personalEmail"
    | "workEmail"
    | "linkedInUrl"
    | "telegramUrl"
    | "twitterUrl"
    | "whatsAppUrl"
    | "instagramUrl"
  >
> = {
  cardBackgroundColor: "#000000",
  bannerHeight: "min-h-[45%]",
  profileRingColor: "#1a1d2e",
  nameColor: "#ffffff",
  roleColor: "#ffffff",
  interestsColor: "#9ca3af",
  buttonBgColor: "#2a2d3e",
  showSocialLinks: true,
};

type CardPreviewProps = {
  config: CardPreviewConfig;
  /** Optional className for the root wrapper (e.g. for scaling) */
  className?: string;
  /** Width of the preview in pixels */
  width?: number;
  /** Height of the preview in pixels (card fills this when provided) */
  height?: number;
};

export function CardPreview({
  config,
  className = "",
  width = 375,
  height,
}: CardPreviewProps) {
  const {
    coverImageUrl,
    profileImageUrl,
    fullName = "",
    title = "",
    org = "",
    interests = "",
    phone = "",
    personalEmail = "",
    workEmail = "",
    linkedInUrl = "",
    telegramUrl = "",
    twitterUrl = "",
    whatsAppUrl = "",
    instagramUrl = "",
    cardBackgroundColor = defaultConfig.cardBackgroundColor,
    bannerHeight = defaultConfig.bannerHeight,
    profileRingColor = defaultConfig.profileRingColor,
    nameColor = defaultConfig.nameColor,
    roleColor = defaultConfig.roleColor,
    interestsColor = defaultConfig.interestsColor,
    buttonBgColor = defaultConfig.buttonBgColor,
    showSocialLinks = defaultConfig.showSocialLinks,
  } = config;

  const socialLinks = [
    {
      href: personalEmail ? `mailto:${personalEmail}` : undefined,
      label: "Personal",
      bg: "#4A9EFF",
      icon: "email",
    },
    {
      href: linkedInUrl || undefined,
      label: "LinkedIn",
      bg: "#0077B5",
      icon: "linkedin",
    },
    {
      href: telegramUrl || undefined,
      label: "Telegram",
      bg: "#0088cc",
      icon: "telegram",
    },
    {
      href: twitterUrl || undefined,
      label: "Twitter",
      bg: "#111827",
      icon: "twitter",
    },
    {
      href: phone ? `tel:${phone.replace(/\s/g, "")}` : undefined,
      label: "Mobile",
      bg: "#25D366",
      icon: "phone",
    },
    {
      href: workEmail ? `mailto:${workEmail}` : undefined,
      label: "Work",
      bg: "#ea4335",
      icon: "gmail",
    },
    {
      href: whatsAppUrl || undefined,
      label: "WhatsApp",
      bg: "#25D366",
      icon: "whatsapp",
    },
    {
      href: instagramUrl || undefined,
      label: "Instagram",
      bg: "gradient",
      icon: "instagram",
    },
  ];

  return (
    <div
      className={`flex min-h-0 flex-col overflow-hidden rounded-2xl bg-[#323335] text-white ${className}`}
      style={{ width, height, maxWidth: "100%" }}
    >
      {/* Cover / banner - full width, like [id] */}
      <div
        className={`relative w-full ${bannerHeight} flex-shrink-0 pb-28`}
        style={{
          backgroundImage: coverImageUrl
            ? `url(${coverImageUrl})`
            : "linear-gradient(135deg, #1a1d2e 0%, #2a2d3e 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 80%, black 25%, transparent 50%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 80%, black 25%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            maskImage:
              "linear-gradient(to top, black 0%, black 25%, transparent 45%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, black 25%, transparent 45%)",
          }}
        />
      </div>

      {/* Profile card - overlaps cover, same structure as [id] */}
      <div className="relative z-10 -mt-20 px-3">
        <div
          className="mx-auto max-w-[92%] rounded-2xl p-6 pt-14 shadow-2xl font-sans"
          style={{ backgroundColor: cardBackgroundColor }}
        >
          {/* Profile picture - overlapping the cover, inside card */}
          <div className="-mt-20 mb-2 flex justify-center">
            <div
              className="relative h-20 w-20 overflow-hidden rounded-full ring-4"
              style={{ borderColor: profileRingColor }}
            >
              {profileImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profileImageUrl}
                  alt={fullName || "Profile"}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div
                  className="h-full w-full"
                  style={{ backgroundColor: buttonBgColor }}
                />
              )}
            </div>
          </div>

          {/* Name */}
          <h1
            className="mb-2 text-center text-xl font-semibold"
            style={{ color: nameColor }}
          >
            {fullName || "Full Name"}
          </h1>

          {/* Job position & org */}
          <div className="mb-2 text-center">
            <p
              className="text-base font-bold uppercase leading-relaxed"
              style={{ color: roleColor }}
            >
              {title || "Title"}
            </p>
            <p
              className="text-base font-medium leading-relaxed"
              style={{ color: roleColor }}
            >
              {org || "Organization"}
            </p>
          </div>

          {/* Interests */}
          <div className="mb-5 text-center">
            <p
              className="text-sm leading-relaxed"
              style={{ color: interestsColor }}
            >
              {interests || "Interests"}
            </p>
          </div>

          {/* Action buttons - same as [id] */}
          <div className="flex gap-3">
            <div
              className="flex-1 rounded-xl px-4 py-3 text-center text-sm font-semibold text-white"
              style={{ backgroundColor: buttonBgColor }}
            >
              Exchange Contact
            </div>
            <div
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-white"
              style={{ backgroundColor: buttonBgColor }}
              aria-hidden
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Blur shadow under card - like [id] */}
      <div
        className="pointer-events-none mx-auto -mt-5 h-8 max-w-[92%] rounded-b-2xl opacity-70 blur-xl"
        style={{ backgroundColor: "rgba(26,29,46,0.7)" }}
      />

      {/* Main content - social grid on grey page background; scrolls when card height is constrained */}
      <main
        className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-3 pb-4"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {showSocialLinks && (
          <div className="mx-auto mt-4 w-full max-w-[92%] rounded-2xl bg-zinc-600/90 px-3 py-4">
            <div className="grid grid-cols-4 gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href?.startsWith("http") ? "_blank" : undefined}
                rel={item.href?.startsWith("http") ? "noreferrer" : undefined}
                className="group flex flex-col items-center gap-2"
                aria-label={item.label}
              >
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-transform group-active:scale-95"
                  style={{
                    backgroundColor:
                      item.bg === "gradient"
                        ? "transparent"
                        : item.bg,
                    backgroundImage:
                      item.bg === "gradient"
                        ? "linear-gradient(135deg, #fd5, #ff543e, #c837ab)"
                        : undefined,
                    border: item.bg === "#111827" ? "1px solid #2b3548" : undefined,
                  }}
                >
                  {item.icon === "email" && (
                    <svg
                    className="h-8 w-8 text-white"
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
                  )}
                  {item.icon === "phone" && (
                    <svg
                    className="h-7 w-7 text-white"
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
                  )}
                  {item.icon === "gmail" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="Gmail"
                      role="img"
                      viewBox="0 0 512 512"
                    >
                      <rect width="512" height="512" rx="15%" fill="#ffffff" />
                      <path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4" />
                      <path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335" />
                      <path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853" />
                      <path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f" />
                      <path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04" />
                    </svg>
                  )}
                  {item.icon === "linkedin" && (
                     <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none"> <path d="M0 18.338C0 8.216 8.474 0 18.92 0h218.16C247.53 0 256 8.216 256 18.338v219.327C256 247.79 247.53 256 237.08 256H18.92C8.475 256 0 247.791 0 237.668V18.335z" fill="#069"></path> <path d="M77.796 214.238V98.986H39.488v115.252H77.8zM58.65 83.253c13.356 0 21.671-8.85 21.671-19.91-.25-11.312-8.315-19.915-21.417-19.915-13.111 0-21.674 8.603-21.674 19.914 0 11.06 8.312 19.91 21.169 19.91h.248zM99 214.238h38.305v-64.355c0-3.44.25-6.889 1.262-9.346 2.768-6.885 9.071-14.012 19.656-14.012 13.858 0 19.405 10.568 19.405 26.063v61.65h38.304v-66.082c0-35.399-18.896-51.872-44.099-51.872-20.663 0-29.738 11.549-34.78 19.415h.255V98.99H99.002c.5 10.812-.003 115.252-.003 115.252z" fill="#ffffff"></path> </g> </g></svg>
                  )}
                  {item.icon === "telegram" && (
                    <svg xmlns="http://www.w3.org/2000/svg" aria-label="Telegram" role="img" viewBox="0 0 512 512" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect width="512" height="512" rx="15%" fill="#37aee2"></rect><path fill="#c8daea" d="M199 404c-11 0-10-4-13-14l-32-105 245-144"></path><path fill="#a9c9dd" d="M199 404c7 0 11-4 16-8l45-43-56-34"></path><path fill="#f6fbfe" d="M204 319l135 99c14 9 26 4 30-14l55-258c5-22-9-32-24-25L79 245c-21 8-21 21-4 26l83 26 190-121c9-5 17-3 11 4"></path></g></svg>
                  )}
                  {item.icon === "whatsapp" && (
                    <svg xmlns="http://www.w3.org/2000/svg" aria-label="WhatsApp" role="img" viewBox="0 0 512 512" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect width="512" height="512" rx="15%" fill="#25d366"></rect><path fill="#25d366" stroke="#ffffff" stroke-width="26" d="M123 393l14-65a138 138 0 1150 47z"></path><path fill="#ffffff" d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"></path></g></svg>
                  )}
                  {item.icon === "instagram" && (
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
                  )}
                  {item.icon === "twitter" && (
                    <svg
                    className="h-8 w-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  )}
                </div>
                <span className="text-xs text-white">{item.label}</span>
              </a>
            ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
