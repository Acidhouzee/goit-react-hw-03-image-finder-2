import React, { Component } from "react";
import { toast } from 'react-toastify';

export class Searchbar extends Component {
    state = {
        formValue: '',
    };

    handleFindImages = evt => {
        this.setState({ formValue: evt.target.value.toLowerCase() });
    }

    hendleSubmit = evt => {
        evt.preventDefault();

        if(this.state.formValue.trim() === '') {
            toast.error('Write key word for search images!')
            return;
        }

        this.props.searchValue(this.state.formValue);

        this.reset();
    }

    reset = () => {
        this.setState({formValue: ''});
    }

    render() {
        return(
            <header className="searchbar">
                <form onSubmit={this.hendleSubmit} className="form">
                    <button type="submit" className="button">
                        <span className="button-label">Search</span>
                    </button>
    
                    <input
                        className="input"
                        type="text"
                        value={this.state.formValue}
                        placeholder="Search images and photos"
                        onChange={this.handleFindImages}
                    />
                </form>
            </header>
        );
    };
}
