import pgp from "pg-promise";
import Connection from "./Connection";

export default class PostgresAdapter implements Connection {
	connection: any;

	constructor () {
		this.connection = pgp()("postgres://docker:123456@database:5432/app");
	}

	query(statement: string, params: any): Promise<any> {
		return this.connection.query(statement, params);
	}

	close(): Promise<any> {
		return this.connection.$pool.end();
	}

}