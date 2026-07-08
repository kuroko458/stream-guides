function recommendOBS(upload, gpu) {

    if (gpu === "low") {
        return {
            resolution: "720p",
            bitrate: 3000,
            encoder: "x264 veryfast"
        };
    }

    if (upload < 5) {
        return {
            resolution: "720p60",
            bitrate: 3500,
            encoder: "NVENC H.264"
        };
    }

    if (upload < 10) {
        return {
            resolution: "1080p60",
            bitrate: 6000,
            encoder: "NVENC H.264"
        };
    }

    return {
        resolution: "1440p60",
        bitrate: 12000,
        encoder: "NVENC AV1"
    };
}