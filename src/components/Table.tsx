import styles from "@/styles/table.module.css";
import TableRow from "@/components/TableRow";
import { Data } from "../../types/global";

function Table({ headers, data }: { headers: string[]; data: Data }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.header}>
          <th className={styles.th}></th>
          {headers.map((header, i) => {
            return (
              <th className={styles.th} key={i}>
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => {
          return <TableRow row={row} key={idx} id={row.id} />;
        })}
      </tbody>
    </table>
  );
}

export default Table;
