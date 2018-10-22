import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Todo } from './todo';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ HttpClient ]
})
export class AppComponent {
  title = 'todo-app';
  todos: Todo[] = [];
  filteredTodos: Todo[] =[];
  todosCount = 0;
  hasDoneTodos = false;

  constructor (private dataservice: DataService, public snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.dataservice.getTodos('ALL').subscribe(todos => {
      this.todos = todos;
      this.filteredTodos = todos;
      this.todosCount = this.todos.length;
      this.checkDoneTodos();
    });

   // const url = 'http://localhost:3000/todos';
  //  this.http.get<any>(url)
  //  .subscribe(resp => console.log(resp));

  }

  addTodo($event: string ): void {
    // let todo: Todo;
    this.dataservice.addTodo($event).subscribe(data => {
          console.log(data);
          this.todos.push(data);
          this.todosCount++;
        });
  }

  deleteTodo(id: number): void {
      this.dataservice.deleteTodo(id).subscribe(_ => {
        this.dataservice.getTodos('ALL').subscribe(todos => {
          this.todos = todos;
          this.filteredTodos = todos;
          this.todosCount = this.todos.length;
          this.checkDoneTodos();
        });  
      }

      );
  }

  onUpdateTodo($event: Todo): void {
    this.dataservice.updateTodo($event).subscribe(data => {
    console.log('updateTodo event ', data);
    this.checkDoneTodos();
    });
  }

  onDeleteDoneTodos(): void {
    this.todos.forEach(element => {
      if (element.is_checked) {
        this.deleteTodo(element.id);
      }
    });
  }

  onSetFilter($value: string): void {
    console.log('setFilter:',$value);
    switch ($value) {
      case 'ALL' : {
        this.filteredTodos = this.todos;
        break;
      }
      case 'DONE': {
        this.filteredTodos = this.todos.filter(value => value.is_checked);
        console.log(this.filteredTodos);
        break;
      }
      case 'ACTIVE': {
        this.filteredTodos = this.todos.filter(value => !value.is_checked);
        console.log(this.filteredTodos);
        break;
      }
    }
    this.todosCount = this.filteredTodos.length;
    this.ShowSnackBar('filtered to '+ $value);

  }

  checkDoneTodos(): void {
    if (this.todos.find(item => item.is_checked)) {
      this.hasDoneTodos = true;
    } else {
      this.hasDoneTodos = false;
    }
  }


  ShowSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
}
