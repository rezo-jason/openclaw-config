import { useState } from "react";
import Layout from "@/components/Layout";
import { FileStack, FileText, FileImage, File, Download, Eye, X, Search, FolderOpen } from "lucide-react";

// Mock documents with various types
const documents = [
  {
    id: 1,
    name: "Company Handbook",
    type: "pdf",
    size: "2.4 MB",
    category: "Policies",
    url: "/docs/company-handbook.pdf",
    updatedAt: "Mar 15, 2026",
  },
  {
    id: 2,
    name: "Brand Guidelines",
    type: "pdf",
    size: "5.1 MB",
    category: "Design",
    url: "/docs/brand-guidelines.pdf",
    updatedAt: "Mar 10, 2026",
  },
  {
    id: 3,
    name: "Team Photo 2026",
    type: "image",
    size: "1.2 MB",
    category: "Media",
    url: "https://picsum.photos/800/600",
    updatedAt: "Feb 28, 2026",
  },
  {
    id: 4,
    name: "Project Proposal Template",
    type: "doc",
    size: "156 KB",
    category: "Templates",
    url: "/docs/project-proposal.docx",
    updatedAt: "Mar 18, 2026",
  },
  {
    id: 5,
    name: "Office Floor Plan",
    type: "image",
    size: "890 KB",
    category: "Operations",
    url: "https://picsum.photos/1200/800",
    updatedAt: "Jan 5, 2026",
  },
  {
    id: 6,
    name: "API Documentation",
    type: "pdf",
    size: "3.7 MB",
    category: "Technical",
    url: "/docs/api-docs.pdf",
    updatedAt: "Mar 20, 2026",
  },
  {
    id: 7,
    name: "Meeting Notes Template",
    type: "doc",
    size: "45 KB",
    category: "Templates",
    url: "/docs/meeting-notes.docx",
    updatedAt: "Mar 12, 2026",
  },
  {
    id: 8,
    name: "Product Mockups",
    type: "image",
    size: "4.2 MB",
    category: "Design",
    url: "https://picsum.photos/1000/700",
    updatedAt: "Mar 19, 2026",
  },
];

const fileTypeConfig = {
  pdf: { icon: FileText, color: "text-red-400", bg: "bg-red-500/20" },
  doc: { icon: FileText, color: "text-blue-400", bg: "bg-blue-500/20" },
  image: { icon: FileImage, color: "text-green-400", bg: "bg-green-500/20" },
  default: { icon: File, color: "text-gray-400", bg: "bg-gray-500/20" },
};

const categories = ["All", ...new Set(documents.map((d) => d.category))];

function DocumentCard({ doc, onView, onDownload }) {
  const config = fileTypeConfig[doc.type] || fileTypeConfig.default;
  const Icon = config.icon;

  return (
    <div className="p-4 bg-surface-elevated rounded-xl border border-border hover:border-primary/30 transition-all group">
      <div className="flex items-start gap-4">
        {/* File Icon */}
        <div className={`w-12 h-12 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
          <Icon size={24} className={config.color} />
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white text-sm mb-1 truncate group-hover:text-primary transition-colors">
            {doc.name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="uppercase font-mono">{doc.type}</span>
            <span>-</span>
            <span>{doc.size}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-600">{doc.category}</span>
            <span className="text-xs text-gray-600">- {doc.updatedAt}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onView(doc)}
            className="p-2 bg-surface border border-border rounded-lg hover:border-primary/30 hover:text-primary transition-colors text-gray-400"
            title="View"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onDownload(doc)}
            className="p-2 bg-surface border border-border rounded-lg hover:border-primary/30 hover:text-primary transition-colors text-gray-400"
            title="Download"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function DocumentViewer({ doc, onClose }) {
  if (!doc) return null;

  const config = fileTypeConfig[doc.type] || fileTypeConfig.default;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl border border-border w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center`}>
              {doc.type === "image" ? (
                <FileImage size={20} className={config.color} />
              ) : (
                <FileText size={20} className={config.color} />
              )}
            </div>
            <div>
              <h2 className="font-semibold text-white">{doc.name}</h2>
              <p className="text-xs text-gray-500">{doc.size} - {doc.type.toUpperCase()}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-background">
          {doc.type === "image" ? (
            <img
              src={doc.url}
              alt={doc.name}
              className="max-w-full max-h-full object-contain rounded-lg"
              crossOrigin="anonymous"
            />
          ) : doc.type === "pdf" ? (
            <div className="text-center">
              <FileText size={64} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">PDF Viewer</p>
              <p className="text-sm text-gray-500 mb-4">
                To view this PDF, click the button below to open in a new tab or download.
              </p>
              <div className="flex items-center justify-center gap-3">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors flex items-center gap-2"
                >
                  <Eye size={16} />
                  Open in New Tab
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <File size={64} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Document Preview</p>
              <p className="text-sm text-gray-500 mb-4">
                This file type cannot be previewed directly. Please download to view.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex justify-end">
          <a
            href={doc.url}
            download={doc.name}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors flex items-center gap-2"
          >
            <Download size={16} />
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Docs() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewingDoc, setViewingDoc] = useState(null);

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleView = (doc) => {
    console.log("[v0] Viewing document:", doc.name, doc.type);
    setViewingDoc(doc);
  };

  const handleDownload = (doc) => {
    console.log("[v0] Downloading document:", doc.name, doc.type);
    // Create a temporary link element for download
    const link = document.createElement("a");
    link.href = doc.url;
    link.download = doc.name;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout title="Docs">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Documentation</h1>
            <p className="text-gray-500">System and process documentation</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search documents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface-elevated border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-surface-elevated text-gray-400 border border-border hover:border-primary/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Document Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-1">Total Documents</p>
              <p className="text-xl font-bold text-white">{documents.length}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-1">PDFs</p>
              <p className="text-xl font-bold text-red-400">{documents.filter((d) => d.type === "pdf").length}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-1">Images</p>
              <p className="text-xl font-bold text-green-400">{documents.filter((d) => d.type === "image").length}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-1">Documents</p>
              <p className="text-xl font-bold text-blue-400">{documents.filter((d) => d.type === "doc").length}</p>
            </div>
          </div>

          {/* Documents List */}
          {filteredDocs.length === 0 ? (
            <div className="flex items-center justify-center h-[300px] bg-surface-elevated rounded-xl border border-border">
              <div className="text-center">
                <FolderOpen size={48} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500">No documents found</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredDocs.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  doc={doc}
                  onView={handleView}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Document Viewer Modal */}
      {viewingDoc && (
        <DocumentViewer doc={viewingDoc} onClose={() => setViewingDoc(null)} />
      )}
    </Layout>
  );
}
