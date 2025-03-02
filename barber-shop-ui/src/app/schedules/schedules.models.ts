export interface scheduleAppointmentMonthResponse {
  year: number;
  month: number;
  scheduledAppointments: ClientsScheduleAppointmentResponse[];
}

export interface ClientsScheduleAppointmentResponse {
  id: number;
  day: number;
  startAt: Date;
  endAt: Date;
  clientId: number;
  clientName: string;
}

export interface ClientsScheduleAppointmentDetailResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface SaveScheduleResponse {
  id: number;
  startAt: Date;
  endAt: Date;
  clientId: number;
}

export interface SaveScheduleRequest {
  startAt: Date;
  endAt: Date;
  clientId: number;
}

export interface scheduleAppointmentMonthModel {
  year: number;
  month: number;
  scheduledAppointments: ClientScheduleAppointmentModel[];
}

export interface ClientScheduleAppointmentModel {
  id: number;
  day: number;
  startAt: Date;
  endAt: Date;
  clientId: number;
  clientName: string;
}

export interface SaveScheduleModel {
  startAt?: Date;
  endAt?: Date;
  clientId?: number;
}

export interface SelectClientModel {
  id: number;
  name: string;
}
