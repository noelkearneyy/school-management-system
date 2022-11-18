import pool from "./conn";

export default function getCourses(req, res) {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM courses", ((error, rows, fields)=>{
            res.status(200).send(rows);
            resolve();
        }))
    })
}