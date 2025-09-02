import { useContext } from "react";
import { CheckContext } from "./checkContext";

export const useCheck = () => useContext(CheckContext);
