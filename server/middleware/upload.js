import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
    url: 'mongodb+srv://password12345:password12345@cluster0.0yecb.mongodb.net/devdeck',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    file: (req, file) => {
      const match = ['image/png', 'image/jpeg'];
  
      if (match.indexOf(file.mimetype) === -1) {
        return `${Date.now()}-${file.originalname}`;
      }
  
      return {
        bucketName: 'photos',
        filename: `${Date.now()}-${file.originalname}`
      }
    }
  });

  export default multer({ storage });