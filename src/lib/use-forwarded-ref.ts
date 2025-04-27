import { useRef, useEffect } from "react";

export function useForwardedRef<T>(forwardedRef: React.ForwardedRef<T>) {
  const innerRef = useRef<T>(null);

  useEffect(() => {
    if (!forwardedRef) return;

    if (typeof forwardedRef === "function") {
      forwardedRef(innerRef.current);
    } else if (typeof forwardedRef === "object" && forwardedRef !== null) {
      (forwardedRef as React.MutableRefObject<T | null>).current =
        innerRef.current;
    }
  }, [forwardedRef]);

  return innerRef;
}
