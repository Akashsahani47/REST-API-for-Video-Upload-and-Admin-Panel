import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
const usersData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

let users = usersData;

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) return res.status(400).json({ message: 'All fields required' ,sussess:false });

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists',success:false });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now().toString(), username, email, password: hashedPassword, role };

    users.push(newUser);
    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));

    res.json({ message:'User registered successfully',success:true });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error',success:false });
  }
};




export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'User not found',success:false });

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({message:"Login Successful",success:true, token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ msg: 'Internal server error',success:false });
  }
};
