import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer'; // Multer is no longer needed if we're not handling files
import { User } from './models/user.models';// Ensure this file exports the User model

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hospital', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Remove multer setup since file uploads are no longer needed

app.post('/api/v1/submit', async (req, res) => {
    try {
        const { name, password, phone, category, filename } = req.body;

        // Create new user entry
        const newUser = new User({
            name,
            password, // Note: Passwords should be hashed before storing in production
            phone,
            category,
            filename
        });

        await newUser.save();

        res.status(201).json({ message: 'User details saved successfully!', data: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving user details.', error });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
