/* =========================================
   Stream Guides
   Secure Admin Panel
========================================= */

"use strict";


/* =========================================
   Admin Configuration
========================================= */

/*
IMPORTANT

After Firebase Authentication is configured,
put YOUR Firebase Authentication UID here.

Example:

const ALLOWED_ADMIN_UIDS = [
    "abc123FirebaseUserUID"
];

Do NOT put your password here.
*/

const ALLOWED_ADMIN_UIDS = [

    "NfC8MzqzH8fr9rDH7w88rg3h5Th1"

];


/* =========================================
   Elements
========================================= */

const loginSection =
document.getElementById("loginSection");

const dashboard =
document.getElementById("dashboard");

const editorSection =
document.getElementById("editorSection");

const adminLoginForm =
document.getElementById("adminLoginForm");

const adminEmail =
document.getElementById("adminEmail");

const adminPass =
document.getElementById("adminPass");

const loginBtn =
document.getElementById("loginBtn");

const loginStatus =
document.getElementById("loginStatus");

const logoutBtn =
document.getElementById("logoutBtn");

const editorTitle =
document.getElementById("editorTitle");

const editorDescription =
document.getElementById("editorDescription");

const dataEditor =
document.getElementById("dataEditor");

const editorStatus =
document.getElementById("editorStatus");

const saveDataBtn =
document.getElementById("saveDataBtn");

const formatJsonBtn =
document.getElementById("formatJsonBtn");

const closeEditorBtn =
document.getElementById("closeEditorBtn");

const exportBtn =
document.getElementById("exportBtn");


/* =========================================
   Admin State
========================================= */

let currentEditor = null;

let currentData = null;


/* =========================================
   Data Files
========================================= */

const DATA_FILES = {

    earnings: "../data/earnings.json",

    bitrates: "../data/bitrates.json",

    players: "../data/players.json",

    crosshairs: "../data/crosshairs.json",

    gear: "../data/gear.json",

    graphics: "../data/graphics.json",

    audio: "../data/audio.json"

};


/* =========================================
   Editor Information
========================================= */

const EDITOR_INFO = {

    obs: {

        title: "OBS Settings",

        description:
        "OBS settings are currently stored directly in the OBS page."

    },

    earnings: {

        title: "Earnings Data",

        description:
        "View and edit earnings JSON data."

    },

    bitrates: {

        title: "Bitrate Data",

        description:
        "View and edit streaming bitrate JSON data."

    },

    players: {

        title: "Valorant Players",

        description:
        "View and edit Valorant player sensitivity data."

    },

    crosshairs: {

        title: "Valorant Crosshairs",

        description:
        "View and edit Valorant crosshair data."

    },

    gear: {

        title: "Gaming Gear",

        description:
        "View and edit gaming gear data."

    },

    graphics: {

        title: "Graphics Settings",

        description:
        "View and edit graphics recommendation data."

    },

    audio: {

        title: "Audio Settings",

        description:
        "View and edit audio settings data."

    }

};


/* =========================================
   Check Firebase
========================================= */

function firebaseAvailable() {

    if (
        typeof firebase === "undefined"
    ) {

        console.error(
            "Firebase SDK is not loaded."
        );

        return false;

    }


    if (
        typeof auth === "undefined"
    ) {

        console.error(
            "Firebase Authentication is not initialized."
        );

        return false;

    }


    return true;

}


/* =========================================
   Check Admin UID
========================================= */

function isAllowedAdmin(user) {

    if (!user)
        return false;


    return ALLOWED_ADMIN_UIDS.includes(
        user.uid
    );

}


/* =========================================
   Login Status
========================================= */

function setLoginStatus(
    message,
    isError = false
) {

    if (!loginStatus)
        return;


    loginStatus.textContent =
    message;


    loginStatus.classList.toggle(
        "error",
        isError
    );

}


/* =========================================
   Editor Status
========================================= */

function setEditorStatus(
    message,
    isError = false
) {

    if (!editorStatus)
        return;


    editorStatus.textContent =
    message;


    editorStatus.classList.toggle(
        "error",
        isError
    );

}


/* =========================================
   Show Login
========================================= */

function showLogin() {

    if (loginSection) {

        loginSection.style.display =
        "block";

    }


    if (dashboard) {

        dashboard.style.display =
        "none";

    }


    if (editorSection) {

        editorSection.style.display =
        "none";

    }

}


/* =========================================
   Show Dashboard
========================================= */

function showDashboard() {

    if (loginSection) {

        loginSection.style.display =
        "none";

    }


    if (dashboard) {

        dashboard.style.display =
        "block";

    }


    setLoginStatus("");

}


/* =========================================
   Login
========================================= */

async function loginAdmin(event) {

    if (event) {

        event.preventDefault();

    }


    if (!firebaseAvailable()) {

        setLoginStatus(
            "Firebase is not configured correctly.",
            true
        );

        return;

    }


    const email =
    adminEmail?.value.trim();

    const password =
    adminPass?.value;


    if (!email || !password) {

        setLoginStatus(
            "Enter your admin email and password.",
            true
        );

        return;

    }


    if (loginBtn) {

        loginBtn.disabled = true;

        loginBtn.textContent =
        "Logging in...";

    }


    setLoginStatus(
        "Checking admin account..."
    );


    try {

        const credential =

        await auth
        .signInWithEmailAndPassword(
            email,
            password
        );


        const user =
        credential.user;


        if (!isAllowedAdmin(user)) {

            await auth.signOut();


            throw new Error(
                "This account is not authorized as an administrator."
            );

        }


        if (adminPass) {

            adminPass.value = "";

        }


        showDashboard();

    }

    catch (error) {

        console.error(
            "Admin login error:",
            error
        );


        setLoginStatus(
            error.message ||
            "Unable to login.",
            true
        );

    }

    finally {

        if (loginBtn) {

            loginBtn.disabled = false;

            loginBtn.textContent =
            "Login";

        }

    }

}


/* =========================================
   Logout
========================================= */

async function logoutAdmin() {

    if (!firebaseAvailable())
        return;


    try {

        await auth.signOut();


        currentEditor = null;

        currentData = null;


        if (dataEditor) {

            dataEditor.value = "";

        }


        showLogin();


        setLoginStatus(
            "Logged out."
        );

    }

    catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }

}


/* =========================================
   Open Editor
========================================= */

async function openEditor(type) {

    const user =
    auth.currentUser;


    if (!isAllowedAdmin(user)) {

        showLogin();

        return;

    }


    const info =
    EDITOR_INFO[type];


    if (!info)
        return;


    currentEditor = type;


    if (editorTitle) {

        editorTitle.textContent =
        info.title;

    }


    if (editorDescription) {

        editorDescription.textContent =
        info.description;

    }


    if (editorSection) {

        editorSection.style.display =
        "block";

    }


    setEditorStatus("");


    if (type === "obs") {

        currentData = null;


        if (dataEditor) {

            dataEditor.value =

JSON.stringify(
    {
        message:
        "OBS settings are currently stored directly inside platforms/obs.html."
    },
    null,
    4
);

        }


        editorSection.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });


        return;

    }


    const file =
    DATA_FILES[type];


    if (!file) {

        setEditorStatus(
            "Data file is not configured.",
            true
        );

        return;

    }


    if (dataEditor) {

        dataEditor.value =
        "Loading...";

    }


    try {

        const response =
        await fetch(
            `${file}?v=${Date.now()}`
        );


        if (!response.ok) {

            throw new Error(
                `Unable to load ${file}`
            );

        }


        currentData =
        await response.json();


        if (dataEditor) {

            dataEditor.value =

            JSON.stringify(
                currentData,
                null,
                4
            );

        }


        editorSection.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

    catch (error) {

        console.error(
            "Editor loading error:",
            error
        );


        if (dataEditor) {

            dataEditor.value = "";

        }


        setEditorStatus(
            "Unable to load the selected JSON file.",
            true
        );

    }

}


/* =========================================
   Close Editor
========================================= */

function closeEditor() {

    currentEditor = null;

    currentData = null;


    if (dataEditor) {

        dataEditor.value = "";

    }


    if (editorSection) {

        editorSection.style.display =
        "none";

    }

}


/* =========================================
   Format JSON
========================================= */

function formatJSON() {

    if (!dataEditor)
        return;


    try {

        const parsed =
        JSON.parse(
            dataEditor.value
        );


        dataEditor.value =

        JSON.stringify(
            parsed,
            null,
            4
        );


        setEditorStatus(
            "JSON formatted successfully."
        );

    }

    catch (error) {

        setEditorStatus(
            "Invalid JSON. Check commas, brackets and quotation marks.",
            true
        );

    }

}


/* =========================================
   Save Data
========================================= */

async function saveData() {

    const user =
    auth.currentUser;


    if (!isAllowedAdmin(user)) {

        setEditorStatus(
            "Admin authorization required.",
            true
        );

        return;

    }


    if (!currentEditor) {

        setEditorStatus(
            "No editor is currently open.",
            true
        );

        return;

    }


    if (currentEditor === "obs") {

        setEditorStatus(
            "OBS data cannot be saved from the admin panel yet.",
            true
        );

        return;

    }


    let parsedData;


    try {

        parsedData =
        JSON.parse(
            dataEditor.value
        );

    }

    catch (error) {

        setEditorStatus(
            "Invalid JSON. Data was not saved.",
            true
        );

        return;

    }


    /*
    IMPORTANT

    GitHub Pages cannot directly overwrite
    JSON files in your GitHub repository.

    For now we download the edited JSON file.

    You can replace the file locally and push
    it using Git.
    */


    const filename =

    DATA_FILES[currentEditor]
    .split("/")
    .pop();


    downloadJSON(
        parsedData,
        filename
    );


    setEditorStatus(

        `${filename} downloaded. Replace the file in your data folder and push it to GitHub.`

    );

}


/* =========================================
   Download JSON
========================================= */

function downloadJSON(
    data,
    filename
) {

    const json =

    JSON.stringify(
        data,
        null,
        4
    );


    const blob =

    new Blob(
        [json],
        {
            type:
            "application/json"
        }
    );


    const url =

    URL.createObjectURL(blob);


    const link =

    document.createElement("a");


    link.href = url;

    link.download = filename;


    document.body.appendChild(link);


    link.click();


    link.remove();


    URL.revokeObjectURL(url);

}


/* =========================================
   Export All Data
========================================= */

async function exportData() {

    const user =
    auth.currentUser;


    if (!isAllowedAdmin(user))
        return;


    const backup = {

        exportedAt:
        new Date().toISOString(),

        data: {}

    };


    try {

        for (
            const [name, file]
            of Object.entries(DATA_FILES)
        ) {

            const response =
            await fetch(
                `${file}?v=${Date.now()}`
            );


            if (!response.ok) {

                throw new Error(
                    `Unable to load ${file}`
                );

            }


            backup.data[name] =
            await response.json();

        }


        downloadJSON(

            backup,

            "stream-guides-backup.json"

        );

    }

    catch (error) {

        console.error(
            "Export error:",
            error
        );


        alert(
            "Unable to export all website data."
        );

    }

}


/* =========================================
   Editor Buttons
========================================= */

document
.querySelectorAll("[data-editor]")
.forEach(button => {

    button.addEventListener(

        "click",

        () => {

            openEditor(
                button.dataset.editor
            );

        }

    );

});


/* =========================================
   Events
========================================= */

if (adminLoginForm) {

    adminLoginForm.addEventListener(

        "submit",

        loginAdmin

    );

}


if (logoutBtn) {

    logoutBtn.addEventListener(

        "click",

        logoutAdmin

    );

}


if (closeEditorBtn) {

    closeEditorBtn.addEventListener(

        "click",

        closeEditor

    );

}


if (formatJsonBtn) {

    formatJsonBtn.addEventListener(

        "click",

        formatJSON

    );

}


if (saveDataBtn) {

    saveDataBtn.addEventListener(

        "click",

        saveData

    );

}


if (exportBtn) {

    exportBtn.addEventListener(

        "click",

        exportData

    );

}


/* =========================================
   Authentication State
========================================= */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        if (!firebaseAvailable()) {

            showLogin();


            setLoginStatus(
                "Firebase is not configured correctly.",
                true
            );


            return;

        }


        auth.onAuthStateChanged(

            async user => {

                if (
                    user &&
                    isAllowedAdmin(user)
                ) {

                    showDashboard();

                }

                else {

                    if (user) {

                        await auth.signOut();

                    }


                    showLogin();

                }

            }

        );

    }

);


/* =========================================
   Public Functions
========================================= */

window.loginAdmin =
loginAdmin;

window.logoutAdmin =
logoutAdmin;

window.openEditor =
openEditor;

window.exportData =
exportData;