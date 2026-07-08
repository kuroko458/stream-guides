// ===============================
// REAL LOCAL CMS ADMIN
// ===============================

let db = JSON.parse(localStorage.getItem("streamDB")) || {
    youtubeRPM: 1.5,
    twitchRPM: 1.2,
    kickRPM: 2.5,
    locoRPM: 0.8,
    posts: []
};


// LOGIN
function loginAdmin() {

    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    auth.signInWithEmailAndPassword(email, pass)
        .then(() => {
            document.getElementById("dashboard").style.display = "block";
            document.getElementById("loginStatus").innerText = "Logged in";
        })
        .catch(err => {
            document.getElementById("loginStatus").innerText = err.message;
        });

}

// LOAD EDITOR UI
function loadEditor() {

    document.getElementById("dashboard").innerHTML = `
        <div class="card">
            <h2>Edit Earnings (RPM)</h2>

            <label>YouTube</label>
            <input id="yt" value="${db.youtubeRPM}">

            <label>Twitch</label>
            <input id="tw" value="${db.twitchRPM}">

            <label>Kick</label>
            <input id="kk" value="${db.kickRPM}">

            <label>Loco</label>
            <input id="lc" value="${db.locoRPM}">

            <button class="btn" onclick="saveCMS()">Save</button>
        </div>

        <div class="card">
            <h2>OBS Preset Export</h2>
            <button class="btn" onclick="exportOBS()">Download OBS JSON</button>
        </div>

        <div class="card">
            <h2>Blog Post</h2>
            <input id="title" placeholder="Title">
            <textarea id="content" placeholder="Content"></textarea>
            <button class="btn" onclick="addPost()">Add Post</button>
        </div>
    `;

}

// SAVE CMS
function saveCMS() {

    db.collection("settings").doc("rpm").set({
        youtube: parseFloat(document.getElementById("yt").value),
        twitch: parseFloat(document.getElementById("tw").value),
        kick: parseFloat(document.getElementById("kk").value),
        loco: parseFloat(document.getElementById("lc").value)
    });

}

// EXPORT OBS PRESET
function exportOBS() {

    const preset = {
        encoder: "NVENC AV1",
        bitrate: 8000,
        resolution: "1920x1080",
        fps: 60,
        keyframe: 2
    };

    const blob = new Blob([JSON.stringify(preset, null, 2)], {
        type: "application/json"
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "obs-preset.json";
    a.click();

}

// BLOG SYSTEM
function addPost() {

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    db.posts.push({ title, content, date: new Date().toISOString() });

    localStorage.setItem("streamDB", JSON.stringify(db));

    alert("Post added!");
}

function analytics() {

    const data = JSON.parse(localStorage.getItem("streamDB"));

    return {
        totalPosts: data.posts.length,
        avgRPM: (data.youtubeRPM + data.twitchRPM + data.kickRPM + data.locoRPM) / 4
    };

}