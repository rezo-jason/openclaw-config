import Layout from "@/components/Layout";
import { useState } from "react";
import { Bot, Filter, Search, Clock, CheckCircle, AlertCircle, Play, Pause, Trash2 } from "lucide-react";

const allTasks = [
  {
    id: 1,
    title: "Deploy marketing campaign v2",
    project: "Marketing Suite",
    agent: "Marketing & Outreach",
    status: "active",
    priority: "high",
    progress: 75,
    dueDate: "Today",
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    title: "Generate weekly analytics report",
    project: "Data Platform",
    agent: "Data Analytics",
    status: "active",
    priority: "medium",
    progress: 45,
    dueDate: "Today",
    createdAt: "3 hours ago",
  },
  {
    id: 4,
    title: "Update API documentation",
    project: "Developer Tools",
    agent: "Manis Doc Creator",
    status: "active",
    priority: "low",
    progress: 60,
    dueDate: "Mar 23",
    createdAt: "2 days ago",
  },
  {
    id: 6,
    title: "Optimize database queries",
    project: "Data Platform",
    agent: "Execution/Compiler",
    status: "active",
    priority: "high",
    progress: 30,
    dueDate: "Mar 24",
    createdAt: "1 day ago",
  },
  {
    id: 10,
    title: "Coordinate team standup",
    project: "Operations",
    agent: "Main Coordinator",
    status: "active",
    priority: "medium",
    progress: 50,
    dueDate: "Today",
    createdAt: "6 hours ago",
  },
  {
    id: 12,
    title: "Build customer dashboard prototype",
    project: "Client Portal",
    agent: "Execution/Compiler",
    status: "active",
    priority: "high",
    progress: 85,
    dueDate: "Mar 23",
    createdAt: "4 days ago",
  },
  {
    id: 17,
    title: "test",
    project: "Mission Control Compliance Test",
    agent: "Planner",
    status: "active",
    priority: "medium",
    progress: 0,
    dueDate: "Today",
    createdAt: "just now",
  },
  {
    id: 16,
    title: "Test Task — Gmail Integration Setup",
    project: "System Setup",
    agent: "Execution/Compiler",
    status: "active",
    priority: "high",
    progress: 50,
    dueDate: "Today",
    createdAt: "Just now",
  },
  {
    id: 17,
    title: "Gmail Integration Setup",
    project: "System Setup",
    agent: "Execution/Compiler",
    status: "active",
    priority: "high",
    progress: 50,
    dueDate: "Today",
    createdAt: "Just now",
  },
];

const priorityConfig = {
  high: { bg: "bg-red-500/20", text: "text-red-400", label: "High" },
  medium: { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Medium" },
  low: { bg: "bg-green-500/20", text: "text-green-400", label: "Low" },
};

const statusConfig = {
  active: { bg: "bg-primary/20", text: "text-primary", label: "Active", icon: Play },
  pending: { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Pending", icon: Clock },
  completed: { bg: "bg-green-500/20", text: "text-green-400", label: "Completed", icon: CheckCircle },
};

const agents = [
  "All Agents",
  "Main Coordinator",
  "Planner",
  "Marketing & Outreach",
  "Finance & Compliance",
  "Data Analytics",
  "Memory/Research",
  "QA Review",
  "Execution/Compiler",
  "Manis Doc Creator",
];

const projects = [
  "All Projects",
  "Marketing Suite",
  "Data Platform",
  "Finance Tools",
  "Developer Tools",
  "Core Platform",
  "Knowledge Management",
  "Operations",
  "Client Portal",
];

const statuses = ["All Status", "Active", "Pending", "Completed"];

export default function Tasks() {
  const [tasks, setTasks] = useState(allTasks);
  const [search, setSearch] = useState("");
  const [agentFilter, setAgentFilter] = useState("All Agents");
  const [projectFilter, setProjectFilter] = useState("All Projects");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.project.toLowerCase().includes(search.toLowerCase());
    const matchesAgent = agentFilter === "All Agents" || task.agent === agentFilter;
    const matchesProject = projectFilter === "All Projects" || task.project === projectFilter;
    const matchesStatus =
      statusFilter === "All Status" || task.status === statusFilter.toLowerCase();

    return matchesSearch && matchesAgent && matchesProject && matchesStatus;
  });

  const activeCount = tasks.filter((t) => t.status === "active").length;
  const pendingCount = tasks.filter((t) => t.status === "pending").length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;

  return (
    <Layout title="Tasks">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Tasks</h1>
            <p className="text-gray-500">All active and pending tasks across agents</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-2">Total Tasks</p>
              <p className="text-2xl font-bold text-white">{tasks.length}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Play size={12} className="text-primary" />
                <p className="text-xs text-gray-500">Active</p>
              </div>
              <p className="text-2xl font-bold text-primary">{activeCount}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={12} className="text-yellow-400" />
                <p className="text-xs text-gray-500">Pending</p>
              </div>
              <p className="text-2xl font-bold text-yellow-400">{pendingCount}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={12} className="text-green-400" />
                <p className="text-xs text-gray-500">Completed</p>
              </div>
              <p className="text-2xl font-bold text-green-400">{completedCount}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 min-w-[200px] relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* Agent Filter */}
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="px-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-white focus:outline-none focus:border-primary/50"
            >
              {agents.map((agent) => (
                <option key={agent} value={agent}>
                  {agent}
                </option>
              ))}
            </select>

            {/* Project Filter */}
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="px-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-white focus:outline-none focus:border-primary/50"
            >
              {projects.map((project) => (
                <option key={project} value={project}>
                  {project}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-white focus:outline-none focus:border-primary/50"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Task List */}
          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-surface-elevated border-b border-border text-xs text-gray-500 font-mono">
              <div className="col-span-3">Task</div>
              <div className="col-span-2">Agent</div>
              <div className="col-span-2">Project</div>
              <div className="col-span-1">Priority</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2">Progress</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {/* Tasks */}
            <div className="divide-y divide-border">
              {filteredTasks.map((task) => {
                const priority = priorityConfig[task.priority];
                const status = statusConfig[task.status];
                const StatusIcon = status.icon;

                return (
                  <div
                    key={task.id}
                    className="grid grid-cols-12 gap-4 p-4 hover:bg-surface-elevated/50 transition-colors"
                  >
                    {/* Task */}
                    <div className="col-span-3">
                      <p className="font-medium text-white mb-1">{task.title}</p>
                      <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                    </div>

                    {/* Agent */}
                    <div className="col-span-2 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <Bot size={12} className="text-primary" />
                      </div>
                      <span className="text-sm text-gray-300 truncate">{task.agent}</span>
                    </div>

                    {/* Project */}
                    <div className="col-span-2 flex items-center">
                      <span className="text-sm text-gray-400">{task.project}</span>
                    </div>

                    {/* Priority */}
                    <div className="col-span-1 flex items-center">
                      <span className={`text-xs px-2 py-1 rounded ${priority.bg} ${priority.text} font-mono`}>
                        {priority.label}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="col-span-1 flex items-center">
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded ${status.bg}`}>
                        <StatusIcon size={12} className={status.text} />
                        <span className={`text-xs ${status.text} font-mono`}>{status.label}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="col-span-2 flex items-center gap-3">
                      <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-primary font-mono w-10 text-right">{task.progress}%</span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-end">
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete task"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredTasks.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-gray-500">No tasks found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
