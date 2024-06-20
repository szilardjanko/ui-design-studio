import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

export const NavBarIcon = () => {
  const [isAtFirstDiv, setIsAtFirstDiv] = useState(false);
  const firstRef = useRef<HTMLDivElement | null>(null);
  const secondRef = useRef<HTMLDivElement | null>(null);
  const movingDivRef = useRef<HTMLDivElement | null>(null);

  const moveDiv = () => {
    setIsAtFirstDiv(!isAtFirstDiv);
  };

  useEffect(() => {
    const movingDiv = movingDivRef.current;
    const firstDiv = firstRef.current;
    const secondDiv = secondRef.current;

    if (movingDiv && firstDiv && secondDiv) {
      const targetPosition = isAtFirstDiv
        ? firstDiv.getBoundingClientRect().left
        : secondDiv.getBoundingClientRect().left;

      movingDiv.style.transition = "left 2.5s";
      movingDiv.style.left = `${targetPosition}px`;
    }
  }, [isAtFirstDiv]);

  useEffect(() => {
    const handleResize = () => {
      const movingDiv = movingDivRef.current;
      const firstDiv = firstRef.current;
      const secondDiv = secondRef.current;

      if (movingDiv && firstDiv && secondDiv) {
        const targetPosition = isAtFirstDiv
          ? firstDiv.getBoundingClientRect().left
          : secondDiv.getBoundingClientRect().left;

        movingDiv.style.transition = "none";
        movingDiv.style.left = `${targetPosition}px`;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isAtFirstDiv]);

  return (
    <div>
      <div
        ref={firstRef}
        style={{
          position: "absolute",
          left: "13.5rem",
          top: "3px",
          width: "36px",
          height: "36px",
        }}
      />
      <div
        ref={secondRef}
        style={{
          position: "absolute",
          top: "3px",
          right: "20px",
          width: "36px",
          height: "36px",
        }}
      />
      <div
        ref={movingDivRef}
        onClick={moveDiv}
        style={{
          position: "absolute",
          top: "3px",
          right: "20px",
          width: "36px",
          height: "36px",
          cursor: "pointer",
        }}
      >
        <Image src={"/uiIcon.png"} alt="DCL DAO" width={50} height={50} />
      </div>
    </div>
  );
};
