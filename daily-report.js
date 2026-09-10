// ===============================
// PROJECT DATA
// ===============================

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
            "Tipe 150 - Rumah No. 23",
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


// ===============================
// DOM ELEMENTS
// ===============================

const locationSelect = document.getElementById("location");
const projectSelect = document.getElementById("project");
const unitSelect = document.getElementById("unit");

const reportForm = document.getElementById("dailyReportForm");

const materialContainer = document.getElementById("materialContainer");
const addMaterialBtn = document.getElementById("addMaterialBtn");


// ===============================
// LOCATION → PROJECT
// ===============================

function updateProjectOptions() {

    const location = locationSelect.value;

    projectSelect.innerHTML = `
        <option value="">Select Project</option>
    `;

    unitSelect.innerHTML = `
        <option value="">Select Unit</option>
    `;

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


// ===============================
// PROJECT → UNIT
// ===============================

function updateUnitOptions() {

    const location = locationSelect.value;
    const project = projectSelect.value;

    unitSelect.innerHTML = `
        <option value="">Select Unit</option>
    `;

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


// ===============================
// EVENT LISTENERS
// ===============================

locationSelect.addEventListener("change", updateProjectOptions);

projectSelect.addEventListener("change", updateUnitOptions);


// ===============================
// PROGRESS & QUANTITY
// ===============================

const dailyQuantityInput = document.getElementById("dailyQuantity");
const quantityUnitInput = document.getElementById("quantityUnit");
const plannedQuantityInput = document.getElementById("plannedQuantity");
const progressPercentageInput = document.getElementById("progressPercentage");


function calculateProgress() {

    if (
        !dailyQuantityInput ||
        !plannedQuantityInput ||
        !progressPercentageInput
    ) {
        return;
    }

    const dailyQuantity = parseFloat(dailyQuantityInput.value);
    const plannedQuantity = parseFloat(plannedQuantityInput.value);

    if (
        isNaN(dailyQuantity) ||
        isNaN(plannedQuantity) ||
        plannedQuantity <= 0
    ) {
        progressPercentageInput.value = "";
        return;
    }

    const progress = (dailyQuantity / plannedQuantity) * 100;

    progressPercentageInput.value = progress.toFixed(2);
}


if (dailyQuantityInput) {
    dailyQuantityInput.addEventListener("input", calculateProgress);
}

if (plannedQuantityInput) {
    plannedQuantityInput.addEventListener("input", calculateProgress);
}


// ===============================
// MATERIAL ROW
// ===============================

function createMaterialRow() {

    const materialRow = document.createElement("div");

    materialRow.className = "material-row";

    materialRow.innerHTML = `
        <div class="form-group">
            <label>Material</label>
            <input
                type="text"
                class="material-name"
                placeholder="Material name"
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
            <input
                type="text"
                class="material-unit"
                placeholder="Unit"
            >
        </div>

        <button
            type="button"
            class="remove-material-btn"
        >
            Remove
        </button>
    `;

    const removeButton =
        materialRow.querySelector(".remove-material-btn");

    removeButton.addEventListener("click", function () {
        materialRow.remove();
    });

    materialContainer.appendChild(materialRow);
}


// ===============================
// ADD MATERIAL
// ===============================

if (addMaterialBtn) {

    addMaterialBtn.addEventListener("click", function () {

        createMaterialRow();

    });

}


// ===============================
// FORM SUBMIT
// ===============================

reportForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // ===============================
    // BASIC INFORMATION
    // ===============================

    const date =
        document.getElementById("reportDate").value;

    const weather =
        document.getElementById("weather").value;

    const location =
        document.getElementById("location").value;

    const project =
        document.getElementById("project").value;

    const unit =
        document.getElementById("unit").value;


    // ===============================
    // MANPOWER
    // ===============================

    const foreman =
        parseInt(document.getElementById("foreman").value) || 0;

    const headWorker =
        parseInt(document.getElementById("headWorker").value) || 0;

    const skilledWorker =
        parseInt(document.getElementById("skilledWorker").value) || 0;

    const staffOffice =
        parseInt(document.getElementById("staffOffice").value) || 0;


    const normalHours =
        parseFloat(document.getElementById("normalHours").value) || 0;

    const overtimeHours =
        parseFloat(document.getElementById("overtimeHours").value) || 0;


    // ===============================
    // MANPOWER CALCULATION
    // ===============================

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


    // ===============================
    // WORK ACTIVITY
    // ===============================

    const activity =
        document.getElementById("activity").value;

    const status =
        document.getElementById("status").value;


    // ===============================
    // PROGRESS & QUANTITY
    // ===============================

    let dailyQuantity = null;
    let quantityUnit = "";
    let plannedQuantity = null;
    let progressPercentage = null;


    if (dailyQuantityInput) {

        const value =
            parseFloat(dailyQuantityInput.value);

        if (!isNaN(value)) {
            dailyQuantity = value;
        }
    }


    if (quantityUnitInput) {

        quantityUnit =
            quantityUnitInput.value;
    }


    if (plannedQuantityInput) {

        const value =
            parseFloat(plannedQuantityInput.value);

        if (!isNaN(value)) {
            plannedQuantity = value;
        }
    }


    if (
        dailyQuantity !== null &&
        plannedQuantity !== null &&
        plannedQuantity > 0
    ) {

        progressPercentage =
            (dailyQuantity / plannedQuantity) * 100;

    }


    // ===============================
    // MATERIALS
    // ===============================

    const materials = [];

    const materialRows =
        materialContainer.querySelectorAll(".material-row");


    materialRows.forEach(row => {

        const name =
            row.querySelector(".material-name")?.value.trim() || "";

        const quantityValue =
            row.querySelector(".material-quantity")?.value;

        const quantity =
            parseFloat(quantityValue) || 0;

        const materialUnit =
            row.querySelector(".material-unit")?.value.trim() || "";


        if (name !== "") {

            materials.push({
                name: name,
                quantity: quantity,
                unit: materialUnit
            });

        }

    });


    // ===============================
    // NOTES
    // ===============================

    const notes =
        document.getElementById("notes").value;


    // ===============================
    // REPORT OBJECT
    // ===============================

    const report = {

        id: Date.now(),

        date: date,

        location: location,

        project: project,

        unit: unit,

        weather: weather,


        // MANPOWER

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


        // ACTIVITY

        activity: activity,

        status: status,


        // PROGRESS

        dailyQuantity: dailyQuantity,

        quantityUnit: quantityUnit,

        plannedQuantity: plannedQuantity,

        progressPercentage: progressPercentage,


        // MATERIAL

        materials: materials,


        // NOTES

        notes: notes

    };


    // ===============================
    // SAVE TO LOCAL STORAGE
    // ===============================

    let reports =
        JSON.parse(
            localStorage.getItem("dailyReports")
        ) || [];


    reports.push(report);


    localStorage.setItem(
        "dailyReports",
        JSON.stringify(reports)
    );


    // ===============================
    // REDIRECT
    // ===============================

    window.location.assign(
        "./daily-monitoring.html"
    );

});


// ===============================
// INITIAL STATE
// ===============================

updateProjectOptions();
