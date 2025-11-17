import { Home, Wrench, BookOpen, MessageCircle } from "lucide-react";

const Sidebar = () => {
  // For now, we'll show the public version. Later, we'll add auth check here.
  const isAdmin = false;

  return (
    <aside className="hidden lg:flex flex-col items-center space-y-4 py-6 w-16 bg-sidebar border-r border-sidebar-border">
      <div className="text-xl font-semibold tracking-tighter text-primary"></div>
      
      <a href="/" className="group relative flex items-center justify-center w-10 h-10 rounded-lg bg-primary shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
        <Home className="w-5 h-5 text-primary-foreground stroke-[1.5]" />
      </a>
      
      <div className="w-6 border-t border-sidebar-border my-2"></div>
      
      <a href="/#services" className="group flex items-center justify-center w-10 h-10 rounded-lg hover:bg-sidebar-accent transition-all duration-300">
        <Wrench className="w-5 h-5 stroke-[1.5] text-sidebar-foreground hover:text-primary transition-colors" />
      </a>
      
      <a href="/blog" className="group flex items-center justify-center w-10 h-10 rounded-lg hover:bg-sidebar-accent transition-all duration-300">
        <BookOpen className="w-5 h-5 stroke-[1.5] text-sidebar-foreground hover:text-primary transition-colors" />
      </a>
      
      <button className="group flex items-center justify-center w-10 h-10 rounded-lg hover:bg-sidebar-accent transition-all duration-300">
        <MessageCircle className="w-5 h-5 stroke-[1.5] text-sidebar-foreground hover:text-primary transition-colors" />
      </button>
      
      <div className="flex-1"></div>
    </aside>
  );
};

export default Sidebar;
