"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";

type BibleBookSummary = {
  abbrev: string;
  name: string;
  chapters: number;
  position: number;
};

type Verse = { verse: number; text: string };

type ChapterResponse = {
  book: BibleBookSummary;
  chapter: number;
  verses: Verse[];
  translation: string;
};

export function BibleReader({ books }: { books: BibleBookSummary[] }) {
  const [book, setBook] = useState("sl");
  const [chapter, setChapter] = useState(23);
  const [data, setData] = useState<ChapterResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const currentBook = useMemo(
    () => books.find((item) => item.abbrev === book),
    [books, book]
  );

  const maxChapter = currentBook?.chapters ?? 1;

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetch(`/api/biblia/${book}/${chapter}`)
      .then(async (response) => {
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.error ?? "Não foi possível carregar o capítulo.");
        }
        return json as ChapterResponse;
      })
      .then((json) => {
        if (active) setData(json);
      })
      .catch((err: unknown) => {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Não foi possível carregar o capítulo."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [book, chapter, reloadKey]);

  function handleBookChange(abbrev: string) {
    setBook(abbrev);
    setChapter(1);
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-brand-900/5">
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-900 via-brand-950 to-ink-950 px-6 py-7 text-white sm:px-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/10" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-300">
              <BookOpen className="h-4 w-4" />
              Almeida Corrigida Fiel
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              {currentBook?.name ?? "Bíblia"} {chapter}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setChapter((value) => Math.max(1, value - 1))}
              disabled={chapter <= 1 || loading}
              className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </button>
            <button
              type="button"
              onClick={() =>
                setChapter((value) => Math.min(maxChapter, value + 1))
              }
              disabled={chapter >= maxChapter || loading}
              className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Próximo
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-[#fbfaf7] px-6 py-5 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-[1.6fr_1fr]">
          <div>
            <label htmlFor="bible-book" className="label">
              Livro
            </label>
            <select
              id="bible-book"
              value={book}
              onChange={(event) => handleBookChange(event.target.value)}
              className="field"
            >
              {books.map((item) => (
                <option key={item.abbrev} value={item.abbrev}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="bible-chapter" className="label">
              Capítulo
            </label>
            <select
              id="bible-chapter"
              value={chapter}
              onChange={(event) => setChapter(Number(event.target.value))}
              className="field"
            >
              {Array.from({ length: maxChapter }, (_, index) => index + 1).map(
                (number) => (
                  <option key={number} value={number}>
                    Capítulo {number}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>

      <div className="min-h-[380px] px-6 py-8 sm:px-10 sm:py-10">
        {loading ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
            <p className="text-sm">Carregando a Palavra...</p>
          </div>
        ) : error ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 text-center">
            <AlertCircle className="h-8 w-8 text-rose-500" />
            <p className="text-sm font-medium text-slate-600">{error}</p>
            <button
              type="button"
              onClick={() => setReloadKey((value) => value + 1)}
              className="btn-ghost !px-4 !py-2 text-xs"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gold-300" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-600">
                {data?.book.name} {data?.chapter}
              </p>
              <span className="h-px w-10 bg-gold-300" />
            </div>

            <div className="font-serif">
              {data?.verses.map((verse) => (
                <p
                  key={verse.verse}
                  className="mb-3.5 text-[1.06rem] leading-[1.85] text-slate-700"
                >
                  <sup className="mr-1.5 font-sans text-[0.68rem] font-bold text-gold-600">
                    {verse.verse}
                  </sup>
                  {verse.text}
                </p>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-between gap-3 border-t border-slate-200 pt-6">
              <button
                type="button"
                onClick={() => setChapter((value) => Math.max(1, value - 1))}
                disabled={chapter <= 1}
                className="btn-ghost !px-4 !py-2 text-xs disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Capítulo anterior
              </button>
              <span className="text-xs font-medium text-slate-400">
                {chapter} / {maxChapter}
              </span>
              <button
                type="button"
                onClick={() =>
                  setChapter((value) => Math.min(maxChapter, value + 1))
                }
                disabled={chapter >= maxChapter}
                className="btn-ghost !px-4 !py-2 text-xs disabled:cursor-not-allowed disabled:opacity-40"
              >
                Próximo capítulo
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
