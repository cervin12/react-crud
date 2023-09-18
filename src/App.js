import './App.css';
import Home from './Home/Home';
import ContentManagement from './ContentManagement/ContentManagement';
import {HashRouter as Router, Routes ,Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/content-management' element={<ContentManagement/>}/>
      </Routes>
      </Router>
    </>
  );
}

export default App;
