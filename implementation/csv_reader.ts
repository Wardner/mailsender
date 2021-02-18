import IReader from "../interfaces/IReader";
const neatCsv = require('neat-csv');
import {readFileSync} from 'fs'

export default class CSVReader implements IReader{
    async readFile(file: string): Promise<any> {
      let data = await readFileSync(file);
      return await neatCsv(data);
    }

}

