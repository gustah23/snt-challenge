import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {UserModel} from '../../models/user.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnDestroy {
  private readonly unsubscribe: Subject<void> = new Subject<void>();
  public users: UserModel[] = [];
  public newUserName: string;
  public isEditingAll = false;

  constructor(private userService: UserService, private cd: ChangeDetectorRef) {
    this.userService.getUsers().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(users => {
      this.users = users;
      this.cd.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public deleteUser(userId: number): void {
    this.userService.deleteUser(userId);
  }

  public updateUser(user: UserModel): void {
    this.userService.updateUser(user);
  }

  public addUser(name): void {
    this.userService.addUser(name);
  }

  public editAllUsers(): void {
    this.isEditingAll = true;
    this.userService.editAll();
  }

  public deleteAllUsers(): void {
    /* this should be a different endPoint to avoid multiple request and improve performance */
    this.users.forEach(user => this.userService.deleteUser(user.id));
  }

  public saveAllUsers(): void {
    this.isEditingAll = false;
    /* this should be a different endPoint to avoid multiple request and improve performance */
    this.users.forEach(user => {
      user.isEditingAll = false;
      this.userService.updateUser(user);
    });
  }
}
