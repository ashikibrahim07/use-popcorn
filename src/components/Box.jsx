import { useState } from "react";

export function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <div>{isOpen && children}</div>
    </div>
  );
}
