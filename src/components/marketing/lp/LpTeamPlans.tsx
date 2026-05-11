import { MoreVertical } from "lucide-react";
import avatar1 from "@/assets/team-avatar-1.png";
import avatar2 from "@/assets/team-avatar-2.png";
import avatar3 from "@/assets/team-avatar-3.png";
import avatar4 from "@/assets/team-avatar-4.png";

const tools = [
  { name: "Nano Banana Pro", type: "Image generation", on: true, color: "bg-violet/30 text-violet" },
  { name: "Seedance 2", type: "Video generation", on: false, color: "bg-emerald-400/20 text-emerald-400" },
  { name: "ElevenLabs", type: "Audio/Speech", on: true, color: "bg-amber-400/20 text-amber-300" },
  { name: "Flux 2", type: "Image generation", on: false, color: "bg-violet/30 text-violet" },
];

const users = [
  { name: "Zoya Kendall", email: "zoya.kendall@korsola.com", spent: "1.2M", avail: "1.7M", pct: 0.4, color: "bg-blue-500", img: avatar1 },
  { name: "Arlo Finch", email: "afinch@korsola.com", spent: "310.6K", avail: "877.1K", pct: 0.25, color: "bg-blue-500", img: avatar4 },
  { name: "Demi Ochoa", email: "demiochoa@korsola.com", spent: "10.7M", avail: "19.2M", pct: 0.55, color: "bg-blue-500", img: avatar2 },
  { name: "Nala Jones", email: "njones@korsola.com", spent: "69.9K", avail: "30K", pct: 0.7, color: "bg-amber-400", img: avatar3 },
];

export function LpTeamPlans() {
  return (
    <section className="bg-ink text-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-display font-extrabold text-white text-4xl md:text-6xl tracking-tight leading-[1.02] max-w-2xl">
          Team plans built for creative work at scale
        </h2>

        <div className="mt-12 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-display font-extrabold text-white text-2xl">Business</h3>
            <p className="mt-3 text-white/60 text-[15px] leading-relaxed">
              For creative teams and agencies ready to move faster and produce more.
              Shared credits, collaborative workflows, and access to every AI model —
              without the complexity of enterprise procurement.
            </p>
            <button className="mt-5 h-10 px-5 rounded-full bg-white text-ink font-semibold text-sm">
              Learn more
            </button>
          </div>
          <div>
            <h3 className="font-display font-extrabold text-white text-2xl">Enterprise</h3>
            <p className="mt-3 text-white/60 text-[15px] leading-relaxed">
              For organizations where creative output is mission-critical. Full legal
              indemnification, enterprise-grade security, unlimited users, custom
              SSO, and a dedicated team from day one.
            </p>
            <button className="mt-5 h-10 px-5 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/5">
              Talk to the team
            </button>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-5">
          {/* Tools panel */}
          <div className="rounded-3xl bg-[#0e0e10] border border-white/10 p-7">
            <h4 className="font-display font-extrabold text-white text-xl">All the AI tools in a single place</h4>
            <p className="mt-2 text-white/60 text-[14px]">
              Access multiple top-performing generative models from a single platform.
              Choose models via the admin panel.
            </p>
            <div className="mt-6 rounded-xl bg-black/40 border border-white/5 p-4">
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 text-[11px] uppercase tracking-wider text-white/40 font-semibold pb-3 border-b border-white/5">
                <span>Name (12)</span><span>Type</span><span>Available</span><span>Actions</span>
              </div>
              {tools.map((t) => (
                <div key={t.name} className="grid grid-cols-[1fr_auto_auto_auto] gap-3 items-center py-3 border-b border-white/5 last:border-0 text-sm">
                  <span className="text-white">{t.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${t.color}`}>{t.type}</span>
                  <span className={`relative w-9 h-5 rounded-full ${t.on ? "bg-blue-500" : "bg-white/10"}`}>
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${t.on ? "left-4" : "left-0.5"}`} />
                  </span>
                  <MoreVertical className="w-4 h-4 text-white/40" />
                </div>
              ))}
            </div>
          </div>

          {/* Users panel */}
          <div className="rounded-3xl bg-[#0e0e10] border border-white/10 p-7">
            <h4 className="font-display font-extrabold text-white text-xl">Unlimited users, flexible credits</h4>
            <p className="mt-2 text-white/60 text-[14px]">
              Scale freely with no seat limits. Pay based on how many credits you
              use — not how many people use them.
            </p>
            <div className="mt-6 rounded-xl bg-black/40 border border-white/5 p-4 space-y-4">
              {users.map((u) => (
                <div key={u.email} className="flex items-center gap-3">
                  <img src={u.img} alt={u.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-[12px]">
                      <span className="text-white font-semibold">{u.name}</span>
                      <span className="text-white/50">Spent {u.spent} · Avail {u.avail}</span>
                    </div>
                    <div className="text-[11px] text-white/40">{u.email}</div>
                    <div className="mt-1.5 h-1 rounded-full bg-white/5 overflow-hidden">
                      <div className={`h-full ${u.color}`} style={{ width: `${u.pct * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
