import { useEffect, useState } from "react";
import { getConferencesService } from "../../../API/ConferenceService";
import { ConferenceResponse } from "../../../model/response/ConferenceResponse";

const useConferenceViewModel = () => {
  const [conferences, setConferences] = useState<ConferenceResponse[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConferences();
  }, []);

  const getConferences = async () => {
    try {
      const conferencesResponse = await getConferencesService();
      setConferences(conferencesResponse);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return {
    conferences,
    loading,
  };
};

export default useConferenceViewModel;
