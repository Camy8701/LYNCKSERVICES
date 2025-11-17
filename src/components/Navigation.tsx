import { Search, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-4 mt-8 mb-4 mx-4 md:mx-6 lg:mx-8 glass-card rounded-2xl">
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg"></div>
          <span className="text-lg font-semibold text-foreground tracking-tight">Lynck Homes</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-foreground font-medium hover:text-primary transition-colors duration-300">Features</a>
          <a href="#" className="text-sm text-muted-foreground font-medium hover:text-foreground transition-colors duration-300">Solutions</a>
          <a href="#" className="text-sm text-muted-foreground font-medium hover:text-foreground transition-colors duration-300">Blog</a>
          <a href="#" className="text-sm text-muted-foreground font-medium hover:text-foreground transition-colors duration-300">Resources</a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2 pl-10 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 w-96 transition-all duration-300"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300 group"
        >
          {theme === "dark" ? (
            <Moon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
          ) : (
            <Sun className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
