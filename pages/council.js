import Layout from "@/components/Layout";
import { Users } from "lucide-react";

export default function Council() {
  return (
    <Layout title="Council">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Council</h1>
            <p className="text-gray-500">Agent council decisions and governance</p>
          </div>
          <div className="flex items-center justify-center h-[400px] bg-surface-elevated rounded-xl border border-border">
            <div className="text-center">
              <Users size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">Council view coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
