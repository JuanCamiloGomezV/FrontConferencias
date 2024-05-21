import { useEffect, useState } from "react";
import {
  deleteSponsorService,
  getSponsorsService,
  postSponsorService,
  putSponsorService,
} from "../../../API/SponsorService";
import { SponsorRequest } from "../../../model/request/SponsorRequest";
import { SponsorResponse } from "../../../model/response/SponsorResponse";

const useSponsorViewModel = () => {
  const [sponsors, setSponsors] = useState<SponsorResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingChange, setLoadingChange] = useState(false);

  useEffect(() => {
    getSponsors();
  }, []);

  const getSponsors = async () => {
    try {
      const eventsResponse = await getSponsorsService();
      console.log(eventsResponse);
      setSponsors(eventsResponse);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const postSponsor = async (eventForm: SponsorRequest) => {
    try {
      const newSponsor = await postSponsorService(eventForm);
      setSponsors((prev) => [...prev, newSponsor]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const putSponsor = async (sponsorForm: SponsorRequest, idSponsor: number) => {
    try {
      setLoadingChange(true);
      const newSponsor = await putSponsorService(sponsorForm, idSponsor);

      const sponsorsUpdate = sponsors;
      const indexSponsorEdit = sponsorsUpdate.findIndex(
        (sponsor) => sponsor.patrocinador_id === idSponsor
      );
      sponsorsUpdate[indexSponsorEdit] = newSponsor;

      setSponsors([...sponsorsUpdate]);
    } catch (error) {
      console.error(error);
    }
    setLoadingChange(false);
  };

  const deleteLocation = async (idSponsor: number) => {
    try {
      setLoadingChange(true);
      await deleteSponsorService(idSponsor);

      const sponsorsUpdate = sponsors.filter(
        (sponsor) => sponsor.patrocinador_id !== idSponsor
      );
      setSponsors([...sponsorsUpdate]);
    } catch (error) {
      console.error(error);
    }
    setLoadingChange(false);
  };

  return {
    sponsors,
    loading,
    getSponsors,
    postSponsor,
    putSponsor,
    deleteLocation,
    loadingChange,
  };
};

export default useSponsorViewModel;
