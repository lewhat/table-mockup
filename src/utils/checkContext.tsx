import { createContext, useState } from "react";
import data from "@/constants/data.json";
import { generateDataId } from "./generateDataId";

export const CheckContext = createContext();

export const CheckProvider = ({ children }: { children: React.ReactNode }) => {
  const [check, setCheck] = useState(generateDataId(data));

  const toggleCheck = (id?: string) => {
    setCheck((prev) => {
      if (!id) {
        const allSelected = Object.values(prev).every(Boolean);
        const nextEvent = Object.fromEntries(
          Object.keys(prev).map((id) => [id, !allSelected]),
        );
        return nextEvent;
      }
      return {
        ...prev,
        [id]: !prev[id],
      };
    });
  };

  return (
    <CheckContext.Provider value={{ check, toggleCheck }}>
      {children}
    </CheckContext.Provider>
  );
};
