function ImageGalleryItem({ key, src, tags, onClick }) {
  return (
    <li className="ImageGalleryItem" key={key}>
      <img
        src={src}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={e => onClick(e.currentTarget)}
      />
    </li>
  );
}

export default ImageGalleryItem;
