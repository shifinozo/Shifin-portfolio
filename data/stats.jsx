// The section renders the showcase clip only; these figures are no longer
// displayed, but stay exposed to assistive tech and search engines.
export const STATS = [
  { id: "projects", stat: "4+", description: "Full-Stack Projects" },
  { id: "production", stat: "2", description: "Live In Production" },
  { id: "tools", stat: "20+", description: "Technologies & Tools" },
  { id: "clean-code", stat: "100%", description: "Clean, Readable Code" },
];

// Centre-stage media for the pinned stats section (reference: 3D object canvas).
// Provide a video (preferred) or an image; the slot hides itself while the file is missing.
export const STATS_MEDIA = {
  video: "/videos/stats-showcase.mp4",
  poster: "",
  image: "",
};
