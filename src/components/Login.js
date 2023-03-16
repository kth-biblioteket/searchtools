import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import NavBar from "./navBar"
import './Login.css';

const Loader = () => <div>Loading...</div>;

async function loginUser(credentials ){
    return fetch('https://ref.lib.kth.se/ldap/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(response => {
            if (response.ok)
                return response.json()
            else {
                throw new Error(response)
            }
        })
        .catch(error => {
            alert('Login failed');
        });
}

async function getApikeys(token) {
    return fetch('https://ref.lib.kth.se/ldap/api/v1/divamonkey', {
        method: 'POST',
        headers: {
            'x-access-token': token
        }
    })
        .then(response => {
            if (response.ok)
                return response.json()
            else {
                throw new Error(response)
            }
        })
        .catch(error => { alert('Error getting apikeys'); });
}

export default function Login({ setToken }) {
    let [loading, setLoading] = useState(false);
    let [username, setUserName] = useState();
    const [password, setPassword] = useState();
    username = username + '@ug.kth.se';
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const response = await loginUser({
            username,
            password
        });
        if (response) {
            const apikeys = await getApikeys(response.token);
            sessionStorage.setItem('meili', JSON.stringify(apikeys));
            setLoading(false);
            setToken(response);
        } else {
        setLoading(false);
        }
    }

    return (
        <>
            <NavBar />
            <div className="login-wrapper">
                <h1>Logga in</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>KTH-id</Form.Label>
                    <Form.Control type="username" placeholder="Ange KTH-id" onChange={e => setUserName(e.target.value)} />
                    <Form.Label>Lösenord</Form.Label>
                    <Form.Control type="password" placeholder="Ange lösenord" onChange={e => setPassword(e.target.value)} />
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
                {(loading) ? <Loader /> : null}
            </div>
        </>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}