import Processor from './processor'
import CsvReader from './implementation/csv_reader';
import SmtpEmailSender from './implementation/smtp_email_sender'
import SdkFonosProvider from './implementation/sdk_fonos_provider';

// Handling args
var args = process.argv.slice(2);
//End

let config = {
    auth:{
        user:'raulreyes23ss',
        pass:'anonymousla23@',
    },
    host:'smtp.gmail.com',
    port:587,
    secure:false
}
let _processor = new Processor(new CsvReader(),new SmtpEmailSender(config), new SdkFonosProvider());
_processor.run(args.toString()).then(result =>{
console.log('successful');
}).catch(e =>{
    console.log(e);
});