import * as express from 'express';
import DBAgent from '../agent/db/DBAgent';
import {Collection} from 'mongodb';
import {Api} from './Api';

export class LoginApi extends Api {
    protected initApi() {
        this.app.post('/login', async (req: express.Request, res: express.Response) => {
            const users: Collection<any> = DBAgent.getDatabase('test').collection('users');
            const userCount: number = await users.countDocuments({ 
                name: req.body.id, 
                passwords: req.body.password
            });
            
            (userCount === 1) ? res.sendStatus(200) : res.sendStatus(401);
        });
    }
}