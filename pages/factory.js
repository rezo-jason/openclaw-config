import Layout from "@/components/Layout";
import { Bot, AlertCircle, Clock, CheckCircle } from "lucide-react";

const columns = [
  { id: "inbox", name: "Inbox", color: "border-[#6b7280]" },
  { id: "assigned", name: "Assigned", color: "border-[#0099FF]" },
  { id: "in-progress", name: "In Progress", color: "border-[#f97316]" },
  { id: "review", name: "Review", color: "border-[#a855f7]" },
  { id: "approval", name: "Approval", color: "border-[#eab308]" },
  { id: "complete", name: "Complete", color: "border-[#22c55e]" },
  { id: "recurring", name: "Recurring", color: "border-[#14b8a6]" },
];

const tasks = [
  {
    id: 1,
    title: "Email Campaign Automation",
    project: "Marketing Suite",
    priority: "high",
    progress: 0,
    column: "inbox",
    agent: null,
  },
  {
    id: 2,
    title: "Invoice Processing Module",
    project: "Finance Tools",
    priority: "medium",
    progress: 0,
    column: "inbox",
    agent: null,
  },
  {
    id: 3,
    title: "Customer Dashboard v2",
    project: "Client Portal",
    priority: "high",
    progress: 45,
    column: "assigned",
    agent: "Execution/Compiler",
  },
  {
    id: 4,
    title: "API Documentation Update",
    project: "Developer Tools",
    priority: "low",
    progress: 60,
    column: "in-progress",
    agent: "Manis Doc Creator",
  },
  {
    id: 5,
    title: "Analytics Report Generator",
    project: "Data Platform",
    priority: "medium",
    progress: 75,
    column: "review",
    agent: "QA Review",
  },
  {
    id: 6,
    title: "Lead Scoring Algorithm",
    project: "Sales Automation",
    priority: "high",
    progress: 85,
    column: "approval",
    agent: "Main Coordinator",
  },
  {
    id: 7,
    title: "Weekly Newsletter System",
    project: "Marketing Suite",
    priority: "medium",
    progress: 95,
    column: "approval",
    agent: "Marketing & Outreach",
  },
  {
    id: 8,
    title: "User Onboarding Flow",
    project: "Client Portal",
    priority: "high",
    progress: 100,
    column: "complete",
    agent: null,
  },
  {
    id: 9,
    title: "Slack Integration",
    project: "Integrations",
    priority: "medium",
    progress: 100,
    column: "complete",
    agent: null,
  },
  {
    id: 10,
    title: "Weekly Report Generation",
    project: "Analytics",
    priority: "low",
    progress: 100,
    column: "recurring",
    agent: "Data Analyst",
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
    <div className="p-3 bg-surface-elevated rounded-lg border border-border hover:border-primary/30 transition-all cursor-pointer group">
      {/* Title */}
      <h3 className="font-medium text-white text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">
        {task.title}
      </h3>
      <p className="text-xs text-gray-500 mb-2 truncate">{task.project}</p>

      {/* Agent Row */}
      {task.agent && (
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Bot size={10} className="text-primary" />
          </div>
          <span className="text-xs text-gray-400 truncate">{task.agent}</span>
        </div>
      )}

      {/* Footer: Priority + Progress */}
      <div className="flex items-center justify-between">
        <span className={`text-xs px-1.5 py-0.5 rounded ${priority.bg} ${priority.text}`}>
          {priority.label}
        </span>
        <span className="text-xs text-primary font-mono">{task.progress}%</span>
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

          {/* Kanban Board - Horizontal Columns */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            {columns.map((column) => {
              const columnTasks = tasks.filter((task) => task.column === column.id);
              return (
                <div key={column.id} className="flex flex-col w-64 shrink-0">
                  {/* Column Header */}
                  <div className={`p-3 bg-surface-elevated rounded-t-lg border-t-2 ${column.color} border-x border-border`}>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white text-sm">{column.name}</h3>
                      <span className="text-xs text-gray-500 font-mono bg-background px-2 py-0.5 rounded">
                        {columnTasks.length}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {columnTasks.length} {columnTasks.length === 1 ? "task" : "tasks"}
                    </p>
                  </div>

                  {/* Task Cards - Stacked Vertically */}
                  <div className="flex-1 bg-surface/50 rounded-b-lg border border-border border-t-0 p-2 space-y-2 min-h-[400px] max-h-[calc(100vh-280px)] overflow-y-auto">
                    {columnTasks.length === 0 ? (
                      <div className="flex items-center justify-center h-20 text-gray-500 text-sm">
                        No tasks
                      </div>
                    ) : (
                      columnTasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
