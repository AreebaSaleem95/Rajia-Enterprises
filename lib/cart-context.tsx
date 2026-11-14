"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  color: string;
  sizeBreakdown: { [size: string]: number };
  totalQuantity: number;
  targetPrice?: number;
  packagingPreference: string;
  customLogo: boolean;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  updateQuantity: (id: string, sizeBreakdown: { [size: string]: number }) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalPieces: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("vesto_inquiry_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("vesto_inquiry_cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (item: Omit<CartItem, "id">) => {
    const id = `${item.productId}-${item.color}-${Date.now()}`;
    setItems((prev) => [...prev, { ...item, id }]);
  };

  const updateQuantity = (id: string, sizeBreakdown: { [size: string]: number }) => {
    const total = Object.values(sizeBreakdown).reduce((a, b) => a + (Number(b) || 0), 0);
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, sizeBreakdown, totalQuantity: total } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPieces = items.reduce((acc, item) => acc + item.totalQuantity, 0);
  const itemCount = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalPieces,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
