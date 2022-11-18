import pool from "../conn";

export default function regUser(req, res) {
    if(req.method === 'POST') {
        return new Promise((resolve, reject)=> {
            pool.query("INSERT INTO classes (courseID, userID, className, classDescription) VALUES (?, ?, ?, ?)", [req.body.courseID, req.body.instructorID, req.body.className, req.body.classDescription], (error, results) => {
                if (error) {
                    res.send(error);
                    reject();
                } else {
                    res.json({message: 'Class Created'})
                    resolve();
                }
            })
        })
    }
}