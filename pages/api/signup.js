// pages/api/signup.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { username, email, password } = req.body;  
        res.status(200).json({ message: 'User registered successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error registering new user' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  }