import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/modal/Modal';

const apiKey = '21988009-297d867560bf729bce41e20bb';
class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loader: false,
    openModal: false,
    modalImage: '',
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ images: [], page: 1 });
      this.getImages();
    }
    if (prevState.page !== this.state.page) {
      this.getImages();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleAddQuery = q => {
    this.setState(q);
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.toggleModal();
    }
  };

  getImages() {
    this.setState({ loader: true });
    let url = `https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;
    axios
      .get(url)
      .then(res => res.data)
      .then(data =>
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
        })),
      )
      .finally(() => {
        this.setState({ loader: false });
        this.smoothScroll();
      });
  }

  toNextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  smoothScroll() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  toggleModal() {
    this.setState({ openModal: !this.state.openModal });
  }

  handleOnClick = e => {
    this.setState({ modalImage: e });
    this.toggleModal();
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.toggleModal();
    }
  };

  render() {
    const images = this.state.images;
    const { modalImage, openModal, loader } = this.state;

    return (
      <>
        {loader && (
          <Loader type="Bars" color="#3f51b5" height={80} width={80} />
        )}
        <Searchbar onSubmit={this.handleAddQuery} />
        {images && (
          <ImageGallery images={images} onClick={this.handleOnClick} />
        )}
        {images.length > 0 && <Button onClick={this.toNextPage} />}
        {openModal && (
          <Modal onClick={this.handleBackdropClick} modalImage={modalImage} />
        )}
      </>
    );
  }
}

export default App;
