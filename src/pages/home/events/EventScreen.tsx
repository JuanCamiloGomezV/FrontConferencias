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
import useEventViewModel from "./useEventViewModel";
import Actions from "../../../components/Actions";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomModal from "../../../components/CustomModal";
import EventForm from "./components/EventForm";
import useEventViewController from "./useEventViewController";

const EventScreen = () => {
  const {
    events,
    loading,
    getSponsors,
    loadingSponsors,
    sponsors,
    loadingOrganizers,
    organizers,
    getOrganizers,
    postEvent,
    putEvent,
    deleteEvent,
  } = useEventViewModel();

  const {
    handleClose,
    open,
    type,
    onEditEvent,
    onCreateEvent,
    onDeleteEvent,
    eventForm,
    onChangeField,
    eventIdSelected,
  } = useEventViewController();

  return (
    <>
      <div className="p-10">
        <div className="my-10 flex flex-row justify-between">
          <h1 className="text-xl font-bold">Eventos</h1>
          <Button
            variant="contained"
            size="large"
            style={{ textTransform: "none" }}
            onClick={onCreateEvent}
          >
            <p className="mr-2">Crear evento</p>
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
                    <p className="font-bold">Ciudad</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold">Organizador</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold">Patrocinador</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold">Descripción</p>
                  </TableCell>
                  <TableCell align="center">
                    <p className="font-bold">Acciones</p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow
                    key={event.evento_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {event.evento_nombre}
                    </TableCell>
                    <TableCell>{event.evento_ciudad}</TableCell>
                    <TableCell>{event.evento_organizador_nombre}</TableCell>
                    <TableCell>{event.evento_patrocinador_nombre}</TableCell>
                    <TableCell>{event.evento_descripcion}</TableCell>
                    <TableCell align="center">
                      <Actions
                        onEdit={() => onEditEvent(event, event.evento_id)}
                        onDelete={() => onDeleteEvent(event.evento_id)}
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
            ? "Crear evento"
            : type === "edit"
            ? "Editar evento"
            : "Eliminar evento"
        }
        onAccept={async () => {
          if (type === "create") await postEvent(eventForm);
          else if (type === "edit")
            eventIdSelected && putEvent(eventForm, eventIdSelected);
          else if (type === "delete")
            eventIdSelected && deleteEvent(eventIdSelected);
          handleClose();
        }}
      >
        {type === "delete" ? (
          <Typography>¿Está seguro que desea eliminar el registro?</Typography>
        ) : (
          <EventForm
            getSponsors={getSponsors}
            loadingOrganizers={loadingOrganizers}
            loadingSponsors={loadingSponsors}
            sponsors={sponsors}
            getOrganizers={getOrganizers}
            organizers={organizers}
            onChangeField={onChangeField}
            eventForm={eventForm}
          />
        )}
      </CustomModal>
    </>
  );
};

export default EventScreen;
