import IEmailSender from '../interfaces/IEmailSender'
const nodemailer = require("nodemailer");

export default class SmtpEmailSender implements IEmailSender{
    transport:any;
    constructor(config:Provider){
        console.log(config);
        
        this.transport = nodemailer.createTransport({
            service:'gmail',
            auth: {
              user: config.auth.user, // generated ethereal user
              pass: config.auth.pass, // generated ethereal password
            }
        })
    }
    async send(body: string, to: string, subject: string) {
        let info = await this.transport.sendMail({
            from: 'raulreyes23ss@gmail.com', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: body, // plain text body
            html: body, // html body
          });
          return info;
    }

}

export interface Provider{
    host: string,
    port: number,
    secure: boolean,
    auth: Auth
}

export interface Auth{
    user:string,
    pass:string
}