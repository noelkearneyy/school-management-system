import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function createClass() {
    const [classDetails, setClassDetails] = useState({
        className: '',
        classDescription: '',
        classCode: '',
        instructorID: '',
        courseID: '',
    });
    const [instructors, setInstructors] = useState([]);
    const [courses, setCourses] = useState([]);

    const handleInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setClassDetails({...classDetails, [name]:value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch('/api/Admin/createClass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(classDetails)
        }).then((result)=>{
            setClassDetails({
                className: '',
                classDescription: '',
                classCode: '',
                instructorID: '',
                courseID: '',
            })
        })
    }

    useEffect(()=>{
        const getInstructors = async () => {
            const res = await fetch('/api/getInstructors');
            const data = await res.json();
            return data;
        }
        getInstructors().then((results)=>setInstructors(results))
        
        const getCourses = async () => {
            const res = await fetch('/api/getCourses');
            const data = await res.json();
            return data;
        }
        getCourses().then((results)=>setCourses(results))

    }, [])

    return (
        <div>
        <Head>
            <title>CREATE CLASS</title>
        </Head>
        <main>
            <form method='POST' onSubmit={handleSubmit}>
                <input name='className' type='text' value={classDetails.className} onChange={handleInput} placeholder='CLASS NAME' />
                <textarea name='classDescription' value={classDetails.classDescription} onChange={handleInput} placeholder='CLASS DESCRIPTION'></textarea>
                <input name='classCode' type='text' value={classDetails.classCode} onChange={handleInput} placeholder='CLASS CODE'/>
                
                <select name='courseID' onChange={handleInput} value={classDetails.courseID}>
                <option>--Please choose a Course--</option>
                {
                    courses.map((i)=> {
                        return (
                    <option key={i.courseID} value={i.courseID}>{i.courseCode}-{i.courseName}</option>
                        )
                })
                }
                </select>

                <select name='instructorID' onChange={handleInput} value={classDetails.instructorID}>
                <option>--Please choose an Instructor--</option>
                {
                    instructors.map((i, index)=> {
                        return (
                    <option key={index} value={i.userID}>{i.forename} {i.surname}</option>
                        )
                })
                }
                </select>
                <input type='submit' value='CREATE CLASS' />
            </form>
        </main>
        </div>
    )
}