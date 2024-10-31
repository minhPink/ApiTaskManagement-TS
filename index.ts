import express, { Express } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';
import * as database from "./config/database";
import mainV1Routes from "./api/v1/routes/index.route";

dotenv.config();

database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(cors());

// parse application/json
app.use(bodyParser.json());
// Sử dụng body-parser để xử lý các yêu cầu HTTP có payload URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

mainV1Routes(app);

app.listen(port, () => {
    console.log('App listening on port 3000');
})