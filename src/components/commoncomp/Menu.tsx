import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#DFE9FF] py-4 px-3  flex gap-6">
      <a
        href="#"
        className="menuLink flex items-center gap-2 px-8 py-3 rounded-3xl hover:text-white hover:bg-[#2A2A2A]"
      >
        <img
          className="menu-svg scale-110 "
          src="src\assets\HomeMenu.svg"
          alt="Home Icon"
        />
        <h1 className="font-semibold">Home</h1>
      </a>
      <a
        href="#"
        className="menuLink flex items-center gap-2 px-8 py-3 rounded-3xl hover:text-white hover:bg-[#2A2A2A]"
      >
        <img
          className="menu-svg scale-110"
          src="src\assets\supplierMill.svg"
          alt="supplierMill Icon"
        />
        <h1 className="font-semibold">Supplier Mill</h1>
      </a>
      <a
        href="#"
        className="menuLink flex items-center gap-2 px-8 py-3 rounded-3xl hover:text-white hover:bg-[#2A2A2A] hover:fill-white"
      >
        <img
          className="menu-svg menu-svg scale-110  filter hover:invert"
          src="src\assets\supplierPlantation.svg"
          alt="supplierPlantation Icon"
        />
        <h1 className="font-semibold">Supplier Plantation</h1>
      </a>
      <button
        // href='#'
        onClick={() => {
          navigate("/reporting");
        }}
        className="menuLink flex items-center gap-2 px-8 py-3 rounded-3xl hover:text-white hover:bg-[#2A2A2A]"
      >
        <img
          className="menu-svg scale-110  hover:fill-white"
          src="src\assets\Reporting.svg"
          alt="Reporting Icon"
        />
        <h1 className="font-semibold">Reporting</h1>
      </button>
    </div>
  );
}
export default Menu;
