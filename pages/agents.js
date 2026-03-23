import Layout from "@/components/Layout";
import { useState } from "react";
import { Bot, Clock, CheckCircle, XCircle, ChevronRight, Zap, Brain, History } from "lucide-react";


const agents = [
  {
    id: 1,
    name: "Main Coordinator",
    role: "Central Hub",
    status: "idle",
    currentTask: "Awaiting next request from Jason",
    workload: 0,
    tasksCompleted: 0,
    uptime: "Uptime unavailable",
    memory: ["No verified memory entries \u2014 evidence required"],
    history: [],
  },
  {
    id: 2,
    name: "Planner",
    role: "Strategy & Planning",
    status: "idle",
    currentTask: "No active task",
    workload: 0,
    tasksCompleted: 0,
    uptime: "Uptime unavailable",
    memory: ["No verified memory entries \u2014 evidence required"],
    history: [],
  },
  {
    id: 3,
    name: "Marketing & Outreach",
    role: "Growth",
    status: "idle",
    currentTask: "Paused \u2014 awaiting new task from Jason",
    workload: 0,
    tasksCompleted: 0,
    uptime: "Uptime unavailable",
    memory: [
      "Status: UNVERIFIED \u2014 previous claims had no evidence",
      "Only verified output: 1 social post draft (2026-03-21)",
    ],
    history: [
      { action: "Social post draft created (verified)", time: "2026-03-21", type: "success" },
      { action: "Facebook campaign \u2014 UNVERIFIED", time: "claimed", type: "error" },
      { action: "15 social posts \u2014 UNVERIFIED (14 missing)", time: "claimed", type: "error" },
      { action: "A/B test \u2014 UNVERIFIED", time: "claimed", type: "error" },
    ],
  },
  {
    id: 4,
    name: "Finance & Compliance",
    role: "Operations",
    status: "idle",
    currentTask: "No active task",
    workload: 0,
    tasksCompleted: 0,
    uptime: "Uptime unavailable",
    memory: ["No verified memory entries \u2014 evidence required"],
    history: [],
  },
  {
    id: 5,
    name: "Data Analytics",
    role: "Intelligence",
    status: "idle",
    currentTask: "No active task",
    workload: 0,
    tasksCompleted: 0,
    uptime: "Uptime unavailable",
    memory: ["No verified memory entries \u2014 evidence required"],
    history: [],
  },
  {
    id: 6,
    name: "Memory/Research",
    role: "Knowledge Base",
    status: "idle",
    currentTask: "No active task",
    workload: 0,
    tasksCompleted: 0,
    uptime: "Uptime unavailable",
    memory: ["No verified memory entries \u2014 evidence required"],
    history: [],
  },
  {
    id: 7,
    name: "QA Review",
    role: "Quality Assurance",
    status: "idle",
    currentTask: "No active task",
    workload: 0,
    tasksCompleted: 0,
    uptime: "Uptime unavailable",
    memory: ["No verified memory entries \u2014 evidence required"],
    history: [],
  },
  {
    id: 8,
    name: "Execution/Compiler",
    role: "Build & Deploy",
    status: "idle",
    currentTask: "Awaiting next task",
    workload: 0,
    tasksCompleted: 6,
    uptime: "Uptime unavailable",
    memory: [
      "Grimmond Proposal v1 \u2014 completed (verified)",
      "Grimmond Proposal v2 \u2014 completed (verified)",
      "Program 1 Mastermind \u2014 completed (verified)",
      "Program 2 From Tradie to Business Owner \u2014 completed (verified)",
      "Cover Page Test \u2014 completed (verified)",
      "Task Centre cleanup \u2014 completed (verified)",
    ],
    history: [
      { action: "GRIMMOND_PROPOSAL_BRANDED.pdf created", time: "2026-03-23 04:49", type: "success" },
      { action: "GRIMMOND_PROPOSAL_BRANDED_v2.pdf created", time: "2026-03-23 09:52", type: "success" },
      { action: "PROGRAM1 branded PDF created", time: "2026-03-23 16:32", type: "success" },
      { action: "PROGRAM2 branded PDF created", time: "2026-03-23 16:49", type: "success" },
      { action: "Cover page test PDF created", time: "2026-03-23 17:18", type: "success" },
      { action: "Task Centre pruned", time: "2026-03-23 05:00", type: "success" },
    ],
  },
  {
    id: 9,
    name: "Next Agent",
    role: "Onboarding & Activation",
    status: "idle",
    currentTask: "No active task",
    workload: 0,
    tasksCompleted: 0,
    uptime: "Uptime unavailable",
    memory: ["No verified memory entries \u2014 evidence required"],
    history: [],
  },
  {
    id: 10,
    name: "Manus Doc Creator",
    role: "Document Engine",
    status: "idle",
    currentTask: "Awaiting next document task",
    workload: 0,
    tasksCompleted: 5,
    uptime: "Uptime unavailable",
    memory: [
      "Primary document engine for all Supercharged Tradies proposals",
      "Brand: #2F8FE6 blue, black headings, white background",
    ],
    history: [
      { action: "PROGRAM1 v3 branded PDF", time: "2026-03-23 20:39", type: "success" },
      { action: "PROGRAM2 v3 branded PDF", time: "2026-03-23 20:48", type: "success" },
      { action: "PROGRAM1 branded PDF", time: "2026-03-23 16:32", type: "success" },
      { action: "PROGRAM2 branded PDF", time: "2026-03-23 16:49", type: "success" },
      { action: "Cover page test", time: "2026-03-23 17:18", type: "success" },
    ],
  },
  {
    id: 11,
    name: "Landing & Ads Master",
    role: "Visual Assets",
    status: "idle",
    currentTask: "No active task",
    workload: 0,
    tasksCompleted: 0,
    uptime: "Uptime unavailable",
    memory: ["No verified memory entries \u2014 evidence required"],
    history: [],
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
