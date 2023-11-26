export default function Label() {
  const millname = localStorage.getItem("millname");
  return (
    <div className="bg-[#2A2A2A] text-white text-md rounded-md ">
      Plots for : {millname}
    </div>
  );
}
