import React from 'react';

export default class ErrorButton extends React.Component {
  state = {
    isError: false,
  };

  handleClick = () => {
    this.setState({
      isError: true,
    });
  };

  render() {
    if (this.state.isError) {
      throw new Error('The error was occured');
    }
    return (
      <div>
        <button onClick={this.handleClick} className="error-btn">
          Show error
        </button>
      </div>
    );
  }
}
