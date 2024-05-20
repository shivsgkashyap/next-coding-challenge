import styles from "./Card.module.css";

type CardProps = {
  id: string;
  name: string;
  onAddToCart: (product: string) => void;
};

export default function Card({ id, name, onAddToCart }: CardProps) {
  return (
    <li>
      <button
        className={styles.card}
        onClick={() => onAddToCart(id)}
        aria-label="Add to basket"
      >
        <h2>
          {id} <span>-&gt;</span>
        </h2>
        <p>{name}</p>
      </button>
    </li>
  );
}
