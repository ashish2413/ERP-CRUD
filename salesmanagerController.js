const db = require('../models/database'); 

exports.createLabour = (req, res) => {
    console.log("createLabour function loaded");

    const { username, password, area } = req.body;
    const salesManagerId = 1;  
    const role = "Labour"; 

    db.query(
        'INSERT INTO Users (username, password, role) VALUES (?, ?, ?)', 
        [username, password, role], 
        (err, result) => {
            if (err) {
                console.error("Error inserting into Users table:", err);
                return res.status(500).send("Error creating labour");
            }

            const userId = result.insertId; 

            db.query(
                'INSERT INTO Labours (user_id, sales_manager_id, area) VALUES (?, ?, ?)', 
                [userId, salesManagerId, area], 
                (err) => {
                    if (err) {
                        console.error("Error inserting into Labours table:", err);
                        return res.status(500).send("Error assigning labour to area");
                    }
                    res.status(201).send('Labour created successfully');
                }
            );
        }
    );
};

exports.getLabours = (req, res) => {
    console.log("getLabours function loaded");

    const salesManagerId = 1; 

    db.query(
        `SELECT Users.id, Users.username, Labours.area, Labours.in_time, Labours.out_time 
         FROM Users 
         JOIN Labours ON Users.id = Labours.user_id 
         WHERE Labours.sales_manager_id = ?`,
        [salesManagerId],
        (err, results) => {
            if (err) {
                console.error("Error retrieving labours:", err);
                return res.status(500).send("Error retrieving labours");
            }
            res.json(results);
        }
    );
};

exports.updateLabour = (req, res) => {
    console.log("updateLabour function loaded");
    const { userId, username, password, area } = req.body;    
    const salesManagerId = 1;  

    db.query(
        'SELECT * FROM Labours WHERE user_id = ? AND sales_manager_id = ?', 
        [userId, salesManagerId], 
        (err, results) => {
            if (err) {
                console.error("Error verifying labour ownership:", err);
                return res.status(500).send("Error updating labour");
            }
            if (results.length === 0) return res.status(403).send('Unauthorized');

            db.query(
                'UPDATE Users SET username = ?, password = ? WHERE id = ?',
                [username, password, userId],
                (err) => {
                    if (err) {
                        console.error("Error updating Users table:", err);
                        return res.status(500).send("Error updating labour details");
                    }

                    db.query(
                        'UPDATE Labours SET area = ? WHERE user_id = ? AND sales_manager_id = ?',
                        [area, userId, salesManagerId],
                        (err) => {
                            if (err) {
                                console.error("Error updating Labours table:", err);
                                return res.status(500).send("Error updating labour area");
                            }
                            res.send('Labour updated successfully');
                        }
                    );
                }
            );
        }
    );
};

exports.deleteLabour = (req, res) => {
    console.log("deleteLabour function loaded");
    const { userId } = req.params;
    const salesManagerId = 1;  

    db.query(
        'SELECT * FROM Labours WHERE user_id = ? AND sales_manager_id = ?', 
        [userId, salesManagerId], 
        (err, results) => {
            if (err) {
                console.error("Error verifying labour ownership:", err);
                return res.status(500).send("Error deleting labour");
            }
            if (results.length === 0) return res.status(403).send('Unauthorized');

            db.query(
                'DELETE FROM Users WHERE id = ?', 
                [userId], 
                (err) => {
                    if (err) {
                        console.error("Error deleting from Users table:", err);
                        return res.status(500).send("Error deleting labour");
                    }
                    res.send('Labour deleted successfully');
                }
            );
        }
    );
};

exports.trackInOutTime = (req, res) => {
    console.log("trackInOutTime function loaded");
    const { userId, inTime, outTime } = req.body;
    const salesManagerId = 1;  

    db.query(
        'SELECT * FROM Labours WHERE user_id = ? AND sales_manager_id = ?', 
        [userId, salesManagerId], 
        (err, results) => {
            if (err) {
                console.error("Error verifying labour ownership:", err);
                return res.status(500).send("Error tracking in/out time");
            }
            if (results.length === 0) return res.status(403).send('Unauthorized');

            db.query(
                'UPDATE Labours SET in_time = ?, out_time = ? WHERE user_id = ?',
                [inTime, outTime, userId],
                (err) => {
                    if (err) {
                        console.error("Error updating in/out time in Labours table:", err);
                        return res.status(500).send("Error updating in/out time");
                    }
                    res.send('In-time and out-time updated successfully');
                }
            );
        }
    );
};
