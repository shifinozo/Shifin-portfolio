export const STATS_HEADLINE = ["What the work", "adds up to."];

export const STATS = [
  { id: "projects", stat: "3+", description: "Full-Stack Projects" },
  { id: "production", stat: "1", description: "Live In Production" },
  { id: "tools", stat: "15+", description: "Technologies & Tools" },
  { id: "clean-code", stat: "100%", description: "Clean, Readable Code" },
];

// Centre-stage media for the pinned stats section (reference: 3D object canvas).
// Provide a video (preferred) or an image; the slot hides itself while the file is missing.
export const STATS_MEDIA = {
  video: "/images/stats/showcase.mp4",
  poster: "/images/stats/showcase.jpg",
  image: "",
};
