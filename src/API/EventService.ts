import { EventRequest } from "../model/request/EventRequest";
import { EventResponse } from "../model/response/EventResponse";
import { privateService } from "./APIService";

export const getEventsService = async () => {
  const { data } = await privateService.get<EventResponse[]>("api/events");
  return data;
};

export const postEventService = async (eventForm: EventRequest) => {
  const { data } = await privateService.post<EventResponse>(
    "api/events",
    eventForm
  );
  return data;
};
