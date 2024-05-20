"use client";
import { useState, useCallback } from "react";
import styles from "./page.module.css";
import { ItemsList } from "./data/itemsList";
import ItemCount from "./components/item-count/ItemCount";
import Card from "./components/card/Card";

// Define a type for items in the cart
type Item = {
  name: string;
  quantity: number;
};

export default function Home() {
  // State to manage items in the cart
  const [items, setItems] = useState<Item[]>([]);

  // Calculate total item count from items array
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Callback function to add items to the cart
  const addToCart = useCallback((product: string) => {
    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.name === product);
      if (itemIndex !== -1) {
        // Update quantity if item already exists
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += 1;
        return updatedItems;
      }
      // Add new item if it doesn't exist
      return [...prevItems, { name: product, quantity: 1 }];
    });
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.description}>
        <h1>Michael&apos;s Amazing Web Store</h1>
        <div>
          <button className={styles.basket}>
            Basket: {itemCount}
            {` item${itemCount !== 1 ? "s" : ""}`}
          </button>
          <ul>
            {ItemsList.map((itemList) => (
              <ItemCount
                name={itemList.id}
                count={
                  items.find((item) => item.name === itemList.id)?.quantity || 0
                }
                key={itemList.id}
              />
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.gridContainer}>
        <ul className={styles.grid}>
          {ItemsList.map((itemList) => (
            <Card
              key={itemList.id}
              id={itemList.id}
              name={itemList.name}
              onAddToCart={addToCart}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
