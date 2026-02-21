"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CardPreview } from "@/components/CardPreview";

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 placeholder-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500";
const labelClass =
  "mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300";

const PREVIEW_WIDTH_RATIO_MOBILE = 0.9;
const PREVIEW_WIDTH_RATIO_DESKTOP = 0.3;
const PREVIEW_MOBILE_BREAKPOINT = 640;
const PREVIEW_HEIGHT_RATIO = 0.9;

type CardFromApi = {
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

export default function AdminCardEditPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [card, setCard] = useState<CardFromApi | null>(null);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [org, setOrg] = useState("");
  const [interests, setInterests] = useState("");
  const [phone, setPhone] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [telegramUrl, setTelegramUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [whatsAppUrl, setWhatsAppUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const [previewSize, setPreviewSize] = useState<{
    width: number;
    height: number | undefined;
    scrollableOnMobile: boolean;
  }>({ width: 360, height: 720, scrollableOnMobile: false });

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setFetchError("Missing card id");
      return;
    }
    fetch(`/api/cards/${encodeURIComponent(id)}`)
      .then((res) => res.json())
      //@ts-ignore
      .then((data: { success?: boolean } & Partial<CardFromApi>) => {
        if (data.success && data.id) {
          setCard(data as CardFromApi);
          setCoverImageUrl(data.cover_image_url ?? "");
          setProfileImageUrl(data.profile_image_url ?? "");
          setFullName(data.name ?? "");
          const nameParts = (data.name ?? "").trim().split(/\s+/);
          setFirstName(nameParts[0] ?? "");
          setLastName(nameParts.slice(1).join(" ") ?? "");
          setTitle(data.profession ?? "");
          setOrg(data.Company ?? "");
          setInterests(data.hobbie ?? "");
          setPhone(data.mobile ?? "");
          setPersonalEmail("");
          setWorkEmail(data.gmail ?? "");
          setLinkedInUrl(data.linkedin ?? "");
          setTelegramUrl(data.telegram ?? "");
          setTwitterUrl(data.twitter ?? "");
          setWhatsAppUrl(data.whatsapp ?? "");
          setInstagramUrl(data.instagram ?? "");
          setFetchError(null);
        } else {
          setCard(null);
          setFetchError("Card not found");
        }
      })
      .catch(() => {
        setCard(null);
        setFetchError("Failed to load card");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const updatePreviewSize = useCallback(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < PREVIEW_MOBILE_BREAKPOINT;
    const widthRatio = isMobile ? PREVIEW_WIDTH_RATIO_MOBILE : PREVIEW_WIDTH_RATIO_DESKTOP;
    setPreviewSize({
      width: Math.round(window.innerWidth * widthRatio),
      height: isMobile
        ? Math.round(window.innerHeight * 0.85)
        : Math.round(window.innerHeight * PREVIEW_HEIGHT_RATIO),
      scrollableOnMobile: isMobile,
    });
  }, []);

  useEffect(() => {
    if (!showPreview) return;
    updatePreviewSize();
    window.addEventListener("resize", updatePreviewSize);
    return () => window.removeEventListener("resize", updatePreviewSize);
  }, [showPreview, updatePreviewSize]);

  const coverPreviewUrl = useMemo(() => {
    if (coverFile) return URL.createObjectURL(coverFile);
    return coverImageUrl || "";
  }, [coverFile, coverImageUrl]);
  const profilePreviewUrl = useMemo(() => {
    if (profileFile) return URL.createObjectURL(profileFile);
    return profileImageUrl || "";
  }, [profileFile, profileImageUrl]);

  useEffect(() => () => {
    if (coverPreviewUrl.startsWith("blob:")) URL.revokeObjectURL(coverPreviewUrl);
  }, [coverPreviewUrl]);
  useEffect(() => () => {
    if (profilePreviewUrl.startsWith("blob:")) URL.revokeObjectURL(profilePreviewUrl);
  }, [profilePreviewUrl]);

  const allRequiredFilled =
    (coverImageUrl !== "" || coverFile != null) &&
    (profileImageUrl !== "" || profileFile != null) &&
    fullName.trim() !== "" &&
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    title.trim() !== "" &&
    org.trim() !== "" &&
    interests.trim() !== "" &&
    phone.trim() !== "" &&
    workEmail.trim() !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id || !allRequiredFilled || saving) return;
    setSaving(true);
    setSubmitError(null);
    try {
      let finalCoverUrl = coverImageUrl;
      let finalProfileUrl = profileImageUrl;

      if (coverFile) {
        const formDataCover = new FormData();
        formDataCover.append("file", coverFile);
        const resCover = await fetch("/api/fileupload", { method: "POST", body: formDataCover });
        const dataCover = (await resCover.json()) as { url?: string; key?: string; error?: string; message?: string };
        if (!resCover.ok) throw new Error(dataCover.error ?? dataCover.message ?? "Cover image upload failed");
        finalCoverUrl = dataCover.url ?? (dataCover.key ? `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? ""}/${dataCover.key}`.replace(/\/+/g, "/") : "");
        if (!finalCoverUrl) throw new Error("Could not get cover image URL");
      }
      if (profileFile) {
        const formDataProfile = new FormData();
        formDataProfile.append("file", profileFile);
        const resProfile = await fetch("/api/fileupload", { method: "POST", body: formDataProfile });
        const dataProfile = (await resProfile.json()) as { url?: string; key?: string; error?: string; message?: string };
        if (!resProfile.ok) throw new Error(dataProfile.error ?? dataProfile.message ?? "Profile image upload failed");
        finalProfileUrl = dataProfile.url ?? (dataProfile.key ? `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? ""}/${dataProfile.key}`.replace(/\/+/g, "/") : "");
        if (!finalProfileUrl) throw new Error("Could not get profile image URL");
      }

      const resCard = await fetch(`/api/cards/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName.trim(),
          profession: title.trim(),
          Company: org.trim(),
          hobbie: interests.trim(),
          cover_image_url: finalCoverUrl,
          profile_image_url: finalProfileUrl,
          mobile: phone.trim() || undefined,
          gmail: workEmail.trim() || undefined,
          personal_website_link: undefined,
          instagram: instagramUrl.trim() || undefined,
          whatsapp: whatsAppUrl.trim() || undefined,
          twitter: twitterUrl.trim() || undefined,
          telegram: telegramUrl.trim() || undefined,
          linkedin: linkedInUrl.trim() || undefined,
        }),
      });
      const dataCard = (await resCard.json()) as { success?: boolean; error?: string };
      if (!resCard.ok) {
        throw new Error(dataCard.error ?? "Failed to update card");
      }
      if (!dataCard.success) {
        throw new Error(dataCard.error ?? "Failed to update card");
      }
      setCoverImageUrl(finalCoverUrl);
      setProfileImageUrl(finalProfileUrl);
      setCoverFile(null);
      setProfileFile(null);
      if (coverInputRef.current) coverInputRef.current.value = "";
      if (profileInputRef.current) profileInputRef.current.value = "";
      setSaved(true);
      setTimeout(() => setSaved(false), 5000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <p className="text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }
  if (fetchError || !card) {
    return (
      <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <Link href="/admin/cards" className="absolute left-6 top-6 z-10 text-xl font-medium text-zinc-600 dark:text-zinc-100">
          Back to cards
        </Link>
        <div className="flex min-h-screen items-center justify-center px-6 pt-24">
          <p className="text-red-600 dark:text-red-400">{fetchError ?? "Card not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-50 font-sans dark:bg-zinc-950">
      <Link
        href="/admin/cards"
        className="absolute left-6 top-6 z-10 text-xl font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-100 dark:hover:text-zinc-200"
        aria-label="Back to cards"
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
            Edit card
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Update the digital business card. Changes are saved to the existing card.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-10">
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-50">Images</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cover-image" className={labelClass}>Cover / poster image</label>
                  <input
                    id="cover-image"
                    type="file"
                    accept="image/*"
                    ref={coverInputRef}
                    onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                    className={inputClass}
                  />
                  {coverFile && <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{coverFile.name}</p>}
                  {!coverFile && coverImageUrl && <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Current image in use</p>}
                </div>
                <div>
                  <label htmlFor="profile-image" className={labelClass}>Profile image</label>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    ref={profileInputRef}
                    onChange={(e) => setProfileFile(e.target.files?.[0] ?? null)}
                    className={inputClass}
                  />
                  {profileFile && <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{profileFile.name}</p>}
                  {!profileFile && profileImageUrl && <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Current image in use</p>}
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-50">Name & role</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="full-name" className={labelClass}>Full name (as on card)</label>
                  <input id="full-name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" className={inputClass} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className={labelClass}>First name (for Save Contact)</label>
                    <input id="first-name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="last-name" className={labelClass}>Last name (for Save Contact)</label>
                    <input id="last-name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="title" className={labelClass}>Job title</label>
                  <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job title" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="org" className={labelClass}>Organization</label>
                  <input id="org" type="text" value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Organization" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="interests" className={labelClass}>Interests (short line under role)</label>
                  <input id="interests" type="text" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="Interests" className={inputClass} />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-50">Contact (card & Save Contact)</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone</label>
                  <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 8900" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="personal-email" className={labelClass}>Personal email</label>
                  <input id="personal-email" type="email" value={personalEmail} onChange={(e) => setPersonalEmail(e.target.value)} placeholder="personal@email.com" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="work-email" className={labelClass}>Work email</label>
                  <input id="work-email" type="email" value={workEmail} onChange={(e) => setWorkEmail(e.target.value)} placeholder="work@example.com" className={inputClass} />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-50">Social & messaging links</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="linkedin" className={labelClass}>LinkedIn URL</label>
                  <input id="linkedin" type="url" value={linkedInUrl} onChange={(e) => setLinkedInUrl(e.target.value)} placeholder="https://linkedin.com/in/..." className={inputClass} />
                </div>
                <div>
                  <label htmlFor="telegram" className={labelClass}>Telegram URL</label>
                  <input id="telegram" type="url" value={telegramUrl} onChange={(e) => setTelegramUrl(e.target.value)} placeholder="https://t.me/..." className={inputClass} />
                </div>
                <div>
                  <label htmlFor="twitter" className={labelClass}>Twitter / X URL</label>
                  <input id="twitter" type="url" value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} placeholder="https://x.com/..." className={inputClass} />
                </div>
                <div>
                  <label htmlFor="whatsapp" className={labelClass}>WhatsApp URL</label>
                  <input id="whatsapp" type="url" value={whatsAppUrl} onChange={(e) => setWhatsAppUrl(e.target.value)} placeholder="https://wa.me/..." className={inputClass} />
                </div>
                <div>
                  <label htmlFor="instagram" className={labelClass}>Instagram URL</label>
                  <input id="instagram" type="url" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} placeholder="https://instagram.com/..." className={inputClass} />
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
                disabled={!allRequiredFilled || saving}
                className="rounded-lg bg-zinc-900 px-6 py-2.5 font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {saving ? "Saving" : "Save changes"}
              </button>
              {saved && <span className="text-sm font-medium text-green-600 dark:text-green-400">Card updated.</span>}
              {submitError && <p className="text-sm font-medium text-red-600 dark:text-red-400" role="alert">{submitError}</p>}
            </div>
          </form>
        </div>
      </main>

      {showPreview && (
        <div className="fixed inset-0 z-50 flex min-h-0 items-center justify-center p-4" aria-modal role="dialog" aria-label="Card preview">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPreview(false)} aria-hidden />
          <div className="relative flex max-h-screen min-h-0 w-full max-w-full flex-col items-center gap-4">
            <div
              className={`w-full flex min-h-0 justify-center ${previewSize.scrollableOnMobile ? "max-h-[85vh] flex-1 overflow-y-auto overscroll-contain" : "sm:max-h-none sm:flex-none sm:overflow-visible"}`}
              style={previewSize.scrollableOnMobile ? { WebkitOverflowScrolling: "touch" as const } : undefined}
            >
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
            </div>
            <button type="button" onClick={() => setShowPreview(false)} className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-lg transition hover:bg-zinc-100 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700">
              Close preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
