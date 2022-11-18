import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function regUser() {
    const [userTypes, setUserTypes] = useState([]);
    const [regUserInfo, setRegUserInfo] = useState({
        forename: '',
        surname: '',
        dob: '',
        gender: '',
        mobile: '',
        userType: '',
        email: '',
        password: '',
        rePassword: '',
    })

    useEffect(()=>{
        const getUserTypes = async () =>{
            const res = await fetch('/api/getUserTypes');
            const data = await res.json(); 
            return data;
        } 
        getUserTypes().then((i)=>setUserTypes(i)) 
    },[])
    
    const handleInputChange = (event) => {
        let inputField = event.target.name;
        let value = event.target.value;

        setRegUserInfo({...regUserInfo, [inputField]: value})
    }

    const handleRegUser = async (event) => {
        event.preventDefault();

    if(regUserInfo.password !== regUserInfo.rePassword) {
            console.log('Passwords not the same.')
        } else {
            await fetch('/api/regUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(regUserInfo)
            }).then((result) => {
                setRegUserInfo({
                    forename: '',
                    surname: '',
                    dob: '',
                    gender: '',
                    mobile: '',
                    userType: '',
                    email: '',
                    password: '',
                    rePassword: '',
                })
            })
        }

        
    }

    return (
        <div>
        <Head>
            <title>CREATE USER</title>
        </Head>
        <main>
                
            <form method='POST' onSubmit={handleRegUser}>
                <input name='forename' type='text' onChange={handleInputChange} value={regUserInfo.forename} placeholder='FORENAME' />
                <input name='surname' type='text' onChange={handleInputChange} value={regUserInfo.surname} placeholder='SURNAME' />
                <input name='dob' type='date' onChange={handleInputChange} value={regUserInfo.dob}/>
                <select name='gender' id='gender-select' onChange={handleInputChange} value={regUserInfo.gender}>
                    <option value=''>--Please choose an option--</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                </select>
                <input name='mobile' type='text' placeholder='MOBILE' onChange={handleInputChange} value={regUserInfo.mobile} />
                <select name='userType' onChange={handleInputChange} value={regUserInfo.userType}>
                    <option value=''>--Please choose an option--</option>
                    {
                    userTypes.map((i) => {
                        return (<option key={i.userTypeID} value={i.userTypeID}>{i.userType}</option>)
                    })
                }
                </select>
                <input name='email' type='email' placeholder='EMAIL' onChange={handleInputChange} value={regUserInfo.email} />
                <input name='password' type='password' placeholder='PASSWORD' onChange={handleInputChange} value={regUserInfo.password} />
                <input name='rePassword' type='password' placeholder='RETYPE PASSWORD' onChange={handleInputChange} value={regUserInfo.rePassword} />
                <input type='submit' value='CREATE USER' />
            </form>
        </main>

        </div>
    )
}