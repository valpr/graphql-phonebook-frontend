
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { useQuery,  useApolloClient } from '@apollo/client'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const client = useApolloClient()
  useEffect(()=>{
    if (localStorage.getItem('library-user-token')){
      setToken(localStorage.getItem('library-user-token'))
      setPage('books')
    }
  },[setToken])




  




  if (result.loading || books.loading){
    return <div>loading...</div>
  }

  
  const handleLogout =() => {
    //TODO
    setToken(null)
    setPage('books')
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? 
        <span>
        <button onClick={() => setPage('add')}>add book</button> 
        <button onClick={() => setPage('recommend')}>recommended</button>
        <button onClick={handleLogout}>logout</button>
        </span> 
        :
        <button  onClick={() => setPage('login')}>login</button> }
      </div>

      <Authors
        show={page === 'authors'} authors={result.data.allAuthors}
      />

      <Books
        show={page === 'books'} books= {books.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm setPage={setPage} setToken={setToken} show={page ==='login'} />
      <Recommend token={token}  show={page==='recommend'}/>
      

    </div>
  )
}

export default App