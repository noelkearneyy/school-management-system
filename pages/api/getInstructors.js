import pool from "./conn";

export default function getInstructors(req, res) {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM users WHERE userTypeID = 2", ((error, rows, fields)=>{
            res.status(200).send(rows);
            resolve();
        }))
    })
}