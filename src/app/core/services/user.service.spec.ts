import {getTestBed, TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    service = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should have getUser function', () => {
    service = TestBed.get(UserService);
    expect(service.getUsers).toBeTruthy();
  });

  const dummyUsersResponse = [
    {id: 1, name: 'test'}
  ];

  it('getUsers() should return data', () => {
    service.getUsers().subscribe(res => {
      if (res.length) {
        expect(res).toEqual(dummyUsersResponse);
      }
    });

    const req = httpMock.expectOne('https://uitest.free.beeceptor.com/usernames');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsersResponse);
  });
});
