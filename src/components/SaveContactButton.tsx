"use client";

/**
 * Builds a vCard 3.0 string for "Add to Contacts" / Save Contact.
 * Downloading a .vcf file lets users add the contact to their phone or address book.
 */
function buildVCard(contact: {
  fullName: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  org?: string;
  phone?: string;
  email?: string;
}): string {
  const { fullName, firstName, lastName, title, org, phone, email } = contact;
  // vCard N is Last;First;Middle;;
  const n = [lastName ?? "", firstName ?? fullName, "", "", ""].join(";");
  const lines: string[] = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCard(fullName)}`,
    `N:${n}`,
  ];
  if (title) lines.push(`TITLE:${escapeVCard(title)}`);
  if (org) lines.push(`ORG:${escapeVCard(org)}`);
  if (phone) lines.push(`TEL;TYPE=CELL:${phone.replace(/\s/g, "")}`);
  if (email) lines.push(`EMAIL:${email}`);
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

function escapeVCard(value: string): string {
  return value.replace(/[\\;,\n]/g, (c) => (c === "\n" ? "\\n" : `\\${c}`));
}

function downloadVCard(vcard: string, filename: string) {
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export type SaveContactButtonProps = {
  fullName: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  org?: string;
  phone?: string;
  email?: string;
  className?: string;
  "aria-label"?: string;
};

export function SaveContactButton({
  fullName,
  firstName,
  lastName,
  title,
  org,
  phone,
  email,
  className,
  "aria-label": ariaLabel,
}: SaveContactButtonProps) {
  const handleSaveContact = () => {
    const vcard = buildVCard({
      fullName,
      firstName,
      lastName,
      title,
      org,
      phone,
      email,
    });
    const filename = `${fullName.replace(/\s+/g, "_")}.vcf`;
    downloadVCard(vcard, filename);
  };

  return (
    <button
      type="button"
      onClick={handleSaveContact}
      className={className}
      aria-label={ariaLabel ?? "Save contact"}
      title="Save to Contacts"
    >
      <svg
        className="h-6 w-6"
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
    </button>
  );
}
