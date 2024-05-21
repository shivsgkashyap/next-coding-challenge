import styles from "./ItemCount.module.css";

type ItemCountProps = {
  count: number;
  name: string;
};

const ItemCount = ({ count, name }: ItemCountProps) => {
  return (
    <li key={name} className={styles.itemCount}>
      {name} count: {count}
    </li>
  );
};

export default ItemCount;
