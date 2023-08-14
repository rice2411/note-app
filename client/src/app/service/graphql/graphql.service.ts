import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  private apiUrl = environment.API_GRAPHQL_URL;
  constructor(private http: HttpClient) {}
  request(query: string, param?: any) {
    const body = JSON.stringify({
      query,
      variables: param || undefined,
    });
    return this.http.post<any[]>(this.apiUrl, body);
  }
}
