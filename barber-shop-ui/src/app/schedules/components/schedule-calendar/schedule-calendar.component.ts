import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatTimepicker,
  MatTimepickerModule,
  MatTimepickerToggle,
} from '@angular/material/timepicker';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { IDialogService } from '../../../services/idialog-manager.service';
import { SERVICES_TOKEN } from '../../../services/service.token';
import {
  ClientScheduleAppointmentModel,
  SaveScheduleModel,
  scheduleAppointmentMonthModel,
  SelectClientModel,
} from '../../schedules.models';
import { YesNoDialogComponent } from '../../../commons/yes-no-dialog/yes-no-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-schedule-calendar',
  imports: [
    MatIcon,
    MatFormField,
    MatLabel,
    MatFormFieldModule,
    MatButtonModule,
    MatTimepicker,
    MatTimepickerToggle,
    MatSelect,
    MatOption,
    MatCard,
    MatCalendar,
    MatTableModule,
    MatTimepickerModule,
    MatPaginator,
    CommonModule,
    MatDatepickerModule,
    MatPaginator,
  ],
  templateUrl: './schedule-calendar.component.html',
  styleUrl: './schedule-calendar.component.scss',
  providers: [
    {
      provide: SERVICES_TOKEN.YES_NO_DIALOG,
      useClass: DialogManagerService,
    },
  ],
})
export class ScheduleCalendarComponent
  implements OnInit, AfterViewInit, OnChanges
{
  private _selected: Date = new Date();

  displayedColumns: string[] = ['startAt', 'endAt', 'client', 'actions'];

  dataSource!: MatTableDataSource<ClientScheduleAppointmentModel>;

  addingSchedule: boolean = false;

  newSchedule: SaveScheduleModel = {
    startAt: undefined,
    endAt: undefined,
    clientId: undefined,
  };

  clientSelectFormControl = new FormControl();

  @Input() monthSchedule!: scheduleAppointmentMonthModel;
  @Input() clients: SelectClientModel[] = [];

  @Output() onDateChange = new EventEmitter<Date>();
  @Output() onScheduleClient = new EventEmitter<SaveScheduleModel>();
  @Output() onConfirmDelete =
    new EventEmitter<ClientScheduleAppointmentModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    @Inject(SERVICES_TOKEN.YES_NO_DIALOG)
    private readonly dialogManagerService: IDialogService
  ) {}

  get selected(): Date {
    return this._selected;
  }
  set selected(selected: Date) {
    if (this._selected.getTime() === selected.getTime()) {
      this.onDateChange.emit(selected);
      this.buildTable();
      this._selected = selected;
    }
  }

  ngOnInit(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private subscription?: Subscription;

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monthSchedule'] && this.monthSchedule) {
      this.buildTable();
    }
  }

  onSubmit(form: NgForm) {
    const startAt = new Date(this._selected);
    const endAt = new Date(this._selected);
    startAt.setHours(
      this.newSchedule.startAt!.getHours(),
      this.newSchedule.startAt!.getMinutes()
    );
    endAt.setHours(
      this.newSchedule.endAt!.getHours(),
      this.newSchedule.endAt!.getMinutes()
    );
    const saved: ClientScheduleAppointmentModel = {
      id: -1,
      day: this._selected.getDate(),
      startAt,
      endAt,
      clientId: this.newSchedule.clientId!,
      clientName: this.clients.find((c) => c.id === this.newSchedule.clientId!)!
        .name,
    };
    this.monthSchedule.scheduledAppointments.push(saved);
    this.onScheduleClient.emit(saved);
    this.buildTable();
    form.resetForm();
    this.newSchedule = {
      startAt: undefined,
      endAt: undefined,
      clientId: undefined,
    };
  }

  requestDelete(schedule: ClientScheduleAppointmentModel) {
    this.subscription = this.dialogManagerService
      .showYesNoDialog(YesNoDialogComponent, {
        title: 'Exclusão de agendamento',
        content: 'Confirma a exclusão do agendamento?',
      })
      .subscribe((result) => {
        if (result) {
          this.onConfirmDelete.emit(schedule);
          const updatedList = this.dataSource.data.filter(
            (c) => c.id !== schedule.id
          );
          this.dataSource =
            new MatTableDataSource<ClientScheduleAppointmentModel>(updatedList);
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        }
      });
  }

  onTimeChange(time: Date) {
    const endAt = new Date(time);
    endAt.setHours(time.getHours() + 1);
    this.newSchedule.endAt = endAt;
  }

  private buildTable() {
    const appointments = this.monthSchedule.scheduledAppointments.filter(
      (a) =>
        this.monthSchedule.year === this._selected.getFullYear() &&
        this.monthSchedule.month - 1 === this._selected.getMonth() &&
        a.day === this._selected.getDate()
    );
    this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>(
      appointments
    );
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
