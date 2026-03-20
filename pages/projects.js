import Layout from "@/components/Layout";
import { FolderKanban } from "lucide-react";

export default function Projects() {
  return (
    <Layout title="Projects">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Projects</h1>
            <p className="text-gray-500">Manage all projects and initiatives</p>
          </div>
          <div className="flex items-center justify-center h-[400px] bg-surface-elevated rounded-xl border border-border">
            <div className="text-center">
              <FolderKanban size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">Projects view coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
