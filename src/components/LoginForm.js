import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = (props) =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [tryLogin] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        } //somehow use token 
    })
    

    if (!props.show){
        return null
    }



    const handleLogin = async (event) => {
        event.preventDefault()
        //login with mutation
        const response = await tryLogin({
            variables:{
                username, password
            }
        })
        if (response){
            const token = response.data.login.value
            props.setToken(token)
            localStorage.setItem('library-user-token', token)
            props.setPage('authors')
        }


        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                username: 
                <input onChange={({target})=> setUsername(target.value)} value={username} type="text" /> <br/>
                password: 
                <input onChange={({target}) => setPassword(target.value)} value={password} type="text" /> <br/>
                <button onClick={props.relog} type="submit">
                    Login
                </button>
            </form>

        </div>
    )
}

export default LoginForm