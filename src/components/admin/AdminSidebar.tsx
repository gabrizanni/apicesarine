import { NavLink } from 'react-router-dom';
import { Calendar, FileText, Image, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { title: 'Prenotazioni', path: '/admin', icon: Calendar, exact: true },
  { title: 'Contenuti', path: '/admin/contenuti', icon: FileText },
  { title: 'Media', path: '/admin/media', icon: Image },
  { title: 'Impostazioni', path: '/admin/impostazioni', icon: Settings },
];

export const AdminSidebar = () => {
  return (
    <aside className="w-64 border-r bg-card flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-foreground">Admin CMS</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
