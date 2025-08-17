// src/sheets/useSheetRouter.ts
import * as React from "react";
import { useSearchParams } from "react-router-dom";

type SetOpts = { replace?: boolean };
type OpenOpts = SetOpts & { allowDuplicates?: boolean };

const arrEq = (a: string[], b: string[]) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

export function useSheetRouter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const stack = React.useMemo(
    () => searchParams.getAll("sheet"),
    [searchParams]
  );

  const buildNextParams = (nextStack: string[]) => {
    const next = new URLSearchParams(searchParams);
    next.delete("sheet");
    nextStack.forEach((k) => next.append("sheet", k));
    return next;
  };

  const setStack = (keys: string[], opts?: SetOpts) => {
    const normalized = keys.filter(Boolean);
    if (arrEq(stack, normalized)) return false; // <-- tidak ada perubahan, jangan update URL
    const next = buildNextParams(normalized);
    setSearchParams(next, { replace: opts?.replace ?? false });
    return true;
  };

  const openSheet = (key: string, opts?: OpenOpts) => {
    if (!key) return false;
    const allowDup = !!opts?.allowDuplicates;
    if (!allowDup && stack.includes(key)) return false; // <-- sudah ada: no-op
    return setStack([...stack, key], opts);
  };

  // Idempotent open (paling aman dipakai di UI)
  const ensureSheet = (key: string, opts?: SetOpts) =>
    openSheet(key, { ...opts, allowDuplicates: false });

  const closeTop = (opts?: SetOpts) => {
    if (stack.length === 0) return false;
    return setStack(stack.slice(0, -1), opts);
  };

  const closeSheet = (key: string, opts?: SetOpts) => {
    const idx = [...stack].lastIndexOf(key);
    if (idx === -1) return false; // nggak ada: no-op
    const next = stack.filter((_, i) => i !== idx);
    return setStack(next, opts);
  };

  const replaceAll = (keys: string[], opts?: SetOpts) =>
    setStack(keys, { replace: opts?.replace });

  return {
    stack,
    openSheet, // bisa duplikat kalau allowDuplicates=true
    ensureSheet, // default: no-dup, no-redirect kalau sudah ada
    closeTop,
    closeSheet,
    replaceAll,
    has: (k: string) => stack.includes(k),
  };
}
