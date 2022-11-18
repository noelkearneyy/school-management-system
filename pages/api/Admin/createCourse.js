import pool from "../conn";

export default async function createCourse(req, res) {

    if (req.method === 'POST') {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO courses (courseName, courseDescription, courseCode, courseLength) VALUES (?, ?, ?, ?)", [req.body.courseName, req.body.courseDescription, req.body.courseCode, req.body.courseLength], (error, results) => {
                if (error) {
                    res.send(error);
                    reject();
                } else {
                    res.json({message: 'Course Created'});
                    resolve();
                }
            })
        })
    }
}