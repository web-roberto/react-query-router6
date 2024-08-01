import { useQuery } from 'react-query'
import axios from 'axios'

const fetchUserByEmail = email => {
  return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = channelId => {
  return axios.get(`http://localhost:4000/channels/${channelId}`)
}

export const DependentQueriesPage = ({ email }) => {
  const { data: user,isLoading,error,isError, isFetched } = useQuery(['user', email], () => //'query key' compleja
    fetchUserByEmail(email)
  )
  // implementar isLoading, isError ..
  const channelId = user?.data?.channelId //la clave foránea
  useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), 
  {enabled: !!channelId} //si channelId tiene algun valor, habilita la consulta
  )
  return <div>DependentQueries</div>
}
