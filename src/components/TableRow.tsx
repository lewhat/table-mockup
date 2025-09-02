import Checkbox from "./Checkbox";
import { useCheck } from "@/utils/hooks";
import styles from "@/styles/tableRow.module.css";

type Row = {
  name: string;
  device: string;
  path: string;
  status: string;
  id?: string;
};
function TableRow({ row, id }: { row: Row; id: string }) {
  const { check } = useCheck();

  return (
    <tr className={`${styles.tr} ${check && check[id] ? styles.check : ""}`}>
      <td className={styles.td}>
        <Checkbox type="individual" id={id} />
      </td>
      {Object.entries(row).map(([key, value]) => {
        if (key === "id") return null;
        return (
          <td
            className={` ${styles.td} ${key === "status" ? styles.status : ""}`}
            key={key}
          >
            {key === "status" && value === "available" && (
              <span className={styles.available}></span>
            )}
            {value}
          </td>
        );
      })}
    </tr>
  );
}

export default TableRow;
