import User from '../interfaces/user';

export default interface IReader{
    readFile(file:string): Promise<any>
}