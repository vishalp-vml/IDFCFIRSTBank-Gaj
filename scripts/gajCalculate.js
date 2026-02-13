$(document).ready(function () {

    $(".number").keypress(function (e) {
        var txt = String.fromCharCode(e.which);
        if (!txt.match(/[0-9]/)) {
            return false;
        }
    });



    $("#ci").keyup(function(e) {
        if ($(this).val() > 99.99 && e.keyCode !== 46 && e.keyCode !== 8) {
            e.preventDefault();
            $(this).val(99.99);
        }
    });

    // Comma function
    function commaNumber(val) {
        var x = val;
        x = x.toString();
        var lastThree = x.substring(x.length - 3);
        var otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers != "") lastThree = "," + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res;
    }

    // Tax Savings Loan Amout start
    var handleTax = $("#custom-handleTax-lakhs"),
        maxTax;
    $("#slider-taxLoanAmt").slider({
        range: "min",
        value: 50000,
        step: 1000,
        min: 1000,
        max: 500000,
        create: function () {
            maxTax = $("#slider-taxLoanAmt").slider("option", "value") / 100000;
            handleTax.text(maxTax + "L");
        },
        slide: function (event, ui) {
            $("#taxLoanAmt").val(commaNumber(ui.value));
            handleTax.text(ui.value / 100000 + "L");
        },
    });

    $("#taxLoanAmt").val(commaNumber($("#slider-taxLoanAmt").slider("value")));

    $("#taxLoanAmt").on("keyup", function (e) {
        commaNumber($("#slider-taxLoanAmt").slider("value", this.value));
    });

    $("#taxLoanAmt").on("focus", function (e) {
        $(this).val($(this).val().replace(/,/g, ""));
    });
    $("#taxLoanAmt").on("keyup keydown", function (e) {
        if ($(this).val() > 500000 && e.keyCode !== 46 && e.keyCode !== 8) {
            e.preventDefault();
            $(this).val(500000);
        }

        maxTax = $(this).val() / 100000;
        handleTax.text(maxTax + "L");
    });

    $("#taxLoanAmt").on("blur", function (e) {
        maxTax = $(this).val() / 100000;
        handleTax.text(maxTax + "L");

        var valInput = this.value;
        valInput = valInput.replace(/,/g, "");
        $(this).val(commaNumber(valInput));

        if (valInput < 99999) {
            e.preventDefault();
            $(this).val(100000);
            maxTax = $(this).val() / 100000;
            handleTax.text(maxTax + "L");
            $(this).val(commaNumber(100000));
        }
    });
    //End


    // Tax Savings Loan Amout start
    var handleTax = $("#custom-handleTax-lakhs1"),
        maxTax;
    $("#slider-taxLoanAmt1").slider({
        range: "min",
        value: 97000,
        step: 1000,
        min: 1000,
        max: 500000,
        create: function () {
            maxTax = $("#slider-taxLoanAmt1").slider("option", "value") / 100000;
            handleTax.text(maxTax + "L");
        },
        slide: function (event, ui) {
            $("#taxLoanAmt1").val(commaNumber(ui.value));
            handleTax.text(ui.value / 100000 + "L");
        },
    });

    $("#taxLoanAmt1").val(commaNumber($("#slider-taxLoanAmt1").slider("value")));

    $("#taxLoanAmt1").on("keyup", function (e) {
        commaNumber($("#slider-taxLoanAmt1").slider("value", this.value));
    });

    $("#taxLoanAmt1").on("focus", function (e) {
        $(this).val($(this).val().replace(/,/g, ""));
    });
    $("#taxLoanAmt1").on("keyup keydown", function (e) {
        if ($(this).val() > 500000 && e.keyCode !== 46 && e.keyCode !== 8) {
            e.preventDefault();
            $(this).val(500000);
        }

        maxTax = $(this).val() / 100000;
        handleTax.text(maxTax + "L");
    });

    $("#taxLoanAmt1").on("blur", function (e) {
        maxTax = $(this).val() / 100000;
        handleTax.text(maxTax + "L");

        var valInput = this.value;
        valInput = valInput.replace(/,/g, "");
        $(this).val(commaNumber(valInput));

        if (valInput < 99999) {
            e.preventDefault();
            $(this).val(100000);
            maxTax = $(this).val() / 100000;
            handleTax.text(maxTax + "L");
            $(this).val(commaNumber(100000));
        }
    });
    //End


    // Tax Savings Loan Amout start
    var handleTax = $("#custom-handleTax-lakh32"),
        maxTax;
    $("#slider-taxLoanAmt2").slider({
        range: "min",
        value: 30000,
        step: 1000,
        min: 1000,
        max: 500000,
        create: function () {
            maxTax = $("#slider-taxLoanAmt2").slider("option", "value") / 100000;
            handleTax.text(maxTax + "L");
        },
        slide: function (event, ui) {
            $("#taxLoanAmt2").val(commaNumber(ui.value));
            handleTax.text(ui.value / 100000 + "L");
        },
    });

    $("#taxLoanAmt2").val(commaNumber($("#slider-taxLoanAmt2").slider("value")));

    $("#taxLoanAmt2").on("keyup", function (e) {
        commaNumber($("#slider-taxLoanAmt2").slider("value", this.value));
    });

    $("#taxLoanAmt2").on("focus", function (e) {
        $(this).val($(this).val().replace(/,/g, ""));
    });
    $("#taxLoanAmt2").on("keyup keydown", function (e) {
        if ($(this).val() > 500000 && e.keyCode !== 46 && e.keyCode !== 8) {
            e.preventDefault();
            $(this).val(500000);
        }

        maxTax = $(this).val() / 100000;
        handleTax.text(maxTax + "L");
    });

    $("#taxLoanAmt2").on("blur", function (e) {
        maxTax = $(this).val() / 100000;
        handleTax.text(maxTax + "L");

        var valInput = this.value;
        valInput = valInput.replace(/,/g, "");
        $(this).val(commaNumber(valInput));

        if (valInput < 99999) {
            e.preventDefault();
            $(this).val(100000);
            maxTax = $(this).val() / 100000;
            handleTax.text(maxTax + "L");
            $(this).val(commaNumber(100000));
        }
    });
    //End


    // ---------------- SLIDER --------------------
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




    

})
