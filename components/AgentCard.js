import { Bot, Zap, Clock, CheckCircle } from "lucide-react";

const statusConfig = {
  working: {
    color: "bg-green-500",
    text: "text-green-400",
    label: "Working",
  },
  idle: {
    color: "bg-yellow-500",
    text: "text-yellow-400",
    label: "Idle",
  },
  busy: {
    color: "bg-red-500",
    text: "text-red-400",
    label: "Busy",
  },
};

export default function AgentCard({ agent, compact = false }) {
  const status = statusConfig[agent.status] || statusConfig.idle;

  if (compact) {
    return (
      <div className="flex items-center gap-2 p-2 bg-surface-elevated rounded-lg border border-border">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Bot size={16} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white truncate">{agent.name}</p>
          <p className="text-xs text-gray-500 truncate">{agent.currentTask}</p>
        </div>
        <div className={`w-2 h-2 rounded-full ${status.color}`} />
      </div>
    );
  }

  return (
    <div className="group relative p-4 bg-surface-elevated rounded-xl border border-border hover:border-primary/30 transition-all cursor-pointer">
      {/* Status indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full ${status.color} animate-pulse`} />
        <span className={`text-xs font-mono ${status.text}`}>{status.label}</span>
      </div>

      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
        <Bot size={24} className="text-primary" />
      </div>

      {/* Info */}
      <h3 className="font-semibold text-white text-sm mb-1">{agent.name}</h3>
      <p className="text-xs text-gray-500 mb-3">{agent.role}</p>

      {/* Current Task */}
      <div className="p-2 bg-background rounded-lg">
        <p className="text-xs text-gray-400 mb-1 font-mono">Current Task:</p>
        <p className="text-xs text-white truncate">{agent.currentTask || "No active task"}</p>
      </div>

      {/* Workload bar */}
      {agent.workload !== undefined && (
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Workload</span>
            <span className="text-primary font-mono">{agent.workload}%</span>
          </div>
          <div className="h-1 bg-background rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${agent.workload}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
