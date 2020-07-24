import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../../core/services/user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserListComponent', () => {

  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  const expectedUser = [{id: 1, name: 'test'}];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ UserListComponent ],
      providers: [ UserService ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    component.users = expectedUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contains an array of users', () => {
    expect(component.users).toEqual(expectedUser);
  });
});
