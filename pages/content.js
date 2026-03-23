import Layout from "@/components/Layout";
import { useState, useMemo } from "react";
import { 
  FileText, 
  Plus, 
  Upload, 
  Folder, 
  Calendar, 
  Tag, 
  Search, 
  Eye, 
  Download, 
  Trash2, 
  X,
  Image,
  Film,
  FileType,
  FolderOpen,
  Filter
} from "lucide-react";

// Content categories for marketing materials
const categories = [
  { id: "social", name: "Social Media", icon: Image, color: "bg-pink-500" },
  { id: "email", name: "Email Campaigns", icon: FileText, color: "bg-blue-500" },
  { id: "brochures", name: "Brochures & PDFs", icon: FileType, color: "bg-red-500" },
  { id: "videos", name: "Video Scripts", icon: Film, color: "bg-purple-500" },
  { id: "templates", name: "Templates", icon: Folder, color: "bg-green-500" },
  { id: "brand", name: "Brand Assets", icon: Tag, color: "bg-orange-500" },
];

// Sample marketing content with PDF storage simulation
const initialContent = [
  {
    id: 1,
    title: "Q1 2026 Marketing Overview",
    category: "brochures",
    type: "pdf",
    status: "published",
    created: "2026-03-20",
    author: "Marketing & Outreach",
    size: "2.4 MB",
    description: "Comprehensive marketing strategy document for Q1",
    url: "/content/q1-marketing-overview.pdf",
  },
  {
    id: 2,
    title: "Trade Services Brochure",
    category: "brochures",
    type: "pdf",
    status: "published",
    created: "2026-03-18",
    author: "Manis Doc Creator",
    size: "5.1 MB",
    description: "Customer-facing brochure highlighting trade services",
    url: "/content/trade-services-brochure.pdf",
  },
  {
    id: 3,
    title: "Instagram Campaign - March",
    category: "social",
    type: "image",
    status: "draft",
    created: "2026-03-22",
    author: "Marketing & Outreach",
    size: "850 KB",
    description: "Social media graphics for March campaign",
    url: "/content/instagram-march.zip",
  },
  {
    id: 4,
    title: "Customer Onboarding Email Sequence",
    category: "email",
    type: "html",
    status: "published",
    created: "2026-03-15",
    author: "Marketing & Outreach",
    size: "45 KB",
    description: "5-part email sequence for new customers",
    url: "/content/onboarding-emails.html",
  },
  {
    id: 5,
    title: "Company Introduction Video Script",
    category: "videos",
    type: "doc",
    status: "review",
    created: "2026-03-19",
    author: "Manis Doc Creator",
    size: "28 KB",
    description: "Script for company intro video",
    url: "/content/intro-video-script.docx",
  },
  {
    id: 6,
    title: "Quote Template - Standard",
    category: "templates",
    type: "pdf",
    status: "published",
    created: "2026-03-10",
    author: "Finance & Compliance",
    size: "120 KB",
    description: "Standard quote template for proposals",
    url: "/content/quote-template.pdf",
  },
  {
    id: 7,
    title: "Brand Guidelines 2026",
    category: "brand",
    type: "pdf",
    status: "published",
    created: "2026-03-01",
    author: "Main Coordinator",
    size: "8.2 MB",
    description: "Complete brand guidelines and asset library",
    url: "/content/brand-guidelines-2026.pdf",
  },
  {
    id: 8,
    title: "Facebook Ad Creatives - Spring",
    category: "social",
    type: "image",
    status: "published",
    created: "2026-03-21",
    author: "Marketing & Outreach",
    size: "1.2 MB",
    description: "Spring promotion ad graphics",
    url: "/content/fb-spring-ads.zip",
  },
  {
    id: 9,
    title: "Newsletter Template - Monthly",
    category: "email",
    type: "html",
    status: "published",
    created: "2026-03-12",
    author: "Marketing & Outreach",
    size: "65 KB",
    description: "Reusable monthly newsletter template",
    url: "/content/newsletter-template.html",
  },
  {
    id: 10,
    title: "Service Pricing Guide",
    category: "brochures",
    type: "pdf",
    status: "draft",
    created: "2026-03-23",
    author: "Finance & Compliance",
    size: "1.8 MB",
    description: "Updated pricing guide for all services",
    url: "/content/pricing-guide-2026.pdf",
  },
];

const statusConfig = {
  published: { bg: "bg-green-500/20", text: "text-green-400", label: "Published" },
  draft: { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Draft" },
  review: { bg: "bg-blue-500/20", text: "text-blue-400", label: "In Review" },
  archived: { bg: "bg-gray-500/20", text: "text-gray-400", label: "Archived" },
};

const typeIcons = {
  pdf: { icon: FileType, color: "text-red-400", bg: "bg-red-500/20" },
  doc: { icon: FileText, color: "text-blue-400", bg: "bg-blue-500/20" },
  html: { icon: FileText, color: "text-orange-400", bg: "bg-orange-500/20" },
  image: { icon: Image, color: "text-pink-400", bg: "bg-pink-500/20" },
  video: { icon: Film, color: "text-purple-400", bg: "bg-purple-500/20" },
};

export default function Content() {
  const [content, setContent] = useState(initialContent);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Filter content based on search and filters
  const filteredContent = useMemo(() => {
    return content.filter((item) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        search === "" ||
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.author.toLowerCase().includes(searchLower);

      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [content, search, categoryFilter, statusFilter]);

  // Stats
  const stats = useMemo(() => {
    const pdfCount = content.filter((c) => c.type === "pdf").length;
    const publishedCount = content.filter((c) => c.status === "published").length;
    const draftCount = content.filter((c) => c.status === "draft").length;
    return { total: content.length, pdfCount, publishedCount, draftCount };
  }, [content]);

  const deleteContent = (id) => {
    if (confirm("Are you sure you want to delete this content?")) {
      setContent(content.filter((c) => c.id !== id));
    }
  };

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setStatusFilter("all");
  };

  const hasActiveFilters = search || categoryFilter !== "all" || statusFilter !== "all";

  return (
    <Layout title="Marketing Content">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Marketing Content</h1>
              <p className="text-gray-500">Manage marketing materials, PDFs, and brand assets</p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Upload size={18} />
              Upload Content
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <FolderOpen size={14} className="text-primary" />
                <p className="text-xs text-gray-500">Total Content</p>
              </div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileType size={14} className="text-red-400" />
                <p className="text-xs text-gray-500">PDF Documents</p>
              </div>
              <p className="text-2xl font-bold text-red-400">{stats.pdfCount}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag size={14} className="text-green-400" />
                <p className="text-xs text-gray-500">Published</p>
              </div>
              <p className="text-2xl font-bold text-green-400">{stats.publishedCount}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={14} className="text-yellow-400" />
                <p className="text-xs text-gray-500">Drafts</p>
              </div>
              <p className="text-2xl font-bold text-yellow-400">{stats.draftCount}</p>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                categoryFilter === "all"
                  ? "bg-primary/20 border-primary/50 text-white"
                  : "bg-surface-elevated border-border text-gray-400 hover:border-primary/30"
              }`}
            >
              <FolderOpen size={16} />
              <span className="text-sm">All Content</span>
              <span className="text-xs font-mono bg-surface px-2 py-0.5 rounded">
                {content.length}
              </span>
            </button>
            {categories.map((cat) => {
              const count = content.filter((c) => c.category === cat.id).length;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    categoryFilter === cat.id
                      ? "bg-primary/20 border-primary/50 text-white"
                      : "bg-surface-elevated border-border text-gray-400 hover:border-primary/30"
                  }`}
                >
                  <div className={`w-4 h-4 rounded ${cat.color} flex items-center justify-center`}>
                    <Icon size={10} className="text-white" />
                  </div>
                  <span className="text-sm">{cat.name}</span>
                  <span className="text-xs font-mono bg-surface px-2 py-0.5 rounded">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Search and Filters */}
          <div className="mb-6 p-4 bg-surface rounded-xl border border-border">
            <div className="flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="flex-1 min-w-[250px] relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search content, descriptions, authors..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-white focus:outline-none focus:border-primary/50"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="review">In Review</option>
                  <option value="archived">Archived</option>
                </select>
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

          {/* Content Grid */}
          <div className="grid grid-cols-2 gap-4">
            {filteredContent.map((item) => {
              const category = categories.find((c) => c.id === item.category);
              const status = statusConfig[item.status];
              const typeConfig = typeIcons[item.type] || typeIcons.doc;
              const TypeIcon = typeConfig.icon;
              const CategoryIcon = category?.icon || Folder;

              return (
                <div
                  key={item.id}
                  className="bg-surface-elevated rounded-xl border border-border p-4 hover:border-primary/30 transition-all group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${typeConfig.bg} flex items-center justify-center`}>
                        <TypeIcon size={20} className={typeConfig.color} />
                      </div>
                      <div>
                        <h3 className="font-medium text-white group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className={`w-3 h-3 rounded ${category?.color}`} />
                          <span className="text-xs text-gray-500">{category?.name}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${status.bg} ${status.text}`}>
                      {status.label}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">{item.description}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{item.created}</span>
                    </div>
                    <span>{item.author}</span>
                    <span className="font-mono">{item.size}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                    <button className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors">
                      <Download size={16} />
                    </button>
                    <button
                      onClick={() => deleteContent(item.id)}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredContent.length === 0 && (
            <div className="bg-surface-elevated rounded-xl border border-border p-12 text-center">
              <FileText size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">No content found</p>
              <p className="text-sm text-gray-500">
                {hasActiveFilters ? "Try adjusting your filters" : "Upload your first marketing content"}
              </p>
            </div>
          )}

          {/* Upload Modal */}
          {showUploadModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-surface rounded-xl border border-border p-6 w-full max-w-lg mx-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Upload Content</h2>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="p-2 text-gray-500 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Upload Zone */}
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center mb-6 hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload size={40} className="text-gray-500 mx-auto mb-4" />
                  <p className="text-white mb-2">Drop files here or click to upload</p>
                  <p className="text-sm text-gray-500">PDF, DOC, Images, Videos up to 50MB</p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="Content title..."
                      className="w-full px-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Category</label>
                    <select className="w-full px-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-white focus:outline-none focus:border-primary/50">
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Brief description..."
                      className="w-full px-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 resize-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    <Upload size={16} />
                    Upload
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
