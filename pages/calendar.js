import { useState } from "react";
import Layout from "@/components/Layout";
import { Bot, Clock, RefreshCw, ChevronLeft, ChevronRight, Filter, ChevronDown, X } from "lucide-react";

const agentColors = {
  "Main Coordinator": "bg-blue-500",
  "Planner": "bg-purple-500",
  "Marketing & Outreach": "bg-pink-500",
  "Finance & Compliance": "bg-green-500",
  "Data Analytics": "bg-cyan-500",
  "Memory/Research": "bg-yellow-500",
  "QA Review": "bg-orange-500",
  "Execution/Compiler": "bg-red-500",
};

const alwaysRunning = [
  { name: "Main Coordinator", task: "System Orchestration", uptime: "99.9%" },
  { name: "Memory/Research", task: "Knowledge Indexing", uptime: "98.5%" },
  { name: "Data Analytics", task: "Metrics Monitoring", uptime: "97.2%" },
];

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const events = [
  { day: 0, hour: 9, agent: "Marketing & Outreach", task: "Social Media Post Batch", duration: 2 },
  { day: 0, hour: 14, agent: "Finance & Compliance", task: "Invoice Processing", duration: 1 },
  { day: 1, hour: 10, agent: "Planner", task: "Weekly Sprint Planning", duration: 2 },
  { day: 1, hour: 15, agent: "QA Review", task: "Code Review Session", duration: 2 },
  { day: 2, hour: 9, agent: "Marketing & Outreach", task: "Email Campaign Send", duration: 1 },
  { day: 2, hour: 11, agent: "Data Analytics", task: "Report Generation", duration: 2 },
  { day: 2, hour: 16, agent: "Execution/Compiler", task: "Scheduled Deployment", duration: 1 },
  { day: 3, hour: 10, agent: "Finance & Compliance", task: "Weekly Reconciliation", duration: 3 },
  { day: 3, hour: 14, agent: "Planner", task: "Roadmap Review", duration: 2 },
  { day: 4, hour: 9, agent: "Marketing & Outreach", task: "Newsletter Dispatch", duration: 1 },
  { day: 4, hour: 11, agent: "QA Review", task: "Sprint Demo Prep", duration: 2 },
  { day: 4, hour: 15, agent: "Data Analytics", task: "Weekly Metrics Report", duration: 2 },
  { day: 5, hour: 10, agent: "Execution/Compiler", task: "Backup & Maintenance", duration: 2 },
  { day: 6, hour: 2, agent: "Data Analytics", task: "Nightly Data Sync", duration: 1, recurring: true },
];

const cronJobs = [
  { name: "Database Backup", schedule: "Daily 2:00 AM", agent: "Execution/Compiler" },
  { name: "Log Rotation", schedule: "Daily 3:00 AM", agent: "Main Coordinator" },
  { name: "Metrics Aggregation", schedule: "Hourly", agent: "Data Analytics" },
  { name: "Email Queue Process", schedule: "Every 15 min", agent: "Marketing & Outreach" },
];

const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

const allAgents = Object.keys(agentColors);

export default function Calendar() {
  const [selectedAgents, setSelectedAgents] = useState(allAgents);
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleAgent = (agent) => {
    if (selectedAgents.includes(agent)) {
      if (selectedAgents.length === 1) return; // Keep at least one selected
      setSelectedAgents(selectedAgents.filter((a) => a !== agent));
    } else {
      setSelectedAgents([...selectedAgents, agent]);
    }
  };

  const selectAll = () => setSelectedAgents(allAgents);
  const isAllSelected = selectedAgents.length === allAgents.length;

  // Filter data based on selected agents
  const filteredEvents = events.filter((e) => selectedAgents.includes(e.agent));
  const filteredAlwaysRunning = alwaysRunning.filter((a) => selectedAgents.includes(a.name));
  const filteredCronJobs = cronJobs.filter((j) => selectedAgents.includes(j.agent));

  return (
    <Layout title="Calendar">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Calendar</h1>
              <p className="text-gray-500">Schedule and recurring automations</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Staff Filter */}
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className={`flex items-center gap-2 px-3 py-2 bg-surface-elevated border rounded-lg transition-colors ${
                    !isAllSelected ? "border-primary text-primary" : "border-border text-gray-400 hover:border-primary/30"
                  }`}
                >
                  <Filter size={16} />
                  <span className="text-sm">
                    {isAllSelected ? "All Staff" : `${selectedAgents.length} Selected`}
                  </span>
                  <ChevronDown size={16} className={`transition-transform ${filterOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Filter Dropdown */}
                {filterOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-surface-elevated border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="p-3 border-b border-border flex items-center justify-between">
                      <span className="text-sm font-medium text-white">Filter by Staff</span>
                      <button
                        onClick={selectAll}
                        className="text-xs text-primary hover:underline"
                      >
                        {isAllSelected ? "Clear All" : "Select All"}
                      </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto p-2">
                      {allAgents.map((agent) => (
                        <button
                          key={agent}
                          onClick={() => toggleAgent(agent)}
                          className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                            selectedAgents.includes(agent)
                              ? "bg-surface hover:bg-surface/80"
                              : "hover:bg-surface/50 opacity-50"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full ${agentColors[agent]}`} />
                          <span className="text-sm text-white flex-1 text-left">{agent}</span>
                          {selectedAgents.includes(agent) && (
                            <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center">
                              <X size={12} className="text-primary" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Month Navigation */}
              <button className="p-2 bg-surface-elevated border border-border rounded-lg hover:border-primary/30 transition-colors">
                <ChevronLeft size={20} className="text-gray-400" />
              </button>
              <span className="px-4 py-2 bg-surface-elevated border border-border rounded-lg text-white font-medium">
                March 2026
              </span>
              <button className="p-2 bg-surface-elevated border border-border rounded-lg hover:border-primary/30 transition-colors">
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Always Running Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <RefreshCw size={16} className="text-primary animate-spin" style={{ animationDuration: "3s" }} />
              <h2 className="font-semibold text-white">Always Running</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {filteredAlwaysRunning.map((agent) => (
                <div
                  key={agent.name}
                  className="p-4 bg-surface-elevated rounded-xl border border-primary/20 flex items-center gap-4"
                >
                  <div className={`w-10 h-10 rounded-full ${agentColors[agent.name]} flex items-center justify-center`}>
                    <Bot size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">{agent.name}</p>
                    <p className="text-xs text-gray-500">{agent.task}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Uptime</p>
                    <p className="text-sm text-green-400 font-mono">{agent.uptime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cron Jobs */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} className="text-primary" />
              <h2 className="font-semibold text-white">Scheduled Automations</h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {filteredCronJobs.map((job) => (
                <div
                  key={job.name}
                  className="p-3 bg-surface-elevated rounded-lg border border-border"
                >
                  <p className="font-medium text-white text-sm mb-1">{job.name}</p>
                  <p className="text-xs text-primary font-mono mb-2">{job.schedule}</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${agentColors[job.agent]}`} />
                    <span className="text-xs text-gray-500">{job.agent}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Calendar */}
          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            {/* Day Headers */}
            <div className="grid grid-cols-8 border-b border-border">
              <div className="p-3 bg-surface-elevated border-r border-border">
                <span className="text-xs text-gray-500 font-mono">Time</span>
              </div>
              {weekDays.map((day) => (
                <div key={day} className="p-3 bg-surface-elevated border-r border-border last:border-r-0">
                  <span className="text-sm font-medium text-white">{day}</span>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="relative">
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-8 border-b border-border last:border-b-0">
                  <div className="p-2 border-r border-border flex items-start justify-end pr-3">
                    <span className="text-xs text-gray-500 font-mono">
                      {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? "PM" : "AM"}
                    </span>
                  </div>
                  {weekDays.map((_, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="h-16 border-r border-border last:border-r-0 relative"
                    >
                      {filteredEvents
                        .filter((e) => e.day === dayIndex && e.hour === hour)
                        .map((event, i) => (
                          <div
                            key={i}
                            className={`absolute inset-x-1 top-1 p-2 rounded ${agentColors[event.agent]} bg-opacity-20 border-l-2`}
                            style={{
                              borderLeftColor: agentColors[event.agent]?.replace("bg-", "").includes("-")
                                ? undefined
                                : agentColors[event.agent],
                              height: `${event.duration * 64 - 8}px`,
                            }}
                          >
                            <p className="text-xs font-medium text-white truncate">{event.task}</p>
                            <p className="text-xs text-gray-400 truncate">{event.agent}</p>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4">
            {Object.entries(agentColors).map(([agent, color]) => (
              <div key={agent} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${color}`} />
                <span className="text-xs text-gray-500">{agent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
