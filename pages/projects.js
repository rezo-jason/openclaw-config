import Layout from "@/components/Layout";
import { FolderKanban, CheckCircle, Clock } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Mission Control Integration Test",
    description: "Testing full integration between Mission Control dashboard and Telegram agent",
    status: "active",
    created: "2026-03-22",
    tasks: 4,
    completed: 4,
  },
];

export default function Projects() {
  return (
    <Layout title="Projects">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Projects</h1>
            <p className="text-gray-500">Manage all projects and initiatives</p>
          </div>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="p-5 bg-surface-elevated rounded-xl border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <FolderKanban size={20} className="text-primary" />
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 font-mono">Active</span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{project.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <CheckCircle size={12} className="text-green-400" />
                    <span>{project.completed}/{project.tasks} tasks complete</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>Created {project.created}</span>
                  </div>
                </div>
                <div className="mt-3 h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${(project.completed / project.tasks) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
