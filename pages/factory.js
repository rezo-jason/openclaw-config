import Layout from "@/components/Layout";
import { useState } from "react";
import { Bot, Inbox, UserCheck, Play, Eye, CheckCircle, RotateCcw, Plus, ChevronRight, GripVertical } from "lucide-react";

// 7-Stage Pipeline Configuration
const stages = [
  { id: "inbox", name: "Inbox", icon: Inbox, color: "border-gray-500", bgColor: "bg-gray-500" },
  { id: "assigned", name: "Assigned", icon: UserCheck, color: "border-blue-500", bgColor: "bg-blue-500" },
  { id: "in-progress", name: "In Progress", icon: Play, color: "border-primary", bgColor: "bg-primary" },
  { id: "review", name: "Review", icon: Eye, color: "border-yellow-500", bgColor: "bg-yellow-500" },
  { id: "approval", name: "Approval", icon: CheckCircle, color: "border-purple-500", bgColor: "bg-purple-500" },
  { id: "complete", name: "Complete", icon: CheckCircle, color: "border-green-500", bgColor: "bg-green-500" },
  { id: "recurring", name: "Recurring", icon: RotateCcw, color: "border-orange-500", bgColor: "bg-orange-500" },
];

const initialTasks = [
  // Inbox - new requests
  { id: 1, title: "New Lead: Grimmond Constructions", project: "Sales Pipeline", priority: "high", stage: "inbox", agent: null, progress: 0 },
  { id: 2, title: "Website Contact Form Submission", project: "Marketing", priority: "medium", stage: "inbox", agent: null, progress: 0 },
  { id: 3, title: "Quote Request - Home Renovation", project: "Sales Pipeline", priority: "high", stage: "inbox", agent: null, progress: 0 },
  
  // Assigned - ready to work
  { id: 4, title: "Prepare Proposal - Tech Startup", project: "Sales Pipeline", priority: "high", stage: "assigned", agent: "Manis Doc Creator", progress: 0 },
  { id: 5, title: "Research Market Trends Q1", project: "Research", priority: "medium", stage: "assigned", agent: "Memory/Research", progress: 0 },
  
  // In Progress
  { id: 6, title: "Customer Dashboard v2", project: "Client Portal", priority: "high", stage: "in-progress", agent: "Execution/Compiler", progress: 45 },
  { id: 7, title: "API Documentation Update", project: "Developer Tools", priority: "low", stage: "in-progress", agent: "Manis Doc Creator", progress: 60 },
  { id: 8, title: "Email Campaign Setup", project: "Marketing Suite", priority: "medium", stage: "in-progress", agent: "Marketing & Outreach", progress: 30 },
  
  // Review
  { id: 9, title: "Analytics Report Generator", project: "Data Platform", priority: "medium", stage: "review", agent: "QA Review", progress: 75 },
  { id: 10, title: "Invoice Processing Module", project: "Finance Tools", priority: "high", stage: "review", agent: "QA Review", progress: 80 },
  
  // Approval
  { id: 11, title: "Lead Scoring Algorithm", project: "Sales Automation", priority: "high", stage: "approval", agent: "Main Coordinator", progress: 85 },
  { id: 12, title: "Weekly Newsletter Template", project: "Marketing Suite", priority: "medium", stage: "approval", agent: "Main Coordinator", progress: 90 },
  
  // Complete
  { id: 13, title: "User Onboarding Flow", project: "Client Portal", priority: "high", stage: "complete", agent: null, progress: 100 },
  { id: 14, title: "Slack Integration", project: "Integrations", priority: "medium", stage: "complete", agent: null, progress: 100 },
  { id: 15, title: "CRM Data Migration", project: "Operations", priority: "high", stage: "complete", agent: null, progress: 100 },
  
  // Recurring
  { id: 16, title: "Weekly Report Generation", project: "Operations", priority: "medium", stage: "recurring", agent: "Data Analytics", progress: 100, frequency: "Weekly" },
  { id: 17, title: "Social Media Scheduling", project: "Marketing", priority: "low", stage: "recurring", agent: "Marketing & Outreach", progress: 100, frequency: "Daily" },
  { id: 18, title: "Database Backup", project: "Operations", priority: "high", stage: "recurring", agent: "Execution/Compiler", progress: 100, frequency: "Daily" },
];

const priorityConfig = {
  high: { bg: "bg-red-500/20", text: "text-red-400", label: "High" },
  medium: { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Medium" },
  low: { bg: "bg-green-500/20", text: "text-green-400", label: "Low" },
};

function TaskCard({ task, onMoveForward, onMoveBack, isFirst, isLast }) {
  const priority = priorityConfig[task.priority];

  return (
    <div className="p-4 bg-surface-elevated rounded-lg border border-border hover:border-primary/30 transition-all group">
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
          <span className="text-xs text-gray-400 truncate">{task.agent}</span>
        </div>
      )}

      {/* Frequency for recurring */}
      {task.frequency && (
        <div className="flex items-center gap-2 mb-3 p-2 bg-orange-500/10 rounded border border-orange-500/20">
          <RotateCcw size={14} className="text-orange-400" />
          <span className="text-xs text-orange-400">{task.frequency}</span>
        </div>
      )}

      {/* Progress */}
      {task.stage !== "inbox" && task.stage !== "recurring" && (
        <div className="mb-3">
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
      )}

      {/* Move Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <button
          onClick={() => onMoveBack(task.id)}
          disabled={isFirst}
          className={`text-xs px-2 py-1 rounded transition-colors ${
            isFirst
              ? "text-gray-600 cursor-not-allowed"
              : "text-gray-400 hover:text-white hover:bg-surface"
          }`}
        >
          Back
        </button>
        <GripVertical size={14} className="text-gray-600" />
        <button
          onClick={() => onMoveForward(task.id)}
          disabled={isLast}
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${
            isLast
              ? "text-gray-600 cursor-not-allowed"
              : "text-primary hover:bg-primary/10"
          }`}
        >
          Next <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}

export default function Factory() {
  const [tasks, setTasks] = useState(initialTasks);

  const moveTaskForward = (taskId) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const currentIndex = stages.findIndex((s) => s.id === task.stage);
        if (currentIndex < stages.length - 1) {
          const nextStage = stages[currentIndex + 1].id;
          // Update progress based on stage
          let newProgress = task.progress;
          if (nextStage === "complete") newProgress = 100;
          else if (nextStage === "approval") newProgress = Math.max(task.progress, 85);
          else if (nextStage === "review") newProgress = Math.max(task.progress, 70);
          else if (nextStage === "in-progress") newProgress = Math.max(task.progress, 10);
          return { ...task, stage: nextStage, progress: newProgress };
        }
        return task;
      })
    );
  };

  const moveTaskBack = (taskId) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const currentIndex = stages.findIndex((s) => s.id === task.stage);
        if (currentIndex > 0) {
          const prevStage = stages[currentIndex - 1].id;
          return { ...task, stage: prevStage };
        }
        return task;
      })
    );
  };

  return (
    <Layout title="Factory">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Factory Pipeline</h1>
              <p className="text-gray-500">7-stage workflow from inbox to completion</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              <Plus size={18} />
              New Task
            </button>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
            {stages.map((stage) => {
              const count = tasks.filter((t) => t.stage === stage.id).length;
              const Icon = stage.icon;
              return (
                <div
                  key={stage.id}
                  className={`flex items-center gap-2 px-3 py-2 bg-surface-elevated rounded-lg border-l-2 ${stage.color} border border-border shrink-0`}
                >
                  <Icon size={14} className="text-gray-400" />
                  <span className="text-xs text-gray-500">{stage.name}</span>
                  <span className="text-sm font-bold text-white">{count}</span>
                </div>
              );
            })}
          </div>

          {/* Pipeline Stages */}
          <div className="space-y-4">
            {stages.map((stage, stageIndex) => {
              const stageTasks = tasks.filter((task) => task.stage === stage.id);
              const Icon = stage.icon;
              const isFirst = stageIndex === 0;
              const isLast = stageIndex === stages.length - 1;

              return (
                <div
                  key={stage.id}
                  className="bg-surface rounded-xl border border-border overflow-hidden"
                >
                  {/* Row Header */}
                  <div className={`flex items-center gap-4 p-4 border-l-4 ${stage.color} bg-surface-elevated`}>
                    <div className="flex items-center gap-3 min-w-[160px]">
                      <div className={`w-8 h-8 rounded-lg ${stage.bgColor}/20 flex items-center justify-center`}>
                        <Icon size={16} className={stage.bgColor.replace("bg-", "text-")} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">{stage.name}</h3>
                        <span className="text-xs text-gray-500 font-mono">
                          {stageTasks.length} task{stageTasks.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    {/* Task Cards Row */}
                    <div className="flex-1 flex items-stretch gap-3 overflow-x-auto pb-1">
                      {stageTasks.length === 0 ? (
                        <div className="flex items-center justify-center py-4 px-6 text-gray-500 text-sm border border-dashed border-border rounded-lg">
                          No tasks in {stage.name.toLowerCase()}
                        </div>
                      ) : (
                        stageTasks.map((task) => (
                          <div key={task.id} className="shrink-0 w-72">
                            <TaskCard
                              task={task}
                              onMoveForward={moveTaskForward}
                              onMoveBack={moveTaskBack}
                              isFirst={isFirst}
                              isLast={isLast}
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 p-4 bg-surface rounded-xl border border-border">
            <h3 className="text-sm font-medium text-white mb-3">Pipeline Stages</h3>
            <div className="flex flex-wrap gap-4">
              {stages.map((stage) => {
                const Icon = stage.icon;
                return (
                  <div key={stage.id} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${stage.bgColor}`} />
                    <Icon size={14} className="text-gray-500" />
                    <span className="text-xs text-gray-400">{stage.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
