import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  todoItemText: string = 'test';
  @Input() todo: Todo;
  @Output() updateTodo: EventEmitter<Todo> = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  isChecked(): boolean {
    this.todo.is_checked = !this.todo.is_checked;

    this.updateTodo.emit(this.todo);

    return this.todo.is_checked;
  }


}
