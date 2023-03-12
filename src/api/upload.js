import axios from 'axios';

export const upload = async (image) => {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', 'owbtxbrk');

  return axios
    .post('https://api.cloudinary.com/v1_1/dgza7cle6/image/upload', data)
    .then(res => res.data.url);
}