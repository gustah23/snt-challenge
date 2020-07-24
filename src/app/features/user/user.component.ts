import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  public newUserName: string;
  public isEditingAll = false;

  constructor(private userService: UserService) {}

  public deleteUser(userId: number): void {
    this.userService.deleteUser(userId);
  }

  public updateUser(user: UserModel): void {
    this.userService.updateUser(user);
  }

  public addUser(name): void {
    this.userService.addUser(name);
  }
}
