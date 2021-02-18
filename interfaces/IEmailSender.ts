export default interface IEmailSender{
    send(body: string, to:string,subject: string): any;
}