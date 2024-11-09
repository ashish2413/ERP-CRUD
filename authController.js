const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models/database');
const { v4: uuidv4 } = require('uuid');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM Users WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { username: user.username, role: user.role, uuid: uuidv4() },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    });
};
