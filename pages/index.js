import Layout from "@/components/Layout";
import AgentCard from "@/components/AgentCard";
import ActivityFeed from "@/components/ActivityFeed";

const agents = [
  {
    id: 1,
    name: "Main Coordinator",
    role: "Central Hub",
    status: "working",
    currentTask: "Orchestrating daily operations",
    workload: 75,
  },
  {
    id: 2,
    name: "Planner",
    role: "Strategy & Planning",
    status: "working",
    currentTask: "Q2 roadmap optimization",
    workload: 60,
  },
  {
    id: 3,
    name: "Marketing & Outreach",
    role: "Growth",
    status: "busy",
    currentTask: "Campaign launch for tradies promo",
    workload: 90,
  },
  {
    id: 4,
    name: "Finance & Compliance",
    role: "Operations",
    status: "idle",
    currentTask: "Awaiting invoice batch",
    workload: 25,
  },
  {
    id: 5,
    name: "Data Analytics",
    role: "Intelligence",
    status: "working",
    currentTask: "Processing weekly metrics",
    workload: 55,
  },
  {
    id: 6,
    name: "Memory/Research",
    role: "Knowledge Base",
    status: "working",
    currentTask: "Indexing new documentation",
    workload: 40,
  },
  {
    id: 7,
    name: "QA Review",
    role: "Quality Assurance",
    status: "idle",
    currentTask: "Queue empty - standing by",
    workload: 10,
  },
  {
    id: 8,
    name: "Execution/Compiler",
    role: "Build & Deploy",
    status: "busy",
    currentTask: "Deploying v2.4.1 hotfix",
    workload: 85,
  },
  {
    id: 9,
    name: "Next Agent",
    role: "Future Tasks",
    status: "idle",
    currentTask: "Scheduled for 3:00 PM",
    workload: 0,
  },
  {
    id: 10,
    name: "Manis Doc Creator",
    role: "Documentation",
    status: "working",
    currentTask: "Generating API docs",
    workload: 45,
  },
];

const activities = [
  {
    agent: "Main Coordinator",
    action: "Dispatched new task batch to Marketing & Outreach",
    type: "completed",
    time: "2m ago",
  },
  {
    agent: "Execution/Compiler",
    action: "Started deployment pipeline for v2.4.1",
    type: "started",
    time: "5m ago",
  },
  {
    agent: "Data Analytics",
    action: "Completed weekly metrics aggregation",
    type: "completed",
    time: "12m ago",
  },
  {
    agent: "Memory/Research",
    action: "Indexed 47 new documents into knowledge base",
    type: "completed",
    time: "18m ago",
  },
  {
    agent: "QA Review",
    action: "Waiting for new items in review queue",
    type: "waiting",
    time: "25m ago",
  },
  {
    agent: "Planner",
    action: "Updated Q2 roadmap with new milestones",
    type: "completed",
    time: "32m ago",
  },
  {
    agent: "Finance & Compliance",
    action: "Processed 12 invoices successfully",
    type: "completed",
    time: "45m ago",
  },
  {
    agent: "Marketing & Outreach",
    action: "Campaign draft ready for review",
    type: "started",
    time: "1h ago",
  },
];

export default function Office() {
  const workingAgents = agents.filter((a) => a.status === "working").length;
  const busyAgents = agents.filter((a) => a.status === "busy").length;
  const idleAgents = agents.filter((a) => a.status === "idle").length;

  return (
    <Layout title="Office">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Virtual Office</h1>
            <p className="text-gray-500">Real-time view of all agent activity</p>
          </div>

          {/* Status Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Working</span>
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <p className="text-2xl font-bold text-white mt-2">{workingAgents}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Busy</span>
                <div className="w-3 h-3 rounded-full bg-red-500" />
              </div>
              <p className="text-2xl font-bold text-white mt-2">{busyAgents}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Idle</span>
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-white mt-2">{idleAgents}</p>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Agent Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {agents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="lg:col-span-1">
              <ActivityFeed activities={activities} />
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-500 text-sm pb-4">
            Powered by Supercharged Tradies AI
          </div>
        </div>
      </div>
    </Layout>
  );
}
