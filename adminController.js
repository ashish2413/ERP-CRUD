const db = require('../models/database');

// Sales Manager CRUD Operations

exports.createSalesManager = (req, res) => {
    const { username, password } = req.body;
    const role = "SalesManager";

    db.query(
        'INSERT INTO Users (username, password, role) VALUES (?, ?, ?)',
        [username, password, role],
        (err) => {
            if (err) return res.status(500).send(err);
            res.status(201).send('Sales Manager created successfully');
        }
    );
};

exports.getSalesManagers = (req, res) => {
    db.query('SELECT * FROM Users WHERE role = "SalesManager"', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

exports.updateSalesManager = (req, res) => {
    const { id, username, password } = req.body;

    db.query(
        'UPDATE Users SET username = ?, password = ? WHERE id = ? AND role = "SalesManager"',
        [username, password, id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send('Sales Manager updated successfully');
        }
    );
};

exports.deleteSalesManager = (req, res) => {
    const { id } = req.params;

    db.query(
        'DELETE FROM Users WHERE id = ? AND role = "SalesManager"',
        [id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send('Sales Manager deleted successfully');
        }
    );
};

// Labour CRUD Operations 

exports.createLabour = (req, res) => {
    const { username, password, salesManagerId, area } = req.body;
    const role = "Labour";

    db.query(
        'INSERT INTO Users (username, password, role) VALUES (?, ?, ?)',
        [username, password, role],
        (err, result) => {
            if (err) return res.status(500).send(err);

            const userId = result.insertId;

            db.query(
                'INSERT INTO Labours (user_id, sales_manager_id, area) VALUES (?, ?, ?)',
                [userId, salesManagerId, area],
                (err) => {
                    if (err) return res.status(500).send(err);
                    res.status(201).send('Labour created successfully');
                }
            );
        }
    );
};

exports.getLabours = (req, res) => {
    db.query(
        `SELECT Users.id, Users.username, Labours.area, Labours.sales_manager_id 
         FROM Users 
         JOIN Labours ON Users.id = Labours.user_id 
         WHERE Users.role = "Labour"`,
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        }
    );
};

exports.updateLabour = (req, res) => {
    const { userId, username, password, area } = req.body;

    db.query(
        'UPDATE Users SET username = ?, password = ? WHERE id = ? AND role = "Labour"',
        [username, password, userId],
        (err) => {
            if (err) return res.status(500).send(err);

            db.query(
                'UPDATE Labours SET area = ? WHERE user_id = ?',
                [area, userId],
                (err) => {
                    if (err) return res.status(500).send(err);
                    res.send('Labour updated successfully');
                }
            );
        }
    );
};

exports.deleteLabour = (req, res) => {
    const { userId } = req.params;

    db.query(
        'DELETE FROM Users WHERE id = ? AND role = "Labour"',
        [userId],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send('Labour deleted successfully');
        }
    );
};
