const db = JSON.parse(localStorage.getItem("streamDB")) || { posts: [] };

const container = document.getElementById("posts");

container.innerHTML = db.posts.map(p => `
    <div class="card">
        <h2>${p.title}</h2>
        <p>${p.content}</p>
        <small>${new Date(p.date).toLocaleString()}</small>
    </div>
`).join("");