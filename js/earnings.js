// ===============================
// EARNINGS CALCULATOR
// ===============================

function calculateEarnings() {

    const platform = document.getElementById("platform").value;
    const views = parseFloat(document.getElementById("views").value);
    const subs = parseFloat(document.getElementById("subs").value);

    const result = document.getElementById("earningsResult");

    if (!views || views <= 0) {
        result.innerHTML = "⚠️ Enter valid monthly views.";
        return;
    }

    let rpm = 0; // revenue per 1000 views (base USD estimate)

    switch (platform) {

        case "youtube":
            rpm = 1.5; // average gaming RPM
            break;

        case "twitch":
            rpm = 1.2;
            break;

        case "kick":
            rpm = 2.5;
            break;

        case "loco":
            rpm = 0.8;
            break;

    }

    // base earnings from ads
    const adRevenue = (views / 1000) * rpm;

    // simple subs bonus estimate
    const subRevenue = subs * 0.5;

    const total = adRevenue + subRevenue;

    // multiple currency conversion (simple static rates)
    const inr = total * 83;
    const eur = total * 0.92;
    const gbp = total * 0.78;
    const jpy = total * 150;

    result.innerHTML = `
        <h3>${platform.toUpperCase()} Earnings</h3>

        <p><b>Estimated Monthly Income (USD):</b> $${total.toFixed(2)}</p>

        <hr>

        <p><b>INR:</b> ₹${inr.toFixed(0)}</p>
        <p><b>EUR:</b> €${eur.toFixed(2)}</p>
        <p><b>GBP:</b> £${gbp.toFixed(2)}</p>
        <p><b>JPY:</b> ¥${jpy.toFixed(0)}</p>

        <hr>

        <p style="color:gray;font-size:14px;">
        ⚠️ This is an estimate based on average RPM values.
        </p>
    `;

}


function drawChart(total) {

    const ctx = document.getElementById("earnChart");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Low", "Average", "High"],
            datasets: [{
                label: "Earnings USD",
                data: [
                    total * 0.5,
                    total,
                    total * 2
                ]
            }]
        }
    });

}
drawChart(total);

async function convertCurrency(usd) {

    const res = await fetch("https://api.exchangerate.host/latest?base=USD");
    const data = await res.json();

    return {
        inr: usd * data.rates.INR,
        eur: usd * data.rates.EUR,
        gbp: usd * data.rates.GBP,
        jpy: usd * data.rates.JPY
    };

}