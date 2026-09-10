// =====================================================
// DAILY MONITORING
// =====================================================

// -----------------------------------------------------
// PROJECT DATA
// -----------------------------------------------------

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


// -----------------------------------------------------
// LOAD DAILY REPORTS
// -----------------------------------------------------

let dailyReports = JSON.parse(
    localStorage.getItem("dailyReports")
) || [];


// -----------------------------------------------------
// DOM ELEMENTS
// -----------------------------------------------------

const dateFilter = document.getElementById("dateFilter");
const locationFilter = document.getElementById("locationFilter");
const projectFilter = document.getElementById("projectFilter");
const unitFilter = document.getElementById("unitFilter");

const reportTableBody =
    document.getElementById("reportTableBody");

const progressTableBody =
    document.getElementById("progressTableBody");

const materialTableBody =
    document.getElementById("materialTableBody");


// KPI

const totalManpower =
    document.getElementById("totalManpower");

const normalManhours =
    document.getElementById("normalManhours");

const overtimeManhours =
    document.getElementById("overtimeManhours");

const totalManhours =
    document.getElementById("totalManhours");

const onProgress =
    document.getElementById("onProgress");

const completed =
    document.getElementById("completed");


// -----------------------------------------------------
// UPDATE PROJECT FILTER
// -----------------------------------------------------

function updateProjectOptions() {

    const location =
        locationFilter.value;

    projectFilter.innerHTML = "";

    const allOption =
        document.createElement("option");

    allOption.value = "All";
    allOption.textContent = "All Projects";

    projectFilter.appendChild(allOption);


    if (location === "All") {

        Object.values(projectData).forEach(
            locationProjects => {

                Object.keys(locationProjects).forEach(
                    project => {

                        const option =
                            document.createElement("option");

                        option.value = project;
                        option.textContent = project;

                        projectFilter.appendChild(option);

                    }
                );

            }
        );

    } else {

        Object.keys(
            projectData[location] || {}
        ).forEach(project => {

            const option =
                document.createElement("option");

            option.value = project;
            option.textContent = project;

            projectFilter.appendChild(option);

        });

    }


    updateUnitOptions();

}


// -----------------------------------------------------
// UPDATE UNIT FILTER
// -----------------------------------------------------

function updateUnitOptions() {

    const location =
        locationFilter.value;

    const project =
        projectFilter.value;

    unitFilter.innerHTML = "";


    const allOption =
        document.createElement("option");

    allOption.value = "All";
    allOption.textContent = "All Units";

    unitFilter.appendChild(allOption);


    if (
        location === "All" &&
        project === "All"
    ) {

        Object.values(projectData).forEach(
            locationProjects => {

                Object.values(locationProjects).forEach(
                    units => {

                        units.forEach(unit => {

                            addUnitOption(unit);

                        });

                    }
                );

            }
        );

    }

    else if (
        location !== "All" &&
        project === "All"
    ) {

        Object.values(
            projectData[location] || {}
        ).forEach(units => {

            units.forEach(unit => {

                addUnitOption(unit);

            });

        });

    }

    else if (
        location !== "All" &&
        project !== "All"
    ) {

        const units =
            projectData[location]?.[project] || [];

        units.forEach(unit => {

            addUnitOption(unit);

        });

    }

    else {

        Object.values(projectData).forEach(
            locationProjects => {

                if (location === "All") {

                    Object.entries(
                        locationProjects
                    ).forEach(([projectName, units]) => {

                        if (
                            projectName === project
                        ) {

                            units.forEach(unit => {

                                addUnitOption(unit);

                            });

                        }

                    });

                }

            }
        );

    }

}


// -----------------------------------------------------
// ADD UNIT OPTION
// -----------------------------------------------------

function addUnitOption(unit) {

    const exists =
        [...unitFilter.options]
            .some(option => option.value === unit);

    if (exists) {
        return;
    }

    const option =
        document.createElement("option");

    option.value = unit;
    option.textContent = unit;

    unitFilter.appendChild(option);

}


// -----------------------------------------------------
// GET FILTERED REPORTS
// -----------------------------------------------------

function getFilteredReports() {

    return dailyReports.filter(report => {

        const dateMatch =
            !dateFilter.value ||
            report.date === dateFilter.value;


        const locationMatch =
            locationFilter.value === "All" ||
            report.location === locationFilter.value;


        const projectMatch =
            projectFilter.value === "All" ||
            report.project === projectFilter.value;


        const unitMatch =
            unitFilter.value === "All" ||
            report.unit === unitFilter.value;


        return (
            dateMatch &&
            locationMatch &&
            projectMatch &&
            unitMatch
        );

    });

}


// -----------------------------------------------------
// UPDATE KPI
// -----------------------------------------------------

function updateKPI(reports) {

    let manpower = 0;

    let normalHours = 0;

    let overtimeHours = 0;

    let totalHours = 0;

    let progressCount = 0;

    let completedCount = 0;


    reports.forEach(report => {

        manpower +=
            Number(report.totalManpower) || 0;

        normalHours +=
            Number(report.normalManhours) || 0;

        overtimeHours +=
            Number(report.overtimeManhours) || 0;

        totalHours +=
            Number(report.totalManhours) || 0;


        if (
            report.status === "On Progress"
        ) {

            progressCount++;

        }


        if (
            report.status === "Completed"
        ) {

            completedCount++;

        }

    });


    totalManpower.textContent =
        manpower;

    normalManhours.textContent =
        normalHours.toFixed(1);

    overtimeManhours.textContent =
        overtimeHours.toFixed(1);

    totalManhours.textContent =
        totalHours.toFixed(1);

    onProgress.textContent =
        progressCount;

    completed.textContent =
        completedCount;

}


// -----------------------------------------------------
// UPDATE RECENT DAILY REPORTS TABLE
// -----------------------------------------------------

function updateReportTable(reports) {

    reportTableBody.innerHTML = "";


    if (reports.length === 0) {

        reportTableBody.innerHTML = `
            <tr>
                <td colspan="9" style="text-align:center;">
                    No daily reports found.
                </td>
            </tr>
        `;

        return;

    }


    // Sort newest first

    const sortedReports =
        [...reports].sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        );


    sortedReports.forEach(report => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${safeValue(report.date)}
            </td>

            <td>
                ${safeValue(report.location)}
            </td>

            <td>
                ${safeValue(report.project)}
            </td>

            <td>
                ${safeValue(report.unit)}
            </td>

            <td>
                ${safeValue(report.weather)}
            </td>

            <td>
                ${safeNumber(report.totalManpower)}
            </td>

            <td>
                ${safeNumber(report.totalManhours)}
            </td>

            <td>
                ${safeValue(report.activity)}
            </td>

            <td>
                ${safeValue(report.status)}
            </td>

        `;


        reportTableBody.appendChild(row);

    });

}


// -----------------------------------------------------
// UPDATE PROGRESS & QUANTITY TABLE
// -----------------------------------------------------

function updateProgressTable(reports) {

    progressTableBody.innerHTML = "";


    if (reports.length === 0) {

        progressTableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center;">
                    No progress records found.
                </td>
            </tr>
        `;

        return;

    }


    const sortedReports =
        [...reports].sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        );


    sortedReports.forEach(report => {

        const row =
            document.createElement("tr");


        const dailyQuantity =
            report.dailyQuantity !== undefined &&
            report.dailyQuantity !== null &&
            report.dailyQuantity !== ""
                ? report.dailyQuantity
                : "-";


        const quantityUnit =
            report.quantityUnit
                ? report.quantityUnit
                : "-";


        const plannedQuantity =
            report.plannedQuantity !== undefined &&
            report.plannedQuantity !== null &&
            report.plannedQuantity !== ""
                ? report.plannedQuantity
                : "-";


        let progress = "-";


        if (
            report.progressPercentage !== undefined &&
            report.progressPercentage !== null &&
            report.progressPercentage !== ""
        ) {

            const value =
                Number(report.progressPercentage);

            if (!isNaN(value)) {

                progress =
                    value.toFixed(1) + "%";

            }

        }


        row.innerHTML = `

            <td>
                ${safeValue(report.date)}
            </td>

            <td>
                ${safeValue(report.project)}
            </td>

            <td>
                ${safeValue(report.unit)}
            </td>

            <td>
                ${safeValue(report.activity)}
            </td>

            <td>
                ${dailyQuantity}
            </td>

            <td>
                ${quantityUnit}
            </td>

            <td>
                ${plannedQuantity}
            </td>

            <td>
                ${progress}
            </td>

        `;


        progressTableBody.appendChild(row);

    });

}


// -----------------------------------------------------
// UPDATE MATERIAL SUMMARY
// -----------------------------------------------------

function updateMaterialTable(reports) {

    materialTableBody.innerHTML = "";


    const materialSummary = {};


    reports.forEach(report => {

        if (!Array.isArray(report.materials)) {
            return;
        }


        report.materials.forEach(material => {

            const name =
                material.name?.trim();

            const unit =
                material.unit?.trim();

            const quantity =
                Number(material.quantity) || 0;


            if (!name) {
                return;
            }


            const key =
                `${name}||${unit}`;


            if (!materialSummary[key]) {

                materialSummary[key] = {
                    name: name,
                    quantity: 0,
                    unit: unit || "-"
                };

            }


            materialSummary[key].quantity +=
                quantity;

        });

    });


    const materials =
        Object.values(materialSummary);


    if (materials.length === 0) {

        materialTableBody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center;">
                    No material records found.
                </td>
            </tr>
        `;

        return;

    }


    materials.forEach(material => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${safeValue(material.name)}
            </td>

            <td>
                ${material.quantity}
            </td>

            <td>
                ${safeValue(material.unit)}
            </td>

        `;


        materialTableBody.appendChild(row);

    });

}


// -----------------------------------------------------
// SAFE DISPLAY
// -----------------------------------------------------

function safeValue(value) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return "-";

    }

    return value;

}


function safeNumber(value) {

    const number =
        Number(value);

    if (isNaN(number)) {
        return 0;
    }

    return number;

}


// -----------------------------------------------------
// REFRESH DASHBOARD
// -----------------------------------------------------

function refreshDashboard() {

    const reports =
        getFilteredReports();


    updateKPI(reports);

    updateReportTable(reports);

    updateProgressTable(reports);

    updateMaterialTable(reports);

}


// -----------------------------------------------------
// FILTER EVENTS
// -----------------------------------------------------

dateFilter.addEventListener(
    "change",
    refreshDashboard
);


locationFilter.addEventListener(
    "change",
    () => {

        updateProjectOptions();

        refreshDashboard();

    }
);


projectFilter.addEventListener(
    "change",
    () => {

        updateUnitOptions();

        refreshDashboard();

    }
);


unitFilter.addEventListener(
    "change",
    refreshDashboard
);


// -----------------------------------------------------
// INITIALIZE
// -----------------------------------------------------

updateProjectOptions();

refreshDashboard();
