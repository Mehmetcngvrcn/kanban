import { Injectable } from '@angular/core';
import { ICard } from '../interface/card';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  popup = false;
  task_name = '';

  //board daki seçilen card ın verileri
  task_list=false;
  //edit mode 
  //true ise card düzenleniyor
  //false ise yeni ekleniyor
  edit_mode = false;
  card: ICard = {
    name: '',
    color: 'light'
  };
  card_index = -1;
  btn_name = "Add";

  reset() {
    this.task_list=false;
    this.popup = false;
    this.card.name = '',
    this.btn_name = "Add";
    this.card.color = 'light'
    this.edit_mode = false;
    this.task_name = '';
    this.card_index = -1;
  }
  constructor() { }
}
