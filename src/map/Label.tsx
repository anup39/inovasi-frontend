export default function Label() {
  const millname = localStorage.getItem("millname");
  return (
    <div className="bg-[#2A2A2A] text-white text-lg rounded-lg ">
      Plots for : {millname}
    </div>
  );
}
