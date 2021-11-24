import fs from 'fs'
import {IncomingMessage} from 'http';
import path from 'path'
import Joi, { string } from 'joi'


export const validateEntry = (data: author)=> {
    const schema = Joi.object({
        author: Joi.string().required(),
        age: Joi.number().required(),
        address: Joi.string().required(),
        books: Joi.array().required()
    }).unknown();
    return schema.validate(data);
}


export interface author {
    id?: number,
    author: string,
    dateRegistered?: Date,
    age: number;
    address: string,
    books:{[key:string]:string|number}[]
}

export interface books{
    id?: string,
    name: string,
    isPublished: boolean,
    datePublished: Date | null,
    serialNumber: number | null
}

const filepath = path.join(__dirname, "../database.json");

export function readFile(){
    try{
        const data = fs.readFileSync(filepath, "utf8");
        return JSON.parse(data)
    }catch (error){
        return [];
    }
}

export function generateIdsForBooks(booksData: books[]):books[]{
    return booksData.map((book: books, idx)=>{
        return {id: `book${idx+1}`, ...book}

    })
}

export const writeFile = (data: author[]) => {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 4))
}

