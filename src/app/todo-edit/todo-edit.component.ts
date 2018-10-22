import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { CustomMaterialModule } from '../custom-material.module';
import { FormBuilder, FormGroup} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../data.service';
import { Todo } from '../todo';



@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})

export class TodoEditComponent implements OnInit {

  /*
  @ViewChild('buttonAdd')
  buttonAdd: ElementRef;
  */
  @Input() isEnabledDeleteDoneButton = false;
  @Output() insertTodo: EventEmitter<string> = new EventEmitter();
  @Output() deleteDoneTodos: EventEmitter<string> = new EventEmitter();

  formTodoEdit: FormGroup;
  isEnabledAddButton = false;
  isFocused = false;

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar,
    private dataservice: DataService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formTodoEdit = this.fb.group({
      todoText: ['']
    });

    this.formTodoEdit.get('todoText').valueChanges.subscribe(
      (value: string) => {

        if (value.length > 3) {
          this.isEnabledAddButton = true;
         // this.buttonAdd.nativeElement.disabled = false;
          console.log('enable button add');
        } else {
          this.isEnabledAddButton = false;
         // this.buttonAdd.nativeElement.disabled = true;
          console.log('disable button add');
        }

      });


  }

  inputFocused(value: boolean) {
    this.isFocused = value;
    console.log(value);
  }


  onAddTodo(todoDescr: string) {
   // let todos: Todo[] = [];
   // this.dataservice.getTodos('all').subscribe(tds => todos = tds);
   // console.log(todoDescr, todos);
  //  this.insertTodo.emit(todoDescr);
    this.insertTodo.emit(todoDescr);

    // this.dataservice.addTodo(todoDescr);

    this.ShowSnackBar(todoDescr + ' added');

    this.formTodoEdit.patchValue({todoText: ['']});
  }

  onDeleteDoneTodos(): void {
    this.deleteDoneTodos.emit('Delete done Todos');
    this.ShowSnackBar('Done todos deleted');
  }

  ShowSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
