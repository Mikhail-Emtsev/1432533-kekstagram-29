// Модуль загрузки фотографиий

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooserElement = document.querySelector('.img-upload__input');
const uploadPreviewElement = document.querySelector('.img-upload__preview img');
fileChooserElement.addEventListener('change', () => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((value) => fileName.endsWith(value));
  if (matches) {
    uploadPreviewElement.src = URL.createObjectURL(file);
  }
});
