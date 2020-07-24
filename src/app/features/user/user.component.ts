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
export class UserComponent implements OnInit, OnDestroy {
  private readonly unsubscribe: Subject<void> = new Subject<void>();
  public users: UserModel[] = [];


  constructor(private userService: UserService, private cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.userService.getUsers().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(users => {
      console.log(users);
      this.users = users;
      this.cd.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
