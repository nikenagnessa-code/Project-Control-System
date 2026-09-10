// =====================================================
// DAILY REPORT SYSTEM
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // =================================================
    // MASTER SCHEDULE
    // =================================================

    const schedule =
        typeof masterSchedule !== "undefined" &&
        Array.isArray(masterSchedule)
            ? masterSchedule
            : [];

    console.log("MASTER SCHEDULE:", schedule);


    // =================================================
    // STORAGE
    // =================================================

    const REPORT_STORAGE_KEY = "dailyReports";


    // =================================================
    // DOM ELEMENTS
    // =================================================

    const reportForm =
        document.getElementById("dailyReportForm");

    const reportDate =
        document.getElementById("reportDate");

    const weather =
        document.getElementById("weather");

    const location =
        document.getElementById("location");

    const project =
        document.getElementById("project");

    const unit =
        document.getElementById("unit");

    const foreman =
        document.getElementById("foreman");

    const headWorker =
        document.getElementById("headWorker");

    const skilledWorker =
        document.getElementById("skilledWorker");

    const staffOffice =
        document.getElementById("staffOffice");

    const normalHours =
        document.getElementById("normalHours");

    const overtimeHours =
        document.getElementById("overtimeHours");

    const activityContainer =
        document.getElementById("activityContainer") ||
        document.getElementById("activityList") ||
        document.querySelector("#activityRows");

    const addActivityButton =
        document.getElementById("addActivity");

    const materialsContainer =
        document.getElementById("materialsContainer") ||
        document.getElementById("materialList");

    const addMaterialButton =
        document.getElementById("addMaterial");

    const notes =
        document.getElementById("notes");


    // =================================================
    // GET MASTER SCHEDULE
    // =================================================

    function getMasterSchedule() {

        if (
            typeof masterSchedule !== "undefined" &&
            Array.isArray(masterSchedule)
        ) {
            return masterSchedule;
        }

        if (
            typeof window.masterSchedule !== "undefined" &&
            Array.isArray(window.masterSchedule)
        ) {
            return window.masterSchedule;
        }

        return [];
    }


    // =================================================
    // NUMBER PARSER
    // =================================================

    function parseNumber(value) {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return 0;
        }

        let text =
            String(value)
                .trim()
                .replace(/\s/g, "");

        if (text === "") {
            return 0;
        }

        /*
         * Format:
         *
         * 2,6
         * 2.6
         * 1.234,56
         * 1234.56
         */

        if (
            text.includes(".") &&
            text.includes(",")
        ) {

            text =
                text.replace(/\./g, "")
                    .replace(",", ".");

        }
        else if (text.includes(",")) {

            text =
                text.replace(",", ".");

        }

        const result =
            Number(text);

        return Number.isFinite(result)
            ? result
            : 0;
    }


    // =================================================
    // FIND MASTER ACTIVITY
    // =================================================

    function findScheduleActivity(activityId) {

        const schedule =
            getMasterSchedule();

        return schedule.find(function (item) {

            return String(item.activityId) ===
                String(activityId);

        });
    }


    // =================================================
    // GET WORK PACKAGES
    // =================================================

    function getWorkPackages() {

        const schedule =
            getMasterSchedule();

        const packages = [];

        schedule.forEach(function (item) {

            if (!item.workPackage) {
                return;
            }

            if (
                !packages.includes(
                    item.workPackage
                )
            ) {
                packages.push(
                    item.workPackage
                );
            }

        });

        return packages;
    }


    // =================================================
    // CREATE ACTIVITY ROW
    // =================================================

    function createActivityRow() {

        if (!activityContainer) {

            console.error(
                "Activity container tidak ditemukan."
            );

            return null;
        }


        const row =
            document.createElement("div");

        row.className =
            "activity-row";


        // =============================================
        // WORK PACKAGE
        // =============================================

        const workPackageSelect =
            document.createElement("select");

        workPackageSelect.className =
            "activity-work-package";

        workPackageSelect.required = true;


        const packagePlaceholder =
            document.createElement("option");

        packagePlaceholder.value = "";

        packagePlaceholder.textContent =
            "Select Work Package";

        workPackageSelect.appendChild(
            packagePlaceholder
        );


        getWorkPackages().forEach(
            function (packageName) {

                const option =
                    document.createElement("option");

                option.value =
                    packageName;

                option.textContent =
                    packageName;

                workPackageSelect.appendChild(
                    option
                );

            }
        );


        // =============================================
        // ACTIVITY
        // =============================================

        const activitySelect =
            document.createElement("select");

        activitySelect.className =
            "activity-name";

        activitySelect.required = true;

        activitySelect.disabled = true;


        const activityPlaceholder =
            document.createElement("option");

        activityPlaceholder.value = "";

        activityPlaceholder.textContent =
            "Select Activity";

        activitySelect.appendChild(
            activityPlaceholder
        );


        // =============================================
        // PLANNED QUANTITY
        // =============================================

        const plannedInput =
            document.createElement("input");

        plannedInput.type =
            "text";

        plannedInput.className =
            "activity-planned";

        plannedInput.readOnly = true;


        // =============================================
        // ACTUAL TODAY
        // =============================================

        const quantityInput =
            document.createElement("input");

        quantityInput.type =
            "text";

        quantityInput.className =
            "activity-quantity";

        quantityInput.placeholder =
            "0";

        quantityInput.required =
            true;


        // =============================================
        // UNIT
        // =============================================

        const unitInput =
            document.createElement("input");

        unitInput.type =
            "text";

        unitInput.className =
            "activity-unit";

        unitInput.readOnly = true;


        // =============================================
        // DAILY PROGRESS
        // =============================================

        const progressInput =
            document.createElement("input");

        progressInput.type =
            "text";

        progressInput.className =
            "activity-progress";

        progressInput.readOnly = true;

        progressInput.value =
            "0.00";


        // =============================================
        // STATUS
        // =============================================

        const statusSelect =
            document.createElement("select");

        statusSelect.className =
            "activity-status";

        statusSelect.required =
            true;


        const statusOptions = [
            "Not Started",
            "On Progress",
            "Completed",
            "Delayed"
        ];


        statusOptions.forEach(
            function (status) {

                const option =
                    document.createElement("option");

                option.value =
                    status;

                option.textContent =
                    status;

                statusSelect.appendChild(
                    option
                );

            }
        );


        // =============================================
        // REMOVE BUTTON
        // =============================================

        const removeButton =
            document.createElement("button");

        removeButton.type =
            "button";

        removeButton.className =
            "remove-activity";

        removeButton.textContent =
            "Remove";


        // =============================================
        // APPEND ELEMENTS
        // =============================================

        row.appendChild(
            workPackageSelect
        );

        row.appendChild(
            activitySelect
        );

        row.appendChild(
            plannedInput
        );

        row.appendChild(
            quantityInput
        );

        row.appendChild(
            unitInput
        );

        row.appendChild(
            progressInput
        );

        row.appendChild(
            statusSelect
        );

        row.appendChild(
            removeButton
        );


        // =============================================
        // WORK PACKAGE → ACTIVITY
        // =============================================

        workPackageSelect.addEventListener(
            "change",
            function () {

                const selectedPackage =
                    workPackageSelect.value;


                activitySelect.innerHTML = "";


                const placeholder =
                    document.createElement("option");

                placeholder.value = "";

                placeholder.textContent =
                    "Select Activity";

                activitySelect.appendChild(
                    placeholder
                );


                activitySelect.disabled =
                    !selectedPackage;


                plannedInput.value =
                    "";

                unitInput.value =
                    "";

                quantityInput.value =
                    "";

                progressInput.value =
                    "0.00";


                row.dataset.activityId =
                    "";

                row.dataset.weight =
                    "0";


                if (!selectedPackage) {
                    return;
                }


                const activities =
                    getMasterSchedule().filter(
                        function (item) {

                            return item.workPackage ===
                                selectedPackage;

                        }
                    );


                activities.forEach(
                    function (item) {

                        const option =
                            document.createElement(
                                "option"
                            );

                        option.value =
                            item.activityId;

                        option.textContent =
                            item.activity;

                        activitySelect.appendChild(
                            option
                        );

                    }
                );


                console.log(
                    "Activities loaded:",
                    activities
                );

            }
        );


        // =============================================
        // ACTIVITY → MASTER DATA
        // =============================================

        activitySelect.addEventListener(
            "change",
            function () {

                const selectedId =
                    activitySelect.value;


                const selectedActivity =
                    findScheduleActivity(
                        selectedId
                    );


                if (!selectedActivity) {

                    plannedInput.value =
                        "";

                    unitInput.value =
                        "";

                    quantityInput.value =
                        "";

                    progressInput.value =
                        "0.00";

                    row.dataset.activityId =
                        "";

                    row.dataset.weight =
                        "0";

                    return;
                }


                // -------------------------------------
                // STORE ACTIVITY ID
                // -------------------------------------

                row.dataset.activityId =
                    selectedActivity.activityId;


                // -------------------------------------
                // PLANNED QUANTITY
                // -------------------------------------

                plannedInput.value =
                    selectedActivity.plannedQuantity ??
                    0;


                // -------------------------------------
                // UNIT
                // -------------------------------------

                unitInput.value =
                    selectedActivity.quantityUnit ||
                    "";


                // -------------------------------------
                // WEIGHT
                // -------------------------------------

                row.dataset.weight =
                    Number(
                        selectedActivity.weight || 0
                    );


                // -------------------------------------
                // RESET ACTUAL
                // -------------------------------------

                quantityInput.value =
                    "";


                // -------------------------------------
                // RESET PROGRESS
                // -------------------------------------

                progressInput.value =
                    "0.00";


                console.log(
                    "Selected Activity:",
                    selectedActivity
                );

            }
        );


        // =============================================
        // ACTUAL TODAY → DAILY PROGRESS
        // =============================================

        quantityInput.addEventListener(
            "input",
            function () {

                calculateDailyProgress(
                    row
                );

            }
        );


        quantityInput.addEventListener(
            "change",
            function () {

                calculateDailyProgress(
                    row
                );

            }
        );


        // =============================================
        // REMOVE ACTIVITY
        // =============================================

        removeButton.addEventListener(
            "click",
            function () {

                row.remove();

            }
        );


        activityContainer.appendChild(
            row
        );


        return row;
    }


    // =================================================
    // CALCULATE DAILY PROGRESS
    // =================================================

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
            parseNumber(
                plannedInput.value
            );


        const actualToday =
            parseNumber(
                quantityInput.value
            );


        if (
            planned <= 0 ||
            actualToday <= 0
        ) {

            progressInput.value =
                "0.00";

            return;
        }


        let progress =
            (
                actualToday /
                planned
            ) * 100;


        progress =
            Math.max(
                0,
                Math.min(
                    progress,
                    100
                )
            );


        progressInput.value =
            progress.toFixed(2);


        console.log(
            "DAILY PROGRESS:",
            {
                planned: planned,
                actualToday: actualToday,
                progress: progress
            }
        );

    }


    // =================================================
    // MATERIAL ROW
    // =================================================

    function createMaterialRow() {

        if (!materialsContainer) {
            return;
        }


        const row =
            document.createElement("div");

        row.className =
            "material-row";


        const materialInput =
            document.createElement("input");

        materialInput.type =
            "text";

        materialInput.className =
            "material-name";

        materialInput.placeholder =
            "Material";


        const quantityInput =
            document.createElement("input");

        quantityInput.type =
            "text";

        quantityInput.className =
            "material-quantity";

        quantityInput.placeholder =
            "Quantity";


        const unitInput =
            document.createElement("input");

        unitInput.type =
            "text";

        unitInput.className =
            "material-unit";

        unitInput.placeholder =
            "Unit";


        const removeButton =
            document.createElement("button");

        removeButton.type =
            "button";

        removeButton.className =
            "remove-material";

        removeButton.textContent =
            "Remove";


        row.appendChild(
            materialInput
        );

        row.appendChild(
            quantityInput
        );

        row.appendChild(
            unitInput
        );

        row.appendChild(
            removeButton
        );


        removeButton.addEventListener(
            "click",
            function () {

                row.remove();

            }
        );


        materialsContainer.appendChild(
            row
        );

    }


    // =================================================
    // COLLECT ACTIVITIES
    // =================================================

    function collectActivities() {

        if (!activityContainer) {
            return [];
        }


        const rows =
            activityContainer.querySelectorAll(
                ".activity-row"
            );


        const activities = [];


        rows.forEach(
            function (row) {

                const activityId =
                    row.dataset.activityId ||
                    "";


                const selectedActivity =
                    findScheduleActivity(
                        activityId
                    );


                const activitySelect =
                    row.querySelector(
                        ".activity-name"
                    );

                const plannedInput =
                    row.querySelector(
                        ".activity-planned"
                    );

                const quantityInput =
                    row.querySelector(
                        ".activity-quantity"
                    );

                const unitInput =
                    row.querySelector(
                        ".activity-unit"
                    );

                const progressInput =
                    row.querySelector(
                        ".activity-progress"
                    );

                const statusSelect =
                    row.querySelector(
                        ".activity-status"
                    );


                if (
                    !activityId ||
                    !selectedActivity
                ) {
                    return;
                }


                const quantity =
                    parseNumber(
                        quantityInput?.value
                    );


                const plannedQuantity =
                    parseNumber(
                        plannedInput?.value
                    );


                const dailyProgress =
                    parseNumber(
                        progressInput?.value
                    );


                activities.push({

                    activityId:
                        selectedActivity.activityId,

                    workPackage:
                        selectedActivity.workPackage,

                    name:
                        selectedActivity.activity,

                    plannedQuantity:
                        plannedQuantity,

                    quantity:
                        quantity,

                    unit:
                        selectedActivity.quantityUnit ||
                        unitInput?.value ||
                        "",

                    dailyProgress:
                        dailyProgress,

                    weight:
                        Number(
                            selectedActivity.weight || 0
                        ),

                    status:
                        statusSelect?.value ||
                        "On Progress"

                });

            }
        );


        return activities;
    }


    // =================================================
    // COLLECT MATERIALS
    // =================================================

    function collectMaterials() {

        if (!materialsContainer) {
            return [];
        }


        const rows =
            materialsContainer.querySelectorAll(
                ".material-row"
            );


        const materials = [];


        rows.forEach(
            function (row) {

                const name =
                    row.querySelector(
                        ".material-name"
                    )?.value.trim() || "";


                const quantity =
                    parseNumber(
                        row.querySelector(
                            ".material-quantity"
                        )?.value
                    );


                const unit =
                    row.querySelector(
                        ".material-unit"
                    )?.value.trim() || "";


                if (!name) {
                    return;
                }


                materials.push({

                    name:
                        name,

                    quantity:
                        quantity,

                    unit:
                        unit

                });

            }
        );


        return materials;
    }


    // =================================================
    // SAVE REPORT
    // =================================================

    function saveReport() {

        const activities =
            collectActivities();


        if (activities.length === 0) {

            alert(
                "Tambahkan minimal satu aktivitas pekerjaan."
            );

            return;
        }


        const reports =
            JSON.parse(
                localStorage.getItem(
                    REPORT_STORAGE_KEY
                ) || "[]"
            );


        const report = {

            id:
                "DR-" +
                Date.now(),

            timestamp:
                new Date().toISOString(),

            reportDate:
                reportDate?.value || "",

            weather:
                weather?.value || "",

            location:
                location?.value || "",

            project:
                project?.value || "",

            unit:
                unit?.value || "",


            manpower: {

                foreman:
                    Number(
                        foreman?.value || 0
                    ),

                headWorker:
                    Number(
                        headWorker?.value || 0
                    ),

                skilledWorker:
                    Number(
                        skilledWorker?.value || 0
                    ),

                staffOffice:
                    Number(
                        staffOffice?.value || 0
                    )

            },


            hours: {

                normal:
                    Number(
                        normalHours?.value || 0
                    ),

                overtime:
                    Number(
                        overtimeHours?.value || 0
                    )

            },


            activities:
                activities,


            materials:
                collectMaterials(),


            notes:
                notes?.value || ""

        };


        reports.push(
            report
        );


        localStorage.setItem(
            REPORT_STORAGE_KEY,
            JSON.stringify(reports)
        );


        console.log(
            "REPORT SAVED:",
            report
        );


        alert(
            "Daily Report berhasil disimpan."
        );


        if (reportForm) {

            reportForm.reset();

        }


        if (activityContainer) {

            activityContainer.innerHTML = "";

            createActivityRow();

        }


        if (materialsContainer) {

            materialsContainer.innerHTML = "";

        }

    }


    // =================================================
    // ADD ACTIVITY
    // =================================================

    if (addActivityButton) {

        addActivityButton.addEventListener(
            "click",
            function () {

                createActivityRow();

            }
        );

    }


    // =================================================
    // ADD MATERIAL
    // =================================================

    if (addMaterialButton) {

        addMaterialButton.addEventListener(
            "click",
            function () {

                createMaterialRow();

            }
        );

    }


    // =================================================
    // FORM SUBMIT
    // =================================================

    if (reportForm) {

        reportForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                saveReport();

            }
        );

    }


    // =================================================
    // SAVE BUTTON FALLBACK
    // =================================================

    const saveButton =
        document.getElementById("saveReport") ||
        document.querySelector(
            '[type="submit"]'
        );


    if (
        saveButton &&
        !reportForm
    ) {

        saveButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                saveReport();

            }
        );

    }


    // =================================================
    // INITIAL ACTIVITY ROW
    // =================================================

    if (
        activityContainer &&
        activityContainer.children.length === 0
    ) {

        createActivityRow();

    }


    // =================================================
    // INITIAL MATERIAL ROW
    // =================================================

    /*
     * Material row tidak dibuat otomatis
     * supaya form tetap bersih.
     */


    console.log(
        "Daily Report JS loaded successfully."
    );

});
