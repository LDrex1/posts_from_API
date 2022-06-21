"use strict";

/**
 * WebApp to GET, update(POST), CREATE, and delete data
 *
 */

//main DOM targets
const root = document.querySelector("#root");
const title = document.querySelector("#title");
const body = document.querySelector("#body");
const createBtn = document.querySelector("#create_post");
console.log(root.children);

//
createBtn ? createBtn.addEventListener("click", createPost) : null;

//  url to API
const url = "https://jsonplaceholder.typicode.com/posts";

// geting the posts from the rest API
const getPosts = async () => {
  try {
    const posts = await (await fetch(url)).json();
    console.log(posts);

    //loop to display all the posts
    renderLoop(posts);
    return posts;
  } catch (er) {
    console.log(er.message);
  }
};

//calling getPosts immediately the page loads
document.addEventListener("DOMContentLoaded", getPosts);

//currents post displayed on the page
let currentPost = [];

//viewPost function called whe the 'create Post' button is clicked
const viewPost = async (id) => {
  try {
    if (!currentPost.length) {
      const [post] = await await getPosts().then((posts) =>
        posts.filter((post) => post.id == id)
      );
      sessionStorage.setItem("post", `${JSON.stringify(post)}`);
      window.open("post.html");
    } else {
      const [post] = currentPost.filter((post) => post.id == id);
      console.log(post);
      sessionStorage.setItem("post", `${JSON.stringify(post)}`);
      window.open("post.html");
    }
  } catch (err) {
    console.log(err.message);
  }
};

//createPost function called whe the 'create Post' button is clicked
async function createPost(ev) {
  ev.preventDefault();
  const data = {
    body: body.value,
    title: title.value,
    userId: 2,
  };
  const config = {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    if (!currentPost.length) {
      const nouveau = await (await fetch(url, config)).json();
      console.log(nouveau);
      currentPost = await getPosts().then((posts) => {
        posts.unshift(nouveau);
        return posts;
      });
      renderLoop(currentPost);
    } else {
      data.id = currentPost.length + 1;
      currentPost.unshift(data);
      renderLoop(currentPost);
    }
  } catch (err) {
    console.log(err.message);
  }
}

//updatePost function called whe the 'create Post' button is clicked
const updatePost = async (id) => {
  let updUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const data = {
    id: id,
    body: body.value,
    title: title.value,
    userId: 1,
  };
  const config = {
    method: "PUT",
    headers: { Accept: "applicaton/json", "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    const update = await (await fetch(updUrl, config)).json();
    console.log(update);
    if (!currentPost.length) {
      const newPosts = await getPosts().then((posts) => {
        posts[id - 1] = data;
        console.log(posts);
        currentPost = [...posts];
        return posts;
      });
    }

    currentPost.forEach((post, index) => {
      post.id == id ? (currentPost[index] = data) : null;
    });

    renderLoop(currentPost);
    //
  } catch (err) {
    console.log(err);
  }
};

//deletePost function called whe the 'create Post' button is clicked
const deletePost = async (id) => {
  let delUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;

  const config = {
    method: "DELETE",
  };

  try {
    await (await fetch(delUrl, config)).json();
    if (!currentPost.length) {
      const newPosts = await getPosts().then(
        (posts) => (posts = posts.filter((post) => post.id != id))
      );
      currentPost = [...newPosts];
      console.log(currentPost);
      renderLoop(currentPost);
    } else {
      currentPost = currentPost.filter((post) => post.id != id);
      renderLoop(currentPost);
    }
    //
  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

//For each loop to render to the root
const renderLoop = (postArr) => {
  let displayPosts = "";
  postArr.forEach((element) => {
    displayPosts += display(element);
    root.innerHTML = displayPosts;
  });
};

//DOM render
const display = (post) => {
  return `
  <div class="container mt-0 mb-3">
      <div class="card bg-success pt-1 pb-2">
          <p class="text-danger ms-2" id="post_id">${post.id}</p>
          <h3 class="card-title ms-2 text-primary">${post.title}</h3> 
          <div class="card-body text-light">${post.body}</div>
          <div class="container d-flex flex-wrap justify-content-center">
              <button class="me-2 fw-bold rounded text-primary" style="cursor:pointer;" id="view" onclick="viewPost(${post.id})">View</button>
              <button class="rounded fw-bold text-info" id="update" style="cursor:pointer;" onclick="updatePost(${post.id})">Update</button>
              <button class="ms-2 fw-bold rounded text-danger" style="cursor:pointer;" id="delete" onclick="deletePost(${post.id})">Delete</button>
          </div>
      </div>
  </div>
  `;
};

// export default display;
