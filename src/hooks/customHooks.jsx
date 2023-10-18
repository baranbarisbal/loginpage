import { useState } from "react";

export function useCustomHook() {
  const [user, setUser] = useState(null);

  return {
    user,
    setUser,
  };
}
