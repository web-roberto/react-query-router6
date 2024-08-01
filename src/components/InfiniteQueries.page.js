import { Fragment } from 'react'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

export const InfiniteQueriesPage = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery(['colors'], fetchColors, {
    getNextPageParam: (_lastPage, pages) => { //no uso el _lastPage
      //pageParamss es el nº de grupos o páginas del tamaño de la ventana mostradas
      //pages es el contenido de esas pageParams páginas o grupos ya mostrados
      if (pages.length < 4) {
        return pages.length + 1
      } else {
        return undefined
      }
    }
  })

  if (isLoading) { return <h2>Loading...</h2>}
  if (isError) { return <h2>{error.message}</h2>}

  return (
    <>
      <div>
        {data?.pages.map((group, i) => { //useInfiniteQuery usa 'pages' en lugar del 'data' de useQuery
          //group: el grupo de elementos a mostrar (lo que cabe en la ventana)
          return (
            <Fragment key={i}>
              {group.data.map(color => (
                <h2 key={color.id}>
                  {color.id} {color.label}
                </h2>
              ))}
            </Fragment>
          )
        })}
      </div>
      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}
