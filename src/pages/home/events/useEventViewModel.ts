import { useEffect, useState } from "react";
import { getUsersInformationService } from "../../../API/AuthenticationService";
import { getEventsService, postEventService } from "../../../API/EventService";
import { getSponsorsService } from "../../../API/SponsorService";
import { EventRequest } from "../../../model/request/EventRequest";
import { EventResponse } from "../../../model/response/EventResponse";
import { SponsorResponse } from "../../../model/response/SponsorResponse";
import { UserResponse } from "../../../model/response/UserResponse";

const useEventViewModel = () => {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [sponsors, setSponsors] = useState<SponsorResponse[]>([]);
  const [organizers, setOrganizers] = useState<UserResponse[]>([]);
  const [loadingSponsors, setLoadingSponsors] = useState(true);
  const [loadingOrganizers, setLoadingOrganizers] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const eventsResponse = await getEventsService();
      console.log(eventsResponse);
      setEvents(eventsResponse);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const postEvent = async (eventForm: EventRequest) => {
    try {
      const newEvent = await postEventService(eventForm);
      setEvents((prev) => [...prev, newEvent]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const getSponsors = async () => {
    try {
      const sponsorsResponse = await getSponsorsService();
      setSponsors(sponsorsResponse);
    } catch (error) {
      console.error(error);
    }
    setLoadingSponsors(false);
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
    events,
    loading,
    getSponsors,
    loadingSponsors,
    sponsors,
    organizers,
    loadingOrganizers,
    getOrganizers,
    postEvent,
  };
};

export default useEventViewModel;
