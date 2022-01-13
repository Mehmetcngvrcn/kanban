import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenelService } from 'src/app/service/genel.service';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  pencere = false;
  //secilebilen zoom secenekleri
  size = [200, 150, 100, 75, 50];
  copy_id() {
    //board ın id sini kaydediyor 
    navigator.clipboard.writeText(this.genelService.task_list.id);
  }
  resize(value: any) {
    this.genelService.board_scale_set(value);
  }
  scale(value: any) {
    this.genelService.board_scale_set(value.target.value);
  }
  board_center() {
    //board ekrandan kaybolursa ortalaması için btn
    this.genelService.dragPosition = {
      x: (document.body.offsetWidth / 2 - (document.getElementById('board')?.offsetWidth || 0) / 2),
      y: (document.body.offsetHeight / 2) - (document.getElementById('board')?.offsetHeight || 0) / 2
    }
  }
  popup(name: string) {
    this.popupService.popup = true;
    this.popupService.task_name = name;
  }
  constructor(private route: ActivatedRoute, public popupService: PopupService, public genelService: GenelService) { }
  ngOnInit(): void {
  }

}
