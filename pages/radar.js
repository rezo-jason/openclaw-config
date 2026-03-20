import Layout from "@/components/Layout";
import { Radar } from "lucide-react";

export default function RadarPage() {
  return (
    <Layout title="Radar">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Radar</h1>
            <p className="text-gray-500">Monitor external signals and trends</p>
          </div>
          <div className="flex items-center justify-center h-[400px] bg-surface-elevated rounded-xl border border-border">
            <div className="text-center">
              <Radar size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">Radar monitoring coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
