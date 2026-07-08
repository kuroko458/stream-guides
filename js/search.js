// ===============================
// GLOBAL SEARCH SYSTEM
// ===============================

const searchData = [
    { title: "YouTube OBS Settings", url: "youtube.html" },
    { title: "Twitch OBS Settings", url: "twitch.html" },
    { title: "Kick OBS Settings", url: "kick.html" },
    { title: "Loco OBS Settings", url: "loco.html" },
    { title: "Bitrate Calculator", url: "bitrate-calculator.html" },
    { title: "Earnings Calculator", url: "earnings.html" }
];

function searchSite(query) {

    query = query.toLowerCase();

    return searchData.filter(item =>
        item.title.toLowerCase().includes(query)
    );

}