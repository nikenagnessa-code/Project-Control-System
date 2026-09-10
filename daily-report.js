// ==========================================
// DAILY REPORT SYSTEM
// ==========================================

const reportForm = document.getElementById("dailyReportForm");

// ==========================================
// PROJECT & UNIT DATA
// ==========================================

const projectData = {
    Kalimantan: {
        "Tipe 200": ["DANREM"],
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


// ==========================================
// FORM ELEMENTS
// ==========================================

const locationSelect = document.getElementById("location");
const projectSelect = document.getElementById("project");
const unitSelect = document.getElementById("unit");


// ==========================================
// UPDATE PROJECT OPTIONS
// ==========================================

function updateProjectOptions() {

    const location = locationSelect.value;

    projectSelect.innerHTML =
        '<option value="">Select Project</option>';

    unitSelect.innerHTML =
        '<option value="">Select Unit</option>';

    if (!location || !projectData[location]) {
        return;
    }

    Object.keys(projectData[location]).forEach(project => {

        const option = document.createElement("option");

        option.value = project;
        option.textContent = project;

        projectSelect.appendChild(option);
    });
}


// ==========================================
// UPDATE UNIT OPTIONS
// ==========================================

function updateUnitOptions() {

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

    projectData[location][project].forEach(unit => {

        const option = document.createElement("option");

        option.value = unit;
        option.textContent = unit;

        unitSelect.appendChild(option);
    });
}


// ==========================================
// EVENT LISTENERS
// ==========================================

locationSelect.addEventListener(
    "change",
    updateProjectOptions
);

projectSelect.addEventListener(
    "change",
    updateUnitOptions
);


// ==========================================
// MATERIAL SYSTEM
// ==========================================

const materialContainer =
    document.getElementById("materialContainer");

const addMaterialBtn =
    document.getElementById("addMaterialBtn");


function createMaterialRow() {

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

    setupRemoveButton(row);
}


// ==========================================
// REMOVE MATERIAL
// ==========================================

function setupRemoveButton(row) {

    const removeBtn =
        row.querySelector(".remove-material-btn");

    removeBtn.addEventListener(
        "click",
        function () {

            const rows =
                materialContainer.querySelectorAll(
                    ".material-row"
                );

            // Jangan biarkan semua row hilang
            if (rows.length > 1) {
                row.remove();
            } else {
                row.querySelector(".material-name").value = "";
                row.querySelector(".material-quantity").value = "";
                row.querySelector(".material-unit").value = "";
            }
        }
    );
}


// Setup remove button untuk row pertama
const firstMaterialRow =
    materialContainer.querySelector(".material-row");

if (firstMaterialRow) {
    setupRemoveButton(firstMaterialRow);
}


// Add material
addMaterialBtn.addEventListener(
    "click",
    createMaterialRow
);


// ==========================================
// SAVE DAILY REPORT
// ==========================================

if (reportForm) {

    reportForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            console.log("SUBMIT TRIGGERED");

            // --------------------------------------
            // BASIC INFORMATION
            // --------------------------------------

            const reportDate =
                document.getElementById("reportDate").value;

            const weather =
                document.getElementById("weather").value;

            const location =
                document.getElementById("location").value;

            const project =
                document.getElementById("project").value;

            const unit =
                document.getElementById("unit").value;


            // --------------------------------------
            // VALIDATION
            // --------------------------------------

            if (
                !reportDate ||
                !weather ||
                !location ||
                !project ||
                !unit
            ) {

                alert(
                    "Please complete all Basic Information fields."
                );

                return;
            }


            // --------------------------------------
            // MANPOWER
            // --------------------------------------

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


            // --------------------------------------
            // MANPOWER CALCULATION
            // --------------------------------------

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


            // --------------------------------------
            // WORK ACTIVITY
            // --------------------------------------

            const activity =
                document.getElementById("activity").value.trim();

            const status =
                document.getElementById("status").value;


            if (!activity || !status) {

                alert(
                    "Please complete Work Activity and Status."
                );

                return;
            }


            // --------------------------------------
            // QUANTITY & DAILY PROGRESS
            // --------------------------------------

            const quantity =
                Number(
                    document.getElementById("quantity")?.value
                ) || 0;

            const quantityUnit =
                document.getElementById("quantityUnit")?.value
                || "";

            const dailyProgress =
                Number(
                    document.getElementById("dailyProgress")?.value
                ) || 0;


            // --------------------------------------
            // MATERIALS
            // --------------------------------------

            const materials = [];

            const materialRows =
                materialContainer.querySelectorAll(
                    ".material-row"
                );

            materialRows.forEach(row => {

                const name =
                    row.querySelector(
                        ".material-name"
                    ).value.trim();

                const qty =
                    Number(
                        row.querySelector(
                            ".material-quantity"
                        ).value
                    ) || 0;

                const materialUnit =
                    row.querySelector(
                        ".material-unit"
                    ).value;

                if (name) {

                    materials.push({
                        name: name,
                        quantity: qty,
                        unit: materialUnit
                    });
                }
            });


            // --------------------------------------
            // NOTES
            // --------------------------------------

            const notes =
                document.getElementById("notes").value.trim();


            // --------------------------------------
            // CREATE REPORT OBJECT
            // --------------------------------------

            const report = {

                id: Date.now(),

                timestamp:
                    new Date().toISOString(),

                date: reportDate,

                weather: weather,

                location: location,

                project: project,

                unit: unit,


                // Manpower
                manpower: {
                    foreman: foreman,
                    headWorker: headWorker,
                    skilledWorker: skilledWorker,
                    staffOffice: staffOffice,
                    total: totalManpower
                },

                // Man-hours
                normalHours: normalHours,
                overtimeHours: overtimeHours,

                normalManhours: normalManhours,
                overtimeManhours: overtimeManhours,
                totalManhours: totalManhours,


                // Work
                activity: activity,

                quantity: quantity,

                quantityUnit: quantityUnit,

                dailyProgress: dailyProgress,

                status: status,


                // Materials
                materials: materials,


                // Notes
                notes: notes
            };


            // --------------------------------------
            // GET EXISTING REPORTS
            // --------------------------------------

            let reports = [];

            try {

                const storedReports =
                    localStorage.getItem(
                        "dailyReports"
                    );

                if (storedReports) {

                    reports =
                        JSON.parse(storedReports);

                    if (!Array.isArray(reports)) {
                        reports = [];
                    }
                }

            } catch (error) {

                console.error(
                    "Error reading localStorage:",
                    error
                );

                alert(
                    "Unable to read saved reports."
                );

                return;
            }


            // --------------------------------------
            // ADD NEW REPORT
            // --------------------------------------

            reports.push(report);


            // --------------------------------------
            // SAVE TO LOCAL STORAGE
            // --------------------------------------

            try {

                localStorage.setItem(
                    "dailyReports",
                    JSON.stringify(reports)
                );

            } catch (error) {

                console.error(
                    "Error saving report:",
                    error
                );

                alert(
                    "Daily report could not be saved."
                );

                return;
            }


            // --------------------------------------
            // VERIFY SAVE
            // --------------------------------------

            const verification =
                localStorage.getItem(
                    "dailyReports"
                );

            if (!verification) {

                alert(
                    "Daily report was not saved."
                );

                return;
            }


            console.log(
                "DAILY REPORT SAVED:",
                report
            );

            console.log(
                "ALL REPORTS:",
                reports
            );


            // --------------------------------------
            // SUCCESS
            // --------------------------------------

            alert(
                "Daily report berhasil disimpan."
            );


            // --------------------------------------
            // REDIRECT
            // --------------------------------------

            window.location.href =
                "./daily-monitoring.html";
        }
    );
}


// ==========================================
// INITIALIZE
// ==========================================

updateProjectOptions();

console.log(
    "DAILY REPORT JS LOADED"
);
