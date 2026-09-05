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
// Scroll-scrubbed: this file is encoded with a keyframe on every frame so any
// seek is a direct jump. A normally-encoded clip (keyframes every ~2.7s) makes
// the browser decode forward from the last keyframe on each scroll event, which
// is what causes scrubbing to stutter. Re-encode replacements the same way:
//   ffmpeg -i in.mp4 -an -vf scale=1280:-2 -c:v libx264 -g 1 -keyint_min 1 \
//          -sc_threshold 0 -crf 26 -preset slow -movflags +faststart out.mp4
export const STATS_MEDIA = {
  video: "/videos/stats-showcase-scrub.mp4",
  poster: "",
  image: "",
};
