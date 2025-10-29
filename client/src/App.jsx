import './App.css'
import AppRouter from './router/AppRouter'
import { useAxiosInterceptors } from './api/axios'



function App() {
  useAxiosInterceptors()
  
  return <AppRouter />
}

export default App
