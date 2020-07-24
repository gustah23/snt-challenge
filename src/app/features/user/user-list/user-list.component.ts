import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import {UserModel} from '../../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {

  @Input()
  public users: UserModel[];

  @Output()
  public deleteUserId: EventEmitter<number | null> = new EventEmitter<null>();

  @Output()
  public updateUserEmit: EventEmitter<UserModel | null> = new EventEmitter<null>();

  public deleteUser(userId: number): void {
    this.deleteUserId.emit(userId);
  }

  public updateUser(user: UserModel): void {
    user.isEditing = false;
    this.updateUserEmit.emit(user);
  }
}
