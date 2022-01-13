import { Component, OnInit } from '@angular/core';
import { GenelService } from 'src/app/service/genel.service';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private popupService:PopupService,public genelService: GenelService) { }

  popup(name:string){
    this.popupService.popup=true;
    this.popupService.task_name=name;
  }

  ngOnInit(): void {
    this.genelService.Reset();
  }

}
