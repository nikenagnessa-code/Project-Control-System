// =====================================================
// DAILY MONITORING
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

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
    // GET ELEMENTS
    // =====================================================

    const dateFilter =
        document.getElementById("dateFilter");

    const locationFilter =
        document.getElementById("locationFilter");

    const projectFilter =
        document.getElementById("projectFilter");

    const unitFilter =
        document.getElementById("unitFilter");

    const reportTableBody =
        document.getElementById("reportTableBody");

    const materialTableBody =
        document.getElementById("materialTableBody");


    // =====================================================
    // KPI ELEMENTS
    // =====================================================

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


    // =====================================================
    // LOAD REPORTS
    // =====================================================

    function getReports() {

        try {

            const saved =
                localStorage.getItem(
                    "dailyReports"
                );

            if (!saved) {
                return [];
            }

            const reports =
                JSON.parse(saved);

            if (!Array.isArray(reports)) {
                return [];
            }

            return reports;

        } catch (error) {

            console.error(
                "Error loading daily reports:",
                error
            );

            return [];

        }

    }


    // =====================================================
    // POPULATE PROJECT FILTER
    // =====================================================

    function updateProjectFilter() {

        if (!projectFilter) {
            return;
        }

        const location =
            locationFilter.value;


        projectFilter.innerHTML =
            '<option value="">All Projects</option>';


        if (
            !location ||
            !projectData[location]
        ) {
            updateUnitFilter();
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

            projectFilter.appendChild(
                option
            );

        });


        updateUnitFilter();

    }


    // =====================================================
    // POPULATE UNIT FILTER
    // =====================================================

    function updateUnitFilter() {

        if (!unitFilter) {
            return;
        }


        const location =
            locationFilter.value;

        const project =
            projectFilter.value;


        unitFilter.innerHTML =
            '<option value="">All Units</option>';


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

                unitFilter.appendChild(
                    option
                );

            });

    }


    // =====================================================
    // FILTER REPORTS
    // =====================================================

    function filterReports(reports) {

        const selectedDate =
            dateFilter
                ? dateFilter.value
                : "";


        const selectedLocation =
            locationFilter
                ? locationFilter.value
                : "";


        const selectedProject =
            projectFilter
                ? projectFilter.value
                : "";


        const selectedUnit =
            unitFilter
                ? unitFilter.value
                : "";


        return reports.filter(
            function (report) {

                // DATE
                if (
                    selectedDate &&
                    report.date !== selectedDate
                ) {
                    return false;
                }


                // LOCATION
                if (
                    selectedLocation &&
                    report.location !== selectedLocation
                ) {
                    return false;
                }


                // PROJECT
                if (
                    selectedProject &&
                    report.project !== selectedProject
                ) {
                    return false;
                }


                // UNIT
                if (
                    selectedUnit &&
                    report.unit !== selectedUnit
                ) {
                    return false;
                }


                return true;

            }
        );

    }


    // =====================================================
    // UPDATE KPI
    // =====================================================

    function updateKPI(reports) {

        let manpower = 0;

        let normalHours = 0;

        let overtimeHours = 0;

        let totalHours = 0;

        let progressCount = 0;

        let completedCount = 0;


        reports.forEach(
            function (report) {

                // -----------------------------
                // MANPOWER
                // -----------------------------

                let reportManpower = 0;


                if (
                    report.manpower &&
                    typeof report.manpower === "object"
                ) {

                    reportManpower =
                        Number(
                            report.manpower.total || 0
                        );

                } else {

                    reportManpower =
                        Number(
                            report.manpower || 0
                        );

                }


                manpower +=
                    reportManpower;


                // -----------------------------
                // MAN-HOURS
                // -----------------------------

                let normalMH =
                    Number(
                        report.normalManhours || 0
                    );


                let overtimeMH =
                    Number(
                        report.overtimeManhours || 0
                    );


                let totalMH =
                    Number(
                        report.totalManhours || 0
                    );


                // Compatibility for old data
                if (
                    totalMH === 0 &&
                    reportManpower > 0
                ) {

                    const normal =
                        Number(
                            report.normalHours || 0
                        );

                    const overtime =
                        Number(
                            report.overtimeHours || 0
                        );


                    normalMH =
                        reportManpower *
                        normal;


                    overtimeMH =
                        reportManpower *
                        overtime;


                    totalMH =
                        normalMH +
                        overtimeMH;

                }


                normalHours +=
                    normalMH;


                overtimeHours +=
                    overtimeMH;


                totalHours +=
                    totalMH;


                // -----------------------------
                // STATUS
                // -----------------------------

                let status =
                    report.status || "";


                if (
                    report.activities &&
                    Array.isArray(report.activities)
                ) {

                    const statuses =
                        report.activities.map(
                            function (activity) {
                                return activity.status;
                            }
                        );


                    if (
                        statuses.includes(
                            "On Progress"
                        )
                    ) {

                        status =
                            "On Progress";

                    } else if (
                        statuses.length > 0 &&
                        statuses.every(
                            function (item) {
                                return item === "Completed";
                            }
                        )
                    ) {

                        status =
                            "Completed";

                    }

                }


                if (
                    status === "Completed"
                ) {

                    completedCount++;

                } else if (
                    status === "On Progress"
                ) {

                    progressCount++;

                }

            }
        );


        // -----------------------------
        // DISPLAY
        // -----------------------------

        if (totalManpower) {
            totalManpower.textContent =
                manpower;
        }


        if (normalManhours) {
            normalManhours.textContent =
                normalHours.toFixed(1);
        }


        if (overtimeManhours) {
            overtimeManhours.textContent =
                overtimeHours.toFixed(1);
        }


        if (totalManhours) {
            totalManhours.textContent =
                totalHours.toFixed(1);
        }


        if (onProgress) {
            onProgress.textContent =
                progressCount;
        }


        if (completed) {
            completed.textContent =
                completedCount;
        }

    }


    // =====================================================
    // STATUS BADGE
    // =====================================================

    function getStatusBadge(status) {

        if (
            status === "Completed"
        ) {

            return `
                <span class="status-completed">
                    Completed
                </span>
            `;

        }


        if (
            status === "On Progress"
        ) {

            return `
                <span class="status-progress">
                    On Progress
                </span>
            `;

        }


        if (
            status === "Delayed"
        ) {

            return `
                <span class="status-delayed">
                    Delayed
                </span>
            `;

        }


        return status || "-";

    }


    // =====================================================
    // GET ACTIVITY SUMMARY
    // =====================================================

    function getActivitySummary(report) {

        // New structured data
        if (
            report.activities &&
            Array.isArray(report.activities) &&
            report.activities.length > 0
        ) {

            return report.activities
                .map(
                    function (activity) {
                        return activity.name;
                    }
                )
                .filter(Boolean)
                .join(", ");

        }


        // Old data
        return report.activity || "-";

    }


    // =====================================================
    // GET REPORT STATUS
    // =====================================================

    function getReportStatus(report) {

        if (
            report.activities &&
            Array.isArray(report.activities) &&
            report.activities.length > 0
        ) {

            const statuses =
                report.activities
                    .map(
                        function (activity) {
                            return activity.status;
                        }
                    )
                    .filter(Boolean);


            if (
                statuses.includes(
                    "On Progress"
                )
            ) {

                return "On Progress";

            }


            if (
                statuses.length > 0 &&
                statuses.every(
                    function (status) {
                        return status === "Completed";
                    }
                )
            ) {

                return "Completed";

            }

        }


        return report.status || "-";

    }


    // =====================================================
    // RENDER REPORT TABLE
    // =====================================================

    function renderReportTable(reports) {

        if (!reportTableBody) {
            return;
        }


        reportTableBody.innerHTML = "";


        if (reports.length === 0) {

            reportTableBody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align:center; color:#98a2b3;">
                        No daily reports available.
                    </td>
                </tr>
            `;

            return;
        }


        // Most recent first
        const sortedReports =
            [...reports].sort(
                function (a, b) {

                    return (
                        new Date(
                            b.date || b.timestamp
                        ) -
                        new Date(
                            a.date || a.timestamp
                        )
                    );

                }
            );


        sortedReports.forEach(
            function (report) {

                const row =
                    document.createElement("tr");


                const manpower =
                    report.manpower &&
                    typeof report.manpower === "object"
                        ? Number(
                            report.manpower.total || 0
                        )
                        : Number(
                            report.manpower || 0
                        );


                const totalMH =
                    Number(
                        report.totalManhours || 0
                    );


                const activity =
                    getActivitySummary(
                        report
                    );


                const status =
                    getReportStatus(
                        report
                    );


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
                        ${manpower}
                    </td>

                    <td>
                        ${totalMH.toFixed(1)}
                    </td>

                    <td>
                        ${activity}
                    </td>

                    <td>
                        ${getStatusBadge(status)}
                    </td>

                `;


                reportTableBody.appendChild(
                    row
                );

            }
        );

    }


    // =====================================================
    // RENDER MATERIAL SUMMARY
    // =====================================================

    function renderMaterialTable(reports) {

        if (!materialTableBody) {
            return;
        }


        materialTableBody.innerHTML = "";


        const materialSummary = {};


        reports.forEach(
            function (report) {

                if (
                    !report.materials ||
                    !Array.isArray(
                        report.materials
                    )
                ) {
                    return;
                }


                report.materials.forEach(
                    function (material) {

                        if (
                            !material ||
                            !material.name
                        ) {
                            return;
                        }


                        const name =
                            material.name.trim();


                        const unit =
                            material.unit || "-";


                        const quantity =
                            Number(
                                material.quantity || 0
                            );


                        const key =
                            name +
                            "||" +
                            unit;


                        if (
                            !materialSummary[key]
                        ) {

                            materialSummary[key] = {

                                name:
                                    name,

                                quantity:
                                    0,

                                unit:
                                    unit

                            };

                        }


                        materialSummary[key]
                            .quantity +=
                            quantity;

                    }
                );

            }
        );


        const materials =
            Object.values(
                materialSummary
            );


        if (materials.length === 0) {

            materialTableBody.innerHTML = `
                <tr>
                    <td colspan="3" style="text-align:center; color:#98a2b3;">
                        No material data available.
                    </td>
                </tr>
            `;

            return;
        }


        materials.forEach(
            function (material) {

                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>
                        ${material.name}
                    </td>

                    <td>
                        ${material.quantity}
                    </td>

                    <td>
                        ${material.unit}
                    </td>

                `;


                materialTableBody.appendChild(
                    row
                );

            }
        );

    }


    // =====================================================
    // REFRESH DASHBOARD
    // =====================================================

    function refreshMonitoring() {

        const reports =
            getReports();


        const filteredReports =
            filterReports(
                reports
            );


        updateKPI(
            filteredReports
        );


        renderReportTable(
            filteredReports
        );


        renderMaterialTable(
            filteredReports
        );

    }


    // =====================================================
    // FILTER EVENTS
    // =====================================================

    if (dateFilter) {

        dateFilter.addEventListener(
            "change",
            refreshMonitoring
        );

    }


    if (locationFilter) {

        locationFilter.addEventListener(
            "change",
            function () {

                updateProjectFilter();

                refreshMonitoring();

            }
        );

    }


    if (projectFilter) {

        projectFilter.addEventListener(
            "change",
            function () {

                updateUnitFilter();

                refreshMonitoring();

            }
        );

    }


    if (unitFilter) {

        unitFilter.addEventListener(
            "change",
            refreshMonitoring
        );

    }


    // =====================================================
    // INITIALIZE
    // =====================================================

    updateProjectFilter();

    refreshMonitoring();

});
