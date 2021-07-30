import reactDom from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

function Modal({ modalImage, onClick }) {
  return reactDom.createPortal(
    <div className="Overlay" onClick={e => onClick(e)}>
      <div className="Modal">
        <img src={modalImage.src} alt={modalImage.alt} />
      </div>
    </div>,
    modalRoot,
  );
}

export default Modal;
