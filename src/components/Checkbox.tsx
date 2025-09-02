import { useEffect, useRef } from "react";
import { useCheck } from "@/utils/hooks";

function Checkbox({
  type,
  indeterminate,
  id,
}: {
  type: string;
  indeterminate?: boolean;
  id?: string;
}) {
  const { check, toggleCheck } = useCheck();
  const checkboxRef = useRef(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  let isChecked = false;
  if (type === "all") {
    isChecked = Object.values(check).every(Boolean);
  } else {
    isChecked = (check && check[id]) || false;
  }

  const handleChange = () => {
    if (!id) {
      toggleCheck();
    } else {
      toggleCheck(id);
    }
  };
  return (
    <>
      <input
        name={type}
        ref={checkboxRef}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
    </>
  );
}

export default Checkbox;
