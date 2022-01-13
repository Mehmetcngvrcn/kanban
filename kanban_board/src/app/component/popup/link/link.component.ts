import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
  id='';
  link(){
    this.router.navigateByUrl('/'+this.id);
    this.popupService.reset();
  }
  constructor(private router: Router,private popupService:PopupService) { }

  ngOnInit(): void {
  }

}
