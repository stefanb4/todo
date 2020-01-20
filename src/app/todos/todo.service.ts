import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosChanged = new Subject<Todo[]>();
  today = new Date();

  // for demo
  private todos: Todo[] = [
    new Todo(
        'Task 1',
        true,
        this.today,
        new Date(new Date().setDate(this.today.getDate() + 1))
      ),
    new Todo(
      'Task 2',
      false,
      new Date(new Date().setDate(this.today.getDate() + 1)),
      new Date(new Date().setDate(this.today.getDate() + 2))
    ),
    new Todo(
      'Task 3',
      false,
      this.today,
      new Date(new Date().setDate(this.today.getDate() - 2))
    ),
    new Todo(
      'Task 4',
      false,
      this.today,
      new Date(new Date().setDate(this.today.getDate() - 3))
    )
  ];

  getTodos() {
    return this.sortByCreatedDate(this.todos);
  }

  addTodo(todo: Todo) {
    todo.completed = false;
    todo.createdDate = this.today;
    todo.expirationDate = new Date(todo.expirationDate),
    this.todos.push(todo);
    this.todosChanged.next(this.sortByCreatedDate(this.todos));
  }

  deleteTodo(index: number) {
    this.sortByCreatedDate(this.todos);
    this.todos.splice(index, 1);
    this.todosChanged.next(this.todos);
  }

  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }

  public sortByCreatedDate(array: Todo[]): Todo[] {
    return array.sort((a: Todo, b: Todo) => {
      return this.getTime(a.createdDate) - this.getTime(b.createdDate);
    });
  }
}
