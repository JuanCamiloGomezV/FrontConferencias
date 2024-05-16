import { useState } from "react";
import { EventRequest } from "../../../model/request/EventRequest";
import { EventResponse } from "../../../model/response/EventResponse";

const useEventViewController = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"create" | "edit" | "delete">("create");
  const [eventForm, setEventForm] = useState<EventRequest>({
    city: "",
    name: "",
    description: "",
    organizatorId: undefined,
    sponsorId: undefined,
  });
  const [eventIdSelected, setEventIdSelected] = useState<number>();

  const onChangeField = (type: keyof EventRequest, value: any) => {
    const newEventForm = eventForm;

    if (type === "name") newEventForm.name = value;
    if (type === "city") newEventForm.city = value;
    if (type === "organizatorId") newEventForm.organizatorId = value;
    if (type === "sponsorId") newEventForm.sponsorId = value;
    if (type === "description") newEventForm.description = value;

    setEventForm({ ...newEventForm });
  };

  const onEditEvent = (event: EventResponse, eventId: number) => {
    setType("edit");
    const form: EventRequest = {
      name: event.evento_nombre,
      city: event.evento_ciudad,
      description: event.evento_descripcion,
      organizatorId: event.evento_organizador_id,
      sponsorId: event.evento_patrocinador_id,
    };

    setEventIdSelected(eventId);
    setEventForm(form);

    handleOpen();
  };

  const onCreateEvent = () => {
    setType("create");

    setEventForm({
      city: "",
      name: "",
      description: "",
      organizatorId: undefined,
      sponsorId: undefined,
    });

    handleOpen();
  };

  const onDeleteEvent = (eventId: number) => {
    setType("delete");
    setEventIdSelected(eventId);
    handleOpen();
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return {
    type,
    open,
    handleClose,
    eventForm,
    onEditEvent,
    onCreateEvent,
    onDeleteEvent,
    onChangeField,
    eventIdSelected,
  };
};

export default useEventViewController;
