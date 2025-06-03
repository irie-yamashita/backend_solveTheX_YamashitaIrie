import { Database } from "sqlite";

export class UserModel {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
    
  }

  async getUsers() {
    return await this.db.all("SELECT id, username FROM users");
  }

  async getUser(username: string) {
    return await this.db.get("SELECT * FROM users WHERE username = ?", username);
  }

  async crearUser(data: any) {
    return await this.db.run("INSERT INTO users (username, password) VALUES (?, ?)", data.username, data.password);
  }
}
