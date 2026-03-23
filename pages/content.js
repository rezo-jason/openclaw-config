import { useState } from "react";
import Layout from "@/components/Layout";
import { 
  FileText, 
  Plus, 
  Download, 
  Eye, 
  Trash2, 
  Bot, 
  Calendar,
  Tag,
  X,
  AlertTriangle,
  Search,
  Filter,
  ChevronDown,
  Megaphone,
  Mail,
  Share2,
  FileImage,
  Clock
} from "lucide-react";

// Marketing post types
const postTypes = {
  social: { label: "Social Media", icon: Share2, color: "text-blue-400", bg: "bg-blue-500/20" },
  email: { label: "Email Campaign", icon: Mail, color: "text-green-400", bg: "bg-green-500/20" },
  blog: { label: "Blog Post", icon: FileText, color: "text-purple-400", bg: "bg-purple-500/20" },
  ad: { label: "Advertisement", icon: Megaphone, color: "text-orange-400", bg: "bg-orange-500/20" },
  graphic: { label: "Graphic", icon: FileImage, color: "text-pink-400", bg: "bg-pink-500/20" },
};

// Initial marketing posts from the Marketing & Outreach agent
const initialPosts = [
  {
    id: 1,
    title: "Spring Campaign Launch",
    type: "social",
    agent: "Marketing & Outreach",
    createdAt: "Mar 22, 2026",
    status: "published",
    platform: "Instagram, Facebook",
    pdfUrl: "/marketing/spring-campaign.pdf",
    description: "Seasonal promotion for spring services with 15% discount offer.",
  },
  {
    id: 2,
    title: "Weekly Newsletter - Week 12",
    type: "email",
    agent: "Marketing & Outreach",
    createdAt: "Mar 21, 2026",
    status: "published",
    platform: "Email List",
    pdfUrl: "/marketing/newsletter-week12.pdf",
    description: "Weekly update featuring new services and customer testimonials.",
  },
  {
    id: 3,
    title: "Trade Tips: Electrical Safety",
    type: "blog",
    agent: "Marketing & Outreach",
    createdAt: "Mar 20, 2026",
    status: "draft",
    platform: "Website Blog",
    pdfUrl: "/marketing/electrical-safety-tips.pdf",
    description: "Educational content about electrical safety for homeowners.",
  },
  {
    id: 4,
    title: "Google Ads - Emergency Plumber",
    type: "ad",
    agent: "Marketing & Outreach",
    createdAt: "Mar 19, 2026",
    status: "published",
    platform: "Google Ads",
    pdfUrl: "/marketing/google-ads-plumber.pdf",
    description: "PPC campaign targeting emergency plumbing keywords.",
  },
  {
    id: 5,
    title: "Service Showcase Banner",
    type: "graphic",
    agent: "Marketing & Outreach",
    createdAt: "Mar 18, 2026",
    status: "published",
    platform: "Website, Social",
    pdfUrl: "/marketing/service-banner.pdf",
    description: "Visual banner showcasing all trade services offered.",
  },
  {
    id: 6,
    title: "Customer Referral Program",
    type: "email",
    agent: "Marketing & Outreach",
    createdAt: "Mar 17, 2026",
    status: "scheduled",
    platform: "Email List",
    pdfUrl: "/marketing/referral-program.pdf",
    description: "Email announcing new customer referral rewards program.",
  },
  {
    id: 7,
    title: "LinkedIn Company Update",
    type: "social",
    agent: "Marketing & Outreach",
    createdAt: "Mar 16, 2026",
    status: "published",
    platform: "LinkedIn",
    pdfUrl: "/marketing/linkedin-update.pdf",
    description: "Professional update about company growth and new hires.",
  },
];

const statusConfig = {
  published: { label: "Published", color: "text-green-400", bg: "bg-green-500/20" },
  draft: { label: "Draft", color: "text-yellow-400", bg: "bg-yellow-500/20" },
  scheduled: { label: "Scheduled", color: "text-blue-400", bg: "bg-blue-500/20" },
};

const typeFilters = ["All Types", ...Object.keys(postTypes)];
const statusFilters = ["All Status", "published", "draft", "scheduled"];

function PostCard({ post, onView, onDownload, onDelete }) {
  const typeConfig = postTypes[post.type];
  const TypeIcon = typeConfig.icon;
  const status = statusConfig[post.status];

  return (
    <div className="p-4 bg-surface-elevated rounded-xl border border-border hover:border-primary/30 transition-all group">
      <div className="flex items-start gap-4">
        {/* Type Icon */}
        <div className={`w-12 h-12 rounded-lg ${typeConfig.bg} flex items-center justify-center shrink-0`}>
          <TypeIcon size={24} className={typeConfig.color} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-medium text-white text-sm truncate group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded ${status.bg} ${status.color} shrink-0`}>
              {status.label}
            </span>
          </div>
          
          <p className="text-xs text-gray-500 mb-2 line-clamp-2">{post.description}</p>
          
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Tag size={12} />
              <span>{typeConfig.label}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{post.createdAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <Share2 size={12} />
              <span className="truncate max-w-[100px]">{post.platform}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onView(post)}
            className="p-2 bg-surface border border-border rounded-lg hover:border-primary/30 hover:text-primary transition-colors text-gray-400"
            title="View PDF"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onDownload(post)}
            className="p-2 bg-surface border border-border rounded-lg hover:border-primary/30 hover:text-primary transition-colors text-gray-400"
            title="Download PDF"
          >
            <Download size={16} />
          </button>
          <button
            onClick={() => onDelete(post)}
            className="p-2 bg-surface border border-border rounded-lg hover:border-red-500/50 hover:text-red-400 transition-colors text-gray-400"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function PostViewer({ post, onClose, onDownload }) {
  if (!post) return null;

  const typeConfig = postTypes[post.type];
  const TypeIcon = typeConfig.icon;
  const status = statusConfig[post.status];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl border border-border w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${typeConfig.bg} flex items-center justify-center`}>
              <TypeIcon size={20} className={typeConfig.color} />
            </div>
            <div>
              <h2 className="font-semibold text-white">{post.title}</h2>
              <p className="text-xs text-gray-500">{typeConfig.label} - {post.createdAt}</p>
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
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded ${status.bg} ${status.color}`}>
                {status.label}
              </span>
              <span className="text-xs text-gray-500">Platform: {post.platform}</span>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Description</h4>
              <p className="text-white">{post.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Created By</h4>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot size={16} className="text-primary" />
                </div>
                <span className="text-white">{post.agent}</span>
              </div>
            </div>

            <div className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <FileText size={24} className="text-red-400" />
                <div>
                  <p className="text-white font-medium">PDF Document</p>
                  <p className="text-xs text-gray-500">{post.pdfUrl}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                This marketing content has been saved as a PDF. Click below to download or open in a new tab.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex justify-end gap-3">
          <a
            href={post.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-surface-elevated border border-border rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-colors flex items-center gap-2"
          >
            <Eye size={16} />
            Open in New Tab
          </a>
          <button
            onClick={() => onDownload(post)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors flex items-center gap-2"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ post, onConfirm, onCancel }) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl border border-border w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
              <AlertTriangle size={24} className="text-red-400" />
            </div>
            <div>
              <h2 className="font-semibold text-white text-lg">Delete Marketing Post</h2>
              <p className="text-sm text-gray-500">This will also delete the PDF</p>
            </div>
          </div>
          
          <p className="text-gray-400 mb-6">
            Are you sure you want to delete <span className="text-white font-medium">"{post.title}"</span>?
          </p>

          <div className="flex items-center gap-3 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-surface-elevated border border-border rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(post)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Content() {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [viewingPost, setViewingPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                          post.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "All Types" || post.type === typeFilter;
    const matchesStatus = statusFilter === "All Status" || post.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleView = (post) => {
    setViewingPost(post);
  };

  const handleDownload = async (post) => {
    try {
      const response = await fetch(post.pdfUrl);
      if (!response.ok) throw new Error("Download failed");
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${post.title.replace(/\s+/g, "-").toLowerCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.open(post.pdfUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleDeleteClick = (post) => {
    setDeletingPost(post);
  };

  const handleDeleteConfirm = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
    setDeletingPost(null);
  };

  const handleDeleteCancel = () => {
    setDeletingPost(null);
  };

  // Stats
  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;
  const scheduledCount = posts.filter((p) => p.status === "scheduled").length;

  return (
    <Layout title="Content">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Marketing Content</h1>
              <p className="text-gray-500">Posts created by Marketing & Outreach agent, stored as PDFs</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Bot size={16} className="text-primary" />
              <span className="text-gray-400">Agent: Marketing & Outreach</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-1">Total Posts</p>
              <p className="text-2xl font-bold text-white">{posts.length}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-1">Published</p>
              <p className="text-2xl font-bold text-green-400">{publishedCount}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-1">Drafts</p>
              <p className="text-2xl font-bold text-yellow-400">{draftCount}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-4">
              <p className="text-xs text-gray-500 mb-1">Scheduled</p>
              <p className="text-2xl font-bold text-blue-400">{scheduledCount}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search marketing posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface-elevated border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowTypeDropdown(!showTypeDropdown);
                  setShowStatusDropdown(false);
                }}
                className={`flex items-center gap-2 px-4 py-3 bg-surface-elevated border rounded-lg transition-colors min-w-[150px] ${
                  typeFilter !== "All Types" 
                    ? "border-primary text-primary" 
                    : "border-border text-gray-400 hover:border-primary/30"
                }`}
              >
                <Filter size={16} />
                <span className="text-sm flex-1 text-left">
                  {typeFilter === "All Types" ? "All Types" : postTypes[typeFilter]?.label}
                </span>
                <ChevronDown size={16} className={`transition-transform ${showTypeDropdown ? "rotate-180" : ""}`} />
              </button>

              {showTypeDropdown && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-surface-elevated border border-border rounded-lg shadow-xl z-40 overflow-hidden">
                  {typeFilters.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setTypeFilter(type);
                        setShowTypeDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                        typeFilter === type
                          ? "bg-primary/20 text-primary"
                          : "text-gray-400 hover:bg-surface"
                      }`}
                    >
                      {type !== "All Types" && (
                        <span className={`w-2 h-2 rounded-full ${postTypes[type]?.bg}`} />
                      )}
                      {type === "All Types" ? "All Types" : postTypes[type]?.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowStatusDropdown(!showStatusDropdown);
                  setShowTypeDropdown(false);
                }}
                className={`flex items-center gap-2 px-4 py-3 bg-surface-elevated border rounded-lg transition-colors min-w-[150px] ${
                  statusFilter !== "All Status" 
                    ? "border-primary text-primary" 
                    : "border-border text-gray-400 hover:border-primary/30"
                }`}
              >
                <Clock size={16} />
                <span className="text-sm flex-1 text-left">
                  {statusFilter === "All Status" ? "All Status" : statusConfig[statusFilter]?.label}
                </span>
                <ChevronDown size={16} className={`transition-transform ${showStatusDropdown ? "rotate-180" : ""}`} />
              </button>

              {showStatusDropdown && (
                <div className="absolute top-full right-0 mt-1 w-40 bg-surface-elevated border border-border rounded-lg shadow-xl z-40 overflow-hidden">
                  {statusFilters.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setShowStatusDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        statusFilter === status
                          ? "bg-primary/20 text-primary"
                          : "text-gray-400 hover:bg-surface"
                      }`}
                    >
                      {status === "All Status" ? "All Status" : statusConfig[status]?.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Posts List */}
          {filteredPosts.length === 0 ? (
            <div className="flex items-center justify-center h-[300px] bg-surface-elevated rounded-xl border border-border">
              <div className="text-center">
                <Megaphone size={48} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500">No marketing posts found</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onView={handleView}
                  onDownload={handleDownload}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* View Modal */}
      {viewingPost && (
        <PostViewer 
          post={viewingPost} 
          onClose={() => setViewingPost(null)} 
          onDownload={handleDownload}
        />
      )}

      {/* Delete Modal */}
      {deletingPost && (
        <DeleteConfirmModal
          post={deletingPost}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </Layout>
  );
}
