import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      imports: [ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get stored demo-todos from todoService', () => {
    const app = fixture.debugElement.componentInstance;
    const todoService = fixture.debugElement.injector.get(TodoService);
    fixture.detectChanges();
    expect(todoService.getTodos()).toEqual(app.todos);
  });

  it('should add new todo to todoservice', () => {
    const app = fixture.debugElement.componentInstance;
    const todoService = fixture.debugElement.injector.get(TodoService);
    const todo = new Todo(
      'Task Test',
      true,
      new Date(),
      new Date()
    );
    todoService.addTodo(todo);
    fixture.detectChanges();
    expect(todoService.getTodos()).toEqual(app.todos);
  });

  it('should delete todo from todoservice', () => {
    const app = fixture.debugElement.componentInstance;
    const todoService = fixture.debugElement.injector.get(TodoService);
    todoService.deleteTodo(1);
    fixture.detectChanges();
    expect(todoService.getTodos()).toEqual(app.todos);
  });
});
