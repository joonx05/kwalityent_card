"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { CardPreview } from "@/components/CardPreview";

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 placeholder-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500";
const labelClass =
  "mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300";

/** Preview size as fraction of viewport: width 3/10, height ~90% */
const PREVIEW_WIDTH_RATIO = 0.3;
const PREVIEW_HEIGHT_RATIO = 0.9;

export default function AdminFormPage() {
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const [fullName, setFullName] = useState("John Keats");
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Keats");
  const [title, setTitle] = useState("Senior Writer");
  const [org, setOrg] = useState("Example Co.");
  const [interests, setInterests] = useState("Poetry and literature");
  const [phone, setPhone] = useState("+1 555 012 3456");
  const [personalEmail, setPersonalEmail] = useState(
    "john.keats@example.com"
  );
  const [workEmail, setWorkEmail] = useState("j.keats@example.co");
  const [linkedInUrl, setLinkedInUrl] = useState("https://linkedin.com/in/johnkeats");
  const [telegramUrl, setTelegramUrl] = useState("https://t.me/johnkeats");
  const [twitterUrl, setTwitterUrl] = useState("https://x.com/johnkeats");
  const [whatsAppUrl, setWhatsAppUrl] = useState("https://wa.me/15550123456");
  const [instagramUrl, setInstagramUrl] = useState(
    "https://www.instagram.com/johnkeats"
  );
  const [saved, setSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewSize, setPreviewSize] = useState({ width: 360, height: 720 });

  const updatePreviewSize = useCallback(() => {
    if (typeof window === "undefined") return;
    setPreviewSize({
      width: Math.round(window.innerWidth * PREVIEW_WIDTH_RATIO),
      height: Math.round(window.innerHeight * PREVIEW_HEIGHT_RATIO),
    });
  }, []);

  useEffect(() => {
    if (!showPreview) return;
    updatePreviewSize();
    window.addEventListener("resize", updatePreviewSize);
    return () => window.removeEventListener("resize", updatePreviewSize);
  }, [showPreview, updatePreviewSize]);

  const coverPreviewUrl = useMemo(
    () => (coverFile ? URL.createObjectURL(coverFile) : ""),
    [coverFile]
  );
  const profilePreviewUrl = useMemo(
    () => (profileFile ? URL.createObjectURL(profileFile) : ""),
    [profileFile]
  );

  useEffect(() => () => {
    if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
  }, [coverPreviewUrl]);
  useEffect(() => () => {
    if (profilePreviewUrl) URL.revokeObjectURL(profilePreviewUrl);
  }, [profilePreviewUrl]);

  const setCoverFileAndUrl = (file: File | null) => setCoverFile(file);
  const setProfileFileAndUrl = (file: File | null) => setProfileFile(file);

  const allRequiredFilled =
    coverFile != null &&
    profileFile != null &&
    fullName.trim() !== "" &&
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    title.trim() !== "" &&
    org.trim() !== "" &&
    interests.trim() !== "" &&
    phone.trim() !== "" &&
    personalEmail.trim() !== "" &&
    workEmail.trim() !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: persist to API / DB; for now just confirm
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-50 font-sans dark:bg-zinc-950">
      <Link
        href="/"
        className="absolute left-6 top-6 z-10 text-xl font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-100 dark:hover:text-zinc-200"
        aria-label="Back to home"
      >
        Kwality Enterprises
      </Link>
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-amber-50/60 via-transparent to-transparent dark:from-amber-950/20"
        aria-hidden
      />

      <main className="relative px-6 pb-20 pt-24 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Edit card content
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            All fields shown here are used on the digital business card.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-10">
            {/* Images */}
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                Images
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cover-image" className={labelClass}>
                    Cover / poster image
                  </label>
                  <input
                    id="cover-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverFileAndUrl(e.target.files?.[0] ?? null)}
                    className={inputClass}
                  />
                  {coverFile && (
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      {coverFile.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="profile-image" className={labelClass}>
                    Profile image
                  </label>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileFileAndUrl(e.target.files?.[0] ?? null)}
                    className={inputClass}
                  />
                  {profileFile && (
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      {profileFile.name}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Name & role */}
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                Name & role
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="full-name" className={labelClass}>
                    Full name (as on card)
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="ALPESH B PRAJAPATI"
                    className={inputClass}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className={labelClass}>
                      First name (for Save Contact)
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="ALPESH"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className={labelClass}>
                      Last name (for Save Contact)
                    </label>
                    <input
                      id="last-name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="PRAJAPATI"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="title" className={labelClass}>
                    Job title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="MANAGING DIRECTOR"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="org" className={labelClass}>
                    Organization
                  </label>
                  <input
                    id="org"
                    type="text"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="KWALITY ENTERPRISES"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="interests" className={labelClass}>
                    Interests (short line under role)
                  </label>
                  <input
                    id="interests"
                    type="text"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="Automobile enthusiast"
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                Contact (card & Save Contact)
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9820643820"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="personal-email" className={labelClass}>
                    Personal email
                  </label>
                  <input
                    id="personal-email"
                    type="email"
                    value={personalEmail}
                    onChange={(e) => setPersonalEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="work-email" className={labelClass}>
                    Work email
                  </label>
                  <input
                    id="work-email"
                    type="email"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="support@example.com"
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* Social links */}
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                Social & messaging links
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="linkedin" className={labelClass}>
                    LinkedIn URL
                  </label>
                  <input
                    id="linkedin"
                    type="url"
                    value={linkedInUrl}
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="telegram" className={labelClass}>
                    Telegram URL
                  </label>
                  <input
                    id="telegram"
                    type="url"
                    value={telegramUrl}
                    onChange={(e) => setTelegramUrl(e.target.value)}
                    placeholder="https://t.me/..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="twitter" className={labelClass}>
                    Twitter / X URL
                  </label>
                  <input
                    id="twitter"
                    type="url"
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    placeholder="https://x.com/..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="whatsapp" className={labelClass}>
                    WhatsApp URL
                  </label>
                  <input
                    id="whatsapp"
                    type="url"
                    value={whatsAppUrl}
                    onChange={(e) => setWhatsAppUrl(e.target.value)}
                    placeholder="https://wa.me/..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="instagram" className={labelClass}>
                    Instagram URL
                  </label>
                  <input
                    id="instagram"
                    type="url"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    placeholder="https://instagram.com/..."
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                disabled={!allRequiredFilled}
                className="rounded-lg border-2 border-zinc-300 bg-white px-6 py-2.5 font-semibold text-zinc-800 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                Preview
              </button>
              <button
                type="submit"
                className="rounded-lg bg-zinc-900 px-6 py-2.5 font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Save changes
              </button>
              {saved && (
                <span className="text-sm text-amber-600 dark:text-amber-400">
                  Saved. (Connect an API to persist data.)
                </span>
              )}
            </div>
          </form>
        </div>
      </main>

      {/* Preview modal */}
      {showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-modal
          role="dialog"
          aria-label="Card preview"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPreview(false)}
            aria-hidden
          />
          <div className="relative flex flex-col items-center gap-4">
            <CardPreview
              config={{
                coverImageUrl: coverPreviewUrl || undefined,
                profileImageUrl: profilePreviewUrl || undefined,
                fullName: fullName.trim(),
                title: title.trim(),
                org: org.trim(),
                interests: interests.trim(),
                phone: phone.trim(),
                personalEmail: personalEmail.trim(),
                workEmail: workEmail.trim(),
                linkedInUrl: linkedInUrl.trim() || undefined,
                telegramUrl: telegramUrl.trim() || undefined,
                twitterUrl: twitterUrl.trim() || undefined,
                whatsAppUrl: whatsAppUrl.trim() || undefined,
                instagramUrl: instagramUrl.trim() || undefined,
              }}
              width={previewSize.width}
              height={previewSize.height}
            />
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-lg transition hover:bg-zinc-100 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
            >
              Close preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
