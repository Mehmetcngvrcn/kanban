import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { GenelService } from 'src/app/service/genel.service';
import { HistoryService } from 'src/app/service/history.service';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history: any = [];
  constructor(private historyService: HistoryService, public apiService: ApiService, public genelService: GenelService, public popupService: PopupService) { }
  ngOnInit(): void {
    //localstorge dan en son girilen idleri alıyor
    let history_id = this.historyService.get_history();
    let history: any = [];
    //aktif olan id yi siliyor
    history_id = history_id.filter((id: string) => id != this.genelService.task_list.id);
    for (let index = 0; index < history_id.length; index++) {
      history.push({ _id: history_id[index] });
      this.apiService.getBoard(history_id[index] || "").subscribe(
        res => {
          if (res._id == history[index]._id) {
            //id ler sıralıyor
            history[index] = res;
          }
        }, err => { }, () => {
          //sorgu bittiğinde serverden silinen yada hatalı id leri göstermiyor
          this.history = history.filter((item: { name: string; }) => item.name != null);
        });
    }
  }

}
