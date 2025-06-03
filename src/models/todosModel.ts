
export default class TodosModel {
    //propietats
    private db: any;

    //mètodes
    constructor(db: any) {
        this.db = db;
    }

    async getAll() {
        return await this.db.all("SELECT * FROM todos ORDER BY completat ASC");
    }

    async getById(id: number) {
        return await this.db.get("SELECT * FROM todos WHERE id = ?", id);
    }

    async getByPrioritat(prioritat: string) {
        return await this.db.all("SELECT * FROM todos WHERE prioritat = ?", prioritat);
    }

    async createTodo(data: any) {

        // Creo consulta dinàmicament
        const camps = Object.keys(data);
        const interrogants = camps.map(() => "?").join(", ");
        const valors = Object.values(data);
        const cons = `INSERT INTO todos (${camps.join(", ")}) VALUES (${interrogants})`;

        return await this.db.run(cons, valors);
    }

    async updateTodo(id: number, data: { titol: string; descripcio: string; completat: any; prioritat: any; }) {
        const cons = "UPDATE todos SET titol = ?, descripcio = ?, completat = ?, prioritat = ? WHERE id = ?";
        return await this.db.run(cons, data.titol, data.descripcio, data.completat, data.prioritat, id);
    }

    async deleteTodo(id: number) {
        return await this.db.run("DELETE FROM todos WHERE id = ?", id);
    }
}
