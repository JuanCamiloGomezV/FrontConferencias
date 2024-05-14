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
import useSponsorViewController from "./useSponsorViewController";
import useSponsorViewModel from "./useSponsorViewModel";
import SponsorForm from "./components/SponsorForm";

const SponsorScreen = () => {
  const {
    loading,
    getSponsors,
    loadingSponsors,
    sponsors,
    loadingOrganizers,
    organizers,
    getOrganizers,
    postSponsor,
  } = useSponsorViewModel();

  const {
    handleClose,
    open,
    type,
    onEditSponsor,
    onCreateSponsor,
    onDeleteSponsor,
    sponsorForm,
    onChangeField,
  } = useSponsorViewController();

  return (
    <>
      <div className="p-10">
        <div className="my-10 flex flex-row justify-between">
          <h1 className="text-xl font-bold">Patrocinadores</h1>
          <Button
            variant="contained"
            size="large"
            style={{ textTransform: "none" }}
            onClick={onCreateSponsor}
          >
            <p className="mr-2">Agregar patrocinador</p>
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
                    <p className="font-bold">Patrocinador</p>
                  </TableCell>

                  <TableCell align="center">
                    <p className="font-bold">Acciones</p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sponsors.map((sponsor) => (
                  <TableRow
                    key={sponsor.patrocinador_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {sponsor.patrocinador_id}
                    </TableCell>
                    <TableCell>{sponsor.patrocinador_nombre}</TableCell>

                    <TableCell align="center">
                      <Actions
                        onEdit={() =>
                          onEditSponsor(sponsor, sponsor.patrocinador_id)
                        }
                        onDelete={() =>
                          onDeleteSponsor(sponsor.patrocinador_id)
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
          if (type === "create") await postSponsor(sponsorForm);
          else if (type === "edit") await onEditSponsor(sponsorForm);
          else if (type === "delete") console.log("delte");
          handleClose();
        }}
      >
        {type === "delete" ? (
          <Typography>¿Está seguro que desea eliminar el registro?</Typography>
        ) : (
          <SponsorForm
            getSponsors={getSponsors}
            loadingOrganizers={loadingOrganizers}
            loadingSponsors={loadingSponsors}
            sponsors={sponsors}
            getOrganizers={getOrganizers}
            organizers={organizers}
            onChangeField={onChangeField}
            sponsorForm={sponsorForm}
          />
        )}
      </CustomModal>
    </>
  );
};

export default SponsorScreen;
