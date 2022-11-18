import pool from "./conn";
const bcrypt = require('bcrypt');

export default async function regUser(req, res) {
    
    if (req.method === 'POST') {
        const saltRounds = 10;
        const hashPwd = await bcrypt.hash(req.body.password, saltRounds)
        return new Promise((resolve, reject) => {
        pool.query("INSERT INTO users (forename, surname, dob, gender, mobile, userTypeID, email, salt) VALUES (?,?,?,?,?,?,?,?)", [req.body.forename, req.body.surname, req.body.dob, req.body.gender, req.body.mobile, req.body.userType, req.body.email, hashPwd], (error, results) => {
            if (error) {
                res.send(error);
                reject();
            } else {
                res.json({message: 'User Created'});
                resolve();
            }
        })
    })
}
    // else not POST
}