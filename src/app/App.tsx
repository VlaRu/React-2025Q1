import './App.css';
import { Search } from '../components/search/SearchBar';
import ErrorButton from '../components/error/ErrorButton';
import { Routes } from 'react-router';
import { Route } from 'react-router';
import ErrorPage from '../components/error/404page';
import { DetailedCard } from '../components/detail/Detail';

function App() {
  return (
    <div className="container">
      <ErrorButton />
      <h1 className="header">Search pokemon!</h1>
      <Routes>
        <Route index path="/" element={<Search />} />
        <Route
          path="/pokemon/:id"
          element={<DetailedCard id={''} handleCloseCard={() => {}} />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
