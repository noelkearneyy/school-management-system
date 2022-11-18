import pool from "./conn"

export default function getUserTypes(req, res) {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM userTypes", (err, rows, fields)=>{
            res.status(200).send(rows);
            resolve();
        })
    })
    
}
  