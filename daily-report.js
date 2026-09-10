document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".report-form");

    if (!form) return;


    // ==============================
    // BASIC INFORMATION
    // ==============================

    const locationSelect = document.getElementById("location");
    const projectSelect = document.getElementById("project");
    const unitSelect = document.getElementById("unit");


    // Project berdasarkan lokasi
    const projectOptions = {

        Kalimantan: [
            "Rumah Dinas Type 200"
        ],

        Tasikmalaya: [
            "Tasikmalaya Project"
        ]

    };


    // ==============================
    // UPDATE PROJECT
    // ==============================

    function updateProjects() {

        const location = locationSelect.value;

        projectSelect.innerHTML = `
            <option value="">
                Select Project
            </option>
        `;

        unitSelect.innerHTML = `
            <option value="">
                Select Unit
            </option>
        `;


        if (!location || !projectOptions[location]) {
            return;
        }


        projectOptions[location].forEach(function (project) {

            const option = document.createElement("option");

            option.value = project;
            option.textContent = project;

            projectSelect.appendChild(option);

        });

    }


    // ==============================
    // UPDATE UNIT
    // ==============================

    function updateUnits() {

        const location = locationSelect.value;

        unitSelect.innerHTML = `
            <option value="">
                Select Unit
            </option>
        `;


        let unitCount = 0;


        if (location === "Kalimantan") {

            unitCount = 8;

        } else if (location === "Tasikmalaya") {

            unitCount = 15;

        }


        for (let i = 1; i <= unitCount; i++) {

            const unitNumber = String(i).padStart(2, "0");

            const option = document.createElement("option");

            option.value = `Unit ${unitNumber}`;
            option.textContent = `Unit ${unitNumber}`;

            unitSelect.appendChild(option);

        }

    }


    // ==============================
    // LOCATION CHANGE
    // ==============================

    locationSelect.addEventListener("change", function () {

        updateProjects();
        updateUnits();

    });


    // ==============================
    // PROJECT CHANGE
    // ==============================

    projectSelect.addEventListener("change", function () {

        updateUnits();

    });


    // ==============================
    // MATERIAL
    // ==============================

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

                    <option value="">
                        Select Unit
                    </option>

                    <option>kg</option>
                    <option>ton</option>
                    <option>m³</option>
                    <option>m²</option>
                    <option>pcs</option>
                    <option>batang</option>
                    <option>sak</option>
                    <option>lembar</option>
                    <option>rit</option>

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


    // ==============================
    // REMOVE MATERIAL
    // ==============================

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


            // Minimal satu baris material tetap tersedia
            if (rows.length > 1) {

                event.target
                    .closest(".material-row")
                    .remove();

            }

        }

    });


    // ==============================
    // SAVE DAILY REPORT
    // ==============================

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        // ------------------------------
        // Basic Information
        // ------------------------------

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


        // ------------------------------
        // Manpower
        // ------------------------------

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


        // ------------------------------
        // Work Activity
        // ------------------------------

        const activity =
            document.getElementById("activity").value;

        const status =
            document.getElementById("status").value;


        // ------------------------------
        // Materials
        // ------------------------------

        const materialRows =
            materialContainer.querySelectorAll(
                ".material-row"
            );


        const materials = [];


        materialRows.forEach(function (row) {

            const name =
                row.querySelector(
                    ".material-name"
                ).value.trim();


            const quantity =
                Number(
                    row.querySelector(
                        ".material-quantity"
                    ).value
                ) || 0;


            const materialUnit =
                row.querySelector(
                    ".material-unit"
                ).value;


            // Hanya simpan material
            // yang memiliki nama
            if (name !== "") {

                materials.push({

                    name: name,

                    quantity: quantity,

                    unit: materialUnit

                });

            }

        });


        // ------------------------------
        // Notes
        // ------------------------------

        const notes =
            document.getElementById("notes").value;


        // ==============================
        // REPORT OBJECT
        // ==============================

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


        // ==============================
        // LOCAL STORAGE
        // ==============================

        let reports =
            JSON.parse(
                localStorage.getItem(
                    "dailyReports"
                )
            ) || [];


        reports.push(report);


        localStorage.setItem(
            "dailyReports",
            JSON.stringify(reports)
        );


        // ==============================
        // SUCCESS
        // ==============================

        alert(
            "Daily Report berhasil disimpan!"
        );


        window.location.assign(
            "./daily-monitoring.html"
        );

    });

});
