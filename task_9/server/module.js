const fs = require('fs');
const jsonPosts = fs.readFileSync('./server/data/posts.json');
const photoPosts = JSON.parse(jsonPosts);
photoPosts.forEach(function (item) {
  item.createdAt = new Date(item.createdAt);
});
const my_functions = {
  getPhotoPost: function getPhotoPost(id) {
    return photoPosts.filter(function (value) {
      return value.id === id;
    })[0];
  },
  getPhotoPosts: function getPhotoPosts(skip = 0, top = 10, filterConfig = undefined) {
    let newPhotoPosts = photoPosts;
    if (filterConfig !== undefined) {
      if (filterConfig.author !== undefined && filterConfig.author !== "")
        newPhotoPosts = filtrByAuthor(newPhotoPosts, filterConfig);
      if (filterConfig.createdAt !== undefined) {
        console.log("1");
        newPhotoPosts = filtrByDate(newPhotoPosts, filterConfig);
        console.log("2");
      }
      if (filterConfig.hashtags !== undefined && filterConfig.hashtags !== "")
        newPhotoPosts = filtrByHashtags(newPhotoPosts, filterConfig);
    }
    else
      newPhotoPosts.sort(function (a, b) {
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
    newPhotoPosts = newPhotoPosts.slice(skip, skip + top);
    return newPhotoPosts;
  },
  addPhotoPost: function addPhotoPost(post) {
    if (!validatePhotoPost(post)) {
      return false;
    }
    photoPosts.push(post);
    updateData();
    return true;
  },

  removePhotoPost: function removePhotoPost(id) {
    if (id === undefined) {
      return false;
    }
    let post = getPhotoPost(id);
    const index = photoPosts.indexOf(post);
    if (index === -1)
      return false;
    photoPosts.splice(index, 1);
    updateData();
    return true;
  },
  editPhotoPost: function editPhotoPost(id, post) {
    if (id === undefined || post === undefined || post === null) {
      console.log("-1");
      return false;
    }

    let previousPost = getPhotoPost(id);
    let index = photoPosts.indexOf(previousPost);

    post.id = previousPost.id;
    post.author = previousPost.author;
    post.createdAt = previousPost.createdAt;
    if (post.likes.length === 0) {
      post.likes = previousPost.likes;
    }
    if (post.description === undefined) {
      post.description = previousPost.description;
    }
    if (post.photoLink === undefined)
      post.photoLink = previousPost.photoLink;
    if (post.hashtags === undefined)
      post.hashtags = previousPost.hashtags;
    if (!validatePhotoPost(post))
      return false;
    photoPosts[index] = post;
    updateData();
    return true;
  }


};

function updateData() {
  const newData = JSON.stringify(photoPosts);
  fs.writeFile('./server/data/posts.json', newData, (err) => {
    if (err)
      throw err;
  });
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

function printArray() {
  console.log(photoPosts);
}

function getPhotoPost(id) {
  return photoPosts.filter(function (value) {
    return value.id === id;
  })[0];
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

module.exports = my_functions;
