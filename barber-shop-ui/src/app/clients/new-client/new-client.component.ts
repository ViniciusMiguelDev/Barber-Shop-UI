import { Component, Inject, OnDestroy } from '@angular/core';
import { IClientService } from '../../services/api-client/clients/iclient.service';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientFormComponent } from '../components/client-form/client-form.component';
import { ClientModelForm } from '../client.models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { iSnackbarManagerService } from '../../services/isnackbar-manager.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';

@Component({
  selector: 'app-new-client',
  imports: [ClientFormComponent],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.scss',
  providers: [
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
export class NewClientComponent implements OnDestroy {
  private httpSubscription?: Subscription;

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT)
    private readonly httpService: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: iSnackbarManagerService,
    private readonly routes: Router
  ) {}

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmitClient(value: ClientModelForm) {
    const { id, ...request } = value;
    this.httpSubscription = this.httpService.save(request).subscribe((_) => {
      this.snackBarManager.show('Usuário cadastrado com sucesso');
      this.routes.navigate(['clients/list']);
    });
  }
}
