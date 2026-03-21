import Layout from '@/components/Layout';
import { FileText, File, Folder } from 'lucide-react';

const docs = [
  {
    title: "2026-03-21 Marketing Outreach Weekly Report",
    path: "documents/reports/2026-03-21_Marketing-Outreach_Weekly-Report.md",
    created: "2026-03-21",
    folder: "reports",
    author: "Marketing & Outreach",
    type: "report"
  }
];

export default function Documents() {
  return (
    <Layout title="Documents">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Documents</h1>
            <p className="text-gray-500">Central repository for all agent outputs</p>
          </div>

          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 bg-surface-elevated border-b border-border text-xs text-gray-500 font-mono">
              <div className="col-span-1">Type</div>
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Folder</div>
              <div className="col-span-2">Author</div>
              <div className="col-span-2">Date</div>
            </div>

            <div className="divide-y divide-border">
              {docs.map((doc, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 p-4 hover:bg-surface-elevated/50 transition-colors cursor-pointer">
                  <div className="col-span-1 flex items-center">
                    <FileText size={16} className="text-primary" />
                  </div>
                  <div className="col-span-5 flex items-center">
                    <span className="text-sm text-white font-medium">{doc.title}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Folder size={14} className="text-gray-500" />
                    <span className="text-sm text-gray-400">{doc.folder}</span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="text-xs text-gray-400 bg-surface-elevated border border-border px-2 py-1 rounded">{doc.author}</span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="text-xs text-gray-500 font-mono">{doc.created}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
