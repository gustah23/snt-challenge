import {Injectable} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'https://uitest.free.beeceptor.com/usernames';
  private readonly mockUsers = [{name: 'Ras Berry'}, {name: 'John Doe'}, {name: 'Gareth Aldridge'}, {name: 'Hallen Pipper'},
    {name: 'Joe Allen'}, {
      name: 'Dolly Johnson'
    }];
  private readonly userStorageKey = 'snt-users';

  private users: UserModel[] = [];

  private users$: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>(this.users);

  constructor(private http: HttpClient) {
    this.requestUser();
  }

  public getUsers(): Observable<UserModel[]> {
    return this.users$.asObservable();
  }

  public deleteUser(userId: number): void {
    /* NOTE: I'm note updating the storage here purposefully to avoid the necessary to create new users after the delete, so I just need to refresh the page */
    this.users = this.users.filter(user => user.id !== userId);
    this.users$.next(this.users);
  }

  public updateUser(user: UserModel): void {
    const userIndex = this.users.findIndex(oldUser => oldUser.id === user.id);
    if (userIndex !== -1) {
      this.users[userIndex].name = user.name;
    }
    this.users$.next(this.users);
    this.updateStorage();
  }
  public addUser(userName: string): void {
    const newUserId = this.genId();
    this.users.push({ id: newUserId, name: userName });
    this.users$.next(this.users);
    this.updateStorage();
  }

  private requestUser(): void {
    const storageData = localStorage.getItem(this.userStorageKey);
    if (storageData) {
      this.users = JSON.parse(storageData);
      this.users$.next(this.users);
      return;
    }
    const headers = new HttpHeaders({'Content-Type': `application/json`});
    this.http.get(this.apiUrl, {headers}).subscribe(response => {
      if (response && Array.isArray(response)) {
        this.users = response.map((user, i) => {
          return {id: i, ...user};
        });
        this.users$.next(this.users);
        this.updateStorage();
      } else {
        console.warn('Request to mock user does not have an array of users');
      }
    }, error => {
      /* Added treatment for to many responses error */
      if (error && error.status === 429) {
        this.users = this.mockUsers.map((user, i) => {
          return {id: i, ...user};
        });
        this.users$.next(this.users);
        this.updateStorage();
      }
    });
  }

  private updateStorage(): void {
    localStorage.setItem(this.userStorageKey, JSON.stringify(this.users));
  }

  private genId(): number {
    return this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1;
  }
}
