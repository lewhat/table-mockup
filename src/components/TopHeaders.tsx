import { useState, useEffect } from "react";
import { useCheck } from "@/utils/hooks";
import styles from "@/styles/topHeaders.module.css";
import Checkbox from "@/components/Checkbox";
import Dialog from "@/components/Dialog";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Data } from "../../types/global";

function TopHeaders({ data }: { data: Data }) {
  const { check } = useCheck();
  const [checkCount, setCheckCount] = useState(0);
  const [toBeDownloaded, setToBeDownloaded] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalCount = Object.keys(check).length || 0;

  useEffect(() => {
    let count = 0;
    for (const key in check) {
      if (check[key]) count++;
    }
    setCheckCount(count);
  }, [check]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDownload = () => {
    const tempToBeDownloaded = [];
    const selectedOnly = Object.keys(check)
      .filter((k) => check[k] === true)
      .reduce((acc, key) => {
        acc[key] = check[key];
        return acc;
      }, {});

    if (!Object.keys(selectedOnly).length) return null;

    for (const item of data) {
      if (selectedOnly.hasOwnProperty(item.id) && item.status === "available") {
        tempToBeDownloaded.push([item.path, item.device]);
      }
    }

    setToBeDownloaded(tempToBeDownloaded);
    setIsModalOpen(true);
  };
  return (
    <div className={styles.topHeaderContainer}>
      <span className={styles.selectAll}>
        <Checkbox
          type="all"
          indeterminate={checkCount > 0 && checkCount < totalCount}
        />
        <span
          className={styles.marginLeft}
          data-count={checkCount}
          id="checkCount"
        >
          {checkCount > 0 ? ` selected ${checkCount}` : " none selected"}
        </span>
      </span>
      <button className={styles.btn} onClick={handleDownload}>
        <span className={styles.icon}>
          <ArrowDownTrayIcon />
        </span>{" "}
        download selected{" "}
      </button>

      <Dialog isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Only selected items marked “Available” can be downloaded.</h2>
        {toBeDownloaded.length > 0 ? (
          toBeDownloaded.map((item, i) => {
            return (
              <p key={i}>
                {item[0]}, {item[1]}
              </p>
            );
          })
        ) : (
          <p> You have not selected any "Available" items to download.</p>
        )}
      </Dialog>
    </div>
  );
}

export default TopHeaders;
