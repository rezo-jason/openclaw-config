import Layout from "@/components/Layout";
import { Brain, Search, Database, FileText } from "lucide-react";

const memoryItems = [
  { id: 1, type: "fact", content: "Target audience: Australian tradies aged 25-45", source: "Marketing & Outreach", timestamp: "2h ago" },
  { id: 2, type: "metric", content: "Current monthly revenue: $98,450", source: "Finance & Compliance", timestamp: "3h ago" },
  { id: 3, type: "insight", content: "Best performing channel: Facebook ads with 3.2% CTR", source: "Data Analytics", timestamp: "4h ago" },
  { id: 4, type: "document", content: "API Documentation v2.4.0 indexed and available", source: "Memory/Research", timestamp: "5h ago" },
  { id: 5, type: "fact", content: "Sprint velocity average: 32 story points", source: "Planner", timestamp: "6h ago" },
  { id: 6, type: "metric", content: "Total indexed documents: 12,456", source: "Memory/Research", timestamp: "8h ago" },
  { id: 7, type: "insight", content: "Email open rate average: 24.5%", source: "Marketing & Outreach", timestamp: "1d ago" },
  { id: 8, type: "document", content: "User onboarding guide updated with new flow", source: "Manis Doc Creator", timestamp: "1d ago" },
];

const typeConfig = {
  fact: { icon: FileText, color: "text-blue-400", bg: "bg-blue-500/20" },
  metric: { icon: Database, color: "text-green-400", bg: "bg-green-500/20" },
  insight: { icon: Brain, color: "text-purple-400", bg: "bg-purple-500/20" },
  document: { icon: FileText, color: "text-primary", bg: "bg-primary/20" },
};

export default function Memory() {
  return (
    <Layout title="Memory">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Memory</h1>
            <p className="text-gray-500">Knowledge base and agent memory storage</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-2">Total Documents</p>
              <p className="text-2xl font-bold text-white">12,456</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-2">Facts Stored</p>
              <p className="text-2xl font-bold text-blue-400">3,421</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-2">Metrics Tracked</p>
              <p className="text-2xl font-bold text-green-400">892</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-2">Storage Used</p>
              <p className="text-2xl font-bold text-primary">2.3 GB</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search knowledge base..."
              className="w-full pl-12 pr-4 py-3 bg-surface-elevated border border-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
            />
          </div>

          {/* Memory Items */}
          <div className="space-y-3">
            {memoryItems.map((item) => {
              const config = typeConfig[item.type];
              const Icon = config.icon;

              return (
                <div key={item.id} className="p-4 bg-surface-elevated rounded-xl border border-border hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                      <Icon size={20} className={config.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white mb-1">{item.content}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>Source: {item.source}</span>
                        <span>{item.timestamp}</span>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${config.bg} ${config.color} font-mono capitalize`}>
                      {item.type}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
