import {Injectable} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'https://uitest.free.beeceptor.com/usernames';

  private users: UserModel[] = [];

  private users$: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>(this.users);

  constructor(private http: HttpClient) {
    this.requestUser();
  }

  public getUsers(): Observable<UserModel[]> {
    return this.users$.asObservable();
  }

  private requestUser(): void {
    const headers = new HttpHeaders({'Content-Type': `application/json`});
    this.http.get(this.apiUrl, { headers }).subscribe(response => {
      if (response && Array.isArray(response)) {
        this.users = response.map((user, i) => {
          return {id: i, ...user };
        });
        this.users$.next(this.users);
      } else {
        console.warn('Request to mock user data failed');
      }
    });
  }
}
