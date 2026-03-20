import { Bot, CheckCircle, AlertCircle, Clock, Zap } from "lucide-react";

const activityIcons = {
  completed: CheckCircle,
  started: Zap,
  waiting: Clock,
  error: AlertCircle,
};

const activityColors = {
  completed: "text-green-400",
  started: "text-primary",
  waiting: "text-yellow-400",
  error: "text-red-400",
};

export default function ActivityFeed({ activities }) {
  return (
    <div className="bg-surface rounded-xl border border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-white flex items-center gap-2">
          <Zap size={18} className="text-primary" />
          Live Activity
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type] || Zap;
          const colorClass = activityColors[activity.type] || "text-gray-400";

          return (
            <div
              key={index}
              className="flex gap-3 p-3 bg-surface-elevated rounded-lg border border-border/50 hover:border-border transition-colors"
            >
              <div className={`mt-0.5 ${colorClass}`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-primary">{activity.agent}</span>
                  <span className="text-xs text-gray-600 font-mono">{activity.time}</span>
                </div>
                <p className="text-sm text-gray-300">{activity.action}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
