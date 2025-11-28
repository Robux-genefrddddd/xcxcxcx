import { Users, Crown, Zap, AlertCircle, TrendingUp, Clock } from "lucide-react";
import { dsClasses } from "@/lib/design-system";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  lastUpdated?: string;
}

function StatCard({ title, value, change, trend, icon, lastUpdated }: StatCardProps) {
  return (
    <div className={`${dsClasses.card} p-6 flex flex-col gap-3 group hover:border-white/10 transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <p className="text-white/70 text-13px font-medium uppercase tracking-wide">{title}</p>
        <div className="text-white/40 group-hover:text-white/60 transition-colors">{icon}</div>
      </div>
      
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        {change && (
          <div
            className={`text-12px font-medium px-2 py-1 rounded-md flex items-center gap-1 ${
              trend === "up"
                ? "bg-emerald-500/15 text-emerald-400"
                : trend === "down"
                  ? "bg-red-500/15 text-red-400"
                  : "bg-gray-500/15 text-gray-400"
            }`}
          >
            <TrendingUp size={12} />
            {change}
          </div>
        )}
      </div>

      {lastUpdated && (
        <p className="text-11px text-white/40 flex items-center gap-1 mt-auto">
          <Clock size={11} />
          {lastUpdated}
        </p>
      )}
    </div>
  );
}

export default function AdminStats() {
  const now = new Date();
  const lastHour = new Date(now.getTime() - 60 * 60 * 1000);

  return (
    <div className="space-y-6">
      {/* Header with description */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Tableau de bord</h2>
        <p className="text-white/60 text-14px">
          Aperçu en temps réel de l'activité du système
        </p>
      </div>

      {/* Main stats grid - Asymmetrical layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Utilisateurs totaux"
          value="412"
          change="+8 cette semaine"
          trend="up"
          icon={<Users size={18} />}
          lastUpdated="À l'instant"
        />
        <StatCard
          title="Administrateurs"
          value="3"
          change="Inchangé"
          trend="neutral"
          icon={<Crown size={18} />}
          lastUpdated="À l'instant"
        />
        <StatCard
          title="Licences actives"
          value="156"
          change="+12 cette semaine"
          trend="up"
          icon={<Zap size={18} />}
          lastUpdated="À l'instant"
        />
        <StatCard
          title="Utilisateurs bannis"
          value="2"
          change="Stable"
          trend="neutral"
          icon={<AlertCircle size={18} />}
          lastUpdated="À l'instant"
        />
      </div>

      {/* Secondary metrics - Compact layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${dsClasses.card} p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-12px font-medium uppercase">Utilisation IA</span>
            <span className="text-emerald-400 text-12px font-semibold">68%</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500/60 to-emerald-400/40 h-full transition-all duration-300"
              style={{ width: "68%" }}
            />
          </div>
          <p className="text-11px text-white/40">2,847 appels cette semaine</p>
        </div>

        <div className={`${dsClasses.card} p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-12px font-medium uppercase">Santé système</span>
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-12px font-semibold">Optimal</span>
            </span>
          </div>
          <p className="text-12px text-white/70">Uptime: 99.94% • Latence: 42ms</p>
          <p className="text-11px text-white/40">Dernier incident: il y a 8 jours</p>
        </div>

        <div className={`${dsClasses.card} p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-12px font-medium uppercase">Stockage</span>
            <span className="text-amber-400 text-12px font-semibold">42%</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500/60 to-amber-400/40 h-full transition-all duration-300"
              style={{ width: "42%" }}
            />
          </div>
          <p className="text-11px text-white/40">84 GB utilisés / 200 GB disponibles</p>
        </div>
      </div>
    </div>
  );
}
