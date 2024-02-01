import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { createTables } from './db';

export const app = express();
app.use(bodyParser.json());
app.use(cors());

createTables();
if (require.main === module) {
    app.listen(5000, () => {
        console.log('App has started');
    });
}