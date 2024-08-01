import { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchColors = pageNumber => {
  //tabla 'colors', tamaño página '_limit=2', nºpagina '_page=${pageNumber} y un '&'
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
}

export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ['colors', pageNumber], //una 'query key' compuesta para cada página. Sólo se ejecuta una a la vez 
    () => fetchColors(pageNumber),
    {
      //conserva la última búsqueda aunque cambie el 'query key' para que no se muestre el 'loading'
      // hace una búsqueda en background y se activa el isFetching indicando 'loading en background' 
      keepPreviousData: true 
    }
  )
  if (isLoading) { return <h2>Loading...</h2>}
  if (isError) {return <h2>{error.message}</h2>}
  return (
    <>
      <div>
        {data?.data.map(color => {
          return (
            <div key={color.id}>
              <h2>
                {color.id}. {color.label}
              </h2>
            </div>
          )
        })}
      </div>
      <div>
        <button onClick={() => setPageNumber(page => page - 1)} disabled={pageNumber === 1}>
          Prev Page
        </button>
        <button onClick={() => setPageNumber(page => page + 1)} disabled={pageNumber === 4}>
          Next Page
        </button>
      </div>
      {isFetching && 'Loading'} //cuando se busca en background
    </>
  )
}
