import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
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

  public deleteUser(userId: number): void {
    /* TODO implement */
  }

  public updateUser(user: UserModel): void {
    /* TODO implement */
  }
}
