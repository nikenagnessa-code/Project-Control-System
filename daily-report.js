// =====================================================
// ACTIVITY → MASTER DATA
// =====================================================

activitySelect.addEventListener("change", function () {

    const selectedId = activitySelect.value;

    const selectedActivity = schedule.find(function (item) {
        return String(item.activityId) === String(selectedId);
    });

    if (!selectedActivity) {
        clearActivityDetails(row);
        return;
    }

    // ---------------------------------------------
    // STORE MASTER ACTIVITY ID
    // ---------------------------------------------

    row.dataset.activityId = selectedActivity.activityId;

    // ---------------------------------------------
    // PLANNED QUANTITY
    // ---------------------------------------------

    if (plannedInput) {

        plannedInput.value =
            Number(selectedActivity.plannedQuantity || 0);

    }

    // ---------------------------------------------
    // UNIT
    // ---------------------------------------------

    if (unitInput) {

        unitInput.value =
            selectedActivity.quantityUnit || "";

    }

    // ---------------------------------------------
    // STORE WEIGHT
    // ---------------------------------------------

    row.dataset.weight =
        Number(selectedActivity.weight || 0);

    // ---------------------------------------------
    // RESET ACTUAL
    // ---------------------------------------------

    if (quantityInput) {
        quantityInput.value = "";
    }

    // ---------------------------------------------
    // RESET DAILY PROGRESS
    // ---------------------------------------------

    if (progressInput) {
        progressInput.value = "0.00";
    }

    console.log(
        "Selected activity:",
        selectedActivity
    );

});


// =====================================================
// ACTUAL TODAY → DAILY PROGRESS
// =====================================================

// Gunakan event delegation.
// Ini lebih aman karena activity row dibuat secara dinamis.

document.addEventListener("input", function (event) {

    if (!event.target.classList.contains("activity-quantity")) {
        return;
    }

    const row = event.target.closest(".activity-row");

    if (!row) {
        return;
    }

    calculateDailyProgress(row);

});


// =====================================================
// PARSE ANGKA FORMAT INDONESIA
// =====================================================

function parseNumber(value) {

    if (value === null || value === undefined) {
        return 0;
    }

    let text = String(value).trim();

    if (text === "") {
        return 0;
    }

    // Hapus spasi
    text = text.replace(/\s/g, "");

    /*
     * Format Indonesia:
     * 2,562      → 2.562
     * 1.234,56   → 1234.56
     * 1234.56    → 1234.56
     */

    if (
        text.includes(".") &&
        text.includes(",")
    ) {

        // Contoh: 1.234,56
        text = text.replace(/\./g, "");
        text = text.replace(",", ".");

    } else if (text.includes(",")) {

        // Contoh: 2,6 atau 2,562
        text = text.replace(",", ".");

    }

    const number = Number(text);

    return Number.isFinite(number)
        ? number
        : 0;

}


// =====================================================
// CALCULATE DAILY PROGRESS
// =====================================================

function calculateDailyProgress(row) {

    const plannedInput =
        row.querySelector(".activity-planned");

    const quantityInput =
        row.querySelector(".activity-quantity");

    const progressInput =
        row.querySelector(".activity-progress");


    // ---------------------------------------------
    // CHECK ELEMENT
    // ---------------------------------------------

    if (
        !plannedInput ||
        !quantityInput ||
        !progressInput
    ) {

        console.warn(
            "Daily progress element tidak ditemukan.",
            row
        );

        return;

    }


    // ---------------------------------------------
    // GET VALUES
    // ---------------------------------------------

    const planned =
        parseNumber(plannedInput.value);

    const actualToday =
        parseNumber(quantityInput.value);


    console.log(
        "CALCULATE PROGRESS:",
        {
            planned: planned,
            actualToday: actualToday
        }
    );


    // ---------------------------------------------
    // NO PLANNED QUANTITY
    // ---------------------------------------------

    if (planned <= 0) {

        progressInput.value = "0.00";

        return;

    }


    // ---------------------------------------------
    // NO ACTUAL TODAY
    // ---------------------------------------------

    if (actualToday <= 0) {

        progressInput.value = "0.00";

        return;

    }


    // ---------------------------------------------
    // CALCULATION
    // ---------------------------------------------

    let progress =
        (actualToday / planned) * 100;


    // ---------------------------------------------
    // LIMIT 0–100%
    // ---------------------------------------------

    progress =
        Math.max(
            0,
            Math.min(
                progress,
                100
            )
        );


    // ---------------------------------------------
    // DISPLAY
    // ---------------------------------------------

    progressInput.value =
        progress.toFixed(2);


    console.log(
        "DAILY PROGRESS RESULT:",
        progressInput.value
    );

}
