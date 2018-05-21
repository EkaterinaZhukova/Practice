const moduleRequestFunctions = (function requestFunctions() {
  function parseDate(key, value) {
    if (key === 'createdAt' && typeof value === 'string') {
      return new Date(value);
    }
    return value;
  }

  const getPhotoPost = function getPhotoPost(id) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `/getPhotoPost/?id=${id}`, true);

      xhr.onreadystatechange = function onreadystatechange() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
          reject(new Error('Invalid query'));
        }

        resolve(JSON.parse(xhr.responseText, parseDate));
      };

      xhr.send();
    });
  };

  const getPhotoPosts = function getPhotoPosts(skip, top, filterConfig) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `/getPhotoPosts/?skip=${skip}&top=${top}`, true);
      xhr.setRequestHeader('Content-type', 'application/json');

      xhr.onreadystatechange = function onreadystatechange() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
          reject(new Error('Invalid query'));
        }

        resolve(JSON.parse(xhr.responseText, parseDate));
      };

      xhr.send(JSON.stringify(filterConfig));
    });
  };

  const addPhotoPost = function addPhotoPost(photoPost) {
    return new Promise(((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/addPhotoPost', true);
      xhr.setRequestHeader('Content-type', 'application/json');

      xhr.onreadystatechange = function onreadystatechange() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
          reject(new Error('Invalid query'));
        }
        resolve(true);
      };

      xhr.send(JSON.stringify(photoPost));
    }));
  };

  const removePhotoPost = function removePhotoPost(id) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', `/removePhotoPost/?id=${id}`, true);

      xhr.onreadystatechange = function onreadystatechange() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
          reject(new Error('Invalid query'));
        }
        resolve(true);
      };

      xhr.send();
    });
  };

  const editPhotoPost = function editPhotoPost(photoPost) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', `/editPhotoPost/?id=${photoPost.id}`, true);
      xhr.setRequestHeader('Content-type', 'application/json');

      xhr.onreadystatechange = function onreadystatechange() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
          reject(new Error('Invalid query'));
        }
        resolve(true);
      };

      xhr.send(JSON.stringify(photoPost));
    });
  };

  return {
    getPhotoPost,
    removePhotoPost,
    addPhotoPost,
    editPhotoPost,
    getPhotoPosts,
  };
}());
