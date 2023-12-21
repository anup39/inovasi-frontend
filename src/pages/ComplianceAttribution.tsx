// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import Layout from "../components/commoncomp/Layout";
// import SwitchComp from "../components/commoncomp/SwitchComp";
// import { useState } from "react";
// import MapComponent from "../map/Map";
// import { Map } from "maplibre-gl";

// function ComplianceAttribution() {
//   function handleSwitchChange(checked: boolean) {
//     setShowMap(checked);
//   }
//   function handleMetricChange(option: string) {
//     if (option === "metric") {
//       dispatch(setselectedDataFormat("Metric"));
//     } else {
//       dispatch(setselectedDataFormat("Table"));
//     }
//     setSelectedOption(option);
//   }
//   const [showMap, setShowMap] = useState(true);
//   const [selectedOption, setSelectedOption] = useState("list");

//   const theme = createTheme();
//   return (
//     <Layout>
//       {/* map switch btn */}
//       <div className="flex items-center justify-end mt-[15px]">
//         <ThemeProvider theme={theme}>
//           <SwitchComp
//             label="Map"
//             defaultChecked={showMap}
//             // @ts-ignore
//             onChange={handleSwitchChange}
//           />
//         </ThemeProvider>
//       </div>
//       {/* map container */}
//       <div className="mt-[14px] h-[464px]">{/* <MapComponent /> */}</div>
//     </Layout>
//   );
// }

// export default ComplianceAttribution;
