import express from "express";
import HttpServer from "./HttpServer";

export default class ExpressAdapter implements HttpServer {
  app: any

  constructor () {
    this.app = express();
    this.app.use(express.json())
  }

  async register(method: string, url: string, callback: Function): Promise<void> {
		this.app[method](url, async function (req: any, res: any) {
			const output = await callback(req.params, req.body);
			res.json(output);
		});
	}

  async listen(port: number): Promise<void> {
    return this.app.listen(port)
  }
}

