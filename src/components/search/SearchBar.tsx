import { Component } from 'react';
import FetchData from '../../api/fetchData';
import './Search.css';

type NameData = {
  searchName: string,
  submitName: string
};

export class Search extends Component<Record<string, never>, NameData> {
  constructor(props: Record<string, never>) {
    super(props);
    const localState = localStorage.getItem('name') || '';
    this.state = {
      searchName: localState || '',
      submitName: localState || ''
    };
  }

  componentDidMount(): void {
    this.setState({ submitName: localStorage.getItem('name') || '' });
  }

  submitSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({
      submitName: this.state.searchName
    });
    localStorage.setItem('name', this.state.searchName as string);
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
    this.setState({
      searchName: sanitizedValue
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.submitSearch} className="search-form">
          <input
            placeholder="Search..."
            value={this.state.searchName}
            onChange={this.handleSearchChange}
            className="input-search"
          />
          <input type="submit" value="search" className="submit-search-btn" />
        </form>
        <FetchData query={this.state.submitName.replace(/\s+/g, '')} />
      </>
    );
  }
}
