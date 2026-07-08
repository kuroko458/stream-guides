/* =========================================================
   STREAM GUIDES
   VALORANT DATABASE
========================================================= */

"use strict";


/* =========================================================
   DATA
========================================================= */

let players = [];
let crosshairs = [];
let gear = [];
let graphics = [];
let audio = [];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const playersContainer =
document.getElementById("playersContainer");

const crosshairContainer =
document.getElementById("crosshairContainer");

const gearContainer =
document.getElementById("gearContainer");

const graphicsContainer =
document.getElementById("graphicsContainer");

const audioContainer =
document.getElementById("audioContainer");


const playerSearch =
document.getElementById("playerSearch");

const playerCount =
document.getElementById("playerCount");


const roleFilter =
document.getElementById("roleFilter");

const dpiFilter =
document.getElementById("dpiFilter");

const pollingFilter =
document.getElementById("pollingFilter");

const handFilter =
document.getElementById("handFilter");


const dpiInput =
document.getElementById("dpi");

const sensInput =
document.getElementById("sens");

const edpiOutput =
document.getElementById("edpi");

const resetEDPI =
document.getElementById("resetEDPI");

const exampleEDPI =
document.getElementById("exampleEDPI");


const gearSearch =
document.getElementById("gearSearch");


/* =========================================================
   JSON LOADER
========================================================= */

async function loadJSON(file){

    try{

        const response = await fetch(file);

        if(!response.ok){

            throw new Error(
                `HTTP ${response.status}: ${file}`
            );

        }

        return await response.json();

    }

    catch(error){

        console.error(
            "Unable to load JSON:",
            file,
            error
        );

        return [];

    }

}


/* =========================================================
   LOAD DATABASE
========================================================= */

async function loadData(){

    const results = await Promise.all([

        loadJSON("../data/players.json"),

        loadJSON("../data/crosshairs.json"),

        loadJSON("../data/gear.json"),

        loadJSON("../data/graphics.json"),

        loadJSON("../data/audio.json")

    ]);


    players = Array.isArray(results[0])
        ? results[0]
        : [];

    crosshairs = Array.isArray(results[1])
        ? results[1]
        : [];

    gear = Array.isArray(results[2])
        ? results[2]
        : [];

    graphics = Array.isArray(results[3])
        ? results[3]
        : [];

    audio = Array.isArray(results[4])
        ? results[4]
        : [];


    console.log(
        "Valorant Players:",
        players.length
    );

    console.log(
        "Valorant Crosshairs:",
        crosshairs.length
    );

    console.log(
        "Valorant Gear:",
        gear.length
    );

    console.log(
        "Valorant Graphics:",
        graphics.length
    );

    console.log(
        "Valorant Audio:",
        audio.length
    );


    renderPlayers(players);

    renderCrosshairs();

    renderGear(gear);

    renderGraphics();

    renderAudio();

}


/* =========================================================
   SAFE VALUE
========================================================= */

function safe(value){

    if(
        value === undefined ||
        value === null ||
        value === ""
    ){

        return "-";

    }

    return value;

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(value){

    return String(
        value ?? ""
    )

    .replaceAll(
        "&",
        "&amp;"
    )

    .replaceAll(
        "<",
        "&lt;"
    )

    .replaceAll(
        ">",
        "&gt;"
    )

    .replaceAll(
        '"',
        "&quot;"
    )

    .replaceAll(
        "'",
        "&#039;"
    );

}


/* =========================================================
   EDPI HELPER
========================================================= */

function getPlayerEDPI(player){

    const dpi =
    Number(player.dpi);

    const sens =
    Number(player.sens);


    if(
        !Number.isFinite(dpi) ||
        !Number.isFinite(sens)
    ){

        return "-";

    }


    return (
        dpi * sens
    ).toFixed(1);

}


/* =========================================================
   PLAYER CARD
========================================================= */

function createPlayerCard(player){

    const playerName =
    escapeHTML(
        safe(player.player)
    );

    const realName =
    escapeHTML(
        safe(player.realName)
    );

    const role =
    escapeHTML(
        safe(player.role)
    );

    const dpi =
    escapeHTML(
        safe(player.dpi)
    );

    const sens =
    escapeHTML(
        safe(player.sens)
    );

    const scope =
    escapeHTML(
        safe(player.scope)
    );

    const ads =
    escapeHTML(
        safe(player.ads)
    );

    const windows =
    escapeHTML(
        safe(player.windows)
    );

    const polling =
    escapeHTML(
        safe(player.polling)
    );

    const hand =
    escapeHTML(
        safe(player.hand)
    );

    const resolution =
    escapeHTML(
        safe(player.resolution)
    );

    const refresh =
    escapeHTML(
        safe(player.refresh)
    );

    const mouse =
    escapeHTML(
        safe(player.mouse)
    );

    const keyboard =
    escapeHTML(
        safe(player.keyboard)
    );

    const monitor =
    escapeHTML(
        safe(player.monitor)
    );

    const headset =
    escapeHTML(
        safe(player.headset)
    );

    const mousepad =
    escapeHTML(
        safe(player.mousepad)
    );

    const rawInput =
    player.rawInput === true
        ? "On"
        : player.rawInput === false
        ? "Off"
        : "-";


    return `

<div class="card player-card">

<h3>
${playerName}
</h3>

<p>
<strong>Real Name:</strong>
${realName}
</p>

<p>
<strong>Role:</strong>
${role}
</p>

<hr>

<div class="grid">

<div>

<p>
<strong>DPI</strong>
</p>

<p>
${dpi}
</p>

</div>


<div>

<p>
<strong>Sensitivity</strong>
</p>

<p>
${sens}
</p>

</div>


<div>

<p>
<strong>eDPI</strong>
</p>

<p>
${getPlayerEDPI(player)}
</p>

</div>

</div>

<hr>

<p>
<strong>Scoped Sensitivity:</strong>
${scope}
</p>

<p>
<strong>ADS Sensitivity:</strong>
${ads}
</p>

<p>
<strong>Windows Sensitivity:</strong>
${windows}
</p>

<p>
<strong>Polling Rate:</strong>
${polling}
</p>

<p>
<strong>Raw Input:</strong>
${rawInput}
</p>

<p>
<strong>Handedness:</strong>
${hand}
</p>

<hr>

<p>
<strong>Mouse:</strong>
${mouse}
</p>

<p>
<strong>Keyboard:</strong>
${keyboard}
</p>

<p>
<strong>Monitor:</strong>
${monitor}
</p>

<p>
<strong>Headset:</strong>
${headset}
</p>

<p>
<strong>Mousepad:</strong>
${mousepad}
</p>

<hr>

<p>
<strong>Resolution:</strong>
${resolution}
</p>

<p>
<strong>Refresh Rate:</strong>
${refresh}
</p>

</div>

`;

}


/* =========================================================
   RENDER PLAYERS
========================================================= */

function renderPlayers(list){

    if(!playersContainer){

        return;

    }


    if(!Array.isArray(list)){

        list = [];

    }


    if(playerCount){

        playerCount.textContent =
        `${list.length} Players Found`;

    }


    if(list.length === 0){

        playersContainer.innerHTML = `

<div class="card">

<h3>
No Players Found
</h3>

<p>
Try another search or filter.
</p>

</div>

`;

        return;

    }


    playersContainer.innerHTML =

    list
    .map(createPlayerCard)
    .join("");

}


/* =========================================================
   PLAYER SEARCH + FILTERS
========================================================= */

function applyPlayerFilters(){

    let filtered = [
        ...players
    ];


    const search =

    playerSearch

    ? playerSearch
      .value
      .trim()
      .toLowerCase()

    : "";


    if(search){

        filtered = filtered.filter(
            player => {

                const searchable = [

                    player.player,

                    player.realName,

                    player.role,

                    player.mouse,

                    player.keyboard,

                    player.monitor,

                    player.headset,

                    player.mousepad

                ]

                .map(
                    value =>
                    String(value ?? "")
                    .toLowerCase()
                );


                return searchable.some(
                    value =>
                    value.includes(search)
                );

            }
        );

    }


    if(
        roleFilter &&
        roleFilter.value
    ){

        filtered = filtered.filter(
            player =>
            String(player.role) ===
            roleFilter.value
        );

    }


    if(
        dpiFilter &&
        dpiFilter.value
    ){

        filtered = filtered.filter(
            player =>
            String(player.dpi) ===
            dpiFilter.value
        );

    }


    if(
        pollingFilter &&
        pollingFilter.value
    ){

        filtered = filtered.filter(
            player =>
            String(player.polling) ===
            pollingFilter.value
        );

    }


    if(
        handFilter &&
        handFilter.value
    ){

        filtered = filtered.filter(
            player =>
            String(player.hand) ===
            handFilter.value
        );

    }


    renderPlayers(filtered);

}


/* =========================================================
   EDPI CALCULATOR
========================================================= */

function calculateEDPI(){

    if(
        !dpiInput ||
        !sensInput ||
        !edpiOutput
    ){

        return;

    }


    const dpi =
    parseFloat(
        dpiInput.value
    );

    const sens =
    parseFloat(
        sensInput.value
    );


    if(
        !Number.isFinite(dpi) ||
        !Number.isFinite(sens) ||
        dpi <= 0 ||
        sens <= 0
    ){

        edpiOutput.textContent = "-";

        return;

    }


    const edpi =
    dpi * sens;


    edpiOutput.textContent =
    edpi.toFixed(1);

}


/* =========================================================
   RESET EDPI
========================================================= */

function resetEDPICalculator(){

    if(dpiInput){

        dpiInput.value = "";

    }


    if(sensInput){

        sensInput.value = "";

    }


    if(edpiOutput){

        edpiOutput.textContent = "-";

    }

}


/* =========================================================
   EDPI EXAMPLE
========================================================= */

function showEDPIExample(){

    if(
        !dpiInput ||
        !sensInput
    ){

        return;

    }


    dpiInput.value = 1600;

    sensInput.value = 0.084;


    calculateEDPI();

}


/* =========================================================
   CROSSHAIR CARD
========================================================= */

function createCrosshairCard(crosshair){

    const player =
    escapeHTML(
        safe(crosshair.player)
    );

    const color =
    escapeHTML(
        safe(crosshair.color)
    );

    const outline =
    escapeHTML(
        safe(crosshair.outline)
    );

    const centerDot =
    escapeHTML(
        safe(crosshair.centerDot)
    );

    const innerLines =
    escapeHTML(
        safe(crosshair.innerLines)
    );

    const outerLines =
    escapeHTML(
        safe(crosshair.outerLines)
    );

    const movementError =
    escapeHTML(
        safe(crosshair.movementError)
    );

    const firingError =
    escapeHTML(
        safe(crosshair.firingError)
    );

    const code =
    escapeHTML(
        safe(crosshair.code)
    );


    return `

<div class="card crosshair-card">

<h3>
${player}
</h3>

<p>
<strong>Color:</strong>
${color}
</p>

<p>
<strong>Outline:</strong>
${outline}
</p>

<p>
<strong>Center Dot:</strong>
${centerDot}
</p>

<p>
<strong>Inner Lines:</strong>
${innerLines}
</p>

<p>
<strong>Outer Lines:</strong>
${outerLines}
</p>

<p>
<strong>Movement Error:</strong>
${movementError}
</p>

<p>
<strong>Firing Error:</strong>
${firingError}
</p>

<textarea
readonly
class="crosshair-code"
style="width:100%;min-height:80px;margin-top:15px;"
>${code}</textarea>

<button
type="button"
class="btn copy-crosshair"
data-code="${code}"
style="margin-top:15px;"
>

Copy Crosshair Code

</button>

</div>

`;

}


/* =========================================================
   RENDER CROSSHAIRS
========================================================= */

function renderCrosshairs(){

    if(!crosshairContainer){

        return;

    }


    if(crosshairs.length === 0){

        crosshairContainer.innerHTML = `

<div class="card">

<h3>
No Crosshairs Found
</h3>

</div>

`;

        return;

    }


    crosshairContainer.innerHTML =

    crosshairs
    .map(createCrosshairCard)
    .join("");


    enableCrosshairCopy();

}


/* =========================================================
   CROSSHAIR COPY
========================================================= */

function enableCrosshairCopy(){

    const buttons =

    document.querySelectorAll(
        ".copy-crosshair"
    );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",

                async () => {

                    const code =
                    button.dataset.code;


                    try{

                        await navigator
                        .clipboard
                        .writeText(code);


                        button.textContent =
                        "Copied ✓";


                        setTimeout(
                            () => {

                                button.textContent =
                                "Copy Crosshair Code";

                            },

                            1500
                        );

                    }

                    catch(error){

                        console.error(
                            "Clipboard error:",
                            error
                        );


                        button.textContent =
                        "Copy Failed";


                        setTimeout(
                            () => {

                                button.textContent =
                                "Copy Crosshair Code";

                            },

                            1500
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   GEAR CARD
========================================================= */

function createGearCard(item){

    return `

<div class="card gear-card">

<h3>
${escapeHTML(safe(item.player))}
</h3>

<hr>

<p>
<strong>🖱 Mouse:</strong>
${escapeHTML(safe(item.mouse))}
</p>

<p>
<strong>DPI:</strong>
${escapeHTML(safe(item.dpi))}
</p>

<p>
<strong>Polling Rate:</strong>
${escapeHTML(safe(item.polling))}
</p>

<p>
<strong>🖱 Mousepad:</strong>
${escapeHTML(safe(item.mousepad))}
</p>

<hr>

<p>
<strong>⌨ Keyboard:</strong>
${escapeHTML(safe(item.keyboard))}
</p>

<p>
<strong>Switches:</strong>
${escapeHTML(safe(item.switches))}
</p>

<hr>

<p>
<strong>🖥 Monitor:</strong>
${escapeHTML(safe(item.monitor))}
</p>

<p>
<strong>Refresh Rate:</strong>
${escapeHTML(safe(item.refreshRate))}
</p>

<hr>

<p>
<strong>🎧 Headset:</strong>
${escapeHTML(safe(item.headset))}
</p>

<p>
<strong>🎤 Microphone:</strong>
${escapeHTML(safe(item.microphone))}
</p>

</div>

`;

}


/* =========================================================
   RENDER GEAR
========================================================= */

function renderGear(list){

    if(!gearContainer){

        return;

    }


    if(!Array.isArray(list)){

        list = [];

    }


    if(list.length === 0){

        gearContainer.innerHTML = `

<div class="card">

<h3>
No Gear Found
</h3>

<p>
Try another gear search.
</p>

</div>

`;

        return;

    }


    gearContainer.innerHTML =

    list
    .map(createGearCard)
    .join("");

}


/* =========================================================
   SEARCH GEAR
========================================================= */

function filterGear(){

    const search =

    gearSearch

    ? gearSearch
      .value
      .trim()
      .toLowerCase()

    : "";


    if(!search){

        renderGear(gear);

        return;

    }


    const filtered =

    gear.filter(
        item => {

            const searchable = [

                item.player,

                item.mouse,

                item.mousepad,

                item.keyboard,

                item.switches,

                item.monitor,

                item.refreshRate,

                item.headset,

                item.microphone,

                item.dpi,

                item.polling

            ]

            .map(
                value =>
                String(value ?? "")
                .toLowerCase()
            );


            return searchable.some(
                value =>
                value.includes(search)
            );

        }
    );


    renderGear(filtered);

}


/* =========================================================
   GRAPHICS CARD
========================================================= */

function createGraphicsCard(profile){

    return `

<div class="card graphics-card">

<h3>
${escapeHTML(safe(profile.profile))}
</h3>

<p>
<strong>Target FPS:</strong>
${escapeHTML(safe(profile.targetFPS))}
</p>

<p>
<strong>Recommended CPU:</strong>
${escapeHTML(safe(profile.cpu))}
</p>

<p>
<strong>Recommended GPU:</strong>
${escapeHTML(safe(profile.gpu))}
</p>

<hr>

<p>
<strong>Resolution:</strong>
${escapeHTML(safe(profile.resolution))}
</p>

<p>
<strong>Display Mode:</strong>
${escapeHTML(safe(profile.displayMode))}
</p>

<p>
<strong>Multithreaded Rendering:</strong>
${escapeHTML(safe(profile.multithreadedRendering))}
</p>

<hr>

<p>
<strong>Material Quality:</strong>
${escapeHTML(safe(profile.materialQuality))}
</p>

<p>
<strong>Texture Quality:</strong>
${escapeHTML(safe(profile.textureQuality))}
</p>

<p>
<strong>Detail Quality:</strong>
${escapeHTML(safe(profile.detailQuality))}
</p>

<p>
<strong>UI Quality:</strong>
${escapeHTML(safe(profile.uiQuality))}
</p>

<hr>

<p>
<strong>Vignette:</strong>
${escapeHTML(safe(profile.vignette))}
</p>

<p>
<strong>VSync:</strong>
${escapeHTML(safe(profile.vsync))}
</p>

<p>
<strong>Anti-Aliasing:</strong>
${escapeHTML(safe(profile.antiAliasing))}
</p>

<p>
<strong>Anisotropic Filtering:</strong>
${escapeHTML(safe(profile.anisotropicFiltering))}
</p>

<p>
<strong>Improve Clarity:</strong>
${escapeHTML(safe(profile.improveClarity))}
</p>

<p>
<strong>Experimental Sharpening:</strong>
${escapeHTML(safe(profile.experimentalSharpening))}
</p>

<p>
<strong>Bloom:</strong>
${escapeHTML(safe(profile.bloom))}
</p>

<p>
<strong>Distortion:</strong>
${escapeHTML(safe(profile.distortion))}
</p>

<p>
<strong>Cast Shadows:</strong>
${escapeHTML(safe(profile.castShadows))}
</p>

<p>
<strong>NVIDIA Reflex:</strong>
${escapeHTML(safe(profile.nvidiaReflex))}
</p>

</div>

`;

}


/* =========================================================
   RENDER GRAPHICS
========================================================= */

function renderGraphics(){

    if(!graphicsContainer){

        return;

    }


    if(graphics.length === 0){

        graphicsContainer.innerHTML = `

<div class="card">

<h3>
No Graphics Profiles Found
</h3>

</div>

`;

        return;

    }


    graphicsContainer.innerHTML =

    graphics
    .map(createGraphicsCard)
    .join("");

}


/* =========================================================
   AUDIO CARD
========================================================= */

function createAudioCard(profile){

    const muteMusic =

    profile.muteMusicWhenWindowInactive === true

    ? "On"

    : profile.muteMusicWhenWindowInactive === false

    ? "Off"

    : "-";


    const voiceChat =

    profile.voiceChat === true

    ? "On"

    : profile.voiceChat === false

    ? "Off"

    : "-";


    return `

<div class="card audio-card">

<h3>
${escapeHTML(safe(profile.profile))}
</h3>

<p>
<strong>Master Volume:</strong>
${escapeHTML(safe(profile.masterVolume))}
</p>

<p>
<strong>Sound Effects:</strong>
${escapeHTML(safe(profile.soundEffects))}
</p>

<p>
<strong>Voice-Over:</strong>
${escapeHTML(safe(profile.voiceOver))}
</p>

<p>
<strong>Video Music:</strong>
${escapeHTML(safe(profile.videoMusic))}
</p>

<p>
<strong>Menu Music:</strong>
${escapeHTML(safe(profile.menuMusic))}
</p>

<p>
<strong>Agent Flavor:</strong>
${escapeHTML(safe(profile.agentFlavor))}
</p>

<p>
<strong>Mute Music When Inactive:</strong>
${muteMusic}
</p>

<hr>

<p>
<strong>Speaker Configuration:</strong>
${escapeHTML(safe(profile.speakerConfiguration))}
</p>

<p>
<strong>HRTF:</strong>
${escapeHTML(safe(profile.HRTF))}
</p>

<p>
<strong>Windows Enhancements:</strong>
${escapeHTML(safe(profile.windowsEnhancements))}
</p>

<p>
<strong>Spatial Audio:</strong>
${escapeHTML(safe(profile.spatialAudio))}
</p>

<p>
<strong>EQ:</strong>
${escapeHTML(safe(profile.EQ))}
</p>

<p>
<strong>Dynamic Range:</strong>
${escapeHTML(safe(profile.dynamicRange))}
</p>

<hr>

<p>
<strong>Microphone Volume:</strong>
${escapeHTML(safe(profile.micVolume))}
</p>

<p>
<strong>Voice Chat:</strong>
${voiceChat}
</p>

<p>
<strong>Party Voice:</strong>
${escapeHTML(safe(profile.partyVoice))}
</p>

<p>
<strong>Team Voice:</strong>
${escapeHTML(safe(profile.teamVoice))}
</p>

<p>
<strong>Incoming Voice:</strong>
${escapeHTML(safe(profile.incomingVoice))}
</p>

<p>
<strong>Mic Sensitivity:</strong>
${escapeHTML(safe(profile.micSensitivity))}
</p>

<p>
<strong>Loopback Test:</strong>
${escapeHTML(safe(profile.loopbackTest))}
</p>

</div>

`;

}


/* =========================================================
   RENDER AUDIO
========================================================= */

function renderAudio(){

    if(!audioContainer){

        return;

    }


    if(audio.length === 0){

        audioContainer.innerHTML = `

<div class="card">

<h3>
No Audio Profiles Found
</h3>

</div>

`;

        return;

    }


    audioContainer.innerHTML =

    audio
    .map(createAudioCard)
    .join("");

}


/* =========================================================
   EVENTS
========================================================= */

function connectEvents(){

    if(playerSearch){

        playerSearch.addEventListener(
            "input",
            applyPlayerFilters
        );

    }


    if(roleFilter){

        roleFilter.addEventListener(
            "change",
            applyPlayerFilters
        );

    }


    if(dpiFilter){

        dpiFilter.addEventListener(
            "change",
            applyPlayerFilters
        );

    }


    if(pollingFilter){

        pollingFilter.addEventListener(
            "change",
            applyPlayerFilters
        );

    }


    if(handFilter){

        handFilter.addEventListener(
            "change",
            applyPlayerFilters
        );

    }


    if(dpiInput){

        dpiInput.addEventListener(
            "input",
            calculateEDPI
        );

    }


    if(sensInput){

        sensInput.addEventListener(
            "input",
            calculateEDPI
        );

    }


    if(resetEDPI){

        resetEDPI.addEventListener(
            "click",
            resetEDPICalculator
        );

    }


    if(exampleEDPI){

        exampleEDPI.addEventListener(
            "click",
            showEDPIExample
        );

    }


    if(gearSearch){

        gearSearch.addEventListener(
            "input",
            filterGear
        );

    }

}


/* =========================================================
   INITIALIZE
========================================================= */

async function initializeValorant(){

    connectEvents();

    await loadData();

}


/* =========================================================
   START
========================================================= */

document.addEventListener(

    "DOMContentLoaded",

    initializeValorant

);