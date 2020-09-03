import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import DBAgent from './agent/db/DBAgent';
import {LoginApi} from './api/LoginApi';
import * as bodyParser from 'body-parser';

class Server {
    // 포트번호
    private static PORT: number = 8080;
    private app: express.Application;

    constructor() {
        const app: express.Application = express();
        this.app = app;

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended : true}));

        const basePath: string = process.cwd();
        app.get('/', (req: express.Request, res: express.Response) => {
            res.sendFile(path.join(basePath, 'index.html'));
        });

        app.use('/src', express.static(path.join(basePath, 'src')));
        app.use('/css', express.static(path.join(basePath, 'css')));
        app.use('/resources', express.static(path.join(basePath, 'resources')));
        app.use('/dist', express.static(path.join(basePath, 'dist')));

        const httpServer: http.Server = http.createServer(app).listen(Server.PORT, () => {
            console.log(`port: ${Server.PORT} open. server is started!`);

            DBAgent.connectDB()
                .then(() => {
                    console.log('db connect complete');
                })
                .catch((e) => {
                    console.error(e);
                })
        });
        app.use('/dist', express.static(path.join(basePath, 'dist')));
        new LoginApi(app);
    }
}

export default new Server();