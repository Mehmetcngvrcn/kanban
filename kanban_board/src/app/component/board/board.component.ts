import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenelService } from 'src/app/service/genel.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board = false;
  loading = false;
  pencere = "";
  onResize() {
    //taratıcının size ı değiştiğinde board ı ortalıyor
    this.genelService.dragPosition = {
      x: (document.body.offsetWidth / 2 - (document.getElementById('board')?.offsetWidth || 0) / 2),
      y: (document.body.offsetHeight / 2) - (document.getElementById('board')?.offsetHeight || 0) / 2
    }
  }
  save_board() {
    this.genelService.task_list_change = false;
    this.loading = true;
    //save tıklandığında tasklist i db den güncelliyor
    this.apiService.update_task_list().subscribe(
      res => {
        this.genelService.task_list.id = this.route.snapshot.paramMap.get('id') || "";
        if (this.genelService.task_list.id != "") {
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
              this.loading = false;
            }
          );
        }
      },
      //board güncellenmezse
      err => this.router.navigateByUrl('/Error'));
  }
  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, public genelService: GenelService) {
    route.params.subscribe(val => {
      // sayfa yüklendiğimde url deki verileri almak için
      let name = this.route.snapshot.paramMap.get('name');
      this.pencere = name || "";
      let id = this.route.snapshot.paramMap.get('id');
      // sayfa url sinde board id varsa api service den board ı getiriyor
      if (id != null) {
        this.apiService.getBoard(id || "").subscribe(
          res => {
            this.pencere = res.name;
            this.board = true;
            this.genelService.board_color[0] = res.board_color;
            this.genelService.board_border_color = res.board_border_color;
            this.genelService.board_text_color[0] = res.board_text_color;
            this.genelService.dragPosition = {
              x: (document.body.offsetWidth / 100) * 10,
              y: (document.body.offsetHeight / 100) * 10
            }
          },
          //boardı bulamazsa /Error/404 sayfasına
          err => this.router.navigateByUrl('/Error/404'));
      }
      else {
        this.router.navigateByUrl('/Error/404')
      }
      //sayfa yüklendiğinde boardı ortalamak için
      this.genelService.header = true;
    });
  }

  ngOnInit(): void {

  }
}
