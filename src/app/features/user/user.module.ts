import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [UserComponent, UserListComponent],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class UserModule { }
