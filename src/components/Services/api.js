import axios from 'axios';

export default async function getImagesApi(query, page) {
  axios.defaults.baseURL = `https://pixabay.com/api/`;
  axios.defaults.params = {
    key: '21988009-297d867560bf729bce41e20bb',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  };

  const { data } = await axios.get('', {
    params: {
      q: query,
      page,
    },
  });

  return data;
}
