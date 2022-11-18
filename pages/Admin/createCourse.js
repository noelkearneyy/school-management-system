import Head from 'next/head';
import { useState } from 'react';

export default function regUser() {
    const [courseDetails, setCourseDetails] = useState({
        courseName: '',
        courseDescription: '',
        courseCode: '',
        courseLength: '',
    })

    const handleInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setCourseDetails({...courseDetails, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        await fetch('/api/Admin/createCourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseDetails)
        }).then((result)=> {
            setCourseDetails({
                courseName: '',
                courseDescription: '',
                courseCode: '',
                courseLength: '',
            })
        })
    }

    return (
        <div>
        <Head>
            <title>CREATE COURSE</title>
        </Head>
        <main>
            <form method='POST' onSubmit={handleSubmit}>
                <input name='courseName' type='text' value={courseDetails.courseName} onChange={handleInput} placeholder='COURSE NAME' />
                <textarea name='courseDescription' value={courseDetails.courseDescription} onChange={handleInput} placeholder='COURSE DESCRIPTION'></textarea>
                <input name='courseCode' type='text' value={courseDetails.courseCode} onChange={handleInput} placeholder='COURSE CODE'/>
                <input name='courseLength' type='number' value={courseDetails.courseLength} onChange={handleInput} placeholder='COURSE LENGTH' />
                <input type='submit' value='CREATE COURSE' />
            </form>
        </main>
        </div>
    )
}