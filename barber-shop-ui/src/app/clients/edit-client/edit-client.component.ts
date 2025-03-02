import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { IClientService } from '../../services/api-client/clients/iclient.service';
import { ClientFormComponent } from '../components/client-form/client-form.component';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { iSnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientModelForm } from '../client.models';

@Component({
  selector: 'app-edit-client',
  imports: [ClientFormComponent],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss',
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
export class EditClientComponent implements OnInit, OnDestroy {
  private httpSubscription: Subscription[] = [];
  //private activatedRouteSubscription?: Subscription;

  client: ClientModelForm = {
    id: 0,
    name: '',
    email: '',
    phone: '',
  };

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT)
    private readonly httpService: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: iSnackbarManagerService,
    private readonly activedRoute: ActivatedRoute,
    private readonly routes: Router
  ) {}

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.snackBarManager.show('Erro ao recuperar informações do cliente');
      this.routes.navigate(['clients/list']);
      return;
    }
    this.httpSubscription.push(
      this.httpService
        .findById(Number(id))
        .subscribe((data) => (this.client = data))
    );
  }

  ngOnDestroy(): void {
    this.httpSubscription.forEach((s) => s.unsubscribe());
  }

  onSubmitClient(value: ClientModelForm) {
    const { id, ...request } = value;
    if (id) {
      const sub = this.httpService.update(id, request).subscribe(() => {
        this.snackBarManager.show('Usuário atualizado com sucesso');
        this.routes.navigate(['clients/list']);
      });
      this.httpSubscription.push(sub);
      return;
    }
    this.snackBarManager.show('Um erro inesperado aconteceu');
    this.routes.navigate(['clients/list']);
  }
}
