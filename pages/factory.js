import Layout from "@/components/Layout";
import { Bot, AlertCircle, Clock, CheckCircle } from "lucide-react";

const columns = [
  { id: "backlog", name: "Backlog", color: "border-gray-500" },
  { id: "build", name: "Build", color: "border-primary" },
  { id: "qa", name: "QA", color: "border-yellow-500" },
  { id: "review", name: "Review", color: "border-purple-500" },
  { id: "ship", name: "Ship", color: "border-green-500" },
];

const tasks = [
  {
    id: 1,
    title: "Email Campaign Automation",
    project: "Marketing Suite",
    priority: "high",
    progress: 0,
    column: "backlog",
    agent: null,
  },
  {
    id: 2,
    title: "Invoice Processing Module",
    project: "Finance Tools",
    priority: "medium",
    progress: 0,
    column: "backlog",
    agent: null,
  },
  {
    id: 3,
    title: "Customer Dashboard v2",
    project: "Client Portal",
    priority: "high",
    progress: 45,
    column: "build",
    agent: "Execution/Compiler",
  },
  {
    id: 4,
    title: "API Documentation Update",
    project: "Developer Tools",
    priority: "low",
    progress: 60,
    column: "build",
    agent: "Manis Doc Creator",
  },
  {
    id: 5,
    title: "Analytics Report Generator",
    project: "Data Platform",
    priority: "medium",
    progress: 75,
    column: "qa",
    agent: "QA Review",
  },
  {
    id: 6,
    title: "Lead Scoring Algorithm",
    project: "Sales Automation",
    priority: "high",
    progress: 85,
    column: "review",
    agent: "Main Coordinator",
  },
  {
    id: 7,
    title: "Weekly Newsletter System",
    project: "Marketing Suite",
    priority: "medium",
    progress: 95,
    column: "review",
    agent: "Marketing & Outreach",
  },
  {
    id: 8,
    title: "User Onboarding Flow",
    project: "Client Portal",
    priority: "high",
    progress: 100,
    column: "ship",
    agent: null,
  },
  {
    id: 9,
    title: "Slack Integration",
    project: "Integrations",
    priority: "medium",
    progress: 100,
    column: "ship",
    agent: null,
  },
];

const priorityConfig = {
  high: { bg: "bg-red-500/20", text: "text-red-400", label: "High" },
  medium: { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Medium" },
  low: { bg: "bg-green-500/20", text: "text-green-400", label: "Low" },
};

function TaskCard({ task }) {
  const priority = priorityConfig[task.priority];

  return (
    <div className="p-4 bg-surface-elevated rounded-lg border border-border hover:border-primary/30 transition-all cursor-pointer group">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <span className={`text-xs px-2 py-0.5 rounded ${priority.bg} ${priority.text} font-mono`}>
          {priority.label}
        </span>
        {task.agent && (
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot size={12} className="text-primary" />
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="font-medium text-white text-sm mb-1 group-hover:text-primary transition-colors">
        {task.title}
      </h3>
      <p className="text-xs text-gray-500 mb-3">{task.project}</p>

      {/* Agent */}
      {task.agent && (
        <div className="flex items-center gap-2 mb-3 p-2 bg-background rounded">
          <Bot size={14} className="text-primary" />
          <span className="text-xs text-gray-400">{task.agent}</span>
        </div>
      )}

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">Progress</span>
          <span className="text-primary font-mono">{task.progress}%</span>
        </div>
        <div className="h-1.5 bg-background rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${task.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Factory() {
  return (
    <Layout title="Factory">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Factory Pipeline</h1>
            <p className="text-gray-500">Kanban view of all tasks in progress</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {columns.map((col) => {
              const count = tasks.filter((t) => t.column === col.id).length;
              return (
                <div key={col.id} className="bg-surface-elevated rounded-lg border border-border p-3">
                  <p className="text-xs text-gray-500 mb-1">{col.name}</p>
                  <p className="text-xl font-bold text-white">{count}</p>
                </div>
              );
            })}
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-5 gap-4">
            {columns.map((column) => (
              <div key={column.id} className="flex flex-col">
                {/* Column Header */}
                <div className={`p-3 bg-surface rounded-t-lg border-t-2 ${column.color} border-x border-border`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white text-sm">{column.name}</h3>
                    <span className="text-xs text-gray-500 font-mono">
                      {tasks.filter((t) => t.column === column.id).length}
                    </span>
                  </div>
                </div>

                {/* Tasks */}
                <div className="flex-1 bg-surface/50 rounded-b-lg border border-border border-t-0 p-3 space-y-3 min-h-[400px]">
                  {tasks
                    .filter((task) => task.column === column.id)
                    .map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
