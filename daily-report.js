// =====================================================
// ACTIVITY → MASTER DATA
// =====================================================

activitySelect.addEventListener(
    "change",
    function () {

        const selectedId =
            activitySelect.value;

        const selectedActivity =
            schedule.find(function (item) {

                return String(item.activityId) ===
                    String(selectedId);

            });


        if (!selectedActivity) {

            clearActivityDetails(row);

            return;

        }


        // ---------------------------------------------
        // STORE MASTER ACTIVITY ID
        // ---------------------------------------------

        row.dataset.activityId =
            selectedActivity.activityId;


        // ---------------------------------------------
        // PLANNED QUANTITY
        // ---------------------------------------------

        if (plannedInput) {

            plannedInput.value =
                Number(
                    selectedActivity.plannedQuantity || 0
                );

        }


        // ---------------------------------------------
        // UNIT
        // ---------------------------------------------

        if (unitInput) {

            unitInput.value =
                selectedActivity.quantityUnit ||
                "";

        }


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


        // ---------------------------------------------
        // STORE WEIGHT
        // ---------------------------------------------

        row.dataset.weight =
            Number(
                selectedActivity.weight || 0
            );


        console.log(
            "Selected activity:",
            selectedActivity
        );

    }
);


// =====================================================
// ACTUAL TODAY → DAILY PROGRESS
// =====================================================

if (quantityInput) {

    quantityInput.addEventListener(
        "input",
        function () {

            calculateDailyProgress(row);

        }
    );

}


// =====================================================
// CALCULATE DAILY PROGRESS
// =====================================================

function calculateDailyProgress(row) {

    const plannedInput =
        row.querySelector(
            ".activity-planned"
        );


    const quantityInput =
        row.querySelector(
            ".activity-quantity"
        );


    const progressInput =
        row.querySelector(
            ".activity-progress"
        );


    if (
        !plannedInput ||
        !quantityInput ||
        !progressInput
    ) {

        return;

    }


    const planned =
        parseFloat(
            plannedInput.value
        ) || 0;


    const actualToday =
        parseFloat(
            quantityInput.value
        ) || 0;


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

        progressInput.value =
            "0.00";

        return;

    }


    // ---------------------------------------------
    // NO ACTUAL
    // ---------------------------------------------

    if (actualToday <= 0) {

        progressInput.value =
            "0.00";

        return;

    }


    // ---------------------------------------------
    // CALCULATION
    // ---------------------------------------------

    let progress =
        (
            actualToday /
            planned
        ) * 100;


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

}
