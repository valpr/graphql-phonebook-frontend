import React, {useEffect, useState} from 'react'
import {ALL_BOOKS, ME} from '../queries'

import { useQuery, useLazyQuery } from '@apollo/client'
const Recommend = (props) => {
    const userGenre = useQuery(ME)
    const bookList = useQuery(ALL_BOOKS)
    const [filteredBooks, setFilteredBooks] = useState (null);
    //book query by favorite Genre (from me query)
    //display books
    //can just query all and filter results residentsleeper
    if (!props.show ){
        return null
    }
    if (userGenre.loading || bookList.loading){
      return <div> loading! </div>
    }
    console.log(userGenre)
    console.log(bookList)

    return (
    <SubRecommend books={bookList.data.allBooks.filter(b => b.genres.includes(userGenre.data.me.favoriteGenre))} genre={userGenre.data.me.favoriteGenre}/>
    )
}

const SubRecommend = (props) => {
  return (
    <div>
        books in your favourite genre {props.genre}
        <table>
    <tbody>
      <tr>
        <th></th>
        <th>
          author
        </th>
        <th>
          published
        </th>
      </tr>
      {props.books.map(a =>
         <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr> 
      )}
    </tbody>
  </table>
    </div>
)
}

export default Recommend