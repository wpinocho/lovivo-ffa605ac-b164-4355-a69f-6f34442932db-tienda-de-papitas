import { ShoppingBag } from "lucide-react";

export const Header = () => {
  console.log("Header component rendered");
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-800">Papitas Store</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
              Inicio
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
              Productos
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
              Contacto
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};