// The Internet in One Word — make.fun entry
// u-ronigrv-the-internet-in-one-word-e388f33b
//
// The task: describe the whole internet in a single word. The judge
// (a comedy editor) weighs, in order: single word for the whole internet,
// funny by itself, true of the whole internet, surprising, lands in one beat.
// This program scores a shortlist against those five criteria and writes
// the best-scoring word to /output/entry.txt — nothing else.
//
// Scoring: each candidate rated 1-5 per criterion, weighted in the judge's
// own priority order (funny and true weigh heaviest after the single-word
// gate, surprise next, one-beat last). Duplicated words are poison in a
// 507-entry field (byte-identical entries share one rate, earlier receipt
// places above its copies), so the shortlist also carries a uniqueness
// penalty for the obvious first-reach words. Ties break toward the shorter
// word, matching the competition's own tie-break (smaller text wins).

import { mkdirSync, writeFileSync } from "node:fs";

type Candidate = {
  word: string;
  single: number; // 1: one word for the whole internet
  funny: number; // 2: funny by itself, no explanation needed
  truth: number; // 3: true of the whole internet, not one app or mood
  surprise: number; // 4: not the first obvious word
  beat: number; // 5: lands in one beat — readable, short
  obvious: boolean; // the first word anyone would reach for (duplicate risk)
};

const CANDIDATES: Candidate[] = [
  { word: "chaos", single: 5, funny: 2, truth: 5, surprise: 1, beat: 5, obvious: true },
  { word: "unhinged", single: 5, funny: 4, truth: 5, surprise: 2, beat: 5, obvious: true },
  { word: "feral", single: 5, funny: 4, truth: 5, surprise: 3, beat: 5, obvious: true },
  { word: "doomscroll", single: 4, funny: 2, truth: 2, surprise: 1, beat: 3, obvious: true },
  { word: "deranged", single: 5, funny: 4, truth: 5, surprise: 3, beat: 5, obvious: false },
  { word: "unwell", single: 5, funny: 4, truth: 4, surprise: 3, beat: 5, obvious: false },
  { word: "unserious", single: 5, funny: 4, truth: 5, surprise: 3, beat: 4, obvious: false },
  { word: "unsupervised", single: 5, funny: 4, truth: 5, surprise: 3, beat: 4, obvious: false },
  { word: "unmedicated", single: 5, funny: 5, truth: 5, surprise: 4, beat: 4, obvious: false },
  { word: "groupchat", single: 5, funny: 3, truth: 5, surprise: 4, beat: 5, obvious: false },
  { word: "daycare", single: 5, funny: 4, truth: 4, surprise: 4, beat: 5, obvious: false },
  { word: "highschool", single: 5, funny: 4, truth: 5, surprise: 3, beat: 4, obvious: false },
  { word: "asylum", single: 5, funny: 4, truth: 4, surprise: 4, beat: 5, obvious: false },
  { word: "overcaffeinated", single: 5, funny: 4, truth: 4, surprise: 4, beat: 3, obvious: false },
];

// Weights follow the judge's priority order: a word must first be a single
// word for the whole internet, then funny, then true, then surprising,
// then quick. Obvious words lose points: in a 507-entry field the first
// word anyone reaches for is the word a dozen others already submitted.
function score(c: Candidate): number {
  const base =
    c.single * 3 + c.funny * 3 + c.truth * 2 + c.surprise * 2 + c.beat * 1;
  return c.obvious ? base - 6 : base;
}

// Rank highest score first; on a tie the shorter word wins (it lands
// faster and the competition breaks exact ties toward the smaller text).
function ranked(list: Candidate[]): Candidate[] {
  return [...list].sort(
    (a, b) => score(b) - score(a) || a.word.length - b.word.length,
  );
}

const [pick, second, third] = ranked(CANDIDATES);
console.log("top 3:");
for (const c of [pick, second, third]) {
  console.log(`  ${c.word} — score ${score(c)}`);
}

// Gate: exactly one word of plain letters, 1-30 UTF-8 characters,
// not only whitespace. Anything else is refused before writing.
if (!/^[A-Za-z]+$/.test(pick.word)) {
  throw new Error("entry must be a single word of letters");
}
if (pick.word.length < 1 || pick.word.length > 30) {
  throw new Error("entry must be 1-30 characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", pick.word, "utf8");
console.log(`picked: ${pick.word} (${pick.word.length} chars, score ${score(pick)})`);
