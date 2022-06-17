"use strict";

const root = document.querySelector("#root");
const data = JSON.parse(sessionStorage.getItem("post"));

const display = (post) => {
  return `
    <div class="container mb-3">
          <div class="card">
            <p id="post_id text-center">${post.id}</p>
            <h3 class="card-title">${post.title}</h3> 
            <div class="card-body">${post.body}</div>
            <div class="container d-felx flex-wrap justify-content-around">
                <button class="rounded text-danger"onclick="home(})">Refresh</button>
            </div>
          </div>
        </div>
    `;
};

root.innerHTML = display(data);
