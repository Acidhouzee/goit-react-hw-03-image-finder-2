import React from 'react';
import { Loader } from "components/Loader/Loader";

export class Modal extends React.Component {
    state = {
        loading: true
      };

    handleKeyDown = event => {
        if (event.code === 'Escape') {
        this.props.onClose();
        }
    };

    handleImageLoad = () => {
        this.setState({ loading: false });
    };

    handleOverlayClick = event => {
        if (event.currentTarget === event.target) {
        this.props.onClose();
        }
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        const { imageUrl } = this.props;
        const { loading } = this.state;

        return (
            <div className="overlay" onClick={this.handleOverlayClick}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    {loading && <Loader />}
                    <img src={imageUrl} alt="" onLoad={this.handleImageLoad} />
                </div>
            </div>
        );
    }
}
