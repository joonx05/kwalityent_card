"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Card = {
  id: string;
  name: string;
  profession: string;
  hobbie: string;
};

export default function AdminCardsPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/cards")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cards");
        return res.json() as Promise<Card[]>;
      })
      .then((data) => {
        setCards(data);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setCards([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-50 font-sans dark:bg-zinc-950">
      <Link
        href="/admin"
        className="absolute left-6 top-6 z-10 text-xl font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-100 dark:hover:text-zinc-200"
        aria-label="Back to admin"
      >
        Kwality Enterprises
      </Link>
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-amber-50/60 via-transparent to-transparent dark:from-amber-950/20"
        aria-hidden
      />

      <main className="relative px-6 pb-20 pt-24 sm:px-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            All cards
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Cards created and stored in the database.
          </p>

          {loading && (
            <p className="mt-8 text-zinc-500 dark:text-zinc-400">Loading...</p>
          )}
          {error && (
            <p className="mt-8 text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}
          {!loading && !error && cards.length === 0 && (
            <p className="mt-8 text-zinc-500 dark:text-zinc-400">
              No cards yet.
            </p>
          )}
          {!loading && !error && cards.length > 0 && (
            <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50">
                    <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-50">
                      Name
                    </th>
                    <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-50">
                      Profession
                    </th>
                    <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-50">
                      Hobbie
                    </th>
                    <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-50">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cards.map((card) => (
                    <tr
                      key={card.id}
                      className="group border-b border-zinc-100 last:border-0 dark:border-zinc-800"
                    >
                      <td className="px-4 py-3 text-zinc-800 dark:text-zinc-200">
                        {card.name}
                      </td>
                      <td className="px-4 py-3 text-zinc-800 dark:text-zinc-200">
                        {card.profession}
                      </td>
                      <td className="px-4 py-3 text-zinc-800 dark:text-zinc-200">
                        {card.hobbie}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/cards/${card.id}`}
                          className="inline-flex rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 opacity-0 transition-opacity hover:bg-zinc-100 hover:text-zinc-900 group-hover:opacity-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
