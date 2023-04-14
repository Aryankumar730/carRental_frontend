import './App.css';
import Header from './Header';
import Home from './Home';
import LoginPage from './LoginPage';
import DataState from './states/DataState';
import SignupBoxAgy from './SignupBoxAgy';
import DataEntry from './DataEntry';
import LoginPageAgy from './LoginPageAgy';
import MoreCars from './MoreCars';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <>
      <DataState>
        <BrowserRouter>

          <div className="App">
            <Routes>
              <Route path="/"
                element={<><Header /> <Home /></>} />
              
              <Route
                path="/customerlogin"
                element={<><Header/><LoginPage/></>}
              />
              <Route
              path="/agencylogin"
              element={<><Header/><LoginPageAgy/></>}
            />
              <Route
                path="/dataentry"
                element={<><Header/><DataEntry/></>}
              />

            <Route
              path="/morecars"
              element={<><Header/><MoreCars/></>}
              />

            </Routes>

          </div>
        </BrowserRouter>
      </DataState>
    </>
  );
}

export default App;
