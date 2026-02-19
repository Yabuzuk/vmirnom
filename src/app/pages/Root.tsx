import { Outlet, Link, useLocation } from "react-router";
import { Building2, MessageSquare, PlusCircle, Home, Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";

export function Root() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Главная", href: "/", icon: Home },
    { name: "Объявления", href: "/classifieds", icon: MessageSquare },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-blue-600" />
              <div>
                <div className="font-bold text-xl text-slate-900">ГородПортал</div>
                <div className="text-xs text-slate-500">Ваш город онлайн</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <Link to="/post-ad" className="hidden md:block">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <PlusCircle className="w-4 h-4 mr-2" />
                Разместить объявление
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/post-ad"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2"
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Разместить объявление
                  </Button>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-8 h-8 text-blue-600" />
                <div className="font-bold text-xl text-slate-900">ГородПортал</div>
              </div>
              <p className="text-slate-600 text-sm">
                Современная платформа для жителей города. Новости, события, объявления и многое другое.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Разделы</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-slate-600 hover:text-blue-600 text-sm">
                    Главная
                  </Link>
                </li>
                <li>
                  <Link to="/classifieds" className="text-slate-600 hover:text-blue-600 text-sm">
                    Объявления
                  </Link>
                </li>
                <li>
                  <Link to="/post-ad" className="text-slate-600 hover:text-blue-600 text-sm">
                    Разместить объявление
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>support@cityportal.ru</li>
                <li>+7 (999) 123-45-67</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-8 pt-8 text-center text-sm text-slate-600">
            © 2026 ГородПортал. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
