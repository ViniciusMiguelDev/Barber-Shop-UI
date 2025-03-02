import { InjectionToken } from '@angular/core';
import { IClientService } from './api-client/clients/iclient.service';
import { iSnackbarManagerService } from './isnackbar-manager.service';
import { IDialogService } from './idialog-manager.service';
import { IScheduleService } from '../schedules/ischedules.services';

export const SERVICES_TOKEN = {
  HTTP: {
    CLIENT: new InjectionToken<IClientService>('SERVICES_TOKEN.HTTP.CLIENT'),
    SCHEDULE: new InjectionToken<IScheduleService>('SERVICES_TOKEN.HTTP.SCHEDULE')
  },
  SNACKBAR: new InjectionToken<iSnackbarManagerService>(
    'SERVICES_TOKEN.SNACKBAR'
  ),
  YES_NO_DIALOG: new InjectionToken<IDialogService>('SERVICES_TOKEN.YES_NO_DIALOG'),
};
