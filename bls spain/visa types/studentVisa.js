// ==UserScript==
// @name         BLS Algeria - Student Visa Auto-Fill
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Auto-fill BLS Algeria for Student visa appointments (user must manually fill personal data in code below)
// @author       @bessou
// @match        *://*.bls.algeria.blsspainvisa.com/*
// @grant        none
// ==/UserScript==
(function sayHi() {
    'use strict';
    let code = "";
    for (let i = 0; i <= document.scripts.length; i++) {
        if (document.scripts[i]?.text?.includes("available_dates")) {
            code = document.scripts[i].text;
            doMagic();
        }
    }

    function doMagic() {
        const bgn = code.indexOf("available_dates");
        const end = code.indexOf("fullCapicity_dates");
        const table = code.slice(bgn + 20, end - 9);
        if (table !== "") {
            const datee = table.slice(0, 10);
            const dd = datee.slice(0, 2);
            const mm = datee.slice(3, 5);
            const yyyy = datee.slice(6, 10);
            const dateeFin = [yyyy, mm, dd];
            const finDate = dateeFin.join("-");
            if (document.getElementById("app_date").value.length === 0 && finDate !== "") {
                $('#app_date').datepicker("update", finDate);
            } else {
                // === USER: FILL YOUR INFO HERE ===
                document.getElementById('first_name').value = "";         // First Name
                document.getElementById('last_name').value = "";          // Last Name
                $('#dateOfBirth').datepicker("update", "");              // Date of Birth yyyy-mm-dd
                document.getElementById('passport_no').value = "";        // Passport Number
                $('#pptIssueDate').datepicker("update", "");            // Passport Issue Date yyyy-mm-dd
                $('#pptExpiryDate').datepicker("update", "");           // Passport Expiry Date yyyy-mm-dd
                document.getElementById('pptIssuePalace').value = "";     // Passport Issue Place
                if (document.getElementById('fran')) document.getElementById('fran').value = ""; // Franchise

                // === AUTO SELECTION ===
                if (document.getElementById("app_time")) document.getElementById("app_time").selectedIndex = document.getElementById("app_time").length - 1;
                if (document.getElementById("VisaTypeId")) document.getElementById("VisaTypeId").selectedIndex = 5; // Student Visa
                if (document.getElementById("passportType")) document.getElementById("passportType").selectedIndex = 7;
                if (document.getElementById("vasId12")) $("#vasId12").prop("checked", true);

                new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-the-sound-pack-tree/tspt_german_ambulance_sirens_wailing_loop_041.mp3').play();
            }
        }

        if (document.getElementById("app_date").value.length === 0) {
            setTimeout(function () { window.location.reload(1); }, 30000);
        }

        function clicksubmit() {
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
                console.log('click SUBMIT');
                document.getElementsByClassName("btn primary-btn")[0]?.click();
            }
        }

        const stopconsubmit = setInterval(clicksubmit, 10000);

        document.getElementsByClassName("btn primary-btn")[0].onclick = function () {
            console.log('STOP CLICKING SUBMIT');
            clearTimeout(stopconsubmit);
        };

        console.log("End of code run");
    }
})();
