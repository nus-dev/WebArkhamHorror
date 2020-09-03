import * as express from 'express';

export abstract class Api {
    constructor(protected readonly app: express.Application) {
        this.initApi();
    }

    protected abstract initApi(): void;
}