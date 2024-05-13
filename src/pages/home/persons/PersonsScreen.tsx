import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Actions from "../../../components/Actions";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomModal from "../../../components/CustomModal";
import usePersonsViewModel from "./usePersonsViewModel";
import usePersonsViewController from "./usePersonsViewController";

const PersonsScreen = () => {
  const { loading, persons } = usePersonsViewModel();
  const {
    handleClose,
    onChangeField,
    onCreatePerson,
    onDeletePerson,
    onEditPerson,
    open,
    type,
  } = usePersonsViewController();
  return (
    <>
      <div className="p-10">
        <div className="my-10 flex flex-row justify-between">
          <h1 className="text-xl font-bold">Personas</h1>
          <Button
            variant="contained"
            size="large"
            style={{ textTransform: "none" }}
            onClick={onCreatePerson}
          >
            <p className="mr-2">Crear persona</p>
            <AddCircleIcon />
          </Button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <p className="font-bold">Nombre</p>
                  </TableCell>

                  <TableCell>
                    <p className="font-bold">Cedula</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold">Correo</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold">Institución</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold">Rol</p>
                  </TableCell>
                  <TableCell align="center">
                    <p className="font-bold">Acciones</p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {persons.map((person) => (
                  <TableRow
                    key={person.usuario_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {person.usuario_nombre}
                    </TableCell>
                    <TableCell>{person.usuario_cedula}</TableCell>
                    <TableCell>{person.usuario_correo}</TableCell>
                    <TableCell>{person.usuario_institucion_nombre}</TableCell>
                    <TableCell>{person.usuario_rol_nombre}</TableCell>
                    <TableCell align="center">
                      <Actions
                        onEdit={() => onEditPerson()}
                        onDelete={() => onDeletePerson()}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <CustomModal
        handleClose={handleClose}
        open={open}
        title={
          type === "create"
            ? "Crear persona"
            : type === "edit"
            ? "Editar persona"
            : "Eliminar persona"
        }
        onAccept={async () => {
          if (type === "create") console.log("create");
          else if (type === "edit") console.log("edit");
          else if (type === "delete") console.log("delte");
          handleClose();
        }}
      >
        {type === "delete" ? (
          <Typography>¿Está seguro que desea eliminar el registro?</Typography>
        ) : (
          <></>
        )}
      </CustomModal>
    </>
  );
};

export default PersonsScreen;
