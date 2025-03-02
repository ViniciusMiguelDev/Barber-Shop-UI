import { Injectable } from '@angular/core';
import { IScheduleService } from './ischedules.services';
import { Observable } from 'rxjs';
import {
  SaveScheduleRequest,
  SaveScheduleResponse,
  scheduleAppointmentMonthResponse,
} from './schedules.models';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService implements IScheduleService {
  private readonly basepath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: SaveScheduleRequest): Observable<SaveScheduleResponse> {
    return this.http.post<SaveScheduleResponse>(`${this.basepath}schedules`, request)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basepath}schedules/${id}`)
  }

  listInMonth(
    year: number,
    month: number
  ): Observable<scheduleAppointmentMonthResponse> {
    return this.http.get<scheduleAppointmentMonthResponse>(`${this.basepath}schedules/${year}/${month}`)
  }
}
