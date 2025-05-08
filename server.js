import dotenv from 'dotenv';
dotenv.config();  
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import adminRoutes from './routes/adminRoutes.js';


const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/admin', adminRoutes);


app.use('/',(req,res)=>{
 res.json({message:"Api is working"})
})



const port = process.env.PORT || 3000;  
app.listen(port, () => console.log(`Server running on port ${port}`));
