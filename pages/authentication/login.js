import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import styles from './../styles.module.css'


const Login = () => {

    const [form, setForm] = useState({login: '', password: ''})


    const loginUser = (e) => {        
        e.preventDefault()
        console.log(form)
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className={styles.formWraper}>
            <h1 className={styles.header}>Login Page</h1>
            <Form onSubmit={loginUser}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        onChange={handleChange} 
                        name='login'
                        type="email" 
                        placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        onChange={handleChange} 
                        name='password'
                        type="password" 
                        placeholder="Password" />
                </Form.Group>
              
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Login

