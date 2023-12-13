interface CustomTooltipProps {
  active: boolean;
  payload: [];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  console.log(active, "active");
  console.log(payload, "payload");

  if (active && payload && payload.length) {
    return (
      <div
        style={{
          width: "100px",
          height: "65px",
          backgroundColor: "black",
          opacity: 0.7,
          color: "white",
          borderRadius: "2px",
          padding: "5px",
          // margin: "5px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          fontWeight: "bold",
        }}
      >
        <div>Malaysia </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div> 9% </div>
          <div> 260</div>
        </div>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
