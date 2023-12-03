export default function Label() {
  const millname = localStorage.getItem("millname");
  return (
    <div className=" ">
      Plots for : {millname}
    </div>
  );
}
