import { Component } from '@angular/core';
import { GenelService } from './service/genel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kanban_board';
  constructor(public genelService: GenelService) {
  }
  onMouseWheel(evt: any) {
    //header ın altındaki divin wheel eventi.mouse tekerleği ile boardın scale ını değiştirmek için
    let scale = this.genelService.board_scale_get();
    this.genelService.board_scale_set(scale += evt.deltaY * -0.01);
  }
}
