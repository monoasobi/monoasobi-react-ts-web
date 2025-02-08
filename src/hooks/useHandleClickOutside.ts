import { useEffect, useRef, useState } from "react";

export const useHandleClickOutside = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      setTimeout(() => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          isOpen
        ) {
          event.stopPropagation();
          setIsOpen(false);
        }
      }, 0);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, setIsOpen]);

  return { isOpen, setIsOpen, dropdownRef };
};
