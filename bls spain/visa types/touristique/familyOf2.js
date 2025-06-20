// ==UserScript==
// @name         FML-P4 (BLS Algeria)
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Autofill multiperson BLS Algeria appointments (Tourist Visa)
// @author       @bessou
// @match        *://*.bls.algeria.blsspainvisa.com/*
// @grant        none
// ==/UserScript==

(function sayHi() {
    let code = "";
    if (document.scripts[11]?.text?.includes("available_dates")) {
        code = document.scripts[11].text;
        TheBigBro();
    } else if (document.scripts[12]?.text?.includes("available_dates")) {
        code = document.scripts[12].text;
        TheBigBro();
    } else {
        console.log("script number is wrong");
    }

    'use strict';
    function TheBigBro() {
        let bgn = code.indexOf("available_dates");
        let end = code.indexOf("fullCapicity_dates");
        let table = code.slice(bgn + 20, end - 9);
        if (table !== "") {
            let datee = table.slice(0, 10);
            let dd = datee.slice(0, 2);
            let mm = datee.slice(3, 5);
            let yyyy = datee.slice(6, 10);
            let dateeFin = [yyyy, mm, dd];
            let finDate = dateeFin.join("-");
            if (document.getElementById("app_date").value.length === 0 && finDate !== "") {
                $('#app_date').datepicker("update", finDate);
            } else if (document.title == "504 Gateway Time-out" || document.title == "502 Bad Gateway" || document.title == "504 Gateway Timeout") {
                window.setTimeout(function () { location.reload(); }, 500);
            } else {
                // === USER: FILL YOUR INFO HERE ===
                let lastNames = ["", ""],
                    firstNames = ["", ""],
                    births = ["", ""],
                    passNumbers = ["", ""],
                    issueDates = ["", ""],
                    expiryDates = ["", ""],
                    pptissuePalaces = ["", ""];

                let number = 2,
                    j = 1;

                setTimeout(function () {
                    for (let i = 0; i < number; i++) {
                        document.getElementById('app_time-' + j).selectedIndex = document.getElementById('app_time-' + j).length - 1;
                        document.getElementById('VisaTypeId-' + j).selectedIndex = 1; // Tourist Visa
                        document.getElementById('first_name-' + j).value = firstNames[i];
                        document.getElementById('last_name-' + j).value = lastNames[i];
                        document.getElementById('passport_number-' + j).value = passNumbers[i];
                        $('#date_of_birth-' + j).datepicker("update", births[i]);
                        $('#pptIssueDate-' + j).datepicker("update", issueDates[i]);
                        $('#pptExpiryDate-' + j).datepicker("update", expiryDates[i]);
                        document.getElementById('pptIssuePalace-' + j).value = pptissuePalaces[i];
                        j++;
                    }
                }, 4000);
            }
        }

        if (document.getElementById("app_date").value.length === 0) {
            setTimeout(function () { window.location.reload(1); }, 19000);
        }
    }
})();
