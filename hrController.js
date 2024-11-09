const db = require('../models/database');

exports.calculateAttendance = (req, res) => {
    const { labourId, month, year } = req.body;
    db.query('SELECT * FROM Attendance WHERE labour_id = ? AND MONTH(date) = ? AND YEAR(date) = ?', [labourId, month, year], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

exports.calculateSalaries = (req, res) => {

    const netSalary = baseSalary - deductions;

    db.query(
        `INSERT INTO Salaries (user_id, month, year, base_salary, total_deductions, net_salary) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, month, year, baseSalary, deductions, netSalary],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send('Salary calculated and saved successfully');
        }
    );
};

exports.viewSalaries = (req, res) => {
    const { userId } = req.params;

    db.query(
        `SELECT * FROM Salaries WHERE user_id = ?`,
        [userId],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        }
    );
};