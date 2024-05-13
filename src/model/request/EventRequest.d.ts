export interface EventRequest {
  name: string;
  description: string;
  city: string;
  organizatorId?: number;
  sponsorId?: number;
}
