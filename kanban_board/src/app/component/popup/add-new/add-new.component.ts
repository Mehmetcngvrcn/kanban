import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBoard } from 'src/app/interface/board';
import { IColor } from 'src/app/interface/color';
import { ApiService } from 'src/app/service/api.service';
import { GenelService } from 'src/app/service/genel.service';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  //boardın temel ayarı
  board_settings: IBoard = {
    name: '',
    board_color: 'bg-dark',
    board_border_color: '',
    board_text_color: 'text-light'
  }
  colors: IColor[] = this.genelService.colors;
  opacity = false;
  add_btn_color = "btn-outline-light";
  input_class='';

  opacity_change() {
    //boarda border eklemek için
    if (!this.opacity) {
      this.genelService.board_border_color = "";
    }
    else {
      this.genelService.board_color[0] = this.genelService.body_color[1];
      this.genelService.board_text_color[0] = this.genelService.board_text_color[1];
      this.add_btn_color = "btn-outline-light";
    }
  }

  color_pick(color: string, text: string) {
    //board ın rengini değiştirmek için
    if (this.opacity) {
      this.genelService.board_border_color = "border-" + color;
      this.genelService.board_color[0] = this.genelService.body_color[1];
      this.genelService.board_text_color[0] = this.genelService.board_text_color[1];
    }
    else {
      this.genelService.board_color[0] = "bg-" + color;
      this.genelService.board_border_color = "";
      this.genelService.board_text_color[0] = "text-" + text;
      if (text == "white") {
        this.add_btn_color = "btn-outline-light";
      }
      else {
        this.add_btn_color = "btn-outline-dark";
      }
    }
  }

  add_board() {
    if (this.board_settings.name != "") {
      this.board_settings.board_color = this.genelService.board_color[0];
      this.board_settings.board_border_color = this.genelService.board_border_color;
      this.board_settings.board_text_color = this.genelService.board_text_color[0];
      this.apiService.addBoard(this.board_settings).subscribe(
        res => {
          this.genelService.page_loading = true;
          this.popupService.popup = false;
          this.router.navigateByUrl('/' + res);
        }, err => {
          console.log(err);
        });;
    }
    else{
      this.input_class='err';
    }
  }

  constructor(private router: Router, private popupService: PopupService, private apiService: ApiService, public genelService: GenelService) { }

  ngOnInit(): void {
  }

}
