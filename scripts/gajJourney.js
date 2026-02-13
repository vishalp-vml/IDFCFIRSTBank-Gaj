
$(function () {
  const suggestions = [
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Kanpur"
  ];

  $("#gajCityname").autocomplete({
    source: suggestions,
    minLength: 1
  });
});



// LIMIT 10 digits for Mobile
$("#gajMobileNumber").on("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10);
});
$("#gajPincode").on("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 6);
});


// ---------- SLIDER INITIALIZATION ----------
var handleTax = $("#custom-handleTax-lakhs3"),
    maxTax;

$("#slider-taxLoanAmt3").slider({
    range: "min",
    value: 5000000, // default 50L
    min: 5000000,
    max: 10000000,
    step: 100000,
    create: function () {
        maxTax = $("#slider-taxLoanAmt3").slider("value") / 100000;
        handleTax.text(maxTax + "L");
    },
    slide: function (event, ui) {
        $("#taxLoanAmt3").val(commaNumber(ui.value));
        handleTax.text(ui.value / 100000 + "L");
    }
});

$("#taxLoanAmt3").val(commaNumber($("#slider-taxLoanAmt3").slider("value")));


// ---------- INPUT BOX EVENTS ----------
$("#taxLoanAmt3").on("keyup", function () {
    let v = parseInt($(this).val().replace(/,/g, "")) || 0;

    // clamp within slider min & max
    let min = $("#slider-taxLoanAmt3").slider("option", "min");
    let max = $("#slider-taxLoanAmt3").slider("option", "max");

    if (v < min) v = min;
    if (v > max) v = max;

    $("#slider-taxLoanAmt3").slider("value", v);
    handleTax.text(v / 100000 + "L");
});

$("#taxLoanAmt3").on("focus", function () {
    $(this).val($(this).val().replace(/,/g, ""));
});

$("#taxLoanAmt3").on("blur", function () {
    var valInput = this.value.replace(/,/g, "");
    var v = parseInt(valInput) || 0;

    let min = $("#slider-taxLoanAmt3").slider("option", "min");
    let max = $("#slider-taxLoanAmt3").slider("option", "max");

    if (v < min) v = min;
    if (v > max) v = max;

    $(this).val(commaNumber(v));
    $("#slider-taxLoanAmt3").slider("value", v);
    handleTax.text(v / 100000 + "L");
});


// ---------- CTA BUTTONS (Dynamic Range Change) ----------
$(".cta-btn").on("click", function () {

    let minVal = parseInt($(this).data("min"));
    let maxVal = parseInt($(this).data("max"));

    // Update slider min & max dynamically
    $("#slider-taxLoanAmt3").slider("option", "min", minVal);
    $("#slider-taxLoanAmt3").slider("option", "max", maxVal);

    // Reset slider to new min value
    $("#slider-taxLoanAmt3").slider("value", minVal);

    // Update input & handle bubble
    $("#taxLoanAmt3").val(commaNumber(minVal));
    handleTax.text(minVal / 100000 + "L");

    // UI active state
    $(".cta-btn").removeClass("active");
    $(this).addClass("active");
});

// $('#gajJourney').modal('show');
  // ------------------------------
// Utility: Show Error
// ------------------------------

document.addEventListener("click", function (e) {

    if (e.target.closest(".prevCta")) {

        const currentScreen = e.target.closest("[class*='gaj-journey-screen']");
        if (!currentScreen) return;

        // Get current screen number
        const match = currentScreen.className.match(/gaj-journey-screen-(\d+)/);
        if (!match) return;

        const currentNumber = parseInt(match[1]);

        if (currentNumber > 1) {
            goToScreen(currentNumber - 1);
        }
    }

});



function showError(element, message) {

    let group;

    // If element itself is form-group
    if (element.classList.contains("form-group")) {
        group = element;
    } else {
        group = element.closest(".form-group");
    }

    if (!group) return;

    // Remove old error
    group.querySelectorAll(".error-msg").forEach(e => e.remove());

    let msg = document.createElement("div");
    msg.className = "error-msg";
    msg.style.color = "#ff4d4d";
    msg.style.fontSize = "13px";
    msg.style.marginTop = "5px";
    msg.textContent = message;

    group.appendChild(msg);
}



function clearFieldError(input) {
    input.classList.remove("error");
    const group = input.closest(".form-group");
    if (group) {
        group.querySelectorAll(".error-msg").forEach(e => e.remove());
    }
}


function clearErrors(container) {
    container.querySelectorAll(".error-msg").forEach(e => e.remove());
    container.querySelectorAll(".error").forEach(e => e.classList.remove("error"));
}

function goToScreen(num) {
    document
        .querySelectorAll("[class*='gaj-journey-screen']")
        .forEach(s => s.classList.add("hide"));

    document
        .querySelector(".gaj-journey-screen-" + num)
        .classList.remove("hide");

    window.scrollTo({ top: 0, behavior: "smooth" });
}
const validators = {
    gajPanNumber: {
        regex: /^[A-Za-z][A-Za-z\s']*[A-Za-z]$/,
        message: "Enter full name as per PAN card"
    },
    gajMobileNumber: {
        regex: /^[6789]\d{9}$/,
        message: "Enter valid 10-digit mobile number",
        sanitize: v => v.replace(/\D/g, "").slice(0, 10)
    },
    gajEmailID: {
        regex: /^[a-zA-Z][a-zA-Z0-9._]+[^_\-\.]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Enter valid email address"
    },
    gajPincode: {
        regex: /^\d{6}$/,
        message: "Enter valid 6-digit PIN code",
        sanitize: v => v.replace(/\D/g, "").slice(0, 6)
    },
    gajCityname: {
        minLength: 2,
        message: "Enter valid city name"
    }
};
validators.gajOccupation = {
    required: true,
    message: "Please select your occupation"
};

validators.gajAnnualIncome = {
    regex: /^[1-9]\d{6,}$/, // min 10,00,000
    message: "Enter valid annual income (minimum ₹10,00,000)",
    sanitize: v => v.replace(/\D/g, "")
};
function validateField(input) {
    const rule = validators[input.id];
    if (!rule) return true;

    let value = input.value.trim();

    if (rule.sanitize) {
        value = rule.sanitize(value);
        input.value = value;
    }

    let valid = true;

    if (rule.required && value === "") valid = false;
    if (rule.regex && !rule.regex.test(value)) valid = false;
    if (rule.minLength && value.length < rule.minLength) valid = false;

    if (!valid) {
        showError(input, rule.message);
        return false;
    }

    clearFieldError(input);
    return true;
}
function attachRealTimeValidation(screen) {
    screen.querySelectorAll("input, textarea").forEach(input => {
        if (!validators[input.id]) return;

        input.addEventListener("input", () => validateField(input));
        input.addEventListener("blur", () => validateField(input));
    });
}
const screen1 = document.querySelector(".gaj-journey-screen-1");
attachRealTimeValidation(screen1);

screen1.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors(screen1);

    let valid = true;

    screen1.querySelectorAll("input").forEach(input => {
        if (!validateField(input)) valid = false;
    });

    if (!valid) return;
    goToScreen(2);
});




$('#gajOccupation').selectmenu({
    change: function () {

        let value = $(this).val();
        let fieldWrapper = $(this).closest('.field-select');

        // Float label
        fieldWrapper.toggleClass('has-value', !!value);

        // Show/hide "Other" field
        if (value === "Other") {
            $('#otherOccupationWrapper').removeClass('d-none');
        } else {
            $('#otherOccupationWrapper')
                .addClass('d-none')
                .find('input')
                .val(''); // clear value if hidden
        }
    }
});

const screen2 = document.querySelector(".gaj-journey-screen-2");
attachRealTimeValidation(screen2);

screen2.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors(screen2);

    let valid = true;

    const occupation = document.getElementById("gajOccupation");
    const income = document.getElementById("gajAnnualIncome");

    if (!validateField(occupation)) valid = false;
    if (!validateField(income)) valid = false;

    if (!valid) return;

    goToScreen(3);
});

// Toggle Bank Details on radio change
document.addEventListener("change", function (e) {
    console.log("Changed element:", e.target);

    if (e.target.name === "yes_no") {

        const screen = e.target.closest(".gaj-journey-screen-3");
        if (!screen) return;

        const bankDetails = screen.querySelector("#bankDetails");
        const otherDetails = screen.querySelector("#otherDetails");
        const custID = screen.querySelector("#CustomerID");
        const rm = screen.querySelector("#RelationshipManager");

        if(e.target.value === "no"){
            otherDetails.classList.remove("d-none");
        }else{
            otherDetails.classList.add("d-none");
        }

        if (e.target.value === "yes") {
            bankDetails.classList.remove("d-none");
        } else {
            bankDetails.classList.add("d-none");

            custID.value = "";
            rm.value = "";

            clearFieldError(custID);
            clearFieldError(rm);
        }
    }
});





document.querySelector(".gaj-journey-screen-3 form")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const screen = e.target.closest(".gaj-journey-screen-3");
    clearErrors(screen);

    let valid = true;

    // ✅ VERY IMPORTANT: Scope inside current screen
    const yesNo = screen.querySelector("input[name='yes_no']:checked");
    const radioGroup = screen.querySelector(".radio-group");
    const custID = screen.querySelector("#CustomerID");

    if (!yesNo) {
        showError(radioGroup, "Please select Yes or No");
        valid = false;
    }

    if (yesNo && yesNo.value === "yes" && custID.value.trim() === "") {
        showError(custID, "Please enter Customer ID");
        valid = false;
    }

    if (!valid) return;

    goToScreen(4);
});





document.querySelector(".gaj-journey-screen-4 form")
.addEventListener("submit", function(e) {
    e.preventDefault();

    const agree = document.getElementById("gajTnc");

    if (!agree.checked) {
        showError(
            document.querySelector(".checkbox-group"),
            "You must agree before proceeding"
        );
        return;
    }

    goToScreen(5);
});
