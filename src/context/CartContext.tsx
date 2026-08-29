import { createContext, useContext, useState, type ReactNode } from "react";
import type { Character, MerchType } from "../types/character";

export interface CartItem {
  character: Character;
  merchType: MerchType;
  price: number;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string, type: MerchType) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextValue>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  total: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(newItem: Omit<CartItem, "qty">) {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.character.id === newItem.character.id && i.merchType === newItem.merchType
      );
      if (existing) {
        return prev.map((i) =>
          i.character.id === newItem.character.id && i.merchType === newItem.merchType
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { ...newItem, qty: 1 }];
    });
  }

  function removeItem(id: string, type: MerchType) {
    setItems((prev) => prev.filter((i) => !(i.character.id === id && i.merchType === type)));
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
