import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../todo.model';
import { Subscription } from 'rxjs';
import { TodoService } from '../todo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[];
  subscription: Subscription;
  today = new Date();
  todoForm: FormGroup;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.initForm();
    this.subscription = this.todoService.todosChanged
    .subscribe(
      (todos: Todo[]) => {
        this.todos = todos;
      }
    );
    this.todos = this.todoService.getTodos();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.todoService.addTodo(this.todoForm.value);
    this.todoForm.setValue({expirationDate: '', description: ''});
  }

  onDeleteTodo(index: number) {
    this.todoService.deleteTodo(index);
  }

  private initForm() {
    const description = '';
    const expirationDate = '';

    this.todoForm = new FormGroup({
      description: new FormControl(description, Validators.required),
      expirationDate: new FormControl(expirationDate, Validators.required),
    });
  }

}
