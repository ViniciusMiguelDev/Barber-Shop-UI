import { ComponentType } from '@angular/cdk/portal';
import { Observable } from 'rxjs';
import { YesNoDialogComponent } from '../commons/yes-no-dialog/yes-no-dialog.component';

export interface IDialogService {
  showYesNoDialog(
    component: ComponentType<YesNoDialogComponent>,
    data: { title: string; content: string }
  ): Observable<any>;
}
