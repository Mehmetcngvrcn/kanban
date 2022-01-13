import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICard } from 'src/app/interface/card';
import { IColor } from 'src/app/interface/color';
import { ApiService } from 'src/app/service/api.service';
import { GenelService } from 'src/app/service/genel.service';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  delete() {
    //seçilen index deki card ı siliyor
    let index = this.popupService.card_index;
    if (this.popupService.edit_mode) {
      if (this.popupService.task_name == "To Do") {
        this.genelService.task_list.todo.splice(index, 1);
      }
      else if (this.popupService.task_name == "Backlog") {
        this.genelService.task_list.backlog.splice(index, 1);
      }
      else if (this.popupService.task_name == "Done") {
        this.genelService.task_list.done.splice(index, 1);
      }
      else {
        this.genelService.task_list.inprogress.splice(index, 1);
      }
      this.genelService.task_list_change = true;
      this.popupService.reset();
    }
  }
  popup_close() {
    this.popupService.reset();
  }
  constructor(private router: Router, private apiService: ApiService, public genelService: GenelService, public popupService: PopupService) { }

  ngOnInit(): void {
  }

}
