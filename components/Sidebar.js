import Link from "next/link";
import { useRouter } from "next/router";
import {
  CheckSquare,
  Bot,
  FileText,
  CheckCircle,
  Users,
  Calendar,
  FolderKanban,
  Brain,
  FileStack,
  UserCircle,
  Building2,
  UsersRound,
  Settings,
  Radar,
  Factory,
  GitBranch,
} from "lucide-react";

const navItems = [
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Agents", href: "/agents", icon: Bot },
  { name: "Content", href: "/content", icon: FileText },
  { name: "Approvals", href: "/approvals", icon: CheckCircle },
  { name: "Council", href: "/council", icon: Users },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Memory", href: "/memory", icon: Brain },
  { name: "Docs", href: "/docs", icon: FileStack },
  { name: "People", href: "/people", icon: UserCircle },
  { name: "Office", href: "/", icon: Building2 },
  { name: "Team", href: "/team", icon: UsersRound },
  { name: "System", href: "/system", icon: Settings },
  { name: "Radar", href: "/radar", icon: Radar },
  { name: "Factory", href: "/factory", icon: Factory },
  { name: "Pipeline", href: "/pipeline", icon: GitBranch },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-surface border-r border-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <h1 className="text-lg font-bold italic">
          <span className="text-primary">SUPERCHARGED</span>{" "}
          <span className="text-white">TRADIES</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1 font-mono">Mission Control</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive =
              router.pathname === item.href ||
              (item.href !== "/" && router.pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-gray-500 font-mono">System Online</span>
        </div>
      </div>
    </aside>
  );
}
