import { useMemo, useState } from "react";
import { EMPTY_POSTCARD } from "../interfaces/postcard";

export function usePostcardDraft(initialValue = {}) {
  const [draft, setDraft] = useState({ ...EMPTY_POSTCARD, ...initialValue });

  const updateField = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const updateMany = (values) => {
    setDraft((prev) => ({ ...prev, ...values }));
  };

  const resetDraft = () => {
    setDraft(EMPTY_POSTCARD);
  };

  return useMemo(
    () => ({ draft, setDraft, updateField, updateMany, resetDraft }),
    [draft]
  );
}