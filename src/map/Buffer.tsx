import React from "react";

const Buffer: React.FC = () => {
  const mill_name: string | null = localStorage.getItem("mill_name");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <form className="flex bg-[#2A2A2A]" onSubmit={handleSubmit}>
      <div className="text-white text-lg pl-0 ">Plots for : {mill_name}</div>
      <div className="text-white text-lg pl-5 ">
        Buffer Agriplot(km) :
        <input
          required
          min={1}
          max={500}
          type="number"
          className="rounded-md text-black border-1"
        />
      </div>
      <div className="text-white text-lg">
        <input
          type="submit"
          className="text-black bg-red-500 hover:cursor-pointer"
        />
      </div>
    </form>
  );
};

export default Buffer;
