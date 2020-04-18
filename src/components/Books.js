import React, {useState, useEffect} from 'react'

const Books = ({show, books}) => {
  const [filter, setFilter] = useState(null)
  const [genres, setGenres] = useState([])


  useEffect(()=>{
    if (books){
    books.forEach(
      book => book.genres.forEach(
        genre => {
          if (!genres.find(i =>  i ===genre)){
            setGenres(genres.concat(genre))
          }
        })
    )
  }}, [books, genres])
  if (!show){
    return null
  }

  const genreList = () => {
    return (
      <div>
        {genres.map(genre => <button key={genre} onClick={() =>setFilter(genre)}>{genre}</button>)}
        <button onClick={() =>setFilter(null)}>all genres</button>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>

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
          {books.map(a =>{ return a.genres.find(i => i===filter || filter ===null) ?
             <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr> : null
          })}
        </tbody>
      </table>
      {genreList()}

    </div>
  )
}

export default Books