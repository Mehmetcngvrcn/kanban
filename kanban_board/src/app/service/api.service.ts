import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenelService } from './genel.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //http istekleri
  getBoard(id: string): Observable<any> {
    return this.http.get("/api/board/" + id);
  }
  getTasklist(id: string): Observable<any> {
    return this.http.get("/api/task-list/" + id);
  }
  addBoard(board: any) {
    return this.http.post('api/board', board);
  }
  update_task_list(){
    return this.http.put("/api/task-list/",this.genelService.task_list);
  }
  constructor(private http: HttpClient,private genelService:GenelService) {
  }
}
