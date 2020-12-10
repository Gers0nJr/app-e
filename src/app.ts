import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usuarioRoute from './routes/usuario.route'

export class App {
    private express: express.Application;
    private porta = 9000;

    constructor(){
        this.express = express();
        this.middlewares();
        this.database();
        this.routes();
        this.listen();
    }

    public getApp(): express.Application {
        return this.express;
    }

    private listen(): void {
        this.express.listen(this.porta, () => {
            console.log('Servidor iniciado na porta ' + this.porta);
        });
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private database(): void {
        mongoose.connect('mongodb+srv://root:root@cluster0.crv4z.mongodb.net/test?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    }

    private routes(): void {
        this.express.use('/usuarios', usuarioRoute);
    }

     /*private database(): void {
        var mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost:27017/blog');
        var Author = mongoose.model('author', {nome: String, profissao: String});
        var bognar = new Author({nome: 'Bognar', profissao :'Programador'});
        bognar.save(function (err) {
            if (err) throw err;
            console.log('Dados salvos com sucesso!');
        });
    }*/
}