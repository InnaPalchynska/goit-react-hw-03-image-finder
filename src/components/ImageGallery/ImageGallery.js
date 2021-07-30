import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ images, onClick }) {
  return (
    <ul className="ImageGallery">
      {images &&
        images.map(img => (
          <ImageGalleryItem
            key={img.id}
            src={img.webformatURL}
            tags={img.tags}
            onClick={onClick}
          />
        ))}
    </ul>
  );
}

export default ImageGallery;
