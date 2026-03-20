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
    <div className="bg-surface-elevated rounded-xl border border-border hover:border-primary/30 transition-all overflow-hidden">
      {/* Vertical row layout - stage name on left, content flowing right */}
      <div className={`flex items-center gap-4 p-4 border-l-4 ${
        pipeline.status === 'success' ? 'border-green-500' :
        pipeline.status === 'running' ? 'border-primary' :
        pipeline.status === 'failed' ? 'border-red-500' : 'border-gray-500'
      }`}>
        {/* Left: Status Icon & Info */}
        <div className="flex items-center gap-3 min-w-[200px] shrink-0">
          <div className={`w-10 h-10 rounded-lg ${status.bg} flex items-center justify-center shrink-0`}>
            <StatusIcon size={20} className={status.color} />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white truncate">{pipeline.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <GitBranch size={12} className="text-gray-500 shrink-0" />
              <span className="text-xs text-gray-500 font-mono truncate">{pipeline.branch}</span>
            </div>
          </div>
        </div>

        {/* Middle: Stages flowing horizontally */}
        <div className="flex-1 flex items-center gap-2 overflow-x-auto">
          {pipeline.stages.map((stage, index) => {
            const stageStatus = statusConfig[stage.status];
            const StageIcon = stageStatus.icon;
            return (
              <div key={stage.name} className="flex items-center shrink-0">
                <div className={`px-4 py-2 rounded-lg ${stageStatus.bg} flex items-center gap-2`}>
                  <StageIcon size={14} className={stageStatus.color} />
                  <span className={`text-xs font-medium ${stageStatus.color}`}>{stage.name}</span>
                </div>
                {index < pipeline.stages.length - 1 && (
                  <div className="w-6 h-px bg-border mx-1" />
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Status & Timing */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <p className="text-xs text-gray-500">{pipeline.lastRun}</p>
            <p className="text-xs text-gray-400 font-mono">{pipeline.duration}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded ${status.bg} ${status.color} font-mono capitalize`}>
            {pipeline.status}
          </span>
        </div>
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
