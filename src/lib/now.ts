// The "now" strip — small analog signals from real life, rendered in the
// sidebar to offset the digital aesthetic. Edit by hand; later upgrade path
// is a Sanity `now` singleton.

export interface NowSnapshot {
  book: string;
  listening: string;
  city: string;
  last: string;
  updated: string; // free-form, e.g. "this week"
}

export const now: NowSnapshot = {
  book: "The Creative Act — Rick Rubin",
  listening: "Bonobo — Fragments",
  city: "Vancouver, BC",
  last: "walked the seawall before sunrise",
  updated: "this week",
};
