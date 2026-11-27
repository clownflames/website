import { Icon } from "@/components/icons";
import type { ProjectItem } from "@/lib/queries";

const accents: Record<string, string> = {
  violet: "from-[#4f34e8] via-[#7a5cff] to-[#c9b8ff]",
  lime: "from-[#a7c62a] via-[#d8f45c] to-[#f2ffb8]",
  sky: "from-[#1f6feb] via-[#57a8ff] to-[#c9e4ff]",
  amber: "from-[#b45309] via-[#f59e0b] to-[#ffe6b0]",
  rose: "from-[#9d174d] via-[#f43f5e] to-[#ffd0d9]",
  mint: "from-[#0f766e] via-[#2dd4bf] to-[#c8fff4]",
};

function initials(title: string) {
  return title
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function ProjectCard({ project, large = false }: { project: ProjectItem; large?: boolean }) {
  const gradient = accents[project.accent] ?? accents.violet;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-32px_rgba(10,12,18,0.35)]">
      <div className={"relative overflow-hidden bg-gradient-to-br " + gradient + (large ? " aspect-[16/9]" : " aspect-[4/3]")}>
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:36px_36px]" />
        <span className="absolute left-5 top-5 rounded-full bg-black/25 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          {project.category ?? "Project"}
        </span>
        {project.year ? (
          <span className="absolute right-5 top-5 text-[0.7rem] font-medium text-white/70">{project.year}</span>
        ) : null}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="select-none text-[5.5rem] font-semibold tracking-[-0.08em] text-white/25 transition-transform duration-500 group-hover:scale-110">
            {initials(project.title)}
          </span>
        </div>
        <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/65">
          <Icon name="layers" size={13} />
          Erstian build
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.05rem] font-semibold tracking-[-0.01em] text-ink">{project.title}</h3>
        <p className="mt-2 text-sm leading-6 text-ink/50">{project.summary}</p>
        {project.tags ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.split(",").map((tag) => (
              <span className="rounded-full bg-cream px-2.5 py-1 text-[0.68rem] font-medium text-ink/60" key={tag}>
                {tag.trim()}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
