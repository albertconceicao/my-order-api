import express from 'express';
import http from 'node:http';
import mongoose from 'mongoose';
import path from 'node:path';
// import cors from 'cors';
import ip from 'ip';
import { Server } from 'socket.io';

import { router } from './router';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect('mongodb://localhost:27017')
    .then(() => {
        const port = 3002;
        console.log(ip.address());





        // app.use(cors());
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');//Url que está autorizada a acessar a API
            res.setHeader('Access-Control-Allow-Methods', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');

            next();//Faz com que a API não finalize a request nesse ponto
        });
        app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
        app.use(express.json());
        app.use(router);

        server.listen(port, () => {
            console.log(`🔥Server is running on http://localhost:${port}`);
        });
    })
    .catch(() => console.log('Erro ao conectar no mongodb'));


