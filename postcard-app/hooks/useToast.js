import { useState, useCallback } from "react";

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success", duration = 3500) => {
    setToast({ message, type });
    if (type !== "loading") {
      setTimeout(() => setToast(null), duration);
    }
  }, []);

  const hideToast = useCallback(() => setToast(null), []);

  return { toast, showToast, hideToast };
}