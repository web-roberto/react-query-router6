import "./index.css";
import "./App.css";

import {QueryClient,QueryClientProvider} from 'react-query'
import { Route, Routes, BrowserRouter as Router, Link } from "react-router-dom";
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { RQSuperHeroPage } from './components/RQSuperHero.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import { ParallelQueriesPage } from './components/ParallelQueries.page'
import { DynamicParallelPage } from './components/DynamicParallel.page'
import { DependentQueriesPage } from './components/DependentQueries.page'
import { PaginatedQueriesPage } from './components/PaginatedQueries.page'
import { InfiniteQueriesPage } from './components/InfiniteQueries.page'

const queryClient= new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <nav>
        <ul>
          <li> <Link to='/super-heroes'>Superheroes</Link> </li>
          <li> <Link to='/rq-super-heroes'>RQSuperheroes</Link> </li>
          <li> <Link to='/'>Home</Link> </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/super-heroes" element={<SuperHeroesPage/>} />
        <Route path="/rq-super-heroes" element={<RQSuperHeroesPage/>} />
        <Route path='/rq-super-heroes/:heroId' element={ <RQSuperHeroPage />} />
        <Route path='/rq-parallel' element={<ParallelQueriesPage />}/>
        <Route path='/rq-dynamic-parallel' element={ <DynamicParallelPage heroIds={[1, 3]} />} />
        <Route path='/rq-dependent' element={<DependentQueriesPage email='vishwas@example.com' />} />
        <Route path='/rq-paginated' element={<PaginatedQueriesPage />} />
        <Route path='/rq-infinite' element={<InfiniteQueriesPage />}/>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>)
}
export default App;
