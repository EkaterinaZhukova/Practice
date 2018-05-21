let my_functions = (function () {
  async function getPhotoPosts(skip = 0, top = 10, filterConfig) {
    let newPhotoPosts = await moduleRequestFunctions.getPhotoPosts(skip, top, filterConfig);
    if (filterConfig !== undefined) {
      if (filterConfig.author !== undefined && filterConfig.author !== "")
        newPhotoPosts = filtrByAuthor(newPhotoPosts, filterConfig);
      if (filterConfig.createdAt !== undefined)
        newPhotoPosts = filtrByDate(newPhotoPosts, filterConfig);
      if (filterConfig.hashtags !== undefined && filterConfig.hashtags !== "")
        newPhotoPosts = filtrByHashtags(newPhotoPosts, filterConfig);
    }
    else
      newPhotoPosts.sort(function (a, b) {
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
    newPhotoPosts = newPhotoPosts.slice(skip, skip + top);
    return newPhotoPosts;
  }

  function filtrByAuthor(arr, filterConfig) {
    return arr.filter(function (value) {
      return filterConfig.author === value.author;
    })
  }

  function filtrByDate(arr, filterConfig) {
    return arr.filter(function (value) {
      return filterConfig.createdAt.getTime() >= value.createdAt.getTime();
    })
  }

  function filtrByHashtags(arr, filterConfig) {
    let hash = filterConfig.hashtags.split('#');
    return arr.filter(function (value) {
      return hash.some(function (hash) {
        return value.hashtags.indexOf(hash) >= 0;

      })
    })
  }

  function validatePhotoPost(post) {
    if (post === undefined || post === null) {
      console.log("1");
      return false;
    }
    if (post.id === undefined || post.id === null) {
      console.log("2");
      return false;
    }

    if (post.description === undefined || post.description === null || post.description.length > 255) {
      console.log("3");
      return false;
    }
    if (post.createdAt === undefined || post.createdAt === null || !(post.createdAt instanceof Date)) {
      console.log("4");
      return false;
    }
    if (post.author === undefined || post.author === null || post.author.length === 0) {
      console.log("5");
      return false;
    }
    if (post.photoLink === undefined || post.photoLink === null || post.photoLink.length === 0) {
      console.log("6");
      return false;
    }
    if (post.hashtags === undefined || post.hashtags === null) {
      console.log("7");
      return false;
    }
    if (post.likes === undefined) {
      console.log("8");
      return false;
    }
    return true;
  }

  function addPhotoPost(post) {
    if (!validatePhotoPost(post)) {
      return false;
    }
    moduleRequestFunctions.addPhotoPost(post);
    return true;
  }

  async function removePhotoPost(id) {
    if (id === undefined) {
      return false;
    }
    await moduleRequestFunctions.removePhotoPost(id);
    return true;
  }

  async function editPhotoPost(id, post) {
    if (id === undefined || post === undefined || post === null) {
      console.log("-1");
      return false;
    }

    let previousPost = await moduleRequestFunctions.getPhotoPost(id);

    post.id = previousPost.id;
    post.author = previousPost.author;
    post.createdAt = previousPost.createdAt;
    post.likes = previousPost.likes;
    if (post.description === undefined) {
      post.description = previousPost.description;
    }
    if (post.photoLink === undefined)
      post.photoLink = previousPost.photoLink;
    if (post.hashtags === undefined)
      post.hashtags = previousPost.hashtags;
    if (!validatePhotoPost(post))
      return false;
    await moduleRequestFunctions.editPhotoPost(post);
    return true;
  }

  async function setLike(id, author) {
    if (id === undefined || author === undefined)
      return null;
    let post = await moduleRequestFunctions.getPhotoPost(id);
    if (post.likes.indexOf(author) === -1) {
      post.likes.push(author);
      await moduleRequestFunctions.editPhotoPost(post);
      return true;
    }
    else {
      post.likes.splice(post.likes.indexOf(author), 1);
      await moduleRequestFunctions.editPhotoPost(post);
      return true;
    }
  }

  function printArray() {
    console.log(photoPosts);
  }

  return {
    getPhotoPosts,
    addPhotoPost,
    removePhotoPost,
    editPhotoPost,
    setLike,
  }

})();

function last_id() {

}
