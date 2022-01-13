import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GenelService } from 'src/app/service/genel.service';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupService } from 'src/app/service/popup.service';
import { HistoryService } from 'src/app/service/history.service';

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.css']
})
export class TaskListsComponent implements OnInit {
  popup_card_add(task_name: string) {
    //kart eklemek için bilgileri popup a gönderiyor
    this.popupService.task_name = task_name;
    this.popupService.edit_mode = false;
    this.popupService.task_list = true;
    this.popupService.popup = true;
  }
  popup_card_set(task_name: string, item: any, index: number) {
    //kart düzenlemek için bilgileri popup a gönderiyor
    this.popupService.card = { name: item.name, color: item.color };
    this.popupService.card_index = index;
    this.popupService.task_name = task_name;
    this.popupService.task_list = true;
    this.popupService.edit_mode = true;
    this.popupService.btn_name = 'Save';
    this.popupService.popup = true;
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.genelService.task_list_change = true;
  }
  constructor(private historyService: HistoryService, private router: Router, private route: ActivatedRoute, public genelService: GenelService, public apiService: ApiService, private popupService: PopupService) {
    route.params.subscribe(val => {
      //url den id yi genel service e gönderiyor
      this.genelService.task_list.id = this.route.snapshot.paramMap.get('id') || "";
      if (this.genelService.task_list.id != "") {
        this.historyService.add_history(this.genelService.task_list.id);
        this.apiService.getTasklist(this.genelService.task_list.id || "").subscribe(
          res => {
            //tasklist varsa veriler dolduruluyor
            this.genelService.task_list.backlog = res.backlog;
            this.genelService.task_list.todo = res.todo;
            this.genelService.task_list.done = res.done;
            this.genelService.task_list.inprogress = res.inprogress;
          },
          //tasklisti bulamazsa /Error/404 sayfasına
          err => {
            this.router.navigateByUrl('/Error/404')
          }, () => {
            //tamamlandığında
            this.genelService.dragPosition = {
              x: (document.body.offsetWidth / 100) * 10,
              y: (document.body.offsetHeight / 100) * 10
            }
            this.genelService.page_loading = false;
          }
        );
      }
    }
    );
  }

  ngOnInit(): void {

  }
}
