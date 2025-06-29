import axios from "axios";

export const chatBot = async (req, res) => {
 const { message } = req.body;
 if (!message) {
   return res.status(200).json({ message: "message is required" });
 }
  try {
    const API_URL = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';
    const response = await axios.post(
        API_URL,
        { inputs: message },
        {
            headers: {
                'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                'Content-Type': 'application/json',
        },
    }
);
// console.log(response.data);

    res.status(200).json({ message: response.data });
  } catch (error) {
    console.log("error: ",error);
    return res.status(500).json({ message: "Internal server error", error });
    
  }
};