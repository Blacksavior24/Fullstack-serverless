import { useRoutes, BrowserRouter } from 'react-router-dom';
import './App.css'
import Home from '../Home';
import Clientes from '../Clientes';

const AppRoutes = ()=>{
  let routes = useRoutes([
    {path: '/', element: <Home />},
    {path: '/clientes', element: <Clientes />},
    
  ])
  return routes;
}

function App() {
  
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
