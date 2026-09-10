document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".report-form");

    if (!form) return;


    // =====================================================
    // PROJECT & UNIT DATA
    // =====================================================

    const projectData = {

        Kalimantan: {

            "Tipe 200": [
                "Unit DANREM"
            ],

            "Tipe 175": [
                "Unit KASREM",
                "Unit KASI 01",
                "Unit KASI 02",
                "Unit KASI 03",
                "Unit KASI 04",
                "Unit KASI 05",
                "Unit KASI 06"
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
                "Tipe 150 - Rumah No. 23",

                "Tipe Custom - Rumah No. 12",
                "Tipe Custom - Rumah No. 9-11",
                "Tipe Custom - Rumah No. 18-20",

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
    // ELEMENTS
    // =====================================================

    const locationSelect = document.getElementById("location");
    const projectSelect = document.getElementById("project");
    const unitSelect = document.getElementById("unit");


    // =====================================================
    // UPDATE PROJECT
    // =====================================================

    function updateProjects() {

        const location = locationSelect.value;

        projectSelect.innerHTML =
            `<option value="">Select Project</option>`;

        unitSelect.innerHTML =
            `<option value="">Select Unit</option>`;

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
    // UPDATE UNIT
    // =====================================================

    function updateUnits() {

        const location = locationSelect.value;
        const project = projectSelect.value;

        unitSelect.innerHTML =
            `<option value="">Select Unit</option>`;

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
    // LOCATION CHANGE
    // =====================================================

    locationSelect.addEventListener("change", function () {

        updateProjects();

    });


    // =====================================================
    // PROJECT CHANGE
    // =====================================================

    projectSelect.addEventListener("change", function () {

        updateUnits();

    });


    // =====================================================
    // MATERIAL SECTION
    // =====================================================

    const materialContainer =
        document.getElementById("materialContainer");

    const addMaterialBtn =
        document.getElementById("addMaterialBtn");


    function addMaterialRow() {

        const row = document.createElement("div");

        row.className = "material-row";

        row.innerHTML = `

            <div class="form-group">
                <label>Material</label>

                <input
                    type="text"
                    class="material-name"
                    placeholder="Example: Cement, sand, rebar..."
                >
            </div>


            <div class="form-group">
                <label>Quantity</label>

                <input
                    type="number"
                    class="material-quantity"
                    min="0"
                    step="0.01"
                    placeholder="Quantity"
                >
            </div>


            <div class="form-group">
                <label>Unit</label>

                <select class="material-unit">

                    <option value="">Select Unit</option>

                    <option value="kg">kg</option>
                    <option value="ton">ton</option>
                    <option value="m³">m³</option>
                    <option value="m²">m²</option>
                    <option value="pcs">pcs</option>
                    <option value="batang">batang</option>
                    <option value="sak">sak</option>
                    <option value="lembar">lembar</option>
                    <option value="rit">rit</option>

                </select>

            </div>


            <button
                type="button"
                class="remove-material-btn"
            >
                Remove
            </button>

        `;

        materialContainer.appendChild(row);

    }


    addMaterialBtn.addEventListener("click", function () {

        addMaterialRow();

    });


    materialContainer.addEventListener("click", function (event) {

        if (
            event.target.classList.contains(
                "remove-material-btn"
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

            }

        }

    });


    // =====================================================
    // FORM SUBMIT
    // =====================================================

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        // -----------------------------
        // BASIC INFORMATION
        // -----------------------------

        const date =
            document.getElementById("reportDate").value;

        const location =
            document.getElementById("location").value;

        const project =
            document.getElementById("project").value;

        const unit =
            document.getElementById("unit").value;

        const weather =
            document.getElementById("weather").value;


        // -----------------------------
        // MANPOWER
        // -----------------------------

        const foreman =
            Number(
                document.getElementById("foreman").value
            ) || 0;

        const headWorker =
            Number(
                document.getElementById("headWorker").value
            ) || 0;

        const skilledWorker =
            Number(
                document.getElementById("skilledWorker").value
            ) || 0;

        const staffOffice =
            Number(
                document.getElementById("staffOffice").value
            ) || 0;


        const normalHours =
            Number(
                document.getElementById("normalHours").value
            ) || 0;

        const overtimeHours =
            Number(
                document.getElementById("overtimeHours").value
            ) || 0;


        // -----------------------------
        // MANPOWER CALCULATION
        // -----------------------------

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


        // -----------------------------
        // WORK ACTIVITY
        // -----------------------------

        const activity =
            document.getElementById("activity").value;

        const status =
            document.getElementById("status").value;


        // -----------------------------
        // MATERIALS
        // -----------------------------

        const materialRows =
            materialContainer.querySelectorAll(
                ".material-row"
            );

        const materials = [];


        materialRows.forEach(function (row) {

            const name =
                row
                    .querySelector(".material-name")
                    .value
                    .trim();


            const quantity =
                Number(
                    row
                        .querySelector(".material-quantity")
                        .value
                ) || 0;


            const materialUnit =
                row
                    .querySelector(".material-unit")
                    .value;


            if (name !== "") {

                materials.push({

                    name: name,

                    quantity: quantity,

                    unit: materialUnit

                });

            }

        });


        // -----------------------------
        // NOTES
        // -----------------------------

        const notes =
            document.getElementById("notes").value;


        // =================================================
        // REPORT OBJECT
        // =================================================

        const report = {

            date: date,

            location: location,

            project: project,

            unit: unit,

            weather: weather,


            foreman: foreman,

            headWorker: headWorker,

            skilledWorker: skilledWorker,

            staffOffice: staffOffice,


            normalHours: normalHours,

            overtimeHours: overtimeHours,


            totalManpower: totalManpower,

            normalManhours: normalManhours,

            overtimeManhours: overtimeManhours,

            totalManhours: totalManhours,


            activity: activity,

            status: status,


            materials: materials,


            notes: notes

        };


        // =================================================
        // SAVE TO LOCAL STORAGE
        // =================================================

        let reports =
            JSON.parse(
                localStorage.getItem("dailyReports")
            ) || [];


        reports.push(report);


        localStorage.setItem(
            "dailyReports",
            JSON.stringify(reports)
        );


        // =================================================
        // REDIRECT
        // =================================================

        alert("Daily Report berhasil disimpan!");

        window.location.assign(
            "./daily-monitoring.html"
        );

    });

});
