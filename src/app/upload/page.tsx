"use client";

import Link from "next/link";
import { useState, useRef } from "react";

export default function UploadTestPage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
    const [result, setResult] = useState<{ key?: string; message?: string } | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (!selected) return;
        if (!selected.type.startsWith("image/")) {
            setStatus("error");
            setResult({ message: "Please select an image file (e.g. JPG, PNG, GIF, WebP)." });
            setFile(null);
            setPreview(null);
            return;
        }
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
        setStatus("idle");
        setResult(null);
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        setStatus("uploading");
        setResult(null);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await fetch("/api/fileupload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Upload failed");
            setStatus("success");
            setResult({ key: data.key });
        } catch (err) {
            setStatus("error");
            setResult({ message: err instanceof Error ? err.message : "Upload failed" });
        }
    };

    const clearSelection = () => {
        if (preview) URL.revokeObjectURL(preview);
        setFile(null);
        setPreview(null);
        setStatus("idle");
        setResult(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-zinc-50 font-sans dark:bg-zinc-950">
            <Link
                href="/"
                className="absolute left-6 top-6 text-xl font-medium text-zinc-600 dark:text-zinc-100"
            >
                Kwality Enterprises
            </Link>
            <div
                className="pointer-events-none absolute inset-0 bg-linear-to-b from-amber-50/60 via-transparent to-transparent dark:from-amber-950/20"
                aria-hidden
            />

            <main className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-20">
                <div className="mx-auto w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                    <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                        Image upload test
                    </h1>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        Upload an image to test the R2 backend.
                    </p>

                    <form onSubmit={onSubmit} className="mt-6 space-y-4">
                        <div>
                            <label
                                htmlFor="file"
                                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50/50 py-8 transition hover:border-amber-400 hover:bg-amber-50/30 dark:border-zinc-600 dark:bg-zinc-800/50 dark:hover:border-amber-500 dark:hover:bg-amber-950/20"
                            >
                                <input
                                    ref={inputRef}
                                    id="file"
                                    type="file"
                                    accept="image/*"
                                    onChange={onFileChange}
                                    className="hidden"
                                />
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="max-h-40 rounded-lg object-contain"
                                    />
                                ) : (
                                    <span className="text-4xl text-zinc-400">📷</span>
                                )}
                                <span className="mt-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                    {file ? file.name : "Choose an image"}
                                </span>
                            </label>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={!file || status === "uploading"}
                                className="flex-1 rounded-full bg-zinc-900 px-4 py-2.5 font-semibold text-white transition disabled:opacity-50 dark:bg-white dark:text-zinc-900"
                            >
                                {status === "uploading" ? "Uploading…" : "Upload"}
                            </button>
                            {file && (
                                <button
                                    type="button"
                                    onClick={clearSelection}
                                    className="rounded-full border border-zinc-300 px-4 py-2.5 font-medium text-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </form>

                    {status === "success" && result?.key && (
                        <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200">
                            Uploaded. Key: <code className="break-all font-mono">{result.key}</code>
                        </div>
                    )}
                    {status === "error" && result?.message && (
                        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950/50 dark:text-red-200">
                            {result.message}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
