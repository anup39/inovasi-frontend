export default function Buffer() {
  const millname = localStorage.getItem("millname");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="flex bg-[#2A2A2A]" onSubmit={handleSubmit}>
      <div className="text-white text-lg pl-0 ">Plots for : {millname}</div>
      <div className="text-white text-lg pl-5 ">
        Buffer Agriplot(km) :
        <input
          required
          type="number"
          className="rounded-md text-black border-1"
        ></input>
      </div>
      <div className="text-white text-lg">
        <input
          type="number"
          min={1}
          max={500}
          className="text-black bg-red-500"
        />
      </div>
    </form>
  );
}
