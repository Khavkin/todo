import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Todo } from './todo';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  todoURL = 'http://localhost:3000/todos';


  constructor(private http: HttpClient) {

  }

    getTodos(todoType: string): Observable < Todo[] > {

      return this.http.get<Todo[]>(this.todoURL)
        .pipe(
          tap(todos => console.log('fetched todos', todos)),
          catchError(this.handleError('getTodos', []))
        );

    }

    addTodo(todoDescription: string): Observable <Todo> {
      return this.http.post< Todo >
              (this.todoURL, {description: todoDescription, is_checked: false});
        
    }
    updateTodo(item: Todo): Observable <any> {
      console.log(item);
    
      return this.http.put(`${this.todoURL}/${item.id}`, item);

      // return this.http.put(this.todoURL, item);
    }

    deleteTodo(id: number): Observable <any> {
      return this.http.delete(`${this.todoURL}/${id}`);
    }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
