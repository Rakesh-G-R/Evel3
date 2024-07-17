import { Router } from "express";
import { addBook, deleteBook, getBook, updateBook } from "../controllers/bookControll.js";
import { role } from "../middlewares/role.js";
import fs from 'node:fs';
import { join } from "node:path";
import multer from "multer";
import { io } from '../server.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

export const bookRouter = Router();

bookRouter.get("/book", role(['user', 'Admin']), getBook);
bookRouter.post("/add/book", role(['Admin']), addBook);
bookRouter.patch("/update/book/:id", role(['Admin']), updateBook);
bookRouter.delete("/delete/book/:id", role(['Admin']), deleteBook);

bookRouter.post("/add/file", upload.single('file'), async (req, res) => {
    const filename = req.file.filename; 
    try {
        const filePath = join(process.cwd(), `uploads/${filename}`);
        const readStream = fs.createReadStream(filePath);

        let uploadedSize = 0;
        const totalSize = req.file.size;

        readStream.on('data', (chunk) => {
            uploadedSize += chunk.length;
            io.emit('uploadProgress', { uploadedSize, totalSize });
            res.write(chunk);
        });

        readStream.on('end', () => {
            res.end();
            io.emit('uploadComplete', { filename });
        });
    } catch (err) {
        console.log(err);
    }
});
