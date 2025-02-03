import { Component } from 'react';
import './App.css';
import { Search } from '../components/search/SearchBar';
import ErrorButton from '../components/error/ErrorButton';

class App extends Component {
  render() {
    return (
      <div className="container">
        <ErrorButton />
        <h1 className="header">Search pokemon!</h1>
        <Search />
      </div>
    );
  }
}

export default App;
