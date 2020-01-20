export class Todo {
  public description: string;
  public completed: boolean;
  public createdDate: Date;
  public expirationDate: Date;

  constructor(description: string, completed: boolean, createdDate: Date, expirationDate: Date) {
    this.description = description;
    this.completed = completed;
    this.createdDate = createdDate;
    this.expirationDate = expirationDate;
  }
}
