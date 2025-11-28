import { useEffect, useState } from "react";
import { Loader2, TrendingUp, Users, Zap, Clock } from "lucide-react";
import { toast } from "sonner";

interface SystemStats {
  totalUsers: number;
  totalLicenses: number;
  activeSessionsToday: number;
  messagesProcessedToday: number;
  apiCallsToday: number;
  averageResponseTime: number;
  errorRate: number;
  uptime: number;
}

export default function AdminSystemSection() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const response = await fetch("/api/admin/system-stats");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load stats");
      }

      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
      toast.error("Erreur lors du chargement des statistiques");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={32} className="animate-spin text-foreground/60" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-white">Système</h2>
        <p className="text-sm text-foreground/60 mt-1">
          Aperçu des statistiques et de la santé du système
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Utilisateurs"
          value={stats.totalUsers.toString()}
          color="blue"
        />
        <StatCard
          icon={Zap}
          label="Messages aujourd'hui"
          value={stats.messagesProcessedToday.toString()}
          color="amber"
        />
        <StatCard
          icon={TrendingUp}
          label="Sessions actives"
          value={stats.activeSessionsToday.toString()}
          color="emerald"
        />
        <StatCard
          icon={Clock}
          label="Temps moyen (ms)"
          value={Math.round(stats.averageResponseTime).toString()}
          color="purple"
        />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* API Calls */}
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-foreground/60 uppercase tracking-wide">
                Appels API aujourd'hui
              </p>
              <p className="text-3xl font-bold text-white mt-2">
                {stats.apiCallsToday.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${Math.min((stats.apiCallsToday / 10000) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Taux d'erreur */}
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-foreground/60 uppercase tracking-wide">
                Taux d'erreur
              </p>
              <p className="text-3xl font-bold text-white mt-2">
                {stats.errorRate.toFixed(2)}%
              </p>
            </div>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full ${stats.errorRate < 1 ? "bg-emerald-500" : "bg-red-500"}`}
              style={{ width: `${Math.min(stats.errorRate * 10, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Uptime */}
      <div className="rounded-lg border border-white/5 bg-white/[0.02] p-6">
        <p className="text-sm text-foreground/60 uppercase tracking-wide mb-4">
          Disponibilité du système
        </p>
        <div className="flex items-baseline gap-3">
          <p className="text-4xl font-bold text-emerald-400">
            {(stats.uptime * 100).toFixed(2)}%
          </p>
          <p className="text-foreground/60">Disponibilité sur les dernières 24 heures</p>
        </div>
        <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500"
            style={{ width: `${stats.uptime * 100}%` }}
          />
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-lg border border-white/5 bg-white/[0.02] p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Résumé</h3>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-foreground/60 mb-1">Total des licences</p>
            <p className="text-xl font-semibold text-white">
              {stats.totalLicenses.toString()}
            </p>
          </div>
          <div>
            <p className="text-foreground/60 mb-1">Taux de santé</p>
            <p className={`text-xl font-semibold ${stats.errorRate < 1 ? "text-emerald-400" : "text-amber-400"}`}>
              {stats.errorRate < 1 ? "✓ Optimal" : "⚠ À surveiller"}
            </p>
          </div>
        </div>
      </div>

      {/* Auto Refresh Note */}
      <p className="text-xs text-foreground/50 text-center pt-4">
        Les statistiques se mettent à jour automatiquement toutes les 30 secondes
      </p>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: string;
  color: "blue" | "amber" | "emerald" | "purple";
}) {
  const colors = {
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  };

  return (
    <div className={`rounded-lg border p-4 ${colors[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-foreground/70 uppercase tracking-wide mb-2">
            {label}
          </p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <Icon size={20} className="opacity-60" />
      </div>
    </div>
  );
}
