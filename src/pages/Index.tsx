import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  flavor: string;
}

export interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Papitas Clásicas",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop",
    description: "Papitas crujientes con sal marina",
    flavor: "Sal Marina"
  },
  {
    id: 2,
    name: "Papitas BBQ",
    price: 2.75,
    image: "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=300&h=300&fit=crop",
    description: "Sabor ahumado y delicioso",
    flavor: "BBQ"
  },
  {
    id: 3,
    name: "Papitas Picantes",
    price: 2.75,
    image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=300&h=300&fit=crop",
    description: "Para los amantes del picante",
    flavor: "Chile Picante"
  },
  {
    id: 4,
    name: "Papitas Queso",
    price: 3.00,
    image: "https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=300&h=300&fit=crop",
    description: "Cremoso sabor a queso cheddar",
    flavor: "Queso Cheddar"
  },
  {
    id: 5,
    name: "Papitas Limón",
    price: 2.60,
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=300&h=300&fit=crop",
    description: "Refrescante sabor cítrico",
    flavor: "Limón"
  },
  {
    id: 6,
    name: "Papitas Jalapeño",
    price: 2.90,
    image: "https://images.unsplash.com/photo-1628191081676-8f40d4ce6c44?w=300&h=300&fit=crop",
    description: "Picante suave con jalapeño",
    flavor: "Jalapeño"
  }
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  console.log("Tienda de papitas cargada con", products.length, "productos");
  console.log("Items en carrito:", cartItems.length);

  const addToCart = (product: Product) => {
    console.log("Agregando producto al carrito:", product.name);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    console.log("Removiendo producto del carrito:", productId);
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    console.log("Actualizando cantidad:", productId, quantity);
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">🥔 Papitas Deliciosas</h1>
          <p className="text-xl mb-8">Las mejores papitas crujientes con sabores únicos</p>
          <div className="flex justify-center items-center gap-4">
            <Button
              onClick={() => setIsCartOpen(true)}
              className="bg-white text-orange-500 hover:bg-gray-100 flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Carrito ({getTotalItems()})
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Nuestros Sabores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cart */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        totalPrice={getTotalPrice()}
      />
    </div>
  );
};

export default Index;