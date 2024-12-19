// import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayBooks from './pages/DisplayBooks'
import Footer from './components/Footer'
import SideNav from './components/SideNav'

import './App.css'

function App() {


  return (
    <>
      <div className="app">
        <SideNav />
        <div className='main-content'> 
          <DisplayBooks /> 
          </div>
       
        <Footer />
      </div>
      
    </>
  )
}

export default App