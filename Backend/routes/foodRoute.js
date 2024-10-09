import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'
import multer from 'multer'

// Create the food router
const foodRouter = express.Router();

// Set up memory storage for multer (uploads handled in memory)
const storage = new multer.memoryStorage();
const upload = multer({ storage: storage });
const myUploadMiddleware = upload.single("image");

// Middleware function to run multer manually
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Add Food Route
foodRouter.post('/add', async (req, res) => {
  try {
    await runMiddleware(req, res, myUploadMiddleware); // Execute multer upload
    await addFood(req, res); // Call the addFood controller function
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// List Food Route
foodRouter.get('/list', listFood);

// Remove Food Route
foodRouter.post('/remove', removeFood);

export default foodRouter;

// Ensure bodyParser is disabled for this route to allow multer to work
export const config = {
  api: {
    bodyParser: false,
  },
};
