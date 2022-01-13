import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './component/board/board.component';
import { HeaderComponent } from './component/header/header.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { TaskListsComponent } from './component/board/task-lists/task-lists.component';
import { HomeComponent } from './component/home/home.component';
import { AddNewComponent } from './component/popup/add-new/add-new.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './component/error/error.component';
import { PopupComponent } from './component/popup/popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistoryComponent } from './component/popup/history/history.component';
import { EditTaskComponent } from './component/popup/edit-task/edit-task.component';
import { LinkComponent } from './component/popup/link/link.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    HeaderComponent,
    TaskListsComponent,
    HomeComponent,
    AddNewComponent,
    ErrorComponent,
    PopupComponent,
    HistoryComponent,
    EditTaskComponent,
    LinkComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTooltipModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
