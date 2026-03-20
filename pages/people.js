import Layout from "@/components/Layout";
import { UserCircle } from "lucide-react";

export default function People() {
  return (
    <Layout title="People">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">People</h1>
            <p className="text-gray-500">Contact and stakeholder management</p>
          </div>
          <div className="flex items-center justify-center h-[400px] bg-surface-elevated rounded-xl border border-border">
            <div className="text-center">
              <UserCircle size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">People directory coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
