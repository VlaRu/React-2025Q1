import { Component } from 'react';
import './App.css';
import { Search } from '../components/search/SearchBar';

class App extends Component {
  render() {
    return (
      <main className="main-container">
        <h1 className="header">Search pokemon!</h1>
        <Search />
      </main>
    );
  }
}

export default App;
