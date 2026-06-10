import {
  Cloud,
  FileText,
  Folder,
  Image,
  LockKeyhole,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";

import { cn } from "@/lib/utils";

const contentByMode = {
  login: {
    eyebrow: "Secure access",
    title: "Welcome back",
    description: "Sign in to pick up your CloudMemories workspace.",
    sideTitle: "Your private cloud workspace is ready when you are.",
    sideDescription:
      "Files, shared folders, and connected drives stay organized in one calm workspace.",
  },
  register: {
    eyebrow: "Start your workspace",
    title: "Create your account",
    description: "Set up CloudMemories and keep your files close.",
    sideTitle: "Bring your memories and files into one organized place.",
    sideDescription:
      "Create a secure account, verify your email, and start storing your moments with confidence.",
  },
};

const recentItems = [
  {
    icon: <Image className="size-4" />,
    name: "Family photos",
    meta: "128 files",
    className: "bg-cyan-400/15 text-cyan-100",
  },
  {
    icon: <Folder className="size-4" />,
    name: "Shared workspace",
    meta: "12 folders",
    className: "bg-emerald-400/15 text-emerald-100",
  },
  {
    icon: <FileText className="size-4" />,
    name: "Travel notes",
    meta: "Updated today",
    className: "bg-amber-300/15 text-amber-100",
  },
];

function BrandMark({ dark = false }) {
  return (
    <div className={cn("flex items-center gap-3", dark ? "text-white" : "text-slate-950")}>
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-lg shadow-sm",
          dark ? "bg-white text-slate-950" : "bg-slate-950 text-white",
        )}
      >
        <Cloud className="size-5" fill="currentColor" />
      </div>
      <span className="text-lg font-semibold tracking-tight">CloudMemories</span>
    </div>
  );
}

function WorkspacePreview() {
  return (
    <div className="w-full max-w-md rounded-lg border border-white/15 bg-white/[0.08] p-4 shadow-2xl backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white">Recent activity</p>
          <p className="text-xs text-slate-400">Synced just now</p>
        </div>
        <div className="flex size-9 items-center justify-center rounded-md bg-white text-slate-950">
          <UploadCloud className="size-4" />
        </div>
      </div>

      <div className="space-y-3">
        {recentItems.map(({ icon, name, meta, className }) => (
          <div
            key={name}
            className="flex items-center gap-3 rounded-md border border-white/10 bg-slate-950/35 p-3"
          >
            <div className={cn("flex size-10 items-center justify-center rounded-md", className)}>
              {icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{name}</p>
              <p className="truncate text-xs text-slate-400">{meta}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-md border border-white/10 bg-slate-950/35 p-3">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium text-slate-200">Storage used</span>
          <span className="text-cyan-100">68%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[68%] rounded-full bg-cyan-300" />
        </div>
      </div>
    </div>
  );
}

export function AuthShell({ children, mode = "login", title, description }) {
  const content = contentByMode[mode] || contentByMode.login;

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)]">
        <aside className="relative hidden min-h-screen overflow-hidden bg-slate-950 p-10 text-white lg:flex">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          <div className="relative z-10 flex w-full flex-col justify-between gap-10">
            <BrandMark dark />

            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm text-slate-200">
                <ShieldCheck className="size-4 text-cyan-200" />
                Private by default
              </div>

              <div className="space-y-4">
                <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight">
                  {content.sideTitle}
                </h2>
                <p className="max-w-lg text-base leading-7 text-slate-300">
                  {content.sideDescription}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <WorkspacePreview />

              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-md border border-white/10 bg-white/[0.06] p-3">
                  <p className="font-semibold text-white">2.4 TB</p>
                  <p className="mt-1 text-xs text-slate-400">Protected</p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/[0.06] p-3">
                  <p className="font-semibold text-white">18</p>
                  <p className="mt-1 text-xs text-slate-400">Folders</p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/[0.06] p-3">
                  <p className="font-semibold text-white">99.9%</p>
                  <p className="mt-1 text-xs text-slate-400">Synced</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-12">
          <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-8 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
            <div className="mb-8 lg:hidden">
              <BrandMark />
            </div>

            <div className="mb-8 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
                <LockKeyhole className="size-3.5 text-cyan-600" />
                {content.eyebrow}
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  {title || content.title}
                </h1>
                <p className="text-sm leading-6 text-slate-600 sm:text-base">
                  {description || content.description}
                </p>
              </div>
            </div>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
