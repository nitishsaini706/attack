const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let users = [];
let posts = [];

const postArticle = (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: posts.length + 1, title, content, authorId: req.user.id, createdAt: new Date() };
    posts.push(newPost);
    res.status(201).json({ message: 'Post created successfully' });
};

const getById = (req, res) => {
    const authorId = parseInt(req.params.authorId);
    const authorPosts = posts.filter(post => post.authorId === authorId);
    res.json(authorPosts);
}

const getAllPost = (req, res) => {
    res.json(posts);
}

const login =  async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(401).json({ message: 'Invalid password' });
    const token = jwt.sign({ id: user.id, email: user.email }, 'nitish');
    res.json({ token });
};


const signup = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, email, passwordHash: hashedPassword };
    users.push(user);
    res.status(201).json({ message: 'User created successfully' });
};

module.exports = {login,signup,getAllPost,getById,postArticle}