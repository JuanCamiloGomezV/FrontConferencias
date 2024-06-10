import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Actions from "../../../components/Actions";
import useConferenceViewModel from "./useConferenceViewModel";

const ConferenceScreen = () => {
  const { conferences, loading } = useConferenceViewModel();

  return (
    <div className="p-10 flex flex-col bg-slate-50 h-screen">
      <div className="my-10 flex flex-row justify-between">
        <h1 className="text-xl font-bold">Conferencias</h1>
        <Button
          variant="contained"
          size="large"
          style={{ textTransform: "none" }}
          //    onClick={onCreateEvent}
        >
          <p className="mr-2">Crear conferencia</p>
          <AddCircleIcon />
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <p className="font-bold">Nombre</p>
                </TableCell>
                <TableCell>
                  <p className="font-bold">Evento</p>
                </TableCell>

                <TableCell>
                  <p className="font-bold">Tema</p>
                </TableCell>
                <TableCell>
                  <p className="font-bold">Ubicación</p>
                </TableCell>
                <TableCell>
                  <p className="font-bold">Ponente</p>
                </TableCell>
                <TableCell>
                  <p className="font-bold">Hora inicio</p>
                </TableCell>
                {/* <TableCell>
                  <p className="font-bold">Hora fin</p>
                </TableCell> */}
                <TableCell align="center">
                  <p className="font-bold">Acciones</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {conferences?.map((conference) => (
                <TableRow
                  key={conference.conferencia_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {conference.conferencia_nombre}
                  </TableCell>
                  <TableCell>{conference.conferencia_evento_nombre}</TableCell>
                  <TableCell>{conference.conferencia_tema}</TableCell>
                  <TableCell>
                    {conference.conferencia_ubicacion_nombre}
                  </TableCell>
                  <TableCell>{conference.conferencia_ponente_nombre}</TableCell>
                  <TableCell>
                    {new Date(
                      conference.conferencia_hora_inicio
                    ).toDateString()}
                  </TableCell>
                  {/* <TableCell>
                    {conference.conferencia_hora_fin.toString()}
                  </TableCell> */}
                  <TableCell align="center">
                    <Actions onEdit={() => {}} onDelete={() => {}} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ConferenceScreen;
