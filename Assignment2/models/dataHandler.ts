import { User } from './user';
import fs from 'fs';
import path from 'path';

const filepath = path.join(__dirname, "../data/users.json");

const readData = () : User[] => { // read the data in users.json file
    try{
        const data = fs.readFileSync(filepath, 'utf-8');
        return JSON.parse(data);
    }
    catch(e){
        return [];
    }
};

const writeData = (data: User[]): void => { // write the data in users.json file
    fs.writeFileSync(filepath, JSON.stringify(data,null,2));
};

export { readData, writeData };