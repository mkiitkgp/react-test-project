import { BrowserRouter as Router  , Routes  , Route } from 'react-router-dom';
import './App.css';
import CustomerBooking from './components/CustomerBooking.js';
import ErrorPage from './components/ErrorPage';
import Navbar from './components/Navbar';
import OperatorList from './components/OperatorList';
import ServiceOperatorBookings from './components/ServiceOperatorBookings';
import SingleOperatorPage from './components/SingleOperatorPage';

function App() {
  return (
    //<div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={< OperatorList/>} />
          <Route path="/history" element={ <CustomerBooking />} /> 
          <Route path="/bookings" element={ <ServiceOperatorBookings />} />
          <Route path="/operators" element={<OperatorList />} />
          <Route path="/operators/:operatorId" element={<SingleOperatorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      
    //</div>
  );
}

export default App;
