document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // LOAD REPORT DATA
    // =====================================================

    let reports =
        JSON.parse(
            localStorage.getItem("dailyReports")
        ) || [];


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


    // =====================================================
    // ELEMENTS
    // =====================================================

    const dateFilter =
        document.getElementById("dateFilter");

    const locationFilter =
        document.getElementById("locationFilter");

    const projectFilter =
        document.getElementById("projectFilter");

    const unitFilter =
        document.getElementById("unitFilter");


    // =====================================================
    // UPDATE PROJECT FILTER
    // =====================================================

    function updateProjectFilter() {

        const location =
            locationFilter.value;

        projectFilter.innerHTML =
            `<option value="All">All Projects</option>`;

        unitFilter.innerHTML =
            `<option value="All">All Units</option>`;


        if (
            location === "All" ||
            !projectData[location]
        ) {
            return;
        }


        Object.keys(
            projectData[location]
        ).forEach(function (project) {

            const option =
                document.createElement("option");

            option.value = project;
            option.textContent = project;

            projectFilter.appendChild(option);

        });

    }


    // =====================================================
    // UPDATE UNIT FILTER
    // =====================================================

    function updateUnitFilter() {

        const location =
            locationFilter.value;

        const project =
            projectFilter.value;

        unitFilter.innerHTML =
            `<option value="All">All Units</option>`;


        if (
            location === "All" ||
            project === "All" ||
            !projectData[location] ||
            !projectData[location][project]
        ) {
            return;
        }


        projectData[location][project]
            .forEach(function (unit) {

                const option =
                    document.createElement("option");

                option.value = unit;
                option.textContent = unit;

                unitFilter.appendChild(option);

            });

    }


    // =====================================================
    // FILTER REPORTS
    // =====================================================

    function getFilteredReports() {

        const selectedDate =
            dateFilter.value;

        const selectedLocation =
            locationFilter.value;

        const selectedProject =
            projectFilter.value;

        const selectedUnit =
            unitFilter.value;


        return reports.filter(function (report) {

            const dateMatch =
                !selectedDate ||
                report.date === selectedDate;


            const locationMatch =
                selectedLocation === "All" ||
                report.location === selectedLocation;


            const projectMatch =
                selectedProject === "All" ||
                report.project === selectedProject;


            const unitMatch =
                selectedUnit === "All" ||
                report.unit === selectedUnit;


            return (
                dateMatch &&
                locationMatch &&
                projectMatch &&
                unitMatch
            );

        });

    }


    // =====================================================
    // UPDATE KPI
    // =====================================================

    function updateKPI(filteredReports) {

        let totalManpower = 0;
        let normalManhours = 0;
        let overtimeManhours = 0;
        let totalManhours = 0;

        let onProgress = 0;
        let completed = 0;


        filteredReports.forEach(function (report) {

            totalManpower +=
                Number(report.totalManpower) || 0;

            normalManhours +=
                Number(report.normalManhours) || 0;

            overtimeManhours +=
                Number(report.overtimeManhours) || 0;

            totalManhours +=
                Number(report.totalManhours) || 0;


            const status =
                String(report.status || "")
                    .toLowerCase();


            if (
                status.includes("progress")
            ) {

                onProgress++;

            }


            if (
                status.includes("complete")
            ) {

                completed++;

            }

        });


        // =================================================
        // UPDATE HTML KPI DIRECTLY
        // =================================================

        document.getElementById(
            "totalManpower"
        ).textContent =
            totalManpower.toLocaleString("id-ID");


        document.getElementById(
            "normalManhours"
        ).textContent =
            normalManhours.toLocaleString("id-ID");


        document.getElementById(
            "overtimeManhours"
        ).textContent =
            overtimeManhours.toLocaleString("id-ID");


        document.getElementById(
            "totalManhours"
        ).textContent =
            totalManhours.toLocaleString("id-ID");


        document.getElementById(
            "onProgress"
        ).textContent =
            onProgress;


        document.getElementById(
            "completed"
        ).textContent =
            completed;

    }


    // =====================================================
    // UPDATE REPORT TABLE
    // =====================================================

    function updateReportTable(filteredReports) {

        const tbody =
            document.getElementById(
                "reportTableBody"
            );


        tbody.innerHTML = "";


        if (filteredReports.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align:center;">
                        No daily reports found.
                    </td>
                </tr>
            `;

            return;

        }


        filteredReports.forEach(function (report) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${report.date || "-"}
                </td>

                <td>
                    ${report.location || "-"}
                </td>

                <td>
                    ${report.project || "-"}
                </td>

                <td>
                    ${report.unit || "-"}
                </td>

                <td>
                    ${report.weather || "-"}
                </td>

                <td>
                    ${report.totalManpower || 0}
                </td>

                <td>
                    ${report.totalManhours || 0}
                </td>

                <td>
                    ${report.activity || "-"}
                </td>

                <td>
                    ${report.status || "-"}
                </td>

            `;


            tbody.appendChild(row);

        });

    }


    // =====================================================
    // UPDATE MATERIAL SUMMARY
    // =====================================================

    function updateMaterialSummary(filteredReports) {

        const tbody =
            document.getElementById(
                "materialTableBody"
            );


        tbody.innerHTML = "";


        const materialSummary = {};


        filteredReports.forEach(function (report) {

            if (
                !Array.isArray(report.materials)
            ) {
                return;
            }


            report.materials.forEach(function (material) {

                const name =
                    String(material.name || "")
                        .trim();

                const quantity =
                    Number(material.quantity) || 0;

                const unit =
                    material.unit || "-";


                if (!name) return;


                // Material + unit menjadi key
                const key =
                    name + "||" + unit;


                if (!materialSummary[key]) {

                    materialSummary[key] = {

                        name: name,

                        quantity: 0,

                        unit: unit

                    };

                }


                materialSummary[key].quantity +=
                    quantity;

            });

        });


        const materials =
            Object.values(materialSummary);


        if (materials.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="3" style="text-align:center;">
                        No material data found.
                    </td>
                </tr>
            `;

            return;

        }


        materials.forEach(function (material) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${material.name}
                </td>

                <td>
                    ${material.quantity.toLocaleString(
                        "id-ID",
                        {
                            maximumFractionDigits: 2
                        }
                    )}
                </td>

                <td>
                    ${material.unit}
                </td>

            `;


            tbody.appendChild(row);

        });

    }


    // =====================================================
    // UPDATE DASHBOARD
    // =====================================================

    function updateDashboard() {

        const filteredReports =
            getFilteredReports();


        updateKPI(
            filteredReports
        );


        updateReportTable(
            filteredReports
        );


        updateMaterialSummary(
            filteredReports
        );

    }


    // =====================================================
    // FILTER EVENTS
    // =====================================================

    dateFilter.addEventListener(
        "change",
        updateDashboard
    );


    locationFilter.addEventListener(
        "change",
        function () {

            updateProjectFilter();

            updateDashboard();

        }
    );


    projectFilter.addEventListener(
        "change",
        function () {

            updateUnitFilter();

            updateDashboard();

        }
    );


    unitFilter.addEventListener(
        "change",
        updateDashboard
    );


    // =====================================================
    // INITIALIZE
    // =====================================================

    updateProjectFilter();

    updateUnitFilter();

    updateDashboard();

});
