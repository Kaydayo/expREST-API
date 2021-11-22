import express, {Request, Response, NextFunction} from 'express';
import { getAllAuthors, postAuthors, updateAuthor, getABook  } from '../controller/books.controller';
const router = express.Router();

router.get('/', getAllAuthors)
router.get('/:authorId/book/:bookId', getABook)
router.post('/', postAuthors);
router.put('/:id', updateAuthor)




  
export default router;