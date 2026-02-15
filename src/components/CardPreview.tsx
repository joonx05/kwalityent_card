"use client";

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

      {/* Main content - social grid on grey page background */}
      <main className="flex min-h-0 flex-1 flex-col px-3 pb-4">
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
                      className="h-6 w-6 text-white"
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
                      className="h-5 w-5 text-white"
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
                  {item.icon !== "email" && item.icon !== "phone" && (
                    <div
                      className="h-5 w-5 rounded"
                      style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
                    />
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
