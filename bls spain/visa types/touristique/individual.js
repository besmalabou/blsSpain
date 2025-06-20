// ==UserScript==
// @name         BLS Algeria Auto-Fill - Tourist Visa
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto-fill and submit form for BLS Algeria - Tourist visa only 🇩🇿✈️
// @author       @bessou
// @match        *://*.bls.algeria.blsspainvisa.com/*
// @grant        none
// ==/UserScript==

(function touristAuto() {
    'use strict';
    let code = "";
    const Days = [];

    for (var i = 0; i <= document.scripts.length; i++) {
        if (document.scripts[i]?.text?.includes("available_dates")) {
            code = document.scripts[i].text;
            processAvailableDate();
        }
    }

    function processAvailableDate() {
        var bgn = code.indexOf("available_dates");
        var end = code.indexOf("fullCapicity_dates");
        var table = code.slice(bgn + 20, end - 9);

        if (table !== "") {
            var dateRaw = table.slice(0, 10);
            var dd = dateRaw.slice(0, 2);
            var mm = dateRaw.slice(3, 5);
            var yyyy = dateRaw.slice(6, 10);
            var formattedDate = [yyyy, mm, dd].join("-");

            if (document.getElementById("app_date").value.length === 0 && formattedDate !== "") {
                $('#app_date').datepicker("update", formattedDate);
            } else {
                // === Fill Form Fields === //
                var lastName = "YourLastName";
                var firstName = "YourFirstName";
                var dob = "1990-01-01";
                var passport = "DZ123456";
                var issueDate = "2020-01-01";
                var expiryDate = "2030-01-01";
                var issuePlace = "Algiers";
                var refNum = "TG700******";

                document.getElementById('first_name').value = firstName;
                document.getElementById('last_name').value = lastName;
                $('#dateOfBirth').datepicker("update", dob);
                document.getElementById('passport_no').value = passport;
                $('#pptIssueDate').datepicker("update", issueDate);
                $('#pptExpiryDate').datepicker("update", expiryDate);
                document.getElementById('pptIssuePalace').value = issuePlace;

                if (document.getElementById("app_time")) {
                    document.getElementById("app_time").selectedIndex = document.getElementById('app_time').length - 1;
                }

                if (document.getElementById("VisaTypeId")) {
                    document.getElementById("VisaTypeId").selectedIndex = 1; // Change index if needed
                }

                if (document.getElementById('fran')) {
                    document.getElementById('fran').value = refNum;
                }

                if (document.getElementById("passportType")) {
                    document.getElementById("passportType").selectedIndex = 7;
                }

                if (document.getElementById("vasId12")) {
                    $("#vasId12").prop("checked", true);
                }

                // === Play Alert Sound === //
                var audio = new Audio('https://www.soundjay.com/button/sounds/beep-07.mp3');
                audio.play();
            }
        }

        if (document.getElementById("app_date").value.length === 0) {
            setTimeout(function () {
                window.location.reload(true);
            }, 30000);
        }

        // === Auto Submit === //
        function autoSubmit() {
            if (
                document.getElementById("app_date").value !== "" &&
                document.getElementById("app_time").value !== "" &&
                document.getElementById("VisaTypeId").value !== "" &&
                document.getElementById("first_name").value !== "" &&
                document.getElementById("last_name").value !== "" &&
                document.getElementById("dateOfBirth").value !== "" &&
                document.getElementById("passportType").value !== "" &&
                document.getElementById("passport_no").value !== "" &&
                document.getElementById("pptIssueDate").value !== "" &&
                document.getElementById("pptExpiryDate").value !== "" &&
                document.getElementById("pptIssuePalace").value !== ""
            ) {
                console.log("✅ Auto submitting...");
                document.getElementsByClassName("btn primary-btn")[0].click();
            }
        }

        var autoSubmitInterval = setInterval(autoSubmit, 10000);

        document.getElementsByClassName("btn primary-btn")[0].onclick = function () {
            console.log("🛑 Stopped auto-submitting");
            clearInterval(autoSubmitInterval);
        };
    }
})();
