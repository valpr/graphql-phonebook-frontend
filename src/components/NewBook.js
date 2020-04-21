import React, { useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'


const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const client = useApolloClient()

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{query: ALL_BOOKS}, {query:ALL_AUTHORS}],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
    update: (store, response) => {
      updateCacheWith(response.data.addBook);
  }
  })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(p => p.title).includes(object.title)
    const dataInStore = client.readQuery({query:ALL_BOOKS})
    if (!includedIn(dataInStore.allBooks, addedBook)){
      client.writeQuery({
        query:ALL_BOOKS,
        data:{
          allBooks: dataInStore.allBooks.concat(addedBook)
        }
      })
    }
  }

  if (!props.show) {
    return null
  }


  const submit = async (event) => {
    event.preventDefault()
    await addBook({
      variables: {
        title, author, published: parseInt(published), genres
      }
    })
    
    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook