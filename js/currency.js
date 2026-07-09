/* =========================================
   Stream Guides
   Currency Converter
========================================= */

const amountInput =
document.getElementById("amount");

const fromCurrency =
document.getElementById("fromCurrency");

const toCurrency =
document.getElementById("toCurrency");

const result =
document.getElementById("result");


/* =========================================
   Currency Symbols
========================================= */

const currencySymbols = {

    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
    SGD: "S$",
    AED: "د.إ",
    SAR: "﷼",
    CNY: "¥",
    KRW: "₩",
    PKR: "₨",
    BDT: "৳",
    NPR: "रू"

};


/* =========================================
   Format Currency
========================================= */

function formatCurrency(value, currency) {

    try {

        return new Intl.NumberFormat(
            undefined,
            {
                style: "currency",
                currency: currency,
                maximumFractionDigits: 2
            }
        ).format(value);

    }

    catch (error) {

        const symbol =
        currencySymbols[currency] || currency;

        return `${symbol} ${Number(value).toFixed(2)}`;

    }

}


/* =========================================
   Show Loading
========================================= */

function showLoading() {

    if (!result)
        return;

    result.innerHTML = `

        <h3>Converting...</h3>

        <p>
        Fetching the latest available exchange rate.
        </p>

    `;

}


/* =========================================
   Show Error
========================================= */

function showError(message) {

    if (!result)
        return;

    result.innerHTML = `

        <h3>Unable to Convert</h3>

        <p>
        ${message}
        </p>

    `;

}


/* =========================================
   Convert Currency
========================================= */

async function convertCurrency() {

    if (
        !amountInput ||
        !fromCurrency ||
        !toCurrency ||
        !result
    ) {

        console.error(
            "Currency converter elements are missing."
        );

        return;

    }


    const amount =
    Number(amountInput.value);

    const from =
    fromCurrency.value;

    const to =
    toCurrency.value;


    if (
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        showError(
            "Please enter an amount greater than 0."
        );

        return;

    }


    if (from === to) {

        result.innerHTML = `

            <h3>
            ${formatCurrency(amount, from)}
            </h3>

            <p>

            ${amount} ${from}
            =
            ${amount} ${to}

            </p>

            <p>

            Exchange Rate:
            1 ${from} = 1 ${to}

            </p>

        `;

        return;

    }


    showLoading();


    try {

        const apiURL =

        `https://api.frankfurter.app/latest?amount=${encodeURIComponent(amount)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;


        const response =
        await fetch(apiURL);


        if (!response.ok) {

            throw new Error(
                `Exchange rate request failed with status ${response.status}.`
            );

        }


        const data =
        await response.json();


        if (
            !data.rates ||
            typeof data.rates[to] !== "number"
        ) {

            throw new Error(
                "The selected currency pair is currently unavailable."
            );

        }


        const convertedAmount =
        data.rates[to];


        const exchangeRate =
        convertedAmount / amount;


        result.innerHTML = `

            <h3>

            ${formatCurrency(amount, from)}

            =

            ${formatCurrency(convertedAmount, to)}

            </h3>


            <p>

            ${amount.toLocaleString()}
            ${from}

            equals

            ${convertedAmount.toLocaleString(
                undefined,
                {
                    maximumFractionDigits: 2
                }
            )}
            ${to}

            </p>


            <p>

            <strong>
            Exchange Rate
            </strong>

            <br>

            1 ${from}

            =

            ${exchangeRate.toLocaleString(
                undefined,
                {
                    maximumFractionDigits: 6
                }
            )}

            ${to}

            </p>


            <p>

            Rate date:
            ${data.date || "Latest available"}

            </p>


            <small>

            Currency values are estimates.
            Banks, payment platforms and card providers
            may use different rates or fees.

            </small>

        `;

    }

    catch (error) {

        console.error(
            "Currency conversion error:",
            error
        );


        showError(

            "The latest exchange rate could not be loaded. Check your internet connection or try again later."

        );

    }

}


/* =========================================
   Quick Conversion
========================================= */

function quickConvert(
    from,
    to,
    amount
) {

    if (
        !amountInput ||
        !fromCurrency ||
        !toCurrency
    )
        return;


    amountInput.value =
    amount;


    fromCurrency.value =
    from;


    toCurrency.value =
    to;


    convertCurrency();


    const converterSection =
    amountInput.closest("section");


    if (converterSection) {

        converterSection.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

}


/* =========================================
   Enter Key
========================================= */

if (amountInput) {

    amountInput.addEventListener(

        "keydown",

        event => {

            if (event.key === "Enter") {

                convertCurrency();

            }

        }

    );

}


/* =========================================
   Currency Change
========================================= */

if (fromCurrency) {

    fromCurrency.addEventListener(

        "change",

        () => {

            if (
                amountInput &&
                Number(amountInput.value) > 0
            ) {

                convertCurrency();

            }

        }

    );

}


if (toCurrency) {

    toCurrency.addEventListener(

        "change",

        () => {

            if (
                amountInput &&
                Number(amountInput.value) > 0
            ) {

                convertCurrency();

            }

        }

    );

}


/* =========================================
   Make Functions Available To HTML
========================================= */

window.convertCurrency =
convertCurrency;

window.quickConvert =
quickConvert;


/* =========================================
   Initial Conversion
========================================= */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        if (
            amountInput &&
            fromCurrency &&
            toCurrency &&
            result
        ) {

            convertCurrency();

        }

    }

);