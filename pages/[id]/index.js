import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Spinner, Button, Card, Modal } from 'react-bootstrap';
import styles from './../styles.module.css'
import MyVerticallyCenteredModal from '../../components/VerticallyCentredModal'

const Note = ({ note }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteNote();
        }
    }, [isDeleting])

    const deleteNoteFromModal = () => {
        setModalShow(false);
        setIsDeleting(true);
    }

    const hideModal = () => {
        setModalShow(false);
    }

    const deleteNote = async () => {
        const noteId = note._id;
        try {
            const deleted = await fetch(`https://notes-app.valeryaleshka.vercel.app//api/notes/${noteId}`, {
                method: "Delete"
            });

            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>  {isDeleting
            ? <div className={styles.centered}><Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner></div>
            :
            <Card className={styles.cardView}>
                <Card.Header><h1>{note.title}</h1></Card.Header>
                <Card.Body>
                    <Card.Text>
                        {note.description}
                    </Card.Text>
                    <Button className={styles.viewButton} variant="primary" onClick={() => router.push(`/${note._id}/edit`)}>Edit</Button>
                    <Button className={styles.viewButton} variant="danger" onClick={() => setModalShow(true)}>Delete</Button>

                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={hideModal}
                        onExiting={deleteNoteFromModal}
                    />
                </Card.Body>
            </Card>
            }
        </>
    )
}




Note.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`https://notes-app.valeryaleshka.vercel.app//api/notes/${id}`);
    const { data } = await res.json();

    return { note: data }
}

export default Note;


/*import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';

 <Button className={styles.viewButton} onClick={handleDelete} variant="dark">Delete</Button>

const Note = ({ note }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteNote();
        }
    }, [isDeleting])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const deleteNote = async () => {
        const noteId = router.query.id;
        try {
            const deleted = await fetch(`https://notes-app.valeryaleshka.vercel.app//api/notes/${noteId}`, {
                method: "Delete"
            });

            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <div className="note-container">
            {isDeleting
                ? <Loader active />
                :
                <>
                    <h1>{note.title}</h1>
                    <p>{note.description}</p>
                    <Button color='red' onClick={open}>Delete</Button>
                </>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
        </div>
    )
}

Note.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`https://notes-app.valeryaleshka.vercel.app//api/notes/${id}`);
    const { data } = await res.json();

    return { note: data }
}

export default Note;*/