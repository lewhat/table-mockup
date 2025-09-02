"use client";
import { useEffect, useState } from "react";
import data from "@/constants/data.json";
import styles from "@/styles/page.module.css";
import { CheckProvider } from "@/utils/checkContext";
import TopHeaders from "@/components/TopHeaders";
import Table from "@/components/Table";

export default function Home() {
  const [headers, setHeaders] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    const parsedHeaders = [];
    const sampleData = data[0];
    const currentData = [];

    for (const key in sampleData) {
      parsedHeaders.push(key);
    }

    for (const [idx, item] of data.entries()) {
      currentData.push({
        ...item,
        id: `${idx}_${item.name}`,
      });
    }

    setHeaders(parsedHeaders);
    setUpdatedData(currentData);
  }, []);

  return (
    <CheckProvider>
      <div className={styles.main}>
        <div className={styles.container}>
          <TopHeaders data={updatedData} />
          <Table headers={headers} data={updatedData} />
        </div>
      </div>
    </CheckProvider>
  );
}
