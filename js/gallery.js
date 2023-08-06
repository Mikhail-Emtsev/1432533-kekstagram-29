import { renderThumbnail } from './thumbnail.js';
import { showBigPicture } from './big-picture.js';

const container = document.querySelector('.pictures');

let pictures = [];


const onContainerClick = (evt) => {
  const photo = evt.target.closest('[data-photo-index]');
  if (photo === null) {
    return;
  }
  evt.preventDefault();
  const picture = pictures.find((item) => item.id === +photo.dataset.photoIndex);
  showBigPicture(picture);
};


const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  renderThumbnail(pictures, container);
  container.addEventListener('click', onContainerClick);
};

export { renderGallery };
