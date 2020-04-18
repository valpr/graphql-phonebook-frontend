import { gql } from '@apollo/client';


export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }


`

export const GENRE_BOOKS = gql`
    query getByGenre($genre: String){
        allBooks(genre:$genre){
            title
            author{
                name
            }
            published
        }
        
    }
`

export const ALL_BOOKS = gql`
    query{
        allBooks{
            title
            published
            genres
            author{
                name
                born
            }
        }
    }


`

export const ADD_BOOK = gql`
   mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title
            author{
                name
                born
            }
        }
   } 
`

export const CHANGE_YEAR = gql`
   mutation CHGYear($name: String!, $born: Int!){
        editAuthor(
            name: $name,
            born: $born
        ){
            name
            born
        }
   }
`

export const LOGIN = gql`
   mutation TRY_LOGIN($username: String!, $password: String!){
       login (
           username: $username,
           password: $password
       ){
           value
       }
   }

`

export const ME = gql`
   query getMe{
       me{
           username
           favoriteGenre
       }
   }
`