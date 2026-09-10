// =====================================================
// DAILY REPORT SYSTEM
// =====================================================

console.log("DAILY REPORT JS LOADED");

document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // FORM ELEMENTS
    // =====================================================

    const form = document.getElementById("dailyReportForm");

    const locationSelect = document.getElementById("location");
    const projectSelect = document.getElementById("project");
    const unitSelect = document.getElementById("unit");

    const materialContainer = document.getElementById("materialContainer");
    const addMaterialBtn = document.getElementById("addMaterialBtn");

    // Stop if form does not exist
    if (!form) {
        console.error("dailyReportForm tidak ditemukan.");
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

        if (!locationSelect || !projectSelect) return;

        const location = locationSelect.value;

        projectSelect.innerHTML =
            '<option value="">Select Project</option>';

        unitSelect.innerHTML =
            '<option value="">Select Unit</option>';

        if (!location || !projectData[location]) {
            return;
        }

        Object.keys(projectData[location]).forEach(function (project) {

            const option = document.createElement("option");

            option.value = project;
            option.textContent = project;

            projectSelect.appendChild(option);

        });

    }


    // =====================================================
    // PROJECT → UNIT
    // =====================================================

    function updateUnits() {

        if (!locationSelect || !projectSelect || !unitSelect) return;

        const location = locationSelect.value;
        const project = projectSelect.value;

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

        projectData[location][project].forEach(function (unit) {

            const option = document.createElement("option");

            option.value = unit;
            option.textContent = unit;

            unitSelect.appendChild(option);

        });

    }


    // =====================================================
    // EVENT LOCATION
    // =====================================================

    if (locationSelect) {

        locationSelect.addEventListener(
            "change",
            updateProjects
        );

    }


    // =====================================================
    // EVENT PROJECT
    // =====================================================

    if (projectSelect) {

        projectSelect.addEventListener(
            "change",
            updateUnits
        );

    }


    // =====================================================
    // MATERIAL ROW
    // =====================================================

    function createMaterialRow() {

        if (!materialContainer) return;

        const row = document.createElement("div");

        row.className = "material-row";

        row.innerHTML = `

            <input
                type="text"
                class="material-name"
                placeholder="Material name"
            >

            <input
                type="number"
                class="material-quantity"
                min="0"
                step="0.01"
                placeholder="Quantity"
            >

            <input
                type="text"
                class="material-unit"
                placeholder="Unit"
            >

            <button
                type="button"
                class="remove-material"
            >
                Remove
            </button>

        `;

        materialContainer.appendChild(row);

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

                    event.target
                        .closest(".material-row")
                        .remove();

                }

            }
        );

    }


    // =====================================================
    // SUBMIT FORM
    // =====================================================

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        console.log("SUBMIT DAILY REPORT");


        // =================================================
        // BASIC INFORMATION
        // =================================================

        const reportDate =
            document.getElementById("reportDate")?.value || "";

        const weather =
            document.getElementById("weather")?.value || "";

        const location =
            document.getElementById("location")?.value || "";

        const project =
            document.getElementById("project")?.value || "";

        const unit =
            document.getElementById("unit")?.value || "";


        // =================================================
        // MANPOWER
        // =================================================

        const foreman =
            Number(
                document.getElementById("foreman")?.value || 0
            );

        const headWorker =
            Number(
                document.getElementById("headWorker")?.value || 0
            );

        const skilledWorker =
            Number(
                document.getElementById("skilledWorker")?.value || 0
            );

        const staffOffice =
            Number(
                document.getElementById("staffOffice")?.value || 0
            );

        const normalHours =
            Number(
                document.getElementById("normalHours")?.value || 0
            );

        const overtimeHours =
            Number(
                document.getElementById("overtimeHours")?.value || 0
            );


        // =================================================
        // WORK ACTIVITIES
        // =================================================

        const activity =
            document.getElementById("activity")?.value.trim() || "";

        const quantity =
            Number(
                document.getElementById("quantity")?.value || 0
            );

        const quantityUnit =
            document.getElementById("quantityUnit")?.value || "";

        const dailyProgress =
            Number(
                document.getElementById("dailyProgress")?.value || 0
            );

        const status =
            document.getElementById("status")?.value || "";


        // =================================================
        // NOTES
        // =================================================

        const notes =
            document.getElementById("notes")?.value.trim() || "";


        // =================================================
        // VALIDATION
        // =================================================

        if (!reportDate) {

            alert("Please select report date.");
            return;

        }

        if (!location) {

            alert("Please select location.");
            return;

        }

        if (!project) {

            alert("Please select project.");
            return;

        }

        if (!unit) {

            alert("Please select unit.");
            return;

        }

        if (!activity) {

            alert("Please describe today's activity.");
            return;

        }

        if (!status) {

            alert("Please select activity status.");
            return;

        }


        // =================================================
        // PROGRESS VALIDATION
        // =================================================

        if (dailyProgress < 0 || dailyProgress > 100) {

            alert("Daily progress must be between 0 and 100%.");
            return;

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
            totalManpower * normalHours;


        const overtimeManhours =
            totalManpower * overtimeHours;


        const totalManhours =
            normalManhours +
            overtimeManhours;


        // =================================================
        // COLLECT MATERIALS
        // =================================================

        const materials = [];

        if (materialContainer) {

            const materialRows =
                materialContainer.querySelectorAll(
                    ".material-row"
                );

            materialRows.forEach(function (row) {

                const name =
                    row.querySelector(
                        ".material-name"
                    )?.value.trim() || "";

                const qty =
                    Number(
                        row.querySelector(
                            ".material-quantity"
                        )?.value || 0
                    );

                const materialUnit =
                    row.querySelector(
                        ".material-unit"
                    )?.value.trim() || "";


                // Only save filled material rows
                if (name) {

                    materials.push({

                        name: name,

                        quantity: qty,

                        unit: materialUnit

                    });

                }

            });

        }


        // =================================================
        // CREATE DAILY REPORT OBJECT
        // =================================================

        const report = {

            id:
                Date.now().toString(),

            timestamp:
                new Date().toISOString(),

            // -----------------------------
            // Basic Information
            // -----------------------------

            date: reportDate,

            weather: weather,

            location: location,

            project: project,

            unit: unit,


            // -----------------------------
            // Manpower
            // -----------------------------

            manpower: {

                foreman: foreman,

                headWorker: headWorker,

                skilledWorker: skilledWorker,

                staffOffice: staffOffice,

                total: totalManpower

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
            // Work Activity
            // -----------------------------

            activity:
                activity,

            quantity:
                quantity,

            quantityUnit:
                quantityUnit,

            dailyProgress:
                dailyProgress,

            status:
                status,


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
                    JSON.parse(savedReports);

                if (!Array.isArray(reports)) {

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
        // SAVE NEW REPORT
        // =================================================

        reports.push(report);


        try {

            localStorage.setItem(
                "dailyReports",
                JSON.stringify(reports)
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

    });


    // =====================================================
    // INITIALIZE
    // =====================================================

    updateProjects();

});
