import { Component } from 'react';
import './App.css';
import { Search } from '../components/search/SearchBar';
import ErrorButton from '../components/error/ErrorButton';

class App extends Component {
  render() {
    return (
      <main className="main-container">
        <ErrorButton />
        <h1 className="header">Search pokemon!</h1>
        <Search />
      </main>
    );
  }
}

export default App;
