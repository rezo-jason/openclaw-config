import Layout from "@/components/Layout";
import { Settings, Server, Database, Cpu, HardDrive } from "lucide-react";

const systemStats = [
  { name: "CPU Usage", value: "24%", icon: Cpu, status: "healthy" },
  { name: "Memory", value: "4.2 GB / 8 GB", icon: HardDrive, status: "healthy" },
  { name: "Database", value: "Connected", icon: Database, status: "healthy" },
  { name: "API Server", value: "Operational", icon: Server, status: "healthy" },
];

export default function System() {
  return (
    <Layout title="System">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">System</h1>
            <p className="text-gray-500">System health and configuration</p>
          </div>

          {/* System Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {systemStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.name} className="bg-surface-elevated rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Icon size={20} className="text-primary" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{stat.name}</p>
                  <p className="text-lg font-semibold text-white">{stat.value}</p>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center h-[300px] bg-surface-elevated rounded-xl border border-border">
            <div className="text-center">
              <Settings size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">System configuration panel coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
