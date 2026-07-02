import {
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiAxios,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiCloudinary,
  SiSocketdotio,
  SiJsonwebtokens,
  SiGit,
} from "react-icons/si";
import { TbApi, TbMail } from "react-icons/tb";

const TECH = [
  { label: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { label: "HTML", Icon: SiHtml5, color: "#E34F26" },
  { label: "CSS", Icon: SiCss, color: "#2965F1" },
  { label: "React (Vite)", Icon: SiReact, color: "#61DAFB" },
  { label: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
  { label: "Context API", Icon: SiReact, color: "#61DAFB" },
  { label: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { label: "Axios", Icon: SiAxios, color: "#5A29E4" },
  { label: "Node.js", Icon: SiNodedotjs, color: "#539E43" },
  { label: "Express.js", Icon: SiExpress, color: "#FFFFFF" },
  { label: "REST API Development", Icon: TbApi, color: "#4FD1FF" },
  { label: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { label: "Cloudinary", Icon: SiCloudinary, color: "#3448C5" },
  { label: "Socket.io", Icon: SiSocketdotio, color: "#FFFFFF" },
  { label: "Nodemailer", Icon: TbMail, color: "#7C5CFF" },
  { label: "JWT Authentication", Icon: SiJsonwebtokens, color: "#FB015B" },
  { label: "Git", Icon: SiGit, color: "#F05032" },
];

function MarqueeGroup({ hidden }) {
  return (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {TECH.map((tech) => (
        <div className="marquee-item" key={tech.label}>
          <tech.Icon style={{ color: tech.color }} />
          <span>{tech.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section className="marquee-section" aria-label="Technologies I work with">
      <svg
        className="marquee-curve"
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="marqueeCurveGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(124,92,255,0)" />
            <stop offset="18%" stopColor="rgba(124,92,255,0.85)" />
            <stop offset="35%" stopColor="rgba(79,209,255,1)" />
            <stop offset="50%" stopColor="rgba(255,92,241,1)" />
            <stop offset="65%" stopColor="rgba(79,209,255,1)" />
            <stop offset="82%" stopColor="rgba(124,92,255,0.85)" />
            <stop offset="100%" stopColor="rgba(124,92,255,0)" />
          </linearGradient>
        </defs>
        <path
          className="marquee-curve-glow"
          d="M0,125 Q600,55 1200,125"
          stroke="url(#marqueeCurveGradient)"
          strokeWidth="16"
          fill="none"
        />
        <path
          className="marquee-curve-core"
          d="M0,125 Q600,55 1200,125"
          stroke="url(#marqueeCurveGradient)"
          strokeWidth="5"
          fill="none"
        />
      </svg>

      <div className="marquee-viewport">
        <div className="marquee-track">
          <MarqueeGroup />
          <MarqueeGroup hidden />
        </div>
      </div>
    </section>
  );
}
