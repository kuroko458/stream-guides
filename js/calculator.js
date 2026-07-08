// ================================
// Stream Guides Bitrate Calculator
// ================================

function calculateBitrate() {

    const platform = document.getElementById("platform").value;
    const upload = parseFloat(document.getElementById("upload").value);
    const resolution = document.getElementById("resolution").value;
    const fps = document.getElementById("fps").value;
    const encoder = document.getElementById("encoder").value;

    if (isNaN(upload) || upload <= 0) {
        alert("Please enter a valid upload speed.");
        return;
    }

    // Convert Mbps → Kbps
    const uploadKbps = upload * 1000;

    // Use only 75% of upload speed for stability
    const safeUpload = Math.floor(uploadKbps * 0.75);

    let recommended = 0;

    // -----------------------
    // PLATFORM LIMITS
    // -----------------------

    switch (platform) {

        case "youtube":

            if (resolution == "360") recommended = 1000;
            else if (resolution == "480") recommended = 2500;
            else if (resolution == "720") recommended = fps == "60" ? 6000 : 5000;
            else if (resolution == "1080") recommended = fps == "60" ? 8000 : 6000;
            else if (resolution == "1440") recommended = 18000;
            else if (resolution == "2160") recommended = 35000;

            break;

        case "twitch":

            if (resolution == "360") recommended = 1000;
            else if (resolution == "480") recommended = 2000;
            else if (resolution == "720") recommended = fps == "60" ? 4500 : 3500;
            else if (resolution == "1080") recommended = 6000;
            else if (resolution == "1440") recommended = 6000;
            else if (resolution == "2160") recommended = 6000;

            break;

        case "kick":

            if (resolution == "360") recommended = 1200;
            else if (resolution == "480") recommended = 2500;
            else if (resolution == "720") recommended = fps == "60" ? 5000 : 4000;
            else if (resolution == "1080") recommended = fps == "60" ? 9000 : 7000;
            else if (resolution == "1440") recommended = 15000;
            else if (resolution == "2160") recommended = 25000;

            break;

        case "loco":

            if (resolution == "360") recommended = 1000;
            else if (resolution == "480") recommended = 2000;
            else if (resolution == "720") recommended = fps == "60" ? 4500 : 3500;
            else if (resolution == "1080") recommended = 6000;
            else if (resolution == "1440") recommended = 8000;
            else if (resolution == "2160") recommended = 10000;

            break;

    }

    // Never recommend more than the user's safe upload
    const finalBitrate = Math.min(recommended, safeUpload);

    // -----------------------
    // Encoder Recommendation
    // -----------------------

    let encoderText;

    if (encoder == "auto") {

        if (platform == "youtube")
            encoderText = "NVENC AV1 (Recommended)";
        else
            encoderText = "NVENC H.264";

    }

    else if (encoder == "av1")
        encoderText = "AV1";

    else if (encoder == "nvenc")
        encoderText = "NVENC H.264";

    else if (encoder == "x264")
        encoderText = "x264";

    else if (encoder == "amd")
        encoderText = "AMD AMF";

    else
        encoderText = "Intel Quick Sync";

    // -----------------------
    // Internet Rating
    // -----------------------

    let quality = "";

    if (upload < 5)
        quality = "🔴 Poor";

    else if (upload < 10)
        quality = "🟠 Fair";

    else if (upload < 20)
        quality = "🟢 Good";

    else if (upload < 50)
        quality = "🔵 Excellent";

    else
        quality = "🟣 Professional";

    // -----------------------
    // Stream Status
    // -----------------------

    let status;

    if (safeUpload >= recommended)
        status = "✅ Ready to Stream";

    else
        status = "⚠ Lower your resolution or bitrate";

    // -----------------------
    // Update Cards
    // -----------------------

    document.getElementById("recommendedBitrate").innerHTML =
        finalBitrate.toLocaleString() + " Kbps";

    document.getElementById("safeBitrate").innerHTML =
        safeUpload.toLocaleString() + " Kbps";

    document.getElementById("recommendedEncoder").innerHTML =
        encoderText;

    document.getElementById("internetQuality").innerHTML =
        quality;

    // -----------------------
    // Analysis
    // -----------------------

    document.getElementById("analysis").innerHTML =

        "<strong>Platform:</strong> " + platform.toUpperCase() + "<br><br>" +

        "<strong>Recommended Bitrate:</strong> " +
        finalBitrate.toLocaleString() + " Kbps<br><br>" +

        "<strong>Safe Upload Capacity:</strong> " +
        safeUpload.toLocaleString() + " Kbps<br><br>" +

        "<strong>Encoder:</strong> " +
        encoderText + "<br><br>" +

        "<strong>Internet Quality:</strong> " +
        quality + "<br><br>" +

        "<strong>Status:</strong> " +
        status +

        "<br><br><hr><br>" +

        "💡 <strong>Tips</strong><br>" +

        "• Keep your bitrate below 75% of your upload speed.<br>" +
        "• Use Ethernet instead of Wi-Fi whenever possible.<br>" +
        "• Use CBR with a 2-second keyframe interval.<br>" +
        "• Set audio bitrate between 160–320 Kbps AAC.<br>" +
        "• Close unnecessary background applications while streaming.";

}