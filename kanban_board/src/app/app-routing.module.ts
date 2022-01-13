import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './component/board/board.component';
import { ErrorComponent } from './component/error/error.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "Error", component: ErrorComponent},
  { path: "Error/:id", component: ErrorComponent},
  { path: ":id", component: BoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
