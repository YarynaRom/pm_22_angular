// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ResumeService {
//   private apiUrl = 'https://jsonplaceholder.typicode.com/posts/6';
//   private postUrl = 'https://jsonplaceholder.typicode.com/posts';// Замінити на реальну адресу API
//
//   constructor(private http: HttpClient) {}
//
//   getAboutMe(): Observable<{ body: string }> {
//     return this.http.get<{ body: string }>(this.apiUrl).pipe(
//       catchError(this.handleError)
//     );
//   }
//
//   sendAboutMe(newText: string): Observable<any> {
//     const body = { title: 'About Me', body: newText };
//     return this.http.post<any>(this.postUrl, body).pipe(
//       catchError(this.handleError)
//     );
//   }
//
//   private handleError(error: HttpErrorResponse) {
//     let errorMessage = 'Сталася невідома помилка!';
//     if (error.error instanceof ErrorEvent) {
//       // Клієнтська або мережева помилка
//       errorMessage = `Помилка: ${error.error.message}`;
//     } else {
//       // Серверна помилка
//       errorMessage = `Код помилки: ${error.status}\nПовідомлення: ${error.message}`;
//     }
//     console.error(errorMessage); // Вивід у консоль
//     return throwError(() => new Error(errorMessage)); // Передаємо помилку далі
//   }
//
//   // getContactData(): Observable<{ phone: string; email: string; name: string }> {
//   //   return this.http.get<{ phone: string; email: string; name: string }>('http://localhost:7777/contactMe')
//   //     .pipe(catchError(this.handleError));
//   // }
//   //
//   // sendContactData(data: { phone: string; email: string; name: string }): Observable<any> {
//   //   return this.http.post('http://localhost:7777/contactMe', data)
//   //     .pipe(catchError(this.handleError));
//   // }
//
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private aboutMeUrl = 'http://localhost:7777/aboutMe';
  private contactMeUrl = 'http://localhost:7777/contactMe';

  constructor(private http: HttpClient) {}

  // ======== About Me ========
  getAboutMe(): Observable<{ body: string }> {
    return this.http.get<{ body: string }>(this.aboutMeUrl).pipe(
      catchError(this.handleError)
    );
  }

  sendAboutMe(newText: string): Observable<any> {
    const body = { body: newText };
    return this.http.post<any>(this.aboutMeUrl, body).pipe(
      catchError(this.handleError)
    );
  }

  // ======== Contact Me ========
  getContactData(): Observable<Array<{ phone: string; email: string; name: string }>> {
    return this.http.get<Array<{ phone: string; email: string; name: string }>>(this.contactMeUrl)
      .pipe(catchError(this.handleError));
  }

  sendContactData(data: { phone: string; email: string; name: string }): Observable<any> {
    return this.http.post(this.contactMeUrl, data)
      .pipe(catchError(this.handleError));
  }

  // ======== Error Handler ========
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Сталася невідома помилка!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Помилка: ${error.error.message}`;
    } else {
      errorMessage = `Код помилки: ${error.status}\nПовідомлення: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
