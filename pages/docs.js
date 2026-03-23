import Layout from '@/components/Layout';
import { useState, useMemo } from 'react';
import { FileText, Folder, Download, Eye, Trash2, Search, Calendar, X } from 'lucide-react';
import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  const docsDir = path.join(process.cwd(), 'documents');
  const docs = [];
  const folders = ['reports','proposals','quotes','contracts','finance','marketing','meeting-notes','research','templates'];

  // Also check root documents folder
  const rootFiles = fs.readdirSync(docsDir).filter(f =>
    fs.statSync(path.join(docsDir, f)).isFile()
  );

  rootFiles.forEach(file => {
    const stats = fs.statSync(path.join(docsDir, file));
    docs.push({
      title: file.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, ''),
      path: `/documents/${file}`,
      rawUrl: `https://raw.githubusercontent.com/rezo-jason/openclaw-config/main/documents/${file}`,
      created: stats.mtime.toISOString().split('T')[0],
      folder: 'root',
      author: 'Agent',
      type: file.split('.').pop(),
      filename: file
    });
  });

  folders.forEach(folder => {
    const folderPath = path.join(docsDir, folder);
    if (!fs.existsSync(folderPath)) return;
    const files = fs.readdirSync(folderPath).filter(f =>
      fs.statSync(path.join(folderPath, f)).isFile()
    );
    files.forEach(file => {
      const stats = fs.statSync(path.join(folderPath, file));
      const parts = file.replace(/\.[^.]+$/, '').split('_');
      // Try to extract date from filename (YYYY-MM-DD format)
      const dateMatch = file.match(/^(\d{4}-\d{2}-\d{2})/);
      const created = dateMatch ? dateMatch[1] : stats.mtime.toISOString().split('T')[0];
      docs.push({
        title: file.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, ''),
        path: `/documents/${folder}/${file}`,
        rawUrl: `https://raw.githubusercontent.com/rezo-jason/openclaw-config/main/documents/${folder}/${file}`,
        created: created,
        folder: folder,
        author: parts[1] || 'Agent',
        type: file.split('.').pop(),
        filename: file
      });
    });
  });

  // Sort by date descending
  docs.sort((a, b) => new Date(b.created) - new Date(a.created));

  return { props: { initialDocs: docs } };
}

export default function Documents({ initialDocs }) {
  const [docs, setDocs] = useState(initialDocs);
  const [search, setSearch] = useState('');
  const [folderFilter, setFolderFilter] = useState('All Folders');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Get unique folders and types for filters
  const folders = useMemo(() => {
    const unique = [...new Set(initialDocs.map(d => d.folder))];
    return ['All Folders', ...unique.sort()];
  }, [initialDocs]);

  const types = useMemo(() => {
    const unique = [...new Set(initialDocs.map(d => d.type))];
    return ['All Types', ...unique.sort()];
  }, [initialDocs]);

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
                      doc.type === 'docx' ? 'bg-blue-500/20 text-blue-400' :
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
                    <a href={doc.rawUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-surface border border-border rounded hover:bg-surface-elevated text-gray-400 hover:text-primary transition-colors" title="Preview">
                      <Eye size={14} />
                    </a>
                    <a href={doc.rawUrl} download className="p-1.5 bg-surface border border-border rounded hover:bg-surface-elevated text-gray-400 hover:text-green-400 transition-colors" title="Download">
                      <Download size={14} />
                    </a>
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
    </Layout>
  );
}
