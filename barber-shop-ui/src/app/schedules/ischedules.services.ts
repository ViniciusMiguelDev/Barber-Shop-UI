import { Observable } from 'rxjs';
import {
  SaveScheduleRequest,
  SaveScheduleResponse,
  scheduleAppointmentMonthResponse,
} from './schedules.models';
import { SaveClientResponse } from '../services/api-client/clients/client.models';

export interface IScheduleService {
  save(request: SaveScheduleRequest): Observable<SaveScheduleResponse>;

  delete(id: number): Observable<void>;

  listInMonth(
    year: number,
    month: number
  ): Observable<scheduleAppointmentMonthResponse>;
}
