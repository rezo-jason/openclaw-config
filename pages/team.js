import Layout from "@/components/Layout";
import { UsersRound } from "lucide-react";

export default function Team() {
  return (
    <Layout title="Team">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Team</h1>
            <p className="text-gray-500">Team members and collaboration</p>
          </div>
          <div className="flex items-center justify-center h-[400px] bg-surface-elevated rounded-xl border border-border">
            <div className="text-center">
              <UsersRound size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">Team management coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
