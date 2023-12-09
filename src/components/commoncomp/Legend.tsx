import { useState } from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

export default function Lenged() {
  const [showLegend, setShowLegend] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#42D272" : "#42D272",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));
  return (
    <div>
      <div
        onClick={() => setShowLegend(!showLegend)}
        className="scale-75 md:scale-100 absolute flex justify-center items-center bg-opacity-90 font-bold text-lg px-3 cursor-pointer aspect-square rounded-lg text-darkGreen border border-darkGreen bg-white top-2 left-2 z-10"
      >
        i
      </div>
      {/* legend div */}
      <div
        className={`shadow p-3 transition-all ease-in-out delay-100 ${
          showLegend ? "flex" : "hidden"
        } rounded-lg flex-col gap-2 bg-white absolute z-10 top-2 left-10 h-full md:h-max w-2/3 md:w-1/3  lg:w-[250px]`}
      >
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg">Legend</h1>
          {showMore ? (
            <p
              onClick={() => setShowMore(false)}
              className="underline cursor-pointer text-darkGreen"
            >
              See less
            </p>
          ) : (
            <p
              onClick={() => setShowMore(true)}
              className="underline cursor-pointer text-darkGreen"
            >
              See more
            </p>
          )}
        </div>
        <div className="h-[1px] items-center justify-start bg-legendDivider my-1"></div>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <img src="facilitieslegend.svg" alt="" />
            <p className="text-homeSubText">Facilities</p>
          </div>
          <AntSwitch defaultChecked />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <img src="refinerylegend.svg" alt="" />
            <p className="text-homeSubText">Refinery</p>
          </div>
          <AntSwitch />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <img src="milllegend.svg" alt="" />
            <p className="text-homeSubText">Mill</p>
          </div>
          <AntSwitch />
        </div>
        {/* div that appears after see all */}
        {showMore ? (
          <div className="overflow-y-scroll flex gap-2 flex-col">
            <div className="h-[1px] items-center justify-start bg-legendDivider my-2"></div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="h-4 aspect-square bg-footerHeading"></div>
                <p className="">Actual registered supplier</p>
              </div>
              <AntSwitch />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="h-4 aspect-square bg-potentialSupp"></div>
                <p>Potential registered supplier</p>
              </div>
              <AntSwitch />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="h-4 aspect-square bg-potentialUnSupp"></div>
                <p>Potential unregistered supplier</p>
              </div>
              <AntSwitch />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
