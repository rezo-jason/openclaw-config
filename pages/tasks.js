import Layout from "@/components/Layout";
import { useState } from "react";
import { Bot, Filter, Search, Clock, CheckCircle, AlertCircle, Play, Pause, Trash2, AlertTriangle, X } from "lucide-react";

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
    id: 3,
    title: "Process invoice batch #234",
    project: "Finance Tools",
    agent: "Finance & Compliance",
    status: "pending",
    priority: "high",
    progress: 0,
    dueDate: "Tomorrow",
    createdAt: "1 day ago",
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
    id: 5,
    title: "Review pull request #567",
    project: "Core Platform",
    agent: "QA Review",
    status: "pending",
    priority: "medium",
    progress: 0,
    dueDate: "Today",
    createdAt: "4 hours ago",
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
    id: 7,
    title: "Index new knowledge base articles",
    project: "Knowledge Management",
    agent: "Memory/Research",
    status: "completed",
    priority: "medium",
    progress: 100,
    dueDate: "Completed",
    createdAt: "5 hours ago",
  },
  {
    id: 8,
    title: "Schedule Q2 planning sessions",
    project: "Operations",
    agent: "Planner",
    status: "completed",
    priority: "low",
    progress: 100,
    dueDate: "Completed",
    createdAt: "1 day ago",
  },
  {
    id: 9,
    title: "Send newsletter to subscribers",
    project: "Marketing Suite",
    agent: "Marketing & Outreach",
    status: "pending",
    priority: "high",
    progress: 0,
    dueDate: "Mar 22",
    createdAt: "2 days ago",
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
    id: 11,
    title: "Generate compliance report",
    project: "Finance Tools",
    agent: "Finance & Compliance",
    status: "pending",
    priority: "high",
    progress: 0,
    dueDate: "Mar 25",
    createdAt: "3 days ago",
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

function DeleteConfirmModal({ task, onConfirm, onCancel }) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl border border-border w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
              <AlertTriangle size={24} className="text-red-400" />
            </div>
            <div>
              <h2 className="font-semibold text-white text-lg">Delete Task</h2>
              <p className="text-sm text-gray-500">This action cannot be undone</p>
            </div>
          </div>
          
          <p className="text-gray-400 mb-6">
            Are you sure you want to delete <span className="text-white font-medium">"{task.title}"</span>?
          </p>

          <div className="flex items-center gap-3 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-surface-elevated border border-border rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(task)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Tasks() {
  const [tasks, setTasks] = useState(allTasks);
  const [search, setSearch] = useState("");
  const [agentFilter, setAgentFilter] = useState("All Agents");
  const [projectFilter, setProjectFilter] = useState("All Projects");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [deletingTask, setDeletingTask] = useState(null);

  const handleDeleteClick = (task) => {
    setDeletingTask(task);
  };

  const handleDeleteConfirm = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
    setDeletingTask(null);
  };

  const handleDeleteCancel = () => {
    setDeletingTask(null);
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
              <div className="col-span-1 text-right">Action</div>
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
                    className="grid grid-cols-12 gap-4 p-4 hover:bg-surface-elevated/50 transition-colors group"
                  >
                    {/* Task */}
                    <div className="col-span-3">
                      <p className="font-medium text-white mb-1 truncate">{task.title}</p>
                      <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                    </div>

                    {/* Agent */}
                    <div className="col-span-2 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Bot size={12} className="text-primary" />
                      </div>
                      <span className="text-sm text-gray-300 truncate">{task.agent}</span>
                    </div>

                    {/* Project */}
                    <div className="col-span-2 flex items-center">
                      <span className="text-sm text-gray-400 truncate">{task.project}</span>
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

                    {/* Delete Action */}
                    <div className="col-span-1 flex items-center justify-end">
                      <button
                        onClick={() => handleDeleteClick(task)}
                        className="p-2 rounded-lg border border-transparent hover:border-red-500/50 hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
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

      {/* Delete Confirmation Modal */}
      {deletingTask && (
        <DeleteConfirmModal
          task={deletingTask}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </Layout>
  );
}
