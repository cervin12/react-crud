import './App.css';
import Home from './Home/Home';
import ContentManagement from './ContentManagement/ContentManagement';
import {BrowserRouter, Routes ,Route} from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/content-management' element={<ContentManagement/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
