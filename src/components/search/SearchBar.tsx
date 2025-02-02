import { Component } from 'react';

type NameData = {
  searchName: string,
  submitName: string,
};

export class Search extends Component<Record<string, never>, NameData> {
  constructor(props: Record<string, never>) {
    super(props);
    const localState = localStorage.getItem('name') || '';
    this.state = {
      searchName: localState || '',
      submitName: localState || '',
    };
  }

  componentDidMount(): void {
    this.setState({ submitName: localStorage.getItem('name') || '' });
  }

  submitSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({
      submitName: this.state.searchName,
    });
    localStorage.setItem('name', this.state.searchName as string);
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      searchName: e.target.value,
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.submitSearch}>
          <input
            placeholder="Search..."
            value={this.state.searchName}
            onChange={this.handleSearchChange}
            className="input-search"
          />
          <input type="submit" value="submit" className="submit-search-btn" />
        </form>
      </>
    );
  }
}
