// =====================================================
// DAILY REPORT SYSTEM
// =====================================================

console.log("DAILY REPORT JS LOADED");

document.addEventListener("DOMContentLoaded", function () {


    // =====================================================
    // FORM ELEMENTS
    // =====================================================

    const form =
        document.getElementById("dailyReportForm");

    const locationSelect =
        document.getElementById("location");

    const projectSelect =
        document.getElementById("project");

    const unitSelect =
        document.getElementById("unit");

    const activityContainer =
        document.getElementById("activityContainer");

    const addActivityBtn =
        document.getElementById("addActivityBtn");

    const materialContainer =
        document.getElementById("materialContainer");

    const addMaterialBtn =
        document.getElementById("addMaterialBtn");


    if (!form) {

        console.error(
            "dailyReportForm tidak ditemukan."
        );

        return;
    }


    // =====================================================
    // PROJECT & UNIT DATA
    // =====================================================

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
                "Tipe 95 - Rumah No. 09",
                "Tipe 95 - Rumah No. 10",
                "Tipe 95 - Rumah No. 14",
                "Tipe 95 - Rumah No. 15",
                "Tipe 128 - Rumah No. 38",
                "Tipe 150 - Rumah No. 19",
                "Tipe 150 - Rumah No. 21",
                "Tipe Custom - Rumah No. 12",
                "Tipe Custom - Rumah No. 9-11",
                "Tipe Custom - Rumah No. 18-20"
            ],


            "Buana Royale Residence": [
                "Tipe 45 - Y-7",
                "Tipe 95 - D3",
                "Tipe 95 - D5"
            ],


            "Andalusia": [
                "Tipe Custom - Boulevard 1-2 E"
            ]

        }

    };


    // =====================================================
    // LOCATION → PROJECT
    // =====================================================

    function updateProjects() {

        if (
            !locationSelect ||
            !projectSelect ||
            !unitSelect
        ) {
            return;
        }


        const location =
            locationSelect.value;


        projectSelect.innerHTML =
            '<option value="">Select Project</option>';


        unitSelect.innerHTML =
            '<option value="">Select Unit</option>';


        if (
            !location ||
            !projectData[location]
        ) {
            return;
        }


        Object.keys(
            projectData[location]
        ).forEach(function (project) {

            const option =
                document.createElement("option");


            option.value =
                project;


            option.textContent =
                project;


            projectSelect.appendChild(
                option
            );

        });

    }


    // =====================================================
    // PROJECT → UNIT
    // =====================================================

    function updateUnits() {

        if (
            !locationSelect ||
            !projectSelect ||
            !unitSelect
        ) {
            return;
        }


        const location =
            locationSelect.value;


        const project =
            projectSelect.value;


        unitSelect.innerHTML =
            '<option value="">Select Unit</option>';


        if (
            !location ||
            !project ||
            !projectData[location] ||
            !projectData[location][project]
        ) {
            return;
        }


        projectData[location][project]
            .forEach(function (unit) {

                const option =
                    document.createElement("option");


                option.value =
                    unit;


                option.textContent =
                    unit;


                unitSelect.appendChild(
                    option
                );

            });

    }


    // =====================================================
    // LOCATION EVENT
    // =====================================================

    if (locationSelect) {

        locationSelect.addEventListener(
            "change",
            updateProjects
        );

    }


    // =====================================================
    // PROJECT EVENT
    // =====================================================

    if (projectSelect) {

        projectSelect.addEventListener(
            "change",
            updateUnits
        );

    }


    // =====================================================
    // ACTIVITY UNIT OPTIONS
    // =====================================================

    const activityUnits = [

        "",
        "m³",
        "m²",
        "m¹",
        "kg",
        "ton",
        "pcs",
        "titik",
        "unit",
        "lot"

    ];


    const activityUnitOptions =
        activityUnits
            .map(function (unit) {

                if (!unit) {

                    return `
                        <option value="">
                            Select Unit
                        </option>
                    `;

                }


                return `
                    <option value="${unit}">
                        ${unit}
                    </option>
                `;

            })
            .join("");


    // =====================================================
    // CREATE ACTIVITY ROW
    // =====================================================

    function createActivityRow() {

        if (!activityContainer) {
            return;
        }


        const row =
            document.createElement("div");


        row.className =
            "activity-row";


        row.innerHTML = `

            <div class="form-group">

                <label>
                    Activity
                </label>

                <input
                    type="text"
                    class="activity-name"
                    placeholder="Activity name"
                >

            </div>


            <div class="form-group">

                <label>
                    Quantity
                </label>

                <input
                    type="number"
                    class="activity-quantity"
                    min="0"
                    step="0.01"
                    placeholder="0"
                >

            </div>


            <div class="form-group">

                <label>
                    Unit
                </label>

                <select class="activity-unit">

                    ${activityUnitOptions}

                </select>

            </div>


            <div class="form-group">

                <label>
                    Daily Progress (%)
                </label>

                <input
                    type="number"
                    class="activity-progress"
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="0"
                >

            </div>


            <div class="form-group">

                <label>
                    Status
                </label>

                <select class="activity-status">

                    <option value="">
                        Select Status
                    </option>

                    <option value="On Progress">
                        On Progress
                    </option>

                    <option value="Completed">
                        Completed
                    </option>

                </select>

            </div>


            <button
                type="button"
                class="remove-row-btn remove-activity"
                title="Remove activity"
            >
                ×
            </button>

        `;


        activityContainer.appendChild(
            row
        );

    }


    // =====================================================
    // ADD ACTIVITY
    // =====================================================

    if (addActivityBtn) {

        addActivityBtn.addEventListener(
            "click",
            createActivityRow
        );

    }


    // =====================================================
    // REMOVE ACTIVITY
    // =====================================================

    if (activityContainer) {

        activityContainer.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.classList.contains(
                        "remove-activity"
                    )
                ) {

                    const rows =
                        activityContainer.querySelectorAll(
                            ".activity-row"
                        );


                    if (rows.length > 1) {

                        event.target
                            .closest(".activity-row")
                            .remove();

                    } else {

                        alert(
                            "At least one activity row is required."
                        );

                    }

                }

            }
        );

    }


    // =====================================================
    // MATERIAL UNIT OPTIONS
    // =====================================================

    const materialUnits = [

        "",
        "m³",
        "m²",
        "m¹",
        "kg",
        "ton",
        "pcs",
        "batang",
        "rit",
        "zak",
        "unit"

    ];


    const materialUnitOptions =
        materialUnits
            .map(function (unit) {

                if (!unit) {

                    return `
                        <option value="">
                            Select Unit
                        </option>
                    `;

                }


                return `
                    <option value="${unit}">
                        ${unit}
                    </option>
                `;

            })
            .join("");


    // =====================================================
    // CREATE MATERIAL ROW
    // =====================================================

    function createMaterialRow() {

        if (!materialContainer) {
            return;
        }


        const row =
            document.createElement("div");


        row.className =
            "material-row";


        row.innerHTML = `

            <div class="form-group">

                <label>
                    Material
                </label>

                <input
                    type="text"
                    class="material-name"
                    placeholder="Material name"
                >

            </div>


            <div class="form-group">

                <label>
                    Quantity
                </label>

                <input
                    type="number"
                    class="material-quantity"
                    min="0"
                    step="0.01"
                    placeholder="0"
                >

            </div>


            <div class="form-group">

                <label>
                    Unit
                </label>

                <select class="material-unit">

                    ${materialUnitOptions}

                </select>

            </div>


            <button
                type="button"
                class="remove-row-btn remove-material"
                title="Remove material"
            >
                ×
            </button>

        `;


        materialContainer.appendChild(
            row
        );

    }


    // =====================================================
    // ADD MATERIAL
    // =====================================================

    if (addMaterialBtn) {

        addMaterialBtn.addEventListener(
            "click",
            createMaterialRow
        );

    }


    // =====================================================
    // REMOVE MATERIAL
    // =====================================================

    if (materialContainer) {

        materialContainer.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.classList.contains(
                        "remove-material"
                    )
                ) {

                    const rows =
                        materialContainer.querySelectorAll(
                            ".material-row"
                        );


                    if (rows.length > 1) {

                        event.target
                            .closest(".material-row")
                            .remove();

                    } else {

                        alert(
                            "At least one material row is required."
                        );

                    }

                }

            }
        );

    }


    // =====================================================
    // COLLECT ACTIVITIES
    // =====================================================

    function collectActivities() {

        const activities = [];


        if (!activityContainer) {
            return activities;
        }


        const rows =
            activityContainer.querySelectorAll(
                ".activity-row"
            );


        rows.forEach(function (row) {

            const name =
                row.querySelector(
                    ".activity-name"
                )?.value.trim() || "";


            const quantity =
                Number(
                    row.querySelector(
                        ".activity-quantity"
                    )?.value || 0
                );


            const unit =
                row.querySelector(
                    ".activity-unit"
                )?.value || "";


            const dailyProgress =
                Number(
                    row.querySelector(
                        ".activity-progress"
                    )?.value || 0
                );


            const status =
                row.querySelector(
                    ".activity-status"
                )?.value || "";


            if (
                !name &&
                !quantity &&
                !unit &&
                !dailyProgress &&
                !status
            ) {
                return;
            }


            activities.push({

                name:
                    name,

                quantity:
                    quantity,

                unit:
                    unit,

                dailyProgress:
                    dailyProgress,

                status:
                    status

            });

        });


        return activities;

    }


    // =====================================================
    // COLLECT MATERIALS
    // =====================================================

    function collectMaterials() {

        const materials = [];


        if (!materialContainer) {
            return materials;
        }


        const rows =
            materialContainer.querySelectorAll(
                ".material-row"
            );


        rows.forEach(function (row) {

            const name =
                row.querySelector(
                    ".material-name"
                )?.value.trim() || "";


            const quantity =
                Number(
                    row.querySelector(
                        ".material-quantity"
                    )?.value || 0
                );


            const unit =
                row.querySelector(
                    ".material-unit"
                )?.value || "";


            if (
                !name &&
                !quantity &&
                !unit
            ) {
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


    // =====================================================
    // SUBMIT FORM
    // =====================================================

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            console.log(
                "SUBMIT DAILY REPORT"
            );


            // =================================================
            // BASIC INFORMATION
            // =================================================

            const reportDate =
                document.getElementById(
                    "reportDate"
                )?.value || "";


            const weather =
                document.getElementById(
                    "weather"
                )?.value || "";


            const location =
                document.getElementById(
                    "location"
                )?.value || "";


            const project =
                document.getElementById(
                    "project"
                )?.value || "";


            const unit =
                document.getElementById(
                    "unit"
                )?.value || "";


            // =================================================
            // MANPOWER
            // =================================================

            const foreman =
                Number(
                    document.getElementById(
                        "foreman"
                    )?.value || 0
                );


            const headWorker =
                Number(
                    document.getElementById(
                        "headWorker"
                    )?.value || 0
                );


            const skilledWorker =
                Number(
                    document.getElementById(
                        "skilledWorker"
                    )?.value || 0
                );


            const staffOffice =
                Number(
                    document.getElementById(
                        "staffOffice"
                    )?.value || 0
                );


            const normalHours =
                Number(
                    document.getElementById(
                        "normalHours"
                    )?.value || 0
                );


            const overtimeHours =
                Number(
                    document.getElementById(
                        "overtimeHours"
                    )?.value || 0
                );


            // =================================================
            // ACTIVITIES
            // =================================================

            const activities =
                collectActivities();


            // =================================================
            // MATERIALS
            // =================================================

            const materials =
                collectMaterials();


            // =================================================
            // NOTES
            // =================================================

            const notes =
                document.getElementById(
                    "notes"
                )?.value.trim() || "";


            // =================================================
            // VALIDATION
            // =================================================

            if (!reportDate) {

                alert(
                    "Please select report date."
                );

                return;
            }


            if (!location) {

                alert(
                    "Please select location."
                );

                return;
            }


            if (!project) {

                alert(
                    "Please select project."
                );

                return;
            }


            if (!unit) {

                alert(
                    "Please select unit."
                );

                return;
            }


            if (activities.length === 0) {

                alert(
                    "Please add at least one work activity."
                );

                return;
            }


            // =================================================
            // ACTIVITY VALIDATION
            // =================================================

            for (
                let i = 0;
                i < activities.length;
                i++
            ) {

                const activity =
                    activities[i];


                if (!activity.name) {

                    alert(
                        `Please enter activity name for row ${i + 1}.`
                    );

                    return;
                }


                if (!activity.unit) {

                    alert(
                        `Please select unit for activity row ${i + 1}.`
                    );

                    return;
                }


                if (!activity.status) {

                    alert(
                        `Please select status for activity row ${i + 1}.`
                    );

                    return;
                }


                if (
                    activity.dailyProgress < 0 ||
                    activity.dailyProgress > 100
                ) {

                    alert(
                        `Daily progress for activity row ${i + 1} must be between 0 and 100%.`
                    );

                    return;
                }

            }


            // =================================================
            // MANPOWER CALCULATION
            // =================================================

            const totalManpower =
                foreman +
                headWorker +
                skilledWorker +
                staffOffice;


            const normalManhours =
                totalManpower *
                normalHours;


            const overtimeManhours =
                totalManpower *
                overtimeHours;


            const totalManhours =
                normalManhours +
                overtimeManhours;


            // =================================================
            // LEGACY SUMMARY
            // =================================================

            const firstActivity =
                activities[0];


            const activitySummary =
                activities
                    .map(function (item) {
                        return item.name;
                    })
                    .join("; ");


            const statusSummary =
                activities.some(function (item) {

                    return (
                        item.status ===
                        "On Progress"
                    );

                })
                    ? "On Progress"
                    : "Completed";


            // =================================================
            // CREATE REPORT
            // =================================================

            const report = {

                id:
                    Date.now().toString(),


                timestamp:
                    new Date().toISOString(),


                // -----------------------------
                // Basic Information
                // -----------------------------

                date:
                    reportDate,

                weather:
                    weather,

                location:
                    location,

                project:
                    project,

                unit:
                    unit,


                // -----------------------------
                // Manpower
                // -----------------------------

                manpower: {

                    foreman:
                        foreman,

                    headWorker:
                        headWorker,

                    skilledWorker:
                        skilledWorker,

                    staffOffice:
                        staffOffice,

                    total:
                        totalManpower

                },


                // -----------------------------
                // Working Hours
                // -----------------------------

                normalHours:
                    normalHours,

                overtimeHours:
                    overtimeHours,


                // -----------------------------
                // Man-hours
                // -----------------------------

                normalManhours:
                    normalManhours,

                overtimeManhours:
                    overtimeManhours,

                totalManhours:
                    totalManhours,


                // -----------------------------
                // Structured Activities
                // -----------------------------

                activities:
                    activities,


                // -----------------------------
                // Legacy Activity Fields
                // -----------------------------

                activity:
                    activitySummary,

                quantity:
                    firstActivity.quantity,

                quantityUnit:
                    firstActivity.unit,

                dailyProgress:
                    firstActivity.dailyProgress,

                status:
                    statusSummary,


                // -----------------------------
                // Materials
                // -----------------------------

                materials:
                    materials,


                // -----------------------------
                // Notes
                // -----------------------------

                notes:
                    notes

            };


            // =================================================
            // GET EXISTING REPORTS
            // =================================================

            let reports = [];


            try {

                const savedReports =
                    localStorage.getItem(
                        "dailyReports"
                    );


                if (savedReports) {

                    reports =
                        JSON.parse(
                            savedReports
                        );


                    if (
                        !Array.isArray(
                            reports
                        )
                    ) {

                        reports = [];

                    }

                }

            } catch (error) {

                console.error(
                    "Error reading dailyReports:",
                    error
                );


                reports = [];

            }


            // =================================================
            // SAVE
            // =================================================

            reports.push(
                report
            );


            try {

                localStorage.setItem(
                    "dailyReports",
                    JSON.stringify(
                        reports
                    )
                );

            } catch (error) {

                console.error(
                    "Error saving daily report:",
                    error
                );


                alert(
                    "Daily report gagal disimpan."
                );


                return;

            }


            // =================================================
            // VERIFY SAVE
            // =================================================

            const verify =
                localStorage.getItem(
                    "dailyReports"
                );


            if (!verify) {

                alert(
                    "Data gagal tersimpan."
                );


                return;

            }


            // =================================================
            // SUCCESS
            // =================================================

            console.log(
                "DAILY REPORT SAVED:",
                report
            );


            alert(
                "Daily report berhasil disimpan."
            );


            // =================================================
            // REDIRECT
            // =================================================

            window.location.href =
                "./daily-monitoring.html";

        }
    );


    // =====================================================
    // INITIALIZE
    // =====================================================

    updateProjects();

});
