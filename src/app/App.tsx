import './App.css';
import { Search } from '../components/search/SearchBar';
import ErrorButton from '../components/error/ErrorButton';

function App() {
  return (
    <div className="container">
      <ErrorButton />
      <h1 className="header">Search pokemon!</h1>
      <Search />
    </div>
  );
}

export default App;
