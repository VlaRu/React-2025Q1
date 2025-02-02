import { Component } from 'react';
import './App.css';
import { Search } from '../components/search/SearchBar';

class App extends Component {
  render() {
    return (
      <>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <Search />
      </>
    );
  }
}

export default App;
