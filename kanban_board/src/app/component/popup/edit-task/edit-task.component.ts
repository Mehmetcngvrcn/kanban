import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICard } from 'src/app/interface/card';
import { IColor } from 'src/app/interface/color';
import { ApiService } from 'src/app/service/api.service';
import { GenelService } from 'src/app/service/genel.service';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  colors: IColor[] = this.genelService.colors;
  color_pick(color: string) {
    this.popupService.card.color = color;
  }
  
  save() {
    if (this.popupService.edit_mode) {
      //eğer edit mode true ise task list deki bir kartı düzenliyor
      let index = this.popupService.card_index;
      if (this.popupService.task_name == "To Do") {
        this.genelService.task_list.todo[index].name = this.popupService.card.name;
        this.genelService.task_list.todo[index].color = this.popupService.card.color;
      }
      else if (this.popupService.task_name == "Backlog") {
        this.genelService.task_list.backlog[index].name = this.popupService.card.name;
        this.genelService.task_list.backlog[index].color = this.popupService.card.color;
      }
      else if (this.popupService.task_name == "Done") {
        this.genelService.task_list.done[index].name = this.popupService.card.name;
        this.genelService.task_list.done[index].color = this.popupService.card.color;
      }
      else {
        this.genelService.task_list.inprogress[index].name = this.popupService.card.name;
        this.genelService.task_list.inprogress[index].color = this.popupService.card.color;
      }
    }
    else {
      //eğer edit mode false ise task liste bir kart ekliyor
      let card: ICard = {
        name: this.popupService.card.name,
        color: this.popupService.card.color
      }
      if (this.popupService.task_name == "To Do") {
        this.genelService.task_list.todo.push(card);
      }
      else if (this.popupService.task_name == "Backlog") {
        this.genelService.task_list.backlog.push(card);
      }
      else if (this.popupService.task_name == "Done") {
        this.genelService.task_list.done.push(card);
      }
      else {
        this.genelService.task_list.inprogress.push(card);
      }
    }
    this.genelService.task_list_change = true;
    this.popupService.reset();
  }
  
  constructor(private router: Router, private apiService: ApiService, public genelService: GenelService, public popupService: PopupService) { }

  ngOnInit(): void {
  }

}
