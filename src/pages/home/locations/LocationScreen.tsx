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
import useLocationViewController from "./useLocationViewController";
import useLocationViewModel from "./useLocationViewModel";
import LocationForm from "./components/LocationForm";

const LocationScreen = () => {
  const {
    loading,
    getLocations,
    loadingLocations,
    locations,
    loadingOrganizers,
    organizers,
    getOrganizers,
    postLocation,
  } = useLocationViewModel();

  const {
    handleClose,
    open,
    type,
    onEditLocation,
    onCreateLocation,
    onDeleteLocation,
    locationForm,
    onChangeField,
  } = useLocationViewController();

  return (
    <>
      <div className="p-10">
        <div className="my-10 flex flex-row justify-between">
          <h1 className="text-xl font-bold">Ubicaciones</h1>
          <Button
            variant="contained"
            size="large"
            style={{ textTransform: "none" }}
            onClick={onCreateLocation}
          >
            <p className="mr-2">Agregar ubicación</p>
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
                    <p className="font-bold">ID</p>
                  </TableCell>

                  <TableCell>
                    <p className="font-bold">Nombre</p>
                  </TableCell>

                  <TableCell>
                    <p className="font-bold">Direccion</p>
                  </TableCell>

                  <TableCell>
                    <p className="font-bold">Capacidad</p>
                  </TableCell>

                  <TableCell align="center">
                    <p className="font-bold">Acciones</p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locations.map((location) => (
                  <TableRow
                    key={location.localizacion_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {location.localizacion_id}
                    </TableCell>
                    <TableCell>{location.localizacion_nombre}</TableCell>

                    <TableCell align="center">
                      <Actions
                        onEdit={() =>
                          onEditLocation(location, location.localizacion_id)
                        }
                        onDelete={() =>
                          onDeleteLocation(location.localizacion_id)
                        }
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
            ? "Crear patrocinador"
            : type === "edit"
            ? "Editar patrocinador"
            : "Eliminar patrocinador"
        }
        onAccept={async () => {
          if (type === "create") await postLocation(locationForm);
          else if (type === "edit") console.log("edit");
          else if (type === "delete") console.log("delete");
          handleClose();
        }}
      >
        {type === "delete" ? (
          <Typography>¿Está seguro que desea eliminar el registro?</Typography>
        ) : (
          <LocationForm
            getLocations={getLocations}
            loadingOrganizers={loadingOrganizers}
            loadingLocations={loadingLocations}
            locations={locations}
            getOrganizers={getOrganizers}
            organizers={organizers}
            onChangeField={onChangeField}
            locationForm={locationForm}
          />
        )}
      </CustomModal>
    </>
  );
};

export default LocationScreen;
