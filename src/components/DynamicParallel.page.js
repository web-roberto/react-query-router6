import { useQueries } from 'react-query'
import axios from 'axios'

const fetchSuperHero = heroId => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const DynamicParallelPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map(id => {
      return {
        queryKey: ['super-hero', id],
        //array de llamadas a funciones: array de objetos y un campo hace llamada a la
        // misma función pero con el argumento del id del registro a buscar
        queryFn: () => fetchSuperHero(id)
      }
    })
  )

  console.log({ queryResults })
  return <div>Dynamic Parallel Queries</div>
}
