import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios'


const genAI = new GoogleGenerativeAI("AIzaSyAYyV5s7yoAFEm9lYGV8g_XT5MO-d4PiaY");
const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export const chatbotController = async (req, res) => {
    const userInput = req.body.prompt;

    try {
        const response = await axios.get("http://localhost:4000/hospitals");

        // Extract relevant fields from each hospital and stringify the data
        const extractedHospitals = response.data
            .filter(hospital => hospital.hospitalname)  
            .map(hospital => ({
                hospitalname: hospital.hospitalname,
                address: hospital.address,
                doctors: hospital.doctors
            }));

        // Stringify the extracted hospital data
        const hospitalDataString = JSON.stringify(extractedHospitals);
        



        const promptWithContext = `
        You are a chatbot with access to the following hospital data. Use this data to answer questions related to hospitals, doctors, and their specialties. 
        If the user's query is unrelated to this data, respond as a general AI chatbot. Here is the hospital data:
        
        [Your hospital data here is at :- ${hospitalDataString}]

        User input: ${userInput}`;

        // Generate AI response
        const result = await model.generateContent(promptWithContext);
        const aiResponse = result.response.text();



        // Send JSON response
        res.json({ user: userInput, ai: aiResponse });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).send('Error generating content.');
    }
};