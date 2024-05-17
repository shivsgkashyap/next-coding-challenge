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
          <ItemCount
            name="Item 1"
            count={items.find((item) => item.name === "Item 1")?.quantity || 0}
          />
          <ItemCount
            name="Item 2"
            count={items.find((item) => item.name === "Item 2")?.quantity || 0}
          />
          <ItemCount
            name="Item 3"
            count={items.find((item) => item.name === "Item 3")?.quantity || 0}
          />
          <ItemCount
            name="Item 4"
            count={items.find((item) => item.name === "Item 4")?.quantity || 0}
          />
        </div>
      </div>

      <div className={styles.grid}>
        <button
          className={styles.card}
          onClick={() => addToCart("Item 1")}
          aria-label="Add to basket"
        >
          <h2>
            Item 1 <span>-&gt;</span>
          </h2>
          <p>Foo</p>
        </button>
        <button
          className={styles.card}
          onClick={() => addToCart("Item 2")}
          aria-label="Add to basket"
        >
          <h2>
            Item 2 <span>-&gt;</span>
          </h2>
          <p>Bar</p>
        </button>
        <button
          className={styles.card}
          onClick={() => addToCart("Item 3")}
          aria-label="Add to basket"
        >
          <h2>
            Item 3 <span>-&gt;</span>
          </h2>
          <p>Baz</p>
        </button>
        <button
          className={styles.card}
          onClick={() => addToCart("Item 4")}
          aria-label="Add to basket"
        >
          <h2>
            Item 4 <span>-&gt;</span>
          </h2>
          <p>Qux</p>
        </button>
      </div>
    </main>
  );
}
