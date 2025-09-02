import { Data } from "../../types/global";

export const generateDataId = (items: Data) => {
  const result = {};
  for (const [idx, item] of items.entries()) {
    const key = `${idx}_${item.name}`;
    result[key] = false;
  }
  return result;
};
