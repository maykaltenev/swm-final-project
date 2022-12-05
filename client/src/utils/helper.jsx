import { useEffect } from "react";

export default function useOutsideCloseDropMenu(
  ref,
  setShowAsideMenu,
  scrolling
) {
  useEffect(() => {
    if (!scrolling) return;
    function handleClickOutside(event) {
      if (!ref?.current?.contains(event?.target)) {
        setShowAsideMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, scrolling]);
}
