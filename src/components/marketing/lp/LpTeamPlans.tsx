import { MoreVertical } from "lucide-react";
import teamToolsPanel from "@/assets/team-tools-panel.png";

const users = [
  { name: "Zoya Kendall", email: "zoya.kendall@korsola.com", spent: "1.2M", avail: "1.7M", pct: 0.4, color: "bg-blue-500" },
  { name: "Arlo Finch", email: "afinch@korsola.com", spent: "310.6K", avail: "877.1K", pct: 0.25, color: "bg-blue-500" },
  { name: "Demi Ochoa", email: "demiochoa@korsola.com", spent: "10.7M", avail: "19.2M", pct: 0.55, color: "bg-blue-500" },
  { name: "Nala Jones", email: "njones@korsola.com", spent: "69.9K", avail: "30K", pct: 0.7, color: "bg-amber-400" },
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
            <div className="mt-6 rounded-xl overflow-hidden">
              <img
                src={teamToolsPanel}
                alt="AI tools admin panel showing Nano Banana Pro, Seedance 2, ElevenLabs, and Flux 2 with availability toggles"
                loading="lazy"
                className="w-full h-auto select-none pointer-events-none"
                draggable={false}
              />
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
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet to-pink-500 shrink-0" />
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
