import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallary/ImageGallary';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import api from '../api/api';

const App = () => {
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    api
      .fetchImages(query, page)
      .then(images => setImages(prev => [...prev, ...images]))
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [query, page]);

  const onSearchSubmit = newQuery => {
    if (newQuery === query) return;

    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setIsModalOpen(false);
    setIsLoading(true);
  };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
    setIsLoading(true);
  };

  const onHandleClick = largeImage => {
    setIsModalOpen(true);
    setModalImage(largeImage);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Searchbar onSubmit={onSearchSubmit} />
      {images.length > 0 && <ImageGallery images={images} onHandleClick={onHandleClick} />}
      {isModalOpen && <Modal image={modalImage} onCloseModal={onCloseModal} />}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={onLoadMore} />}
    </>
  );
};
export default App;
