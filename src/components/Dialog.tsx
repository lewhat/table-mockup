import { useRef, useEffect } from "react";
import styles from "@/styles/dialog.module.css";

function Dialog({ isOpen, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return (
    <div className={styles.container}>
      <dialog
        className={styles.dialog}
        ref={dialogRef}
        onCancel={onClose}
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            onClose();
          }
        }}
      >
        <div>
          {children}
          <button className={styles.close} onClick={onClose}>
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default Dialog;
