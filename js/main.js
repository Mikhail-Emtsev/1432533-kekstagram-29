import { getData, showAlert } from './create-api.js';
import { renderGallery } from './gallery.js';
import { submitUserPhoto } from './formupload.js';
import { filtergGallery } from './filter.js';
import './photos.js';

getData()
  .then((usersPhoto) => {
    renderGallery(usersPhoto);
    filtergGallery(usersPhoto);
  })
  .catch((err) => {
    showAlert(err.message);
  });

submitUserPhoto();
