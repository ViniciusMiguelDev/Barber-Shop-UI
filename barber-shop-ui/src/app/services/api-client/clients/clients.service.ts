import { Injectable } from '@angular/core';
import { IClientService } from './iclient.service';
import { Observable } from 'rxjs';
import {
  SaveClientRequest,
  SaveClientResponse,
  UpdateClientRequest,
  ListClientResponse,
  DetailClientResponse,
  UpdateClientResponse,
} from './client.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ClientsService implements IClientService {
  private readonly basepath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: SaveClientRequest): Observable<SaveClientResponse> {
    return this.http.post<SaveClientResponse>(`${this.basepath}clients`, request);
  }

  update(
    id: number,
    request: UpdateClientRequest
  ): Observable<UpdateClientResponse> {
    return this.http.put<UpdateClientResponse>(`${this.basepath}clients/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basepath}clients/${id}`);
  }

  list(): Observable<ListClientResponse[]> {
    return this.http.get<ListClientResponse[]>(`${this.basepath}clients`);
  }

  findById(id: number): Observable<DetailClientResponse> {
    return this.http.get<DetailClientResponse>(`${this.basepath}clients/${id}`);
  }
}
