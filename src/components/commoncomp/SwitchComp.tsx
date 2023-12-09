import { FormControlLabel, Switch, Theme } from "@mui/material";
import { styled } from "@mui/system";

interface StyledSwitchProps {
  theme: Theme;
}

interface SwitchCompProps {
  label: string;
  defaultChecked: boolean;
  onChange: (checked: boolean) => boolean;
}

function SwitchComp({ label, defaultChecked, onChange }: SwitchCompProps) {
  const AntSwitch = styled(Switch)<StyledSwitchProps>(({ theme }) => ({
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
          backgroundColor: "#42D272",
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

  // @ts-ignore
  function handleSwitchChange(e) {
    onChange && onChange(e.target.checked);
  }

  return (
    <FormControlLabel
      className="bg-white bg-opacity-70 py-2 px-3 justify-end my-1 rounded-xl"
      control={
        // @ts-ignore
        <AntSwitch
          sx={{ mx: 1 }}
          defaultChecked={defaultChecked}
          size="small"
          // theme={theme} // Pass the 'theme' prop here
        />
      }
      label={label}
      labelPlacement="start"
      onChange={handleSwitchChange}
    />
  );
}

export default SwitchComp;
