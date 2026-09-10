document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // LOAD DATA
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
    // UPDATE LOCATION
    // =====================================================

    function updateLocationFilter() {

        if (!locationFilter) return;

        locationFilter.innerHTML = `
            <option value="">All Locations</option>
            <option value="Kalimantan">Kalimantan</option>
            <option value="Tasikmalaya">Tasikmalaya</option>
        `;

    }


    // =====================================================
    // UPDATE PROJECT
    // =====================================================

    function updateProjectFilter() {

        if (!projectFilter) return;

        const location =
            locationFilter.value;

        projectFilter.innerHTML =
            `<option value="">All Projects</option>`;

        unitFilter.innerHTML =
            `<option value="">All Units</option>`;


        if (!location || !projectData[location]) {
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
    // UPDATE UNIT
    // =====================================================

    function updateUnitFilter() {

        if (!unitFilter) return;

        const location =
            locationFilter.value;

        const project =
            projectFilter.value;


        unitFilter.innerHTML =
            `<option value="">All Units</option>`;


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

                option.value = unit;
                option.textContent = unit;

                unitFilter.appendChild(option);

            });

    }


    // =====================================================
    // FILTER REPORTS
    // =====================================================

    function getFilteredReports() {

        const date =
            dateFilter
                ? dateFilter.value
                : "";

        const location =
            locationFilter
                ? locationFilter.value
                : "";

        const project =
            projectFilter
                ? projectFilter.value
                : "";

        const unit =
            unitFilter
                ? unitFilter.value
                : "";


        return reports.filter(function (report) {

            const dateMatch =
                !date ||
                report.date === date;


            const locationMatch =
                !location ||
                report.location === location;


            const projectMatch =
                !project ||
                report.project === project;


            const unitMatch =
                !unit ||
                report.unit === unit;


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

            } else if (
                status.includes("complete") ||
                status.includes("completed")
            ) {
                completed++;
            }

        });


        const kpiCards =
            document.querySelectorAll(".kpi-card");


        if (kpiCards.length >= 6) {

            kpiCards[0]
                .querySelector(".kpi-value")
                .textContent = totalManpower;

            kpiCards[1]
                .querySelector(".kpi-value")
                .textContent = normalManhours.toLocaleString();

            kpiCards[2]
                .querySelector(".kpi-value")
                .textContent = overtimeManhours.toLocaleString();

            kpiCards[3]
                .querySelector(".kpi-value")
                .textContent = totalManhours.toLocaleString();

            kpiCards[4]
                .querySelector(".kpi-value")
                .textContent = onProgress;

            kpiCards[5]
                .querySelector(".kpi-value")
                .textContent = completed;

        }

    }


    // =====================================================
    // UPDATE REPORT TABLE
    // =====================================================

    function updateReportTable(filteredReports) {

        const tbody =
            document.querySelector(
                "#reportTable tbody"
            );


        if (!tbody) return;


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


            const totalManpower =
                Number(report.totalManpower) || 0;


            const totalManhours =
                Number(report.totalManhours) || 0;


            row.innerHTML = `

                <td>${report.date || "-"}</td>

                <td>${report.location || "-"}</td>

                <td>${report.project || "-"}</td>

                <td>${report.unit || "-"}</td>

                <td>${report.weather || "-"}</td>

                <td>${totalManpower}</td>

                <td>${totalManhours}</td>

                <td>${report.activity || "-"}</td>

                <td>${report.status || "-"}</td>

            `;


            tbody.appendChild(row);

        });

    }


    // =====================================================
    // UPDATE MATERIAL SUMMARY
    // =====================================================

    function updateMaterialSummary(filteredReports) {

        const tbody =
            document.querySelector(
                "#materialTable tbody"
            );


        if (!tbody) return;


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

                <td>${material.name}</td>

                <td>
                    ${material.quantity.toLocaleString(
                        "id-ID",
                        {
                            maximumFractionDigits: 2
                        }
                    )}
                </td>

                <td>${material.unit}</td>

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

    if (dateFilter) {

        dateFilter.addEventListener(
            "change",
            updateDashboard
        );

    }


    if (locationFilter) {

        locationFilter.addEventListener(
            "change",
            function () {

                updateProjectFilter();

                updateDashboard();

            }
        );

    }


    if (projectFilter) {

        projectFilter.addEventListener(
            "change",
            function () {

                updateUnitFilter();

                updateDashboard();

            }
        );

    }


    if (unitFilter) {

        unitFilter.addEventListener(
            "change",
            updateDashboard
        );

    }


    // =====================================================
    // INITIALIZE
    // =====================================================

    updateLocationFilter();

    updateProjectFilter();

    updateUnitFilter();

    updateDashboard();

});
