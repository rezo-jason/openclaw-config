import Layout from "@/components/Layout";
import { useState } from "react";
import { Bot, Clock, CheckCircle, XCircle, ChevronRight, Zap, Brain, History } from "lucide-react";

const agents = [
  {
    id: 1,
    name: "Main Coordinator",
    role: "Central Hub",
    status: "working",
    currentTask: "Orchestrating daily operations",
    workload: 75,
    tasksCompleted: 1247,
    uptime: "99.9%",
    memory: [
      "Scheduled marketing campaign for Q2 launch",
      "Coordinated with Finance for monthly reporting",
      "Assigned 12 new tasks to team agents",
    ],
    history: [
      { action: "Dispatched task batch to Marketing", time: "2m ago", type: "success" },
      { action: "Updated system configuration", time: "15m ago", type: "success" },
      { action: "Processed priority escalation", time: "1h ago", type: "success" },
    ],
  },
  {
    id: 2,
    name: "Planner",
    role: "Strategy & Planning",
    status: "working",
    currentTask: "Q2 roadmap optimization",
    workload: 60,
    tasksCompleted: 892,
    uptime: "98.7%",
    memory: [
      "Q2 goals: Increase automation by 40%",
      "Sprint velocity average: 32 points",
      "Key milestone: Launch v2.5 by April",
    ],
    history: [
      { action: "Updated Q2 roadmap milestones", time: "32m ago", type: "success" },
      { action: "Created sprint backlog", time: "2h ago", type: "success" },
      { action: "Reviewed resource allocation", time: "4h ago", type: "success" },
    ],
  },
  {
    id: 3,
    name: "Marketing & Outreach",
    role: "Growth",
    status: "busy",
    currentTask: "Campaign launch for tradies promo",
    workload: 90,
    tasksCompleted: 2341,
    uptime: "97.5%",
    memory: [
      "Target audience: Australian tradies 25-45",
      "Best performing channel: Facebook ads",
      "Email open rate average: 24.5%",
    ],
    history: [
      { action: "Launched Facebook campaign", time: "5m ago", type: "success" },
      { action: "Scheduled 15 social posts", time: "1h ago", type: "success" },
      { action: "A/B test completed", time: "3h ago", type: "success" },
    ],
  },
  {
    id: 4,
    name: "Finance & Compliance",
    role: "Operations",
    status: "idle",
    currentTask: "Awaiting invoice batch",
    workload: 25,
    tasksCompleted: 567,
    uptime: "99.2%",
    memory: [
      "Monthly revenue target: $125,000",
      "Current month collections: $98,450",
      "Outstanding invoices: 23",
    ],
    history: [
      { action: "Processed 12 invoices", time: "45m ago", type: "success" },
      { action: "Generated compliance report", time: "2h ago", type: "success" },
      { action: "Reconciled accounts", time: "1d ago", type: "success" },
    ],
  },
  {
    id: 5,
    name: "Data Analytics",
    role: "Intelligence",
    status: "working",
    currentTask: "Processing weekly metrics",
    workload: 55,
    tasksCompleted: 1893,
    uptime: "98.1%",
    memory: [
      "Avg daily active users: 1,245",
      "Conversion rate: 3.2%",
      "Top traffic source: Organic search",
    ],
    history: [
      { action: "Completed weekly aggregation", time: "12m ago", type: "success" },
      { action: "Generated dashboard report", time: "2h ago", type: "success" },
      { action: "Updated KPI tracking", time: "6h ago", type: "success" },
    ],
  },
  {
    id: 6,
    name: "Memory/Research",
    role: "Knowledge Base",
    status: "working",
    currentTask: "Indexing new documentation",
    workload: 40,
    tasksCompleted: 3421,
    uptime: "99.5%",
    memory: [
      "Total indexed documents: 12,456",
      "Knowledge base size: 2.3GB",
      "Last full reindex: 3 days ago",
    ],
    history: [
      { action: "Indexed 47 new documents", time: "18m ago", type: "success" },
      { action: "Updated search index", time: "1h ago", type: "success" },
      { action: "Archived old records", time: "1d ago", type: "success" },
    ],
  },
  {
    id: 7,
    name: "QA Review",
    role: "Quality Assurance",
    status: "idle",
    currentTask: "Queue empty - standing by",
    workload: 10,
    tasksCompleted: 456,
    uptime: "97.8%",
    memory: [
      "Avg review time: 15 minutes",
      "Pass rate: 94%",
      "Common issues: Missing tests",
    ],
    history: [
      { action: "Approved deployment v2.4.0", time: "25m ago", type: "success" },
      { action: "Rejected PR #234 - missing tests", time: "2h ago", type: "error" },
      { action: "Completed code review", time: "4h ago", type: "success" },
    ],
  },
  {
    id: 8,
    name: "Execution/Compiler",
    role: "Build & Deploy",
    status: "busy",
    currentTask: "Deploying v2.4.1 hotfix",
    workload: 85,
    tasksCompleted: 789,
    uptime: "96.9%",
    memory: [
      "Last successful deploy: v2.4.0",
      "Average build time: 3m 24s",
      "Deployment success rate: 98.5%",
    ],
    history: [
      { action: "Started deployment v2.4.1", time: "5m ago", type: "success" },
      { action: "Build completed successfully", time: "8m ago", type: "success" },
      { action: "Deployed v2.4.0 to production", time: "2h ago", type: "success" },
    ],
  },
  {
    id: 9,
    name: "Next Agent",
    role: "Future Tasks",
    status: "idle",
    currentTask: "Scheduled for 3:00 PM",
    workload: 0,
    tasksCompleted: 234,
    uptime: "99.0%",
    memory: [
      "Pending tasks: 5",
      "Next scheduled run: 3:00 PM",
      "Queue priority: Medium",
    ],
    history: [
      { action: "Completed scheduled batch", time: "2h ago", type: "success" },
      { action: "Processed future queue", time: "1d ago", type: "success" },
      { action: "Updated task schedule", time: "1d ago", type: "success" },
    ],
  },
  {
    id: 10,
    name: "Manis Doc Creator",
    role: "Documentation",
    status: "working",
    currentTask: "Generating API docs",
    workload: 45,
    tasksCompleted: 678,
    uptime: "98.3%",
    memory: [
      "Total docs generated: 234",
      "Avg doc length: 1,500 words",
      "Templates available: 12",
    ],
    history: [
      { action: "Generated API documentation", time: "10m ago", type: "success" },
      { action: "Updated user guide", time: "3h ago", type: "success" },
      { action: "Created changelog entry", time: "1d ago", type: "success" },
    ],
  },
];

const statusConfig = {
  working: { color: "bg-green-500", text: "text-green-400", label: "Working" },
  idle: { color: "bg-yellow-500", text: "text-yellow-400", label: "Idle" },
  busy: { color: "bg-red-500", text: "text-red-400", label: "Busy" },
};

function AgentDetailCard({ agent, onSelect }) {
  const status = statusConfig[agent.status];

  return (
    <div
      onClick={() => onSelect(agent)}
      className="p-4 bg-surface-elevated rounded-xl border border-border hover:border-primary/30 transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Bot size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{agent.name}</h3>
            <p className="text-xs text-gray-500">{agent.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${status.color} animate-pulse`} />
          <span className={`text-xs font-mono ${status.text}`}>{status.label}</span>
        </div>
      </div>

      {/* Current Task */}
      <div className="p-3 bg-background rounded-lg mb-4">
        <p className="text-xs text-gray-500 mb-1 font-mono">Current Task:</p>
        <p className="text-sm text-white">{agent.currentTask}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <p className="text-xs text-gray-500">Completed</p>
          <p className="text-lg font-bold text-white">{agent.tasksCompleted.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Uptime</p>
          <p className="text-lg font-bold text-green-400">{agent.uptime}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Workload</p>
          <p className="text-lg font-bold text-primary">{agent.workload}%</p>
        </div>
      </div>

      {/* Workload Bar */}
      <div className="h-2 bg-background rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${agent.workload}%` }}
        />
      </div>

      {/* View Details */}
      <div className="flex items-center justify-end mt-4 text-xs text-gray-500 group-hover:text-primary transition-colors">
        <span>View Details</span>
        <ChevronRight size={14} className="ml-1" />
      </div>
    </div>
  );
}

function AgentModal({ agent, onClose }) {
  if (!agent) return null;

  const status = statusConfig[agent.status];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-surface-elevated rounded-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
              <Bot size={32} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-white">{agent.name}</h2>
                <span className={`text-xs px-2 py-1 rounded ${status.color}/20 ${status.text} font-mono`}>
                  {status.label}
                </span>
              </div>
              <p className="text-gray-500">{agent.role}</p>
            </div>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors">
              <XCircle size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-3 bg-background rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Tasks Completed</p>
              <p className="text-xl font-bold text-white">{agent.tasksCompleted.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Uptime</p>
              <p className="text-xl font-bold text-green-400">{agent.uptime}</p>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Workload</p>
              <p className="text-xl font-bold text-primary">{agent.workload}%</p>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <p className={`text-xl font-bold ${status.text}`}>{status.label}</p>
            </div>
          </div>

          {/* Current Task */}
          <div className="p-4 bg-background rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-primary" />
              <h3 className="font-semibold text-white">Current Task</h3>
            </div>
            <p className="text-gray-300">{agent.currentTask}</p>
          </div>

          {/* Memory */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Brain size={16} className="text-primary" />
              <h3 className="font-semibold text-white">Agent Memory</h3>
            </div>
            <div className="space-y-2">
              {agent.memory.map((item, i) => (
                <div key={i} className="p-3 bg-background rounded-lg text-sm text-gray-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <History size={16} className="text-primary" />
              <h3 className="font-semibold text-white">Recent Activity</h3>
            </div>
            <div className="space-y-2">
              {agent.history.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-background rounded-lg">
                  {item.type === "success" ? (
                    <CheckCircle size={16} className="text-green-400" />
                  ) : (
                    <XCircle size={16} className="text-red-400" />
                  )}
                  <span className="flex-1 text-sm text-gray-300">{item.action}</span>
                  <span className="text-xs text-gray-500 font-mono">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Agents() {
  const [selectedAgent, setSelectedAgent] = useState(null);

  return (
    <Layout title="Agents">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Agents</h1>
            <p className="text-gray-500">Manage and monitor all AI agents</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-2">Total Agents</p>
              <p className="text-2xl font-bold text-white">{agents.length}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-xs text-gray-500">Working</p>
              </div>
              <p className="text-2xl font-bold text-green-400">
                {agents.filter((a) => a.status === "working").length}
              </p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <p className="text-xs text-gray-500">Busy</p>
              </div>
              <p className="text-2xl font-bold text-red-400">
                {agents.filter((a) => a.status === "busy").length}
              </p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <p className="text-xs text-gray-500">Idle</p>
              </div>
              <p className="text-2xl font-bold text-yellow-400">
                {agents.filter((a) => a.status === "idle").length}
              </p>
            </div>
          </div>

          {/* Agent Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <AgentDetailCard key={agent.id} agent={agent} onSelect={setSelectedAgent} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AgentModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
    </Layout>
  );
}
