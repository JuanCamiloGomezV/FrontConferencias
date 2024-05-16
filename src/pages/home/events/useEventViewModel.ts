import { useEffect, useState } from "react";
import { getUsersInformationService } from "../../../API/AuthenticationService";
import {
  deleteEventService,
  getEventsService,
  postEventService,
  putEventService,
} from "../../../API/EventService";
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

  const putEvent = async (eventForm: EventRequest, idEvent: number) => {
    try {
      const newEvent = await putEventService(eventForm, idEvent);

      const eventsUpdate = events;
      const indexEventEdit = eventsUpdate.findIndex(
        (event) => event.evento_id === idEvent
      );
      eventsUpdate[indexEventEdit] = newEvent;

      setEvents([...eventsUpdate]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const deleteEvent = async (idEvent: number) => {
    try {
      await deleteEventService(idEvent);

      const eventsUpdate = events.filter(
        (event) => event.evento_id !== idEvent
      );
      setEvents([...eventsUpdate]);
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
    putEvent,
    deleteEvent,
  };
};

export default useEventViewModel;
