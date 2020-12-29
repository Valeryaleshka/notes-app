import { useState, useEffect } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';
import styles from './../styles.module.css'

const EditNote = ({ note }) => {

    const [form, setForm] = useState({ title: note.title, description: note.description });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateNote();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const updateNote = async () => {
        try {
            const res = await fetch(`https://notes-app.valeryaleshka.vercel.app/api/notes/${router.query.id}`, {
                method: 'PUT',
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
        <div className={styles.formWraper}>
            <h1>Update Note</h1>
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
                                    onChange={handleChange}
                                    as="textarea"
                                    value={form.title}
                                    name='title'
                                    rows={1} />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Descriptiom</Form.Label>
                                <Form.Control
                                    required 
                                    as="textarea"
                                    onChange={handleChange}
                                    value={form.description}
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

EditNote.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`https://notes-app.valeryaleshka.vercel.app/api/notes/${id}`);
    const { data } = await res.json();

    return { note: data }
}

export default EditNote;