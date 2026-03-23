import Layout from '@/components/Layout';
import { FileText, Folder, Download, Eye } from 'lucide-react';
import fs from 'fs';
import path from 'path';

// Recursively collect all files from a directory
function getAllFiles(dirPath, basePath = '', arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const relativePath = basePath ? `${basePath}/${file}` : file;
    
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, relativePath, arrayOfFiles);
    } else {
      arrayOfFiles.push({
        file,
        relativePath,
        folder: basePath || 'root'
      });
    }
  });
  
  return arrayOfFiles;
}

export async function getServerSideProps() {
  const docsDir = path.join(process.cwd(), 'documents');
  const docs = [];

  try {
    // Check if documents directory exists
    if (!fs.existsSync(docsDir)) {
      return { props: { docs: [] } };
    }

    // Recursively get all files
    const allFiles = getAllFiles(docsDir);

    allFiles.forEach(({ file, relativePath, folder }) => {
      const parts = file.replace(/\.[^.]+$/, '').split('_');
      docs.push({
        title: file.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, ''),
        path: `/documents/${relativePath}`,
        rawUrl: `https://raw.githubusercontent.com/rezo-jason/openclaw-config/main/documents/${relativePath}`,
        created: parts[0] || new Date().toISOString().split('T')[0],
        folder: folder,
        author: parts[1] || 'Agent',
        type: file.split('.').pop()
      });
    });
  } catch (error) {
    console.error('Error reading documents:', error);
    return { props: { docs: [] } };
  }

  return { props: { docs } };
}

export default function Documents({ docs }) {
  return (
    <Layout title="Documents">
      <div className="grid-floor min-h-screen">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Documents</h1>
            <p className="text-gray-500">Central repository for all agent outputs — {docs.length} document{docs.length !== 1 ? 's' : ''}</p>
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
              {docs.length === 0 && (
                <div className="p-8 text-center text-gray-500">No documents yet.</div>
              )}
              {docs.map((doc, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 p-4 hover:bg-surface-elevated/50 transition-colors items-center">
                  <div className="col-span-1">
                    <FileText size={16} className="text-primary" />
                  </div>
                  <div className="col-span-4">
                    <span className="text-sm text-white font-medium truncate block" title={doc.title}>{doc.title}</span>
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
