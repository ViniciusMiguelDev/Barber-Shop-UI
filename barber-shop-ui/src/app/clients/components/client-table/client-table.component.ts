import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { ClientModelTable } from '../../client.models';
import { Subscription } from 'rxjs';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { IDialogService } from '../../../services/idialog-manager.service';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { YesNoDialogComponent } from '../../../commons/yes-no-dialog/yes-no-dialog.component';
import { CustomPaginator } from './custom-paginator';

@Component({
  selector: 'app-client-table',
  imports: [MatTable, MatTableModule, MatIcon, MatPaginator],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss',
  providers: [
    {
      provide: SERVICES_TOKEN.YES_NO_DIALOG,
      useClass: DialogManagerService,
    },
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginator,
    },
  ],
})
export class ClientTableComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
  @Input() clients: ClientModelTable[] = [];

  dataSource!: MatTableDataSource<ClientModelTable>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

  private dialogManagerServiceSubscription?: Subscription;

  @Output() confirmDelete = new EventEmitter<ClientModelTable>();
  @Output() RequestUpdate = new EventEmitter<ClientModelTable>();

  constructor(
    @Inject(SERVICES_TOKEN.YES_NO_DIALOG)
    private readonly dialogManagerService: IDialogService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clients'] && this.clients) {
      this.dataSource = new MatTableDataSource<ClientModelTable>(this.clients);
    }
  }

  ngOnDestroy(): void {
    if (this.dialogManagerServiceSubscription) {
      this.dialogManagerServiceSubscription.unsubscribe();
    }
  }

  formatPhone(phone: string) {
    return `(${phone.substring(0, 2)}) ${phone.substring(
      2,
      7
    )} - ${phone.substring(7)}`;
  }

  onRequestUpdate(client: ClientModelTable) {
    this.RequestUpdate.emit(client);
  }

  delete(client: ClientModelTable) {
    this.dialogManagerService
      .showYesNoDialog(YesNoDialogComponent, {
        title: 'Exclusão de cliente',
        content: `Confirma a exclusão do cliente ${client.name}`,
      })
      .subscribe((result) => {
        if (result) {
          this.confirmDelete.emit(client);
          const upadatedList = this.dataSource.data.filter(
            (c) => c.id != client.id
          );
          this.dataSource = new MatTableDataSource<ClientModelTable>(
            upadatedList
          );
        }
      });
  }
}
