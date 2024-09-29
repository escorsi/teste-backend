import { Application } from 'src/app/Application';

export class Server {
  private app: Application;

  constructor() {
    this.app = new Application();
  }

  public start() {
    const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4568;
    const expressApp = this.app.getServer();
    expressApp.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}
