import { Injectable } from '@angular/core';
import { IColor } from '../interface/color';
import { ITask_list } from '../interface/task_list';

@Injectable({
  providedIn: 'root'
})
export class GenelService {
  constructor() { }
  //boardın temel ayarları
  colors: IColor[] = [
    { "color": "primary", "text": "white" },
    { "color": "secondary", "text": "white" },
    { "color": "success", "text": "white" },
    { "color": "info", "text": "dark" },
    { "color": "warning", "text": "dark" },
    { "color": "danger", "text": "white" },
    { "color": "light", "text": "dark" },
    { "color": "dark", "text": "white" }
  ];
  page_loading = true;
  header = false;
  task_list_change = false;
  header_title = "Kanban Board";
  header_color = ["bg-dark", "bg-dark"];
  header_text_color = ["text-white", "text-white"];
  body_color = ["bg-dark", "bg-dark"];
  board_color = ["bg-dark", "bg-dark"];
  board_border_color = "";
  board_text_color = ["text-white", "text-white"];

  dragPosition = { x: 0, y: 0 };

  task_list: ITask_list = {
    id: '',
    backlog: <any>[{}],
    todo: <any>[{}],
    inprogress: <any>[{}],
    done: <any>[{}]
  }

  _board_scale = 1;
  board_scale_get() {
    return this._board_scale * 100;
  }
  board_scale_write() {
    let value: any = this._board_scale * 100;
    return parseInt(value);
  }
  board_scale_set(number: number) {
    //board max 200 min 50 width
    if (number <= 50) {
      this._board_scale = 0.5;
    }
    else if (number >= 200) {
      this._board_scale = 2.0
    }
    else {
      this._board_scale = number * 0.01;
    }
  }
  Reset() {
    this.task_list= {
      id: '',
      backlog: <any>[{}],
      todo: <any>[{}],
      inprogress: <any>[{}],
      done: <any>[{}]
    }
    this.page_loading = true;
    this.header = false;
    this.task_list_change = false;
    this.header_title = "Kanban Board";
    this.header_color[0] = this.header_color[1];
    this.header_text_color[0] = this.header_text_color[1];
    this.body_color[0] = this.body_color[1];
    this.board_color[0] = this.board_color[1];
    this.board_border_color = "";
    this.board_text_color[0] = this.board_text_color[1];
  }
}
