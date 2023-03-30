
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Show from './components/Show';




function App() {

  
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Show></Show>}></Route>
       
      </Routes>
    </div>
  );
}

export default App;
