import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IClientService } from '../../../../services/api-client/clients/iclient.service';
import { iSnackbarManagerService } from '../../../../services/isnackbar-manager.service';
import { SERVICES_TOKEN } from '../../../../services/service.token';
import { IScheduleService } from '../../../ischedules.services';
import { ScheduleCalendarComponent } from '../schedule-calendar.component';
import { SchedulesService } from '../../../schedules.service';
import { ClientsService } from '../../../../services/api-client/clients/clients.service';
import { SnackbarManagerService } from '../../../../services/snackbar-manager.service';
import { Subscription } from 'rxjs';
import {
  ClientScheduleAppointmentModel,
  SaveScheduleModel,
  SaveScheduleRequest,
  scheduleAppointmentMonthModel,
  SelectClientModel,
} from '../../../schedules.models';

@Component({
  selector: 'app-schedules-month',
  imports: [ScheduleCalendarComponent],
  templateUrl: './schedules-month.component.html',
  styleUrl: './schedules-month.component.scss',
  providers: [
    {
      provide: SERVICES_TOKEN.HTTP.SCHEDULE,
      useClass: SchedulesService,
    },
    {
      provide: SERVICES_TOKEN.HTTP.CLIENT,
      useClass: ClientsService,
    },
    {
      provide: SERVICES_TOKEN.SNACKBAR,
      useClass: SnackbarManagerService,
    },
  ],
})
export class SchedulesMonthComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  private selectedDate?: Date;

  monthSchedule!: scheduleAppointmentMonthModel;
  clients: SelectClientModel[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.SCHEDULE)
    private readonly httpService: IScheduleService,
    @Inject(SERVICES_TOKEN.HTTP.CLIENT)
    private readonly clientHttpService: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManage: iSnackbarManagerService
  ) {}

  ngOnInit(): void {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    this.subscriptions.push(
      this.httpService
        .listInMonth(year, month)
        .subscribe((data) => (this.monthSchedule = data))
    );
    this.subscriptions.push(
      this.clientHttpService.list().subscribe((data) => (this.clients = data))
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onDateChange(date: Date) {
    this.selectedDate = date;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    this.subscriptions.push(
      this.httpService
        .listInMonth(year, month)
        .subscribe((data) => (this.monthSchedule = data))
    );
  }

  onConfirmDelete(schedule: ClientScheduleAppointmentModel) {
    this.subscriptions.push(this.httpService.delete(schedule.id).subscribe());
  }

  onScheduleClient(schedule: SaveScheduleModel) {
    if (schedule.startAt && schedule.endAt && schedule.clientId) {
      const request: SaveScheduleRequest = {
        startAt: schedule.startAt,
        endAt: schedule.endAt,
        clientId: schedule.clientId,
      };

      this.subscriptions.push(
        this.httpService.save(request).subscribe(() => {
          this.snackbarManage.show('Agendamento realizado com sucesso');

          if (this.selectedDate) {
            const year = this.selectedDate.getFullYear();
            const month = this.selectedDate.getMonth() + 1;

            this.subscriptions.push(
              this.httpService
                .listInMonth(year, month)
                .subscribe((data) => (this.monthSchedule = data))
            );
          }
        })
      );
    }
  }
}
