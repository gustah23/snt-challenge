import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserComponent} from './user.component';
import {FormsModule} from '@angular/forms';
import {UserListComponent} from './user-list/user-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from '../../core/services/user.service';
import {of} from 'rxjs';
import {DebugElement} from '@angular/core';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [UserComponent, UserListComponent],
      providers: [
        {
          provide: UserService, useValue: {
            getUsers: () => of([{id: 1, name: 'test'}])
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users', () => {
    spyOn(userService, 'getUsers').and.callThrough();

    fixture.detectChanges();

    expect(component.users).toEqual([{id: 1, name: 'test'}]);
  });

  it('button should has btn class', () => {
    const userDe: DebugElement = fixture.debugElement;
    const userEl: HTMLElement = userDe.nativeElement;
    const buttons = userEl.querySelectorAll('button');

    buttons.forEach(btn => {
      expect(btn.classList).toContain('btn');
    });
  });
});
