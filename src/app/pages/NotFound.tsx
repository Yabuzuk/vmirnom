import { Link } from "react-router";
import { Home } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Страница не найдена</h2>
        <p className="text-slate-600 mb-8">
          К сожалению, запрашиваемая страница не существует
        </p>
        <Link to="/">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Home className="w-4 h-4 mr-2" />
            Вернуться на главную
          </Button>
        </Link>
      </div>
    </div>
  );
}
