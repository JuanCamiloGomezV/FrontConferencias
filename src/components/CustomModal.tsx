import ClearIcon from "@mui/icons-material/Clear";
import { Alert, Box, Button, Divider, IconButton, Modal } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
};

interface Props {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element;
  title: string;
  onAccept: () => void;
  loading?: boolean;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
}
const CustomModal = ({
  handleClose,
  open,
  children,
  title,
  onAccept,
  loading = false,
  error,
  setError,
}: Props) => {
  const onClose = () => {
    handleClose();
    if (setError) setError("");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex bg-primary p-3 flex-row justify-between items-center">
          <div></div>
          <h1 className="text-xl text-white text-center">{title}</h1>
          <IconButton aria-label="close" size="small" onClick={handleClose}>
            <ClearIcon fontSize="small" style={{ color: "white" }} />
          </IconButton>
        </div>
        <section className="p-5">
          <div className="flex gap-4 flex-col">
            {error && error.length > 0 && (
              <Alert severity="error" onClose={() => setError && setError("")}>
                {error}
              </Alert>
            )}
            {children}
            <Divider />
            <div className="flex justify-end gap-2">
              <Button
                variant="outlined"
                size="medium"
                style={{ textTransform: "none" }}
                onClick={onClose}
              >
                <p>Cancelar</p>
              </Button>
              <Button
                variant="contained"
                size="medium"
                style={{ textTransform: "none" }}
                onClick={(event) => {
                  event.preventDefault();
                  onAccept();
                }}
                disabled={loading}
              >
                <p>{loading ? "Cargando..." : "Aceptar"}</p>
              </Button>
            </div>
          </div>
        </section>
      </Box>
    </Modal>
  );
};

export default CustomModal;
