import { useState, useEffect } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';
import styles from './styles.module.css'

const CreateNewNote = () => {
    const [form, setForm] = useState({ title: '', description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createNote();
            }
            else {
                alert(errors)
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const createNote = async () => {
        try {
            const res = await fetch('https://notes-app.valeryaleshka.vercel.app//api/notes', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.title) {
            err.title = 'Title is required';
        }
        if (!form.description) {
            err.description = 'Description is required';
        }
        
        return err;
    }

    return (
        <div className={styles.formWraper} >
            <h1 className={styles.header}>Create Note</h1>
            <div>
                {
                    isSubmitting
                        ? <div className={styles.centered}><Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner></div>
                        : <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    required   
                                    maxLength='20'                                  
                                    value={form.title}
                                    onChange={handleChange}
                                    as="textarea"
                                    name='title'
                                    rows={1} />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    required 
                                    maxLength='200'                                
                                    value={form.description}
                                    as="textarea"
                                    onChange={handleChange}
                                    name='description'
                                    rows={3} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Create
                            </Button>
                        </Form>
                }
            </div>
        </div>
    )
}

export default CreateNewNote;