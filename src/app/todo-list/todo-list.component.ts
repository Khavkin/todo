import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnChanges {

  @Input() todos: Todo[];
  @Input() todosCount: number;

  @Output() updateTodo: EventEmitter<Todo> = new EventEmitter;
  @Output() setFilter: EventEmitter<string> = new EventEmitter;

  filterOption = 'ALL';


  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
   /* snackBar.onAction().subscribe(() => {
      console.log('The snack-bar action was triggered!');
    });*/
  }

  ngOnChanges() {
    // this.todosCount = this.todos.length;
    // console.log(this.todos);
  }

  onUpdateTodo($event: Todo): void {
    this.updateTodo.emit($event);
    this.ShowSnackBar('Toggled ' + $event.description +
    ($event.is_checked ? ' to Done' : ' to Active ') , 'Undo' );
    console.log('updateTodo event ', $event);
  }

  onSetFilter($filterOption: string): void {
    this.filterOption = $filterOption;
    this.setFilter.emit(this.filterOption);
  }

  ShowSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
