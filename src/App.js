import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Admin/Login';
import Questions from './components/Questions/Questions';
import Abc from './components/Admin/Abc';
import Course from './components/Course/Course';
import Deshbord from './components/Deshbord/Deshbord';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>
      <Routes>
        {/* <Route path='/*' element={<Home/>}> */}
          <Route path='abc' element={<Abc/>}></Route>
          <Route path='deshbord' element={<Deshbord/>}></Route>

        {/* </Route> */}
        <Route path='/AdminLogin' element={<Login />}></Route>      
        <Route path='/questions' element={<Questions />}></Route>  
        <Route path='/Course' element={<Course />}></Route>      



      </Routes>
    </>
  );
}
export default App;