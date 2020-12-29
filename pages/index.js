import { useRouter } from 'next/router'; 
import Head from 'next/head'
import { Card, Button } from 'react-bootstrap'
import styles from '../styles/Home.module.css'

const Index = ({ notes }) => {

  const router = useRouter();

  function render (id){
    router.push(`/${id}`)
  }

  return (
    <div className={styles.cardsConteiner}>
      {notes.map(note => {
        key : note._id
        return (          
          <Card key={note._id} className={styles.cardInner} style={{ width: '18rem' }}>            
            <Card.Body>
              <Card.Title>{note.title}</Card.Title>
              <Card.Text>
               {note.description}
              </Card.Text>
              <Button variant="primary" onClick = {() => render(note._id)}>View</Button>
            </Card.Body>
          </Card>
        )
      })}
    </div>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch('https://notes-app.valeryaleshka.vercel.app/api/notes/')
  const { data } = await res.json()
  return { notes: data }
}

export default Index;
