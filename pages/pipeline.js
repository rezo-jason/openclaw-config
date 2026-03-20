import Layout from "@/components/Layout";
import { GitBranch, GitCommit, GitMerge, CheckCircle, Clock, AlertCircle } from "lucide-react";

const pipelines = [
  {
    id: 1,
    name: "Production Deploy",
    branch: "main",
    status: "success",
    lastRun: "2 minutes ago",
    duration: "3m 24s",
    stages: [
      { name: "Build", status: "success" },
      { name: "Test", status: "success" },
      { name: "Deploy", status: "success" },
    ],
  },
  {
    id: 2,
    name: "Feature: Analytics Dashboard",
    branch: "feature/analytics-v2",
    status: "running",
    lastRun: "Running now",
    duration: "1m 45s",
    stages: [
      { name: "Build", status: "success" },
      { name: "Test", status: "running" },
      { name: "Deploy", status: "pending" },
    ],
  },
  {
    id: 3,
    name: "Hotfix: Invoice Bug",
    branch: "hotfix/invoice-calc",
    status: "success",
    lastRun: "15 minutes ago",
    duration: "2m 12s",
    stages: [
      { name: "Build", status: "success" },
      { name: "Test", status: "success" },
      { name: "Deploy", status: "success" },
    ],
  },
  {
    id: 4,
    name: "Feature: Email Templates",
    branch: "feature/email-templates",
    status: "failed",
    lastRun: "1 hour ago",
    duration: "4m 56s",
    stages: [
      { name: "Build", status: "success" },
      { name: "Test", status: "failed" },
      { name: "Deploy", status: "skipped" },
    ],
  },
  {
    id: 5,
    name: "Nightly Build",
    branch: "develop",
    status: "pending",
    lastRun: "Scheduled for 2:00 AM",
    duration: "--",
    stages: [
      { name: "Build", status: "pending" },
      { name: "Test", status: "pending" },
      { name: "Deploy", status: "pending" },
    ],
  },
];

const statusConfig = {
  success: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/20" },
  running: { icon: Clock, color: "text-primary", bg: "bg-primary/20" },
  failed: { icon: AlertCircle, color: "text-red-400", bg: "bg-red-500/20" },
  pending: { icon: Clock, color: "text-gray-400", bg: "bg-gray-500/20" },
  skipped: { icon: GitCommit, color: "text-gray-500", bg: "bg-gray-500/10" },
};

function PipelineCard({ pipeline }) {
  const status = statusConfig[pipeline.status];
  const StatusIcon = status.icon;

  return (
    <div className="p-4 bg-surface-elevated rounded-xl border border-border hover:border-primary/30 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${status.bg} flex items-center justify-center`}>
            <StatusIcon size={20} className={status.color} />
          </div>
          <div>
            <h3 className="font-semibold text-white">{pipeline.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <GitBranch size={12} className="text-gray-500" />
              <span className="text-xs text-gray-500 font-mono">{pipeline.branch}</span>
            </div>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${status.bg} ${status.color} font-mono capitalize`}>
          {pipeline.status}
        </span>
      </div>

      {/* Stages */}
      <div className="flex items-center gap-2 mb-4">
        {pipeline.stages.map((stage, index) => {
          const stageStatus = statusConfig[stage.status];
          const StageIcon = stageStatus.icon;
          return (
            <div key={stage.name} className="flex items-center flex-1">
              <div className={`flex-1 p-2 rounded-lg ${stageStatus.bg} flex items-center justify-center gap-2`}>
                <StageIcon size={14} className={stageStatus.color} />
                <span className={`text-xs ${stageStatus.color}`}>{stage.name}</span>
              </div>
              {index < pipeline.stages.length - 1 && (
                <div className="w-4 h-px bg-border mx-1" />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{pipeline.lastRun}</span>
        <span className="font-mono">{pipeline.duration}</span>
      </div>
    </div>
  );
}

export default function Pipeline() {
  const successCount = pipelines.filter((p) => p.status === "success").length;
  const runningCount = pipelines.filter((p) => p.status === "running").length;
  const failedCount = pipelines.filter((p) => p.status === "failed").length;

  return (
    <Layout title="Pipeline">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">CI/CD Pipeline</h1>
            <p className="text-gray-500">Build and deployment status</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-2">Total Pipelines</p>
              <p className="text-2xl font-bold text-white">{pipelines.length}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-xs text-gray-500">Success</p>
              </div>
              <p className="text-2xl font-bold text-green-400">{successCount}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-xs text-gray-500">Running</p>
              </div>
              <p className="text-2xl font-bold text-primary">{runningCount}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <p className="text-xs text-gray-500">Failed</p>
              </div>
              <p className="text-2xl font-bold text-red-400">{failedCount}</p>
            </div>
          </div>

          {/* Pipeline List */}
          <div className="space-y-4">
            {pipelines.map((pipeline) => (
              <PipelineCard key={pipeline.id} pipeline={pipeline} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
