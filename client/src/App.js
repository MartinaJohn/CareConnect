import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Home from './pages/Home';
import PatientDetails from './pages/PatientDetails';

import { QueryClient, QueryClientProvider } from "react-query";
import store from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

function App() {
  const queryClient = new QueryClient();

  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path='/details' element={<PatientDetails />}/>
            </Routes>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
