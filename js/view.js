"use strict";

const root = document.querySelector("#root");
const home = () => (location.href = "index.html");
const data = JSON.parse(sessionStorage.getItem("post"));

const display = (post) => {
  return `
    <div class="container mb-3">
          <div class=" bg-success card py-2">
            <p class="text-danger text-center" id="post_id">${post.id}</p>
            <h3 class="ms-2 card-title text-light">${post.title}</h3> 
            <div class="fw-bold card-body text-primary">${post.body}</div>
            <div class="container d-flex justify-content-end">
                <button class=" me-5 rounded text-danger" onclick="home()">Refresh</button>
            </div>
          </div>
        </div>
    `;
};

root.innerHTML = display(data);
