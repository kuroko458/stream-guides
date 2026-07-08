function checkSpeed(){

const speed=parseFloat(document.getElementById("uploadSpeed").value);

const result=document.getElementById("speedResult");

if(isNaN(speed)||speed<=0){

result.innerHTML="Please enter a valid upload speed.";

return;

}

let html="<h2>Recommended Quality</h2>";

if(speed<2){

html+="<p>❌ Not recommended for live streaming.</p>";

}

else if(speed<5){

html+="<p>✅ 360p30</p>";

}

else if(speed<8){

html+="<p>✅ 480p30</p>";

}

else if(speed<12){

html+="<p>✅ 720p30</p>";

}

else if(speed<18){

html+="<p>✅ 720p60</p>";

}

else if(speed<30){

html+="<p>✅ 1080p60</p>";

}

else if(speed<60){

html+="<p>✅ 1440p60</p>";

}

else{

html+="<p>✅ 4K60</p>";

}

html+=`
<hr>

<p><b>Recommended Upload:</b> ${speed} Mbps</p>

<p>Use Ethernet instead of Wi-Fi for best stability.</p>

`;

result.innerHTML=html;

}