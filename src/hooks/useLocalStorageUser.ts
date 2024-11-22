import { User } from "@/types/user";
import { useCallback, useState } from "react";

/**
 * A hook to manage a string value stored in local storage.
 *
 * @return {[User | null, (value: User) => void]} An array containing the current value and a function to update the value. Providing a null value will remove the value from local storage.
 */
export default function useLocalStorageUser(): [
  User | null,
  (value: User | null) => void
] {
  const key = "user";
  const [value, setter] = useState(localStorage.getItem(key));

  const setValue = useCallback(
    (value: User | null) => {
      setter(() => {
        if (value === null) {
          localStorage.removeItem(key);
          return null;
        }
        const valueStringified = JSON.stringify(value);
        localStorage.setItem(key, valueStringified);
        return valueStringified;
      });
    },
    [setter]
  );

  return [value ? JSON.parse(value) : value, setValue];
}
