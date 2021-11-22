import express, {Request, Response, NextFunction, json} from 'express';
import { readFile, writeFile, author } from '../utils/utils';
import { generateIdsForBooks } from '../utils/utils';


const control = express()

export const getAllAuthors = (req:Request, res:Response, next: NextFunction)=>{
    const data = readFile();
    res.status(200).json({message: "status", data})
}

export const getABook = (req: Request, res: Response, next:NextFunction)=>{
    const data = readFile();
    const authorData = data.find((item: author)=> `${item.id}` == req.params.Id);
    if(!authorData){
        return res.status(404).json({message: `author with the id ${req.params.bookId} not found`})
    }
    const bookData = authorData.books.find((item:author)=> `${item.id}` === req.params.bookId)
    if(!bookData){
        return res.status(404).json({message: `book with the id ${req.params.bookId} not found`})
    }
    res.status(200).json({message: "success", data: bookData})
} 

export const postAuthors = (req: Request, res: Response)=>{
    const data = readFile();
    const newAuthor = {...req.body, books: generateIdsForBooks(req.body.books)} //dont understand
    const newData = {id: data.length + 1, dateRegistered:new Date().getTime(), ...newAuthor};

    const allNewData = [...data, newData];

    writeFile(allNewData);

    res.status(201).json({message: "creates new book", data: newData})
}

export const updateAuthor = (req: Request, res:Response, next:NextFunction) => {
    const data = readFile();
    const dataToUpdate = data.find((item: {item:author, id:number}) => `${item.id}` === req.params.id)
    if(!dataToUpdate){
        return res.status(404).json({message: "does not exist"})
    }
    const newData = {...dataToUpdate, ...req.body};
    const dataIndex = data.findIndex((item:{id:number}) => `${item.id}` === req.params.id)
    data.splice(dataIndex, 1, newData);
    writeFile(data);
    res.status(201).json({message: "creates new author", data: newData})
}






