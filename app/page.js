import SiteChrome from "@/components/layout/SiteChrome";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import Stats from "@/components/home/Stats";
import Experience from "@/components/home/Experience";
import Contact from "@/components/home/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <SiteChrome />
      <Navbar />

      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        {/* Reference: services + testimonials share one green backdrop */}
        <div className="uni-bg">
          <Stats />
          <Experience />
        </div>
        <Contact />
      </main>

      <Footer />
    </>
  );
}
