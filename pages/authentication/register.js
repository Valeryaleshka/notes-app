import { Form, Button } from "react-bootstrap"
import styles from './../styles.module.css'


const Register = () => {




    const registerUser = (e) => {
        e.preventDefault();
        console.log("gygygyg")
    }

    return (
        <div className={styles.formWraper}>
            <h1 className={styles.header}>Register Page</h1>
            <Form onSubmit={registerUser}>

                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" />
                    
                </Form.Group>     

                 <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>                         

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>  

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Register