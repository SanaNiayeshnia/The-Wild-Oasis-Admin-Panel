import { useEffect, useRef } from "react";

function useOutsideClick(handler, eventCapturing = true) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (!ref?.current?.contains(e.target)) handler();
    }
    document.addEventListener("click", handleClick, eventCapturing);

    return () => {
      document.removeEventListener("click", handleClick, eventCapturing);
    };
  }, [handler]);
  return ref;
}

export default useOutsideClick;
