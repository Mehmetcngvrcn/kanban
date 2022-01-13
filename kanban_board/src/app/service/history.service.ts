import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  //localstorge history fonksiyonları  
  get_history() {
    this.history();
    return JSON.parse(localStorage.getItem("history") || "");
  }

  add_history(new_history_id: string) {
    this.history();
    //ilk 10 id yi getiriyor
    let data = JSON.parse(localStorage.getItem('history') || "").slice(0,10);
    //eğer id ekliyse siliyor
    data = data.filter((id: string) => id != new_history_id);
    //ilk sıraya id yi ekliyor
    data.unshift(new_history_id);
    localStorage.setItem('history', JSON.stringify(data));
  }
  history() {
    //localstorge da history yoksa ekliyor
    if (localStorage.getItem('history') == null) {
      localStorage.setItem("history", JSON.stringify([]));
    }
  }
  constructor() { }
}
