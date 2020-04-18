  
import React, {useState} from 'react'
// import { ALL_AUTHORS} from '../queries'
import { useMutation } from '@apollo/client'
import { CHANGE_YEAR, ALL_AUTHORS } from '../queries'
import Select from 'react-select'


const Authors = ({show, authors}) => {
  const options = authors.map(a => {
    return {label: a.name, value: a.name}
  })
  const [name, setName] = useState(options[0])
  const [birth, setBirth] = useState('')
  const [changedYear] = useMutation(CHANGE_YEAR)

  if (!show){
    return null
  }

  const handleChange = ({label,value}) => {
    setName({label, value})
  }

  const submit = (event) => {
      event.preventDefault()
      changedYear({
        variables:{
          name: name.value, born:parseInt(birth)
        }, refetchQueries: [{
          query: ALL_AUTHORS
        }]
      })
      

      setName(options[0])
      setBirth('')
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <Select value={name} onChange={handleChange} options={options} />
        <div>
          born
          <input type="text" value={birth} onChange={({ target }) => setBirth(target.value)}/>
        </div>
        <button type="submit">update author</button>
      </form>

    </div>
  )
}

export default Authors
