import React from "react";

interface SearchProps {
  refObj: React.RefObject<HTMLDivElement>;
}

export default function Search({ refObj }: SearchProps) {
  return (
    <>
      <div
        ref={refObj}
        id="geocoder-container"
        // className="geocorder-main-container max-w-[300px]"
      ></div>
    </>
  );
}
