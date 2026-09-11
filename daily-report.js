// =====================================================
// DAILY REPORT SYSTEM - FINAL VERSION
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    console.log("=====================================");
    console.log("DAILY REPORT JS - FINAL VERSION");
    console.log("=====================================");


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

    const locationSelect =
        document.getElementById("location");

    const projectSelect =
        document.getElementById("project");

    const unitSelect =
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
        document.getElementById("addActivityBtn") ||
        document.getElementById("addActivity");

    const materialContainer =
        document.getElementById("materialContainer") ||
        document.getElementById("materialsContainer") ||
        document.getElementById("materialList");

    const addMaterialButton =
        document.getElementById("addMaterialBtn") ||
        document.getElementById("addMaterial");

    const notes =
        document.getElementById("notes");


    // =================================================
    // CHECK DOM
    // =================================================

    console.log("DOM CHECK:", {
        form: !!reportForm,
        location: !!locationSelect,
        project: !!projectSelect,
        unit: !!unitSelect,
        activityContainer: !!activityContainer,
        addActivityButton: !!addActivityButton,
        materialContainer: !!materialContainer,
        addMaterialButton: !!addMaterialButton
    });


    // =================================================
    // PROJECT DATA
    // =================================================

    const projectData = {

        Kalimantan: {

            "Tipe 200": [
                "DANREM"
            ],

            "Tipe 175": [
                "KASREM",
                "KASI 01",
                "KASI 02",
                "KASI 03",
                "KASI 04",
                "KASI 05",
                "KASI 06"
            ]

        },


        Tasikmalaya: {

            "Casa Sabrina": [
                "Unit 01",
                "Unit 02",
                "Unit 03",
                "Unit 04",
                "Unit 05",
                "Unit 06",
                "Unit 07",
                "Unit 08",
                "Unit 09",
                "Unit 10"
            ],

            "Buana Royale Residence": [
                "Unit 01",
                "Unit 02",
                "Unit 03"
            ],

            "Andalusia": [
                "Unit 01"
            ]

        }

    };


    // =================================================
    // ACTIVITY UNITS
    // =================================================

    const activityUnitOptions = [
        "m",
        "m'",
        "m²",
        "m³",
        "kg",
        "ton",
        "unit",
        "bh",
        "set",
        "ls"
    ];


    // =================================================
    // MATERIAL UNITS
    // =================================================

    const materialUnitOptions = [
        "kg",
        "ton",
        "m",
        "m'",
        "m²",
        "m³",
        "bh",
        "unit",
        "set",
        "ls",
        "sak",
        "batang",
        "lembar"
    ];


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

        let text = String(value)
            .trim()
            .replace(/\s/g, "");

        if (text === "") {
            return 0;
        }

        if (
            text.includes(".") &&
            text.includes(",")
        ) {

            text = text
                .replace(/\./g, "")
                .replace(",", ".");

        } else if (text.includes(",")) {

            text = text.replace(",", ".");

        }

        const result = Number(text);

        return Number.isFinite(result)
            ? result
            : 0;
    }


    // =================================================
    // MASTER SCHEDULE
    // =================================================

    function getMasterSchedule() {

        try {

            if (
                typeof masterSchedule !== "undefined" &&
                Array.isArray(masterSchedule)
            ) {

                return masterSchedule;

            }

        } catch (error) {

            console.warn(
                "masterSchedule tidak tersedia secara langsung."
            );

        }


        if (
            typeof window !== "undefined" &&
            Array.isArray(window.masterSchedule)
        ) {

            return window.masterSchedule;

        }


        return [];

    }


    // =================================================
    // CHECK MASTER SCHEDULE
    // =================================================

    function isMasterScheduleUnit() {

        return (
            locationSelect?.value === "Kalimantan" &&
            projectSelect?.value === "Tipe 200" &&
            unitSelect?.value === "DANREM"
        );

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


            // =========================================
            // PEMIPAAN DI-SKIP DULU
            // =========================================

            if (
                item.workPackage
                    .toLowerCase()
                    .includes("pemipaan")
            ) {

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
    // UPDATE PROJECT DROPDOWN
    // =================================================

    function updateProjects() {

        if (!projectSelect) {
            return;
        }


        projectSelect.innerHTML = "";


        const placeholder =
            document.createElement("option");

        placeholder.value = "";

        placeholder.textContent =
            "Select Project";

        projectSelect.appendChild(
            placeholder
        );


        const selectedLocation =
            locationSelect?.value;


        if (
            !selectedLocation ||
            !projectData[selectedLocation]
        ) {

            projectSelect.disabled = true;

            updateUnits();

            return;

        }


        projectSelect.disabled = false;


        Object.keys(
            projectData[selectedLocation]
        ).forEach(function (projectName) {

            const option =
                document.createElement("option");

            option.value =
                projectName;

            option.textContent =
                projectName;

            projectSelect.appendChild(
                option
            );

        });


        updateUnits();

    }


    // =================================================
    // UPDATE UNIT DROPDOWN
    // =================================================

    function updateUnits() {

        if (!unitSelect) {
            return;
        }


        unitSelect.innerHTML = "";


        const placeholder =
            document.createElement("option");

        placeholder.value = "";

        placeholder.textContent =
            "Select Unit";

        unitSelect.appendChild(
            placeholder
        );


        const selectedLocation =
            locationSelect?.value;

        const selectedProject =
            projectSelect?.value;


        if (
            !selectedLocation ||
            !selectedProject ||
            !projectData[selectedLocation] ||
            !projectData[selectedLocation][selectedProject]
        ) {

            unitSelect.disabled = true;

            refreshActivityRows();

            return;

        }


        unitSelect.disabled = false;


        projectData[selectedLocation][selectedProject]
            .forEach(function (unitName) {

                const option =
                    document.createElement("option");

                option.value =
                    unitName;

                option.textContent =
                    unitName;

                unitSelect.appendChild(
                    option
                );

            });


        refreshActivityRows();

    }


    // =================================================
    // CREATE OPTION
    // =================================================

    function createOption(
        value,
        text
    ) {

        const option =
            document.createElement("option");

        option.value = value;

        option.textContent = text;

        return option;

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


        workPackageSelect.appendChild(
            createOption(
                "",
                "Select Work Package"
            )
        );


        // =============================================
        // ONLY LOAD MASTER SCHEDULE
        // FOR KALIMANTAN / TIPE 200 / DANREM
        // =============================================

        if (isMasterScheduleUnit()) {

            getWorkPackages().forEach(
                function (packageName) {

                    workPackageSelect.appendChild(
                        createOption(
                            packageName,
                            packageName
                        )
                    );

                }
            );

        }


        // =============================================
        // ACTIVITY
        // =============================================

        const activitySelect =
            document.createElement("select");

        activitySelect.className =
            "activity-name";

        activitySelect.required = true;

        activitySelect.disabled = true;


        activitySelect.appendChild(
            createOption(
                "",
                "Select Activity"
            )
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

        plannedInput.placeholder =
            "Planned";


        // =============================================
        // ACTUAL QUANTITY
        // =============================================

        const quantityInput =
            document.createElement("input");

        quantityInput.type =
            "text";

        quantityInput.className =
            "activity-quantity";

        quantityInput.placeholder =
            "Actual Today";

        quantityInput.required = true;


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

        unitInput.placeholder =
            "Unit";


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

        progressInput.placeholder =
            "%";


        // =============================================
        // STATUS
        // =============================================

        const statusSelect =
            document.createElement("select");

        statusSelect.className =
            "activity-status";

        statusSelect.required = true;


        [
            "Not Started",
            "On Progress",
            "Completed",
            "Delayed"
        ].forEach(function (status) {

            statusSelect.appendChild(
                createOption(
                    status,
                    status
                )
            );

        });


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
        // APPEND
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


                activitySelect.appendChild(
                    createOption(
                        "",
                        "Select Activity"
                    )
                );


                activitySelect.disabled =
                    !selectedPackage;


                plannedInput.value =
                    "";

                quantityInput.value =
                    "";

                unitInput.value =
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

                            return (
                                item.workPackage ===
                                selectedPackage &&
                                !String(
                                    item.workPackage
                                )
                                .toLowerCase()
                                .includes("pemipaan")
                            );

                        }
                    );


                activities.forEach(
                    function (item) {

                        const label =
                            item.activity +
                            " — Plan: " +
                            item.plannedQuantity +
                            " " +
                            item.quantityUnit;


                        const option =
                            createOption(
                                item.activityId,
                                label
                            );


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


                row.dataset.activityId =
                    selectedActivity.activityId;


                row.dataset.weight =
                    Number(
                        selectedActivity.weight || 0
                    );


                plannedInput.value =
                    selectedActivity.plannedQuantity ?? 0;


                unitInput.value =
                    selectedActivity.quantityUnit || "";


                quantityInput.value =
                    "";

                progressInput.value =
                    "0.00";


                console.log(
                    "Selected Activity:",
                    selectedActivity
                );

            }
        );


        // =============================================
        // ACTUAL → DAILY PROGRESS
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
        // REMOVE
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

    }


    // =================================================
    // REFRESH ACTIVITY ROWS
    // =================================================

    function refreshActivityRows() {

        if (!activityContainer) {
            return;
        }


        activityContainer.innerHTML = "";


        createActivityRow();

    }


    // =================================================
    // CREATE MATERIAL ROW
    // =================================================

    function createMaterialRow() {

        if (!materialContainer) {

            console.error(
                "Material container tidak ditemukan."
            );

            return null;

        }


        const row =
            document.createElement("div");

        row.className =
            "material-row";


        // =============================================
        // MATERIAL NAME
        // =============================================

        const materialInput =
            document.createElement("input");

        materialInput.type =
            "text";

        materialInput.className =
            "material-name";

        materialInput.placeholder =
            "Material";


        // =============================================
        // QUANTITY
        // =============================================

        const quantityInput =
            document.createElement("input");

        quantityInput.type =
            "text";

        quantityInput.className =
            "material-quantity";

        quantityInput.placeholder =
            "Quantity";


        // =============================================
        // UNIT
        // =============================================

        const unitInput =
            document.createElement("select");

        unitInput.className =
            "material-unit";


        unitInput.appendChild(
            createOption(
                "",
                "Unit"
            )
        );


        materialUnitOptions.forEach(
            function (unitName) {

                unitInput.appendChild(
                    createOption(
                        unitName,
                        unitName
                    )
                );

            }
        );


        // =============================================
        // REMOVE
        // =============================================

        const removeButton =
            document.createElement("button");

        removeButton.type =
            "button";

        removeButton.className =
            "remove-material";

        removeButton.textContent =
            "Remove";


        // =============================================
        // APPEND
        // =============================================

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


        materialContainer.appendChild(
            row
        );


        return row;

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


        rows.forEach(function (row) {

            const activityId =
                row.dataset.activityId || "";


            if (!activityId) {
                return;
            }


            const selectedActivity =
                findScheduleActivity(
                    activityId
                );


            if (!selectedActivity) {
                return;
            }


            const quantityInput =
                row.querySelector(
                    ".activity-quantity"
                );

            const progressInput =
                row.querySelector(
                    ".activity-progress"
                );

            const statusSelect =
                row.querySelector(
                    ".activity-status"
                );


            const quantity =
                parseNumber(
                    quantityInput?.value
                );


            const plannedQuantity =
                parseNumber(
                    selectedActivity.plannedQuantity
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

                activity:
                    selectedActivity.activity,

                plannedQuantity:
                    plannedQuantity,

                quantity:
                    quantity,

                actualQuantity:
                    quantity,

                unit:
                    selectedActivity.quantityUnit ||
                    "",

                quantityUnit:
                    selectedActivity.quantityUnit ||
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

        });


        return activities;

    }


    // =================================================
    // COLLECT MATERIALS
    // =================================================

    function collectMaterials() {

        if (!materialContainer) {
            return [];
        }


        const rows =
            materialContainer.querySelectorAll(
                ".material-row"
            );


        const materials = [];


        rows.forEach(function (row) {

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
                )?.value || "";


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

        });


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


        // =============================================
        // GET EXISTING REPORTS SAFELY
        // =============================================

        let reports = [];


        try {

            reports =
                JSON.parse(
                    localStorage.getItem(
                        REPORT_STORAGE_KEY
                    ) || "[]"
                );


            if (!Array.isArray(reports)) {
                reports = [];
            }

        } catch (error) {

            console.error(
                "Gagal membaca dailyReports:",
                error
            );

            reports = [];

        }


        // =============================================
        // REPORT OBJECT
        // =============================================

        const normal =
            parseNumber(
                normalHours?.value
            );

        const overtime =
            parseNumber(
                overtimeHours?.value
            );


        const manpowerData = {

            foreman:
                parseNumber(
                    foreman?.value
                ),

            headWorker:
                parseNumber(
                    headWorker?.value
                ),

            skilledWorker:
                parseNumber(
                    skilledWorker?.value
                ),

            staffOffice:
                parseNumber(
                    staffOffice?.value
                )

        };


        const totalManpower =
            manpowerData.foreman +
            manpowerData.headWorker +
            manpowerData.skilledWorker +
            manpowerData.staffOffice;


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
                locationSelect?.value || "",

            project:
                projectSelect?.value || "",

            unit:
                unitSelect?.value || "",


            manpower:
                manpowerData,


            totalManpower:
                totalManpower,


            hours: {

                normal:
                    normal,

                overtime:
                    overtime

            },


            manhours:
                totalManpower *
                normal,


            activities:
                activities,


            // Legacy compatibility
            activity:
                activities.length > 0
                    ? activities[0].name
                    : "",

            quantity:
                activities.length > 0
                    ? activities[0].quantity
                    : 0,

            quantityUnit:
                activities.length > 0
                    ? activities[0].quantityUnit
                    : "",

            dailyProgress:
                activities.length > 0
                    ? activities[0].dailyProgress
                    : 0,

            status:
                activities.length > 0
                    ? activities[0].status
                    : "",


            materials:
                collectMaterials(),


            notes:
                notes?.value || ""

        };


        // =============================================
        // SAVE
        // =============================================

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
        window.location.replace("./daily-monitoring.html");
        return;


        // =============================================
        // RESET FORM
        // =============================================

        if (reportForm) {

            reportForm.reset();

        }


        // =============================================
        // RESTORE DROPDOWN STATE
        // =============================================

        updateProjects();


        // =============================================
        // RESET MATERIALS
        // =============================================

        if (materialContainer) {

            materialContainer.innerHTML = "";

        }

    }


    // =================================================
    // LOCATION CHANGE
    // =================================================

    if (locationSelect) {

        locationSelect.addEventListener(
            "change",
            function () {

                console.log(
                    "Location changed:",
                    locationSelect.value
                );


                updateProjects();

            }
        );

    }


    // =================================================
    // PROJECT CHANGE
    // =================================================

    if (projectSelect) {

        projectSelect.addEventListener(
            "change",
            function () {

                console.log(
                    "Project changed:",
                    projectSelect.value
                );


                updateUnits();

            }
        );

    }


    // =================================================
    // UNIT CHANGE
    // =================================================

    if (unitSelect) {

        unitSelect.addEventListener(
            "change",
            function () {

                console.log(
                    "Unit changed:",
                    unitSelect.value
                );


                refreshActivityRows();

            }
        );

    }


    // =================================================
    // ADD ACTIVITY
    // =================================================

    if (addActivityButton) {

        addActivityButton.type =
            "button";


        addActivityButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                console.log(
                    "ADD ACTIVITY CLICKED"
                );


                createActivityRow();

            }
        );

    } else {

        console.warn(
            "Tombol Add Activity tidak ditemukan."
        );

    }


    // =================================================
    // ADD MATERIAL
    // =================================================

    if (addMaterialButton) {

        addMaterialButton.type =
            "button";


        addMaterialButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                console.log(
                    "ADD MATERIAL CLICKED"
                );


                createMaterialRow();

            }
        );

    } else {

        console.warn(
            "Tombol Add Material tidak ditemukan."
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


                console.log(
                    "FORM SUBMIT"
                );


                saveReport();

            }
        );

    }


    // =================================================
    // INITIALIZE
    // =================================================

    updateProjects();


    if (
        activityContainer &&
        activityContainer.children.length === 0
    ) {

        createActivityRow();

    }


    console.log(
        "Daily Report System initialized successfully."
    );

});
