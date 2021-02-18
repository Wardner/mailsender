import Processor from './processor'
import CsvReader from './implementation/csv_reader';
import SmtpEmailSender from './implementation/smtp_email_sender'
import SdkFonosProvider from './implementation/sdk_fonos_provider';

require('dotenv').config()
// Handling args
var args = process.argv.slice(2);
//End
let config = {
    auth:{
        user:process.env.AUTH_USER,
        pass:process.env.AUTH_PASS,
    },
    host:process.env.HOST,
    port: parseInt(process.env.PORT),
    secure: Boolean(process.env.SECURE)
}
let _processor = new Processor(new CsvReader(),new SmtpEmailSender(config), new SdkFonosProvider());
_processor.run(args.toString()).then(result =>{
console.log('successful');
}).catch(e =>{
    console.log(e);
});