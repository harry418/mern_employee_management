//import logo from './logo.svg';
import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployee from './components/ListEmployee';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import AddEmployee from './components/AddEmployee';

function App() {
  return (
    <div>
    <Router>
       <HeaderComponent/>
       <div className='container'>
        <Routes>
          <Route exact path="/" Component={ListEmployee}></Route>
          <Route path="/employees" Component={ListEmployee}></Route>
          <Route path="/add-employee" Component={AddEmployee}></Route>
          <Route path="/edit-employee/:id" Component={AddEmployee}></Route>
        </Routes>
        
       </div>
        
        <FooterComponent/>
      </Router>
    </div>
      
       
  );
}

export default App;
