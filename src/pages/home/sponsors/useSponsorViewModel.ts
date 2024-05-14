import { useEffect, useState } from "react";
import { getUsersInformationService } from "../../../API/AuthenticationService";
import { getSponsorsService, postSponsorService } from "../../../API/SponsorService";
import { SponsorRequest } from "../../../model/request/SponsorRequest";
import { SponsorResponse } from "../../../model/response/SponsorResponse";
import { UserResponse } from "../../../model/response/UserResponse";

const useSponsorViewModel = () => {
  const [sponsors, setSponsors] = useState<SponsorResponse[]>([]);
  const [organizers, setOrganizers] = useState<UserResponse[]>([]);
  const [loadingSponsors, setLoadingSponsors] = useState(true);
  const [loadingOrganizers, setLoadingOrganizers] = useState(true);
  const [loading, setLoading] = useState(true);

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



  const getOrganizers = async () => {
    try {
      const organizersResponse = await getUsersInformationService(1);
      setOrganizers(organizersResponse);
    } catch (error) {
      console.error(error);
    }
    setLoadingOrganizers(false);
  };

  return {
    sponsors,
    loading,
    getSponsors,
    loadingSponsors,
    sponsors,
    organizers,
    loadingOrganizers,
    getOrganizers,
    postSponsor,
  };
};

export default useSponsorViewModel;
