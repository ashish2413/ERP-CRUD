const db = require('../models/database'); 

// Labour-Specific Operations 

exports.viewTasks = (req, res) => {
    const labourId = req.user.id; 

    db.query(
        'SELECT * FROM Tasks WHERE labour_id = ?',
        [labourId],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        }
    );
};

exports.completeTask = (req, res) => {
    const labourId = req.user.id;
    const { taskId } = req.body;

    db.query(
        'SELECT * FROM Tasks WHERE id = ? AND labour_id = ?',
        [taskId, labourId],
        (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length === 0) return res.status(403).send('Unauthorized or task not found');

            db.query(
                'UPDATE Tasks SET status = "Completed", completed_date = NOW() WHERE id = ?',
                [taskId],
                (err) => {
                    if (err) return res.status(500).send(err);
                    res.send('Task marked as completed');
                }
            );
        }
    );
};

exports.viewAttendance = (req, res) => {
    const labourId = req.user.id;

    db.query(
        'SELECT * FROM Attendance WHERE labour_id = ?',
        [labourId],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        }
    );
};

exports.recordAttendance = (req, res) => {
    const labourId = req.user.id;
    const { inTime, outTime } = req.body;

    db.query(
        'SELECT * FROM Attendance WHERE labour_id = ? AND date = CURDATE()',
        [labourId],
        (err, results) => {
            if (err) return res.status(500).send(err);

            if (results.length > 0) {
                
                db.query(
                    'UPDATE Attendance SET in_time = ?, out_time = ? WHERE labour_id = ? AND date = CURDATE()',
                    [inTime, outTime, labourId],
                    (err) => {
                        if (err) return res.status(500).send(err);
                        res.send('Attendance updated for today');
                    }
                );
            } else {
                
                db.query(
                    'INSERT INTO Attendance (labour_id, date, in_time, out_time) VALUES (?, CURDATE(), ?, ?)',
                    [labourId, inTime, outTime],
                    (err) => {
                        if (err) return res.status(500).send(err);
                        res.send('Attendance recorded for today');
                    }
                );
            }
        }
    );
};
