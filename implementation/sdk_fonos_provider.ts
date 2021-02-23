import IFonosProvider from '../interfaces/fonos_privider';
const Fonos = require('@fonos/sdk')
const userManager = new Fonos.UserManager()
import Auth, { Jwt } from '@fonos/auth'

export default class SdkFonosProvider implements IFonosProvider {
    async createAccount(user: any) {
        try {
            let data = await userManager.createUser({
                firstName: user.name,
                lastName: user.name,
                email: user.email
            });            
            return data;
        } catch (e) {
            console.log(e);
            
        }
    }
    async createToken(user: any) {
        let data = new  Auth(new Jwt());
        let token : any;
        try{
             token = await data.createTokens(user.accessKeyId,'fonos',user.role,'changeit')
        }catch(e){
            console.log(e);
            
        }
        return token;
    }

}