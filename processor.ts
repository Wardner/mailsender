import { rejects } from 'assert';
import IReader from './interfaces/IReader'
import IFonosProvider from './interfaces/fonos_privider'
import IEmailSender from './interfaces/IEmailSender'
import {readFileSync} from 'fs'
require('dotenv').config()
export default class Processor{
    private _reader: IReader;
    private _fonosProvider: IFonosProvider;
    private _emailSender:IEmailSender;
    constructor(Reader:IReader,EmailSender: IEmailSender, FonosProvider:IFonosProvider){
        this._reader = Reader;
        this._fonosProvider = FonosProvider;
        this._emailSender = EmailSender;
    }

    async run(file: string): Promise<any> {
        let data = await this._reader.readFile(file);
        for(var i = 0; i < data.length; i++){
            let user = await this.createUser(data[i]);
            if(user){                
                let token = await this._fonosProvider.createToken(user);                
                let emailTemplate = readFileSync('fonos_template.html','utf8');
                emailTemplate = emailTemplate.replace("%account%", user.accessKeyId)
                emailTemplate = emailTemplate.replace('@token', token.accessToken)
                emailTemplate = emailTemplate.replace('@number', data[i].number)
                emailTemplate = emailTemplate.replace('@username', process.env.USERNAMEP)
                emailTemplate = emailTemplate.replace('@password', process.env.PASSWORDP)
                emailTemplate = emailTemplate.replace('@pop', process.env.POP)

                await this._emailSender.send(emailTemplate, user.email, 'Fonos Account')     
            }
        }
    }

    async createUser(user:any): Promise<any>{
        return await this._fonosProvider.createAccount(user);
    }

    async createToken(user:any): Promise<any>{
        return await this._fonosProvider.createToken(user);
    }

}