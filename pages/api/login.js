import pool from "./conn"

export default function login(req, res) {
    console.log(req.body.email)

    const userID = pool.query("SELECT userID FROM users WHERE email = ?", [req.body.email], (err, rows, fields)=>{
        res.status(200).json(rows);
        return res.status(200).json(rows)
    })
}
  