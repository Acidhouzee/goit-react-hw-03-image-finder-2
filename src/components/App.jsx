import React, { Component } from "react";
import { API_URL } from "components/API/api";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export class App extends Component {
  state = {
    formValue: '',
    images: [],
    imageLarge: '',
    loading: false,
    error: null,
    page: 1,
    totalPages: 0,
    modalImageUrl: '',
  };

  handleFormSubmit = async (formValue) => {
    this.setState( { formValue,  images: []})
  }

  handleLoadMore = () => {
    const { page, totalPages } = this.state;
    if (page < totalPages) {
      this.setState((prevState) => ({ page: prevState.page + 1 }));
    }
  };

  handleLargeImage = (imageUrl) => {
    this.setState({ modalImageUrl: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ modalImageUrl: '' });
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if( prevState.formValue !== this.state.formValue || prevState.page !== this.state.page) {
      this.fetchImages(); 
    }
  }

  fetchImages = async () => {

    const { formValue, page } = this.state;

    if (!formValue) return;

    this.setState({ loading: true, error: null });

    try {
      const response = await axios.get(API_URL, {
        params: {
          q: formValue,
          page,
        },
      });
      if (response.data.hits.length === 0) {
        throw toast.error(`No results for "${formValue}".`);
      }

      this.setState((prevState) => ({
        images: [...prevState.images, ...response.data.hits],
        totalPages: Math.ceil(response.data.totalHits / 15),
      }));
    } catch(error) {
      this.setState({ error: error.message });
      toast.error(error.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  

  render() {
    const {images, loading, page, totalPages, modalImageUrl} = this.state;
    return (
      <div>
        <Searchbar searchValue={this.handleFormSubmit} />

        <ImageGallery images={images} onItemClick={this.handleLargeImage}/>
        
        {loading && <Loader />}

        {!loading && images.length > 0 && page < totalPages && (
          <Button onClick={this.handleLoadMore} />
        )}

        {modalImageUrl && (
          <Modal imageUrl={modalImageUrl} onClose={this.handleCloseModal} />
        )}

        <ToastContainer autoClose={5000} theme="dark"/>
      </div>
    );
  }
};
