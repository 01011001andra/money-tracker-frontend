// src/hooks/useRouter.ts
import * as React from "react";
import {
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";

type NavState = unknown;

type To = string; // boleh upgrade ke Partial<Path> kalau mau
type PushOptions = { state?: NavState };
type ReplaceOptions = { state?: NavState };
type BackOptions = { fallback?: To };

export default function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const push = React.useCallback(
    (to: To, opts?: PushOptions) => {
      navigate(to, { replace: false, state: opts?.state });
    },
    [navigate]
  );

  const replace = React.useCallback(
    (to: To, opts?: ReplaceOptions) => {
      navigate(to, { replace: true, state: opts?.state });
    },
    [navigate]
  );

  const back = React.useCallback(
    (opts?: BackOptions) => {
      const canGoBack =
        window.history.state && (window.history.state as any).idx > 0;
      if (canGoBack) navigate(-1);
      else navigate(opts?.fallback ?? "/", { replace: true });
    },
    [navigate]
  );

  // helpers
  const pathname = location.pathname;
  const query = React.useMemo(() => {
    const obj: Record<string, string> = {};
    searchParams.forEach((v, k) => (obj[k] = v));
    return obj;
  }, [searchParams]);

  const setQuery = React.useCallback(
    (
      next:
        | Record<string, string | number | boolean | null | undefined>
        | ((prev: Record<string, string>) => Record<string, any>),
      opts?: { replace?: boolean; keepNull?: boolean }
    ) => {
      const prevObj: Record<string, string> = {};
      searchParams.forEach((v, k) => (prevObj[k] = v));
      const nextObj = typeof next === "function" ? next(prevObj) : next;

      const sp = new URLSearchParams();
      Object.entries(nextObj).forEach(([k, v]) => {
        if (v === null || v === undefined) {
          if (opts?.keepNull) sp.set(k, String(v));
          // else: skip to remove key
        } else {
          sp.set(k, String(v));
        }
      });

      setSearchParams(sp, { replace: !!opts?.replace });
    },
    [searchParams, setSearchParams]
  );

  return {
    // navigation
    push,
    replace,
    back,

    // info
    pathname,
    params,
    query,

    // helpers
    setQuery,
    location,
    navigate, // expose asli kalau butuh
  };
}
