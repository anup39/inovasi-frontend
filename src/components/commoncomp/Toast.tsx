import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { setshowToast } from "../../reducers/DisplaySettings";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Toast() {
  const dispatch: AppDispatch = useDispatch();
  const showToast: boolean = useSelector(
    (state: RootState) => state.displaySettings.showToast
  );
  const toastMessage: string = useSelector(
    (state: RootState) => state.displaySettings.toastMessage
  );
  const toastType: "success" | "error" | "warning" | "info" = useSelector(
    (state: RootState) => state.displaySettings.toastType
  ) as "success" | "error" | "warning" | "info";

  const handleToastClose = () => {
    dispatch(setshowToast(false));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={showToast}
      autoHideDuration={5000}
      onClose={handleToastClose}
    >
      <Alert severity={toastType} sx={{ width: "100%" }}>
        {toastMessage}
      </Alert>
    </Snackbar>
  );
}
