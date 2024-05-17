"use client";
import { useState, useCallback } from "react";
import styles from "./page.module.css";

// Define a type for items in the cart
type Item = {
  name: string;
  quantity: number;
};

// Functional component to display item count
function ItemCount({ count, name }: { count: number; name: string }) {
  return (
    <div key={name}>
      {name} count: {count}
    </div>
  );
}

// Array of items
const ItemsList = [
  {
    id: "Item 1",
    name: "Foo",
  },
  {
    id: "Item 2",
    name: "Bar",
  },
  {
    id: "Item 3",
    name: "Baz",
  },
  {
    id: "Item 4",
    name: "Qux",
  },
];

export default function Home() {
  // State to manage items in the cart
  const [items, setItems] = useState<Item[]>([]);

  // Calculate total item count from items array
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Callback function to add items to the cart
  const addToCart = useCallback((product: string) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product);
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map((item) =>
          item.name === product
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new item if it doesn't exist
      return [...prevItems, { name: product, quantity: 1 }];
    });
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Michael&apos;s Amazing Web Store</p>
        <div>
          <button className={styles.basket}>Basket: {itemCount} items</button>
          {ItemsList.map((itemList) => (
            <ItemCount
              name={itemList.id}
              count={
                items.find((item) => item.name === itemList.id)?.quantity || 0
              }
              key={itemList.id}
            />
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {ItemsList.map((itemList) => {
          return (
            <button
              className={styles.card}
              onClick={() => addToCart(itemList.id)}
              aria-label="Add to basket"
              key={itemList.id}
            >
              <h2>
                {itemList.id} <span>-&gt;</span>
              </h2>
              <p>{itemList.name}</p>
            </button>
          );
        })}
      </div>
    </main>
  );
}
