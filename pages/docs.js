import { useState } from "react";
import Layout from "@/components/Layout";
import { FileText, FileImage, File, Download, Eye, X, Search, FolderOpen, FileCode } from "lucide-react";

// Helper to determine file type from extension
function getFileType(filename) {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  if (["pdf"].includes(ext)) return "pdf";
  if (["doc", "docx"].includes(ext)) return "doc";
  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) return "image";
  if (["md", "markdown"].includes(ext)) return "markdown";
  if (["txt"].includes(ext)) return "text";
  return "other";
}

// Helper to get file extension for display
function getFileExtension(filename) {
  return filename.split(".").pop()?.toUpperCase() || "FILE";
}

// Mock documents - In production, these would come from your API/database
// URLs should point to actual files in /public/documents/ folder
const documents = [
  {
    id: 1,
    name: "Company Handbook.pdf",
    size: "2.4 MB",
    category: "Policies",
    url: "/documents/company-handbook.pdf",
    updatedAt: "Mar 15, 2026",
  },
  {
    id: 2,
    name: "Brand Guidelines.pdf",
    size: "5.1 MB",
    category: "Design",
    url: "/documents/brand-guidelines.pdf",
    updatedAt: "Mar 10, 2026",
  },
  {
    id: 3,
    name: "Team Photo 2026.jpg",
    size: "1.2 MB",
    category: "Media",
    url: "https://picsum.photos/seed/team/800/600",
    updatedAt: "Feb 28, 2026",
  },
  {
    id: 4,
    name: "Project Proposal Template.docx",
    size: "156 KB",
    category: "Templates",
    url: "/documents/project-proposal.docx",
    updatedAt: "Mar 18, 2026",
  },
  {
    id: 5,
    name: "Office Floor Plan.png",
    size: "890 KB",
    category: "Operations",
    url: "https://picsum.photos/seed/office/1200/800",
    updatedAt: "Jan 5, 2026",
  },
  {
    id: 6,
    name: "API Documentation.md",
    size: "127 KB",
    category: "Technical",
    url: "/documents/api-docs.md",
    updatedAt: "Mar 20, 2026",
  },
  {
    id: 7,
    name: "Meeting Notes Template.docx",
    size: "45 KB",
    category: "Templates",
    url: "/documents/meeting-notes.docx",
    updatedAt: "Mar 12, 2026",
  },
  {
    id: 8,
    name: "Product Mockups.png",
    size: "4.2 MB",
    category: "Design",
    url: "https://picsum.photos/seed/mockups/1000/700",
    updatedAt: "Mar 19, 2026",
  },
  {
    id: 9,
    name: "README.md",
    size: "8 KB",
    category: "Technical",
    url: "/documents/readme.md",
    updatedAt: "Mar 21, 2026",
  },
];

const fileTypeConfig = {
  pdf: { icon: FileText, color: "text-red-400", bg: "bg-red-500/20", label: "PDF" },
  doc: { icon: FileText, color: "text-blue-400", bg: "bg-blue-500/20", label: "Word" },
  image: { icon: FileImage, color: "text-green-400", bg: "bg-green-500/20", label: "Image" },
  markdown: { icon: FileCode, color: "text-purple-400", bg: "bg-purple-500/20", label: "Markdown" },
  text: { icon: FileText, color: "text-yellow-400", bg: "bg-yellow-500/20", label: "Text" },
  other: { icon: File, color: "text-gray-400", bg: "bg-gray-500/20", label: "File" },
};

const categories = ["All", ...new Set(documents.map((d) => d.category))];

function DocumentCard({ doc, onView, onDownload }) {
  const fileType = getFileType(doc.name);
  const config = fileTypeConfig[fileType] || fileTypeConfig.other;
  const Icon = config.icon;
  const extension = getFileExtension(doc.name);

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
            <span className={`uppercase font-mono px-1.5 py-0.5 rounded ${config.bg} ${config.color}`}>{extension}</span>
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

function DocumentViewer({ doc, onClose, onDownload }) {
  if (!doc) return null;

  const fileType = getFileType(doc.name);
  const config = fileTypeConfig[fileType] || fileTypeConfig.other;
  const Icon = config.icon;
  const extension = getFileExtension(doc.name);
  const canPreviewInline = ["image"].includes(fileType);
  const canOpenInNewTab = ["pdf", "image", "markdown", "text"].includes(fileType);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl border border-border w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center`}>
              <Icon size={20} className={config.color} />
            </div>
            <div>
              <h2 className="font-semibold text-white">{doc.name}</h2>
              <p className="text-xs text-gray-500">{doc.size} - {extension}</p>
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
          {fileType === "image" ? (
            <img
              src={doc.url}
              alt={doc.name}
              className="max-w-full max-h-full object-contain rounded-lg"
              crossOrigin="anonymous"
            />
          ) : fileType === "pdf" ? (
            <div className="text-center">
              <FileText size={64} className="text-red-500/50 mx-auto mb-4" />
              <p className="text-gray-400 mb-2 font-medium">PDF Document</p>
              <p className="text-sm text-gray-500 mb-6">
                Click below to open this PDF in a new browser tab.
              </p>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
              >
                <Eye size={16} />
                Open in New Tab
              </a>
            </div>
          ) : fileType === "doc" ? (
            <div className="text-center">
              <FileText size={64} className="text-blue-500/50 mx-auto mb-4" />
              <p className="text-gray-400 mb-2 font-medium">Word Document</p>
              <p className="text-sm text-gray-500 mb-6">
                Word documents cannot be previewed in the browser. Download to view in Microsoft Word or Google Docs.
              </p>
            </div>
          ) : fileType === "markdown" || fileType === "text" ? (
            <div className="text-center">
              <FileCode size={64} className="text-purple-500/50 mx-auto mb-4" />
              <p className="text-gray-400 mb-2 font-medium">{config.label} File</p>
              <p className="text-sm text-gray-500 mb-6">
                Click below to open this file in a new tab.
              </p>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
              >
                <Eye size={16} />
                Open in New Tab
              </a>
            </div>
          ) : (
            <div className="text-center">
              <File size={64} className="text-gray-500/50 mx-auto mb-4" />
              <p className="text-gray-400 mb-2 font-medium">File Preview Unavailable</p>
              <p className="text-sm text-gray-500 mb-6">
                This file type cannot be previewed. Please download to view.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex justify-end">
          <button
            onClick={() => onDownload(doc)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors flex items-center gap-2"
          >
            <Download size={16} />
            Download {extension}
          </button>
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
    setViewingDoc(doc);
  };

  const handleDownload = async (doc) => {
    try {
      // For external URLs or same-origin files, fetch and create blob for proper download
      const response = await fetch(doc.url);
      if (!response.ok) throw new Error("Download failed");
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up blob URL
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // Fallback: open in new tab if fetch fails (e.g., CORS issues)
      window.open(doc.url, "_blank", "noopener,noreferrer");
    }
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
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-1">Total</p>
              <p className="text-xl font-bold text-white">{documents.length}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-1">PDFs</p>
              <p className="text-xl font-bold text-red-400">{documents.filter((d) => getFileType(d.name) === "pdf").length}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-1">Images</p>
              <p className="text-xl font-bold text-green-400">{documents.filter((d) => getFileType(d.name) === "image").length}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-1">Word Docs</p>
              <p className="text-xl font-bold text-blue-400">{documents.filter((d) => getFileType(d.name) === "doc").length}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-1">Markdown</p>
              <p className="text-xl font-bold text-purple-400">{documents.filter((d) => getFileType(d.name) === "markdown").length}</p>
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
        <DocumentViewer 
          doc={viewingDoc} 
          onClose={() => setViewingDoc(null)} 
          onDownload={handleDownload}
        />
      )}
    </Layout>
  );
}
