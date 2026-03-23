import Layout from '@/components/Layout';
import { useState, useMemo } from 'react';
import { FileText, Folder, Download, Eye, Trash2, Search, Calendar, X, File } from 'lucide-react';

// Sample documents data (replacing filesystem-based loading)
const initialDocs = [
  {
    title: "Q1 Marketing Report",
    path: "/documents/reports/q1-marketing-report.pdf",
    created: "2026-03-20",
    folder: "reports",
    author: "Marketing & Outreach",
    type: "pdf",
    filename: "q1-marketing-report.pdf"
  },
  {
    title: "Project Proposal Grimmond",
    path: "/documents/proposals/grimmond-proposal.pdf",
    created: "2026-03-18",
    folder: "proposals",
    author: "Manis Doc Creator",
    type: "pdf",
    filename: "grimmond-proposal.pdf"
  },
  {
    title: "Client Quote Template",
    path: "/documents/quotes/client-quote-template.docx",
    created: "2026-03-15",
    folder: "quotes",
    author: "Finance & Compliance",
    type: "docx",
    filename: "client-quote-template.docx"
  },
  {
    title: "Service Agreement v2",
    path: "/documents/contracts/service-agreement-v2.pdf",
    created: "2026-03-12",
    folder: "contracts",
    author: "Main Coordinator",
    type: "pdf",
    filename: "service-agreement-v2.pdf"
  },
  {
    title: "Monthly Budget Analysis",
    path: "/documents/finance/monthly-budget-2026.xlsx",
    created: "2026-03-10",
    folder: "finance",
    author: "Finance & Compliance",
    type: "xlsx",
    filename: "monthly-budget-2026.xlsx"
  },
  {
    title: "Social Media Guidelines",
    path: "/documents/marketing/social-media-guidelines.md",
    created: "2026-03-08",
    folder: "marketing",
    author: "Marketing & Outreach",
    type: "md",
    filename: "social-media-guidelines.md"
  },
  {
    title: "Team Standup Notes March",
    path: "/documents/meeting-notes/standup-march-2026.md",
    created: "2026-03-22",
    folder: "meeting-notes",
    author: "Main Coordinator",
    type: "md",
    filename: "standup-march-2026.md"
  },
  {
    title: "Market Research Q1",
    path: "/documents/research/market-research-q1.pdf",
    created: "2026-03-05",
    folder: "research",
    author: "Memory/Research",
    type: "pdf",
    filename: "market-research-q1.pdf"
  },
  {
    title: "Invoice Template",
    path: "/documents/templates/invoice-template.docx",
    created: "2026-02-28",
    folder: "templates",
    author: "Finance & Compliance",
    type: "docx",
    filename: "invoice-template.docx"
  },
  {
    title: "API Documentation",
    path: "/documents/reports/api-docs-v3.md",
    created: "2026-03-19",
    folder: "reports",
    author: "Execution/Compiler",
    type: "md",
    filename: "api-docs-v3.md"
  },
  {
    title: "Client Onboarding Guide",
    path: "/documents/templates/onboarding-guide.pdf",
    created: "2026-03-14",
    folder: "templates",
    author: "Manis Doc Creator",
    type: "pdf",
    filename: "onboarding-guide.pdf"
  },
  {
    title: "Weekly Analytics Report",
    path: "/documents/reports/weekly-analytics.pdf",
    created: "2026-03-21",
    folder: "reports",
    author: "Data Analytics",
    type: "pdf",
    filename: "weekly-analytics.pdf"
  },
];

export default function Documents() {
  const [docs, setDocs] = useState(initialDocs);
  const [search, setSearch] = useState('');
  const [folderFilter, setFolderFilter] = useState('All Folders');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [previewDoc, setPreviewDoc] = useState(null);
  const [downloadNotice, setDownloadNotice] = useState(null);

  // Get unique folders and types for filters
  const folders = useMemo(() => {
    const unique = [...new Set(initialDocs.map(d => d.folder))];
    return ['All Folders', ...unique.sort()];
  }, []);

  const types = useMemo(() => {
    const unique = [...new Set(initialDocs.map(d => d.type))];
    return ['All Types', ...unique.sort()];
  }, []);

  // Smart search - searches across title, folder, author, type
  const filteredDocs = useMemo(() => {
    return docs.filter(doc => {
      // Smart search across multiple fields
      const searchLower = search.toLowerCase();
      const matchesSearch = search === '' || 
        doc.title.toLowerCase().includes(searchLower) ||
        doc.folder.toLowerCase().includes(searchLower) ||
        doc.author.toLowerCase().includes(searchLower) ||
        doc.type.toLowerCase().includes(searchLower) ||
        doc.filename.toLowerCase().includes(searchLower);

      // Folder filter
      const matchesFolder = folderFilter === 'All Folders' || doc.folder === folderFilter;

      // Type filter
      const matchesType = typeFilter === 'All Types' || doc.type === typeFilter;

      // Date range filter
      const docDate = new Date(doc.created);
      const matchesDateFrom = !dateFrom || docDate >= new Date(dateFrom);
      const matchesDateTo = !dateTo || docDate <= new Date(dateTo);

      return matchesSearch && matchesFolder && matchesType && matchesDateFrom && matchesDateTo;
    });
  }, [docs, search, folderFilter, typeFilter, dateFrom, dateTo]);

  const deleteDoc = (docPath) => {
    if (confirm('Are you sure you want to remove this document from the list?')) {
      setDocs(docs.filter(d => d.path !== docPath));
    }
  };

  const handleView = (doc) => {
    setPreviewDoc(doc);
  };

  const handleDownload = (doc) => {
    setDownloadNotice(doc.filename);
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  const clearFilters = () => {
    setSearch('');
    setFolderFilter('All Folders');
    setTypeFilter('All Types');
    setDateFrom('');
    setDateTo('');
  };

  const hasActiveFilters = search || folderFilter !== 'All Folders' || typeFilter !== 'All Types' || dateFrom || dateTo;

  return (
    <Layout title="Documents">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Documents</h1>
            <p className="text-gray-500">
              Central repository for all agent outputs — {filteredDocs.length} of {docs.length} document{docs.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 p-4 bg-surface rounded-xl border border-border">
            <div className="flex flex-wrap items-center gap-4">
              {/* Smart Search */}
              <div className="flex-1 min-w-[250px] relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search documents, folders, authors, types..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                />
              </div>

              {/* Folder Filter */}
              <select
                value={folderFilter}
                onChange={(e) => setFolderFilter(e.target.value)}
                className="px-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-white focus:outline-none focus:border-primary/50"
              >
                {folders.map(folder => (
                  <option key={folder} value={folder}>{folder}</option>
                ))}
              </select>

              {/* Type Filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-white focus:outline-none focus:border-primary/50"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Date Range Filters */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" />
                <span className="text-sm text-gray-500">Date Range:</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="px-3 py-2 bg-surface-elevated border border-border rounded-lg text-white text-sm focus:outline-none focus:border-primary/50"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="px-3 py-2 bg-surface-elevated border border-border rounded-lg text-white text-sm focus:outline-none focus:border-primary/50"
                />
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <X size={14} />
                  Clear filters
                </button>
              )}
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 bg-surface-elevated border-b border-border text-xs text-gray-500 font-mono">
              <div className="col-span-1">Type</div>
              <div className="col-span-4">Name</div>
              <div className="col-span-2">Folder</div>
              <div className="col-span-2">Author</div>
              <div className="col-span-1">Date</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            <div className="divide-y divide-border">
              {filteredDocs.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  {docs.length === 0 ? 'No documents yet.' : 'No documents match your filters.'}
                </div>
              )}
              {filteredDocs.map((doc, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 p-4 hover:bg-surface-elevated/50 transition-colors items-center">
                  <div className="col-span-1">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded ${
                      doc.type === 'pdf' ? 'bg-red-500/20 text-red-400' :
                      doc.type === 'docx' || doc.type === 'xlsx' ? 'bg-blue-500/20 text-blue-400' :
                      doc.type === 'md' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-primary/20 text-primary'
                    }`}>
                      <FileText size={16} />
                    </div>
                  </div>
                  <div className="col-span-4">
                    <span className="text-sm text-white font-medium truncate block" title={doc.title}>{doc.title}</span>
                    <span className="text-xs text-gray-500 uppercase">.{doc.type}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Folder size={14} className="text-gray-500" />
                    <span className="text-sm text-gray-400 truncate">{doc.folder}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-gray-400 bg-surface-elevated border border-border px-2 py-1 rounded truncate block">{doc.author}</span>
                  </div>
                  <div className="col-span-1">
                    <span className="text-xs text-gray-500 font-mono">{doc.created}</span>
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleView(doc)}
                      className="p-1.5 bg-surface border border-border rounded hover:bg-surface-elevated text-gray-400 hover:text-primary transition-colors" 
                      title="Preview"
                    >
                      <Eye size={14} />
                    </button>
                    <button 
                      onClick={() => handleDownload(doc)}
                      className="p-1.5 bg-surface border border-border rounded hover:bg-surface-elevated text-gray-400 hover:text-green-400 transition-colors" 
                      title="Download"
                    >
                      <Download size={14} />
                    </button>
                    <button 
                      onClick={() => deleteDoc(doc.path)}
                      className="p-1.5 bg-surface border border-border rounded hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors" 
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setPreviewDoc(null)}>
          <div className="bg-surface border border-border rounded-xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded ${
                  previewDoc.type === 'pdf' ? 'bg-red-500/20 text-red-400' :
                  previewDoc.type === 'docx' || previewDoc.type === 'xlsx' ? 'bg-blue-500/20 text-blue-400' :
                  previewDoc.type === 'md' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-primary/20 text-primary'
                }`}>
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{previewDoc.title}</h3>
                  <p className="text-sm text-gray-500">{previewDoc.filename}</p>
                </div>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="text-gray-500 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="bg-surface-elevated border border-border rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Folder</span>
                  <p className="text-white">{previewDoc.folder}</p>
                </div>
                <div>
                  <span className="text-gray-500">Type</span>
                  <p className="text-white uppercase">{previewDoc.type}</p>
                </div>
                <div>
                  <span className="text-gray-500">Author</span>
                  <p className="text-white">{previewDoc.author}</p>
                </div>
                <div>
                  <span className="text-gray-500">Created</span>
                  <p className="text-white">{previewDoc.created}</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-elevated border border-border rounded-lg p-8 mb-4 flex flex-col items-center justify-center text-center">
              <File size={48} className="text-gray-500 mb-3" />
              <p className="text-gray-400 text-sm">Document preview not available</p>
              <p className="text-gray-500 text-xs mt-1">Download the file to view its contents</p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => {
                  handleDownload(previewDoc);
                  setPreviewDoc(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
              >
                <Download size={16} />
                Download
              </button>
              <button 
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2.5 bg-surface-elevated border border-border text-gray-400 rounded-lg hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Notification */}
      {downloadNotice && (
        <div className="fixed bottom-6 right-6 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg flex items-center gap-3 z-50 animate-pulse">
          <Download size={18} />
          <span className="text-sm">Downloading {downloadNotice}...</span>
        </div>
      )}
    </Layout>
  );
}
