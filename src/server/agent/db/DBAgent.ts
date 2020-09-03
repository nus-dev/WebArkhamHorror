import * as mongodb from 'mongodb';

class DBAgent {
    private mongoClient: mongodb.MongoClient;

    constructor() {
        //
    }

    public async connectDB(): Promise<void> {
        //localhost 로컬 호스트
        //:27017  몽고디비 포트
        //local db 생성시 만든 폴더 명
        var databaseURL = 'mongodb://localhost:27017';
        return new Promise<void>((resolve, reject) => {
            mongodb.connect(databaseURL, (err, db) => {
                if (err) {
                    reject(new Error('db connect error'));
                    return;
                }
    
                console.log('db was connected : ' + databaseURL);
                this.mongoClient = db;
                resolve();
            });
        })

    }

    public getClient(): mongodb.MongoClient {
        return this.mongoClient;
    }

    public getDatabase(dataBaseName: string): mongodb.Db {
        return this.mongoClient.db(dataBaseName);
    }
}

export default new DBAgent();