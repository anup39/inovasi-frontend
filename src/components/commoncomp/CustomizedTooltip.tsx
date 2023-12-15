interface CustomTooltipProps {
  display: boolean;
  active: boolean;
  payload: [];
}

const CustomTooltip = ({ display, active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    console.log(payload, "payload");
    const rounded = payload[0].payload.percentage.toFixed(2);
    return (
      <>
        {display ? (
          <div
            style={{
              width: "auto",
              minWidth: "100px",
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
            <p style={{ fontSize: "12px" }}>{payload[0].name} </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p> {rounded} %</p>
              <p style={{ fontSize: "12px" }}> {payload[0].value}</p>
            </div>
          </div>
        ) : null}
      </>
    );
  }

  return null;
};

export default CustomTooltip;
