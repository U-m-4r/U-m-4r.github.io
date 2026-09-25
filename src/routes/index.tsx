import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import formImage from "@/assets/project-form.jpg";
import notesImage from "@/assets/project-notes.jpg";
import spaceImage from "@/assets/project-space.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ahmed Umar — Portfolio" },
      { name: "description", content: "The portfolio of Ahmed Umar: conceptual studies in visual design, process, and digital experiences." },
      { property: "og:title", content: "Ahmed Umar — Portfolio" },
      { property: "og:description", content: "Conceptual studies in visual design, process, and digital experiences by Ahmed Umar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const projects = [
  { number: "01", title: "Form & feeling", category: "Visual exploration", image: formImage, alt: "Sculptural cobalt paper with geometric cutouts on a dark surface", description: "An exploration of shape, shadow, and the space between structure and spontaneity.", tags: ["Art direction", "Composition"] },
  { number: "02", title: "The quiet details", category: "Process study", image: notesImage, alt: "Graphic notebook, pencil, and blue acetate on a desktop", description: "A look at the little decisions that give a visual idea its own point of view.", tags: ["Research", "Visual systems"] },
  { number: "03", title: "Space to think", category: "Image study", image: spaceImage, alt: "Modern concrete stairs with a bright red handrail", description: "Finding rhythm and contrast in the everyday geometry around us.", tags: ["Photography", "Perspective"] },
];

function Index() {
  const [selected, setSelected] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const selectedProject = selected === null ? null : projects[selected];

  useEffect(() => {
    if (selected === null) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <main id="top" className="notebook min-h-screen overflow-hidden paper-grid">
      <div className="mx-auto max-w-[1500px] border-x border-border/70">
        <header className="relative z-20 mx-5 flex h-[76px] items-center justify-between border-b border-foreground md:mx-9 md:h-[88px] lg:mx-14">
          <a href="#top" aria-label="Ahmed Umar, back to top" className="flex items-center gap-3 no-underline">
            <span className="font-display text-[36px] leading-none md:text-[42px]">AU</span>
            <span className="border-l border-foreground/60 pl-3 font-mono text-[10px] uppercase leading-[1.5]">Ahmed Umar</span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
            <a href="#work" className="text-sm hover:text-primary">Selected work</a>
            <a href="#about" className="text-sm hover:text-primary">About me</a>
            <a href="#contact" className="inline-flex items-center gap-3 border border-foreground px-5 py-2.5 text-sm transition-colors hover:bg-foreground hover:text-background">Let’s talk <ArrowUpRight size={16} /></a>
          </nav>
          <Button variant="minimal" size="icon" className="md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </header>
        {menuOpen && <nav aria-label="Mobile navigation" className="relative z-20 mx-5 flex flex-col border-b border-foreground bg-background px-1 pb-4 md:hidden">{[["Selected work", "#work"], ["About me", "#about"], ["Let’s talk", "#contact"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-border py-3 text-sm">{label}</a>)}</nav>}

        <section className="relative mx-5 flex min-h-[565px] flex-col justify-between pb-10 pt-20 md:mx-9 md:min-h-[550px] md:pb-9 md:pt-16 lg:mx-14 lg:min-h-[585px]">
          <span className="hero-scribble pointer-events-none absolute right-0 top-6 hidden md:block" aria-hidden="true" />
          <div className="relative z-10 max-w-[850px]">
            <p className="mb-5 font-display text-xl italic text-accent-foreground md:text-2xl">hey, i’m Ahmed —</p>
            <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase text-muted-foreground"><span className="size-1.5 rounded-full bg-primary" /> Ideas in progress <span className="text-primary">/</span> 2026</div>
            <h1 className="hero-heading font-display uppercase leading-[.79]">Interfaces<br /><span className="text-primary">with</span><br /><span className="text-primary">intent.</span></h1>
            <p className="mt-9 max-w-[460px] text-base leading-relaxed text-muted-foreground md:text-lg">I’m Ahmed Umar. I’m exploring how thoughtful ideas become expressive digital experiences.</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button asChild variant="portfolio" size="default" className="h-12 px-5"><a href="#work">Explore my work <ArrowDown size={16} /></a></Button>
              <a href="#about" className="inline-flex h-12 items-center gap-2 border-b border-foreground text-sm hover:text-primary">A little about me <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="mt-10 flex items-end justify-between gap-4 font-mono text-[10px] uppercase text-muted-foreground"><span className="flex items-center gap-2">Scroll to explore <ArrowDown size={14} className="text-primary" /></span><span className="hidden sm:block">Portfolio / IS-2023-27</span></div>
          <div className="hero-note absolute right-3 top-[130px] hidden w-[255px] border border-foreground bg-card px-6 pb-6 pt-9 shadow-[8px_9px_0_var(--note-shadow)] lg:block xl:right-14 xl:w-[285px]">
            <span className="tape" aria-hidden="true" /><span className="font-mono text-[10px] uppercase text-accent-foreground">Currently</span>
            <p className="mt-14 font-display text-[35px] leading-[1.02]">Making space<br />for <em className="text-primary">better<br />ideas.</em></p>
            <div className="mt-12 border-t border-dashed border-border pt-4 font-mono text-[10px] uppercase">Design / Exploration</div>
          </div>
        </section>
        <div className="flex items-center justify-center gap-6 overflow-hidden border-y border-foreground py-3 font-mono text-[10px] uppercase text-muted-foreground md:gap-14"><span>Visual exploration</span><span className="text-primary">✦</span><span>Digital experiences</span><span className="text-primary">✦</span><span className="hidden sm:inline">Thoughtful details</span></div>

        <section id="work" className="scroll-mt-4 px-5 pb-24 pt-24 md:px-9 md:pb-32 md:pt-28 lg:px-14">
          <div className="mb-12 grid gap-5 md:mb-16 md:grid-cols-[1fr_1fr] md:items-end">
            <div><span className="font-mono text-[10px] uppercase text-muted-foreground">01 / Selected work</span><h2 className="mt-5 font-display text-[clamp(3.5rem,6vw,6.5rem)] leading-[.9]">Made to be<br /><em className="text-primary">felt.</em></h2></div>
            <p className="max-w-[340px] text-sm leading-relaxed text-muted-foreground md:ml-auto md:text-base">A small collection of ideas I’ve explored — studies in form, process, and perspective.</p>
          </div>
          <div className="grid gap-9 md:grid-cols-3 md:gap-5 lg:gap-7">
            {projects.map((project, index) => <Button key={project.number} variant="project" size={null} onClick={() => setSelected(index)} aria-label={`View ${project.title} study`} className={`polaroid polaroid-${index + 1} border border-foreground bg-card p-2.5 pb-4 shadow-[5px_6px_0_var(--note-shadow)] md:p-3`}>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted"><img src={project.image} alt={project.alt} loading="lazy" width={1200} height={912} className="work-card-image h-full w-full object-cover" /><span className="absolute right-3 top-3 flex size-9 items-center justify-center bg-card text-foreground"><ArrowUpRight size={18} strokeWidth={1.5} /></span></div>
              <div className="px-1 pt-4"><span className="font-mono text-[10px] uppercase text-accent-foreground">{project.number} / {project.category}</span><h3 className="mt-2 font-display text-[clamp(1.8rem,2.5vw,2.6rem)] leading-none">{project.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p><div className="mt-5 flex flex-wrap gap-1.5">{project.tags.map(tag => <span key={tag} className="border border-border px-2 py-1 font-mono text-[9px] uppercase text-muted-foreground">{tag}</span>)}</div></div>
            </Button>)}
          </div>
          <p className="mt-14 border-t border-foreground pt-4 font-mono text-[10px] uppercase text-muted-foreground">Conceptual studies / not client projects</p>
        </section>

        <section id="about" className="scroll-mt-4 border-y border-foreground px-5 py-24 md:px-9 md:py-28 lg:px-14">
          <div className="grid gap-10 md:grid-cols-[1fr_1.15fr_.55fr] md:gap-12"><span className="font-mono text-[10px] uppercase text-muted-foreground">02 / A little about me</span><div><h2 className="font-display text-[clamp(3.4rem,5.6vw,6rem)] leading-[.9]">Good work<br />lives between<br /><em className="text-accent-foreground">logic</em> and<br />feeling.</h2><p className="mt-9 max-w-[450px] text-base leading-relaxed text-muted-foreground">I’m Ahmed Umar. This is a space for the things I’m making, noticing, and learning along the way.</p><p className="mt-5 max-w-[450px] text-base leading-relaxed text-muted-foreground">I’m drawn to the small decisions that give an idea clarity and character.</p></div><div className="flex flex-col justify-end border-l border-border pl-6 font-mono text-[11px] uppercase text-muted-foreground"><span className="mb-3 text-4xl font-display normal-case text-primary">∞</span><span>Always curious.</span><span>Always in progress.</span></div></div>
        </section>

        <section id="contact" className="scroll-mt-4 px-5 py-24 md:px-9 md:py-32 lg:px-14"><span className="font-mono text-[10px] uppercase text-muted-foreground">03 / Start a conversation</span><h2 className="mt-5 font-display text-[clamp(3.5rem,6.2vw,7rem)] leading-[.92]">Have a good idea?<br /><em className="text-primary">Let’s make it real.</em></h2><div className="mt-16 flex flex-col gap-5 border-t border-dashed border-border pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="flex items-center gap-3 text-sm text-muted-foreground"><Mail size={18} /> Contact details are coming soon.</p><a href="#top" className="flex items-center gap-2 text-sm hover:text-primary">Back to top <ArrowRight size={16} className="-rotate-90" /></a></div></section>
        <footer className="flex flex-col gap-3 border-t border-foreground px-5 py-6 font-mono text-[10px] uppercase text-muted-foreground sm:flex-row sm:justify-between md:px-9 lg:px-14"><span>© 2026 Ahmed Umar</span><span>Made with care.</span><span>IS-2023-27</span></footer>
      </div>

      {selectedProject && <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }} role="presentation"><div role="dialog" aria-modal="true" aria-label={`${selectedProject.title} study`} className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-foreground bg-background shadow-2xl"><Button variant="portfolioOutline" size="icon" className="absolute right-4 top-4 z-10 bg-background" onClick={() => setSelected(null)} aria-label="Close project"><X /></Button><img src={selectedProject.image} alt={selectedProject.alt} width={1200} height={912} className="aspect-[16/9] w-full object-cover" /><div className="p-6 md:p-10"><span className="font-mono text-[10px] uppercase text-accent-foreground">{selectedProject.number} / {selectedProject.category} / Conceptual study</span><h2 className="mt-3 font-display text-5xl md:text-7xl">{selectedProject.title}</h2><p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{selectedProject.description}</p><div className="mt-8 flex flex-wrap gap-2">{selectedProject.tags.map(tag => <span key={tag} className="border border-border px-3 py-2 font-mono text-[10px] uppercase">{tag}</span>)}</div></div></div></div>}
    </main>
  );
}
