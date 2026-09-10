/* =========================================================
   DAILY MONITORING
   Project Control System
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIG
    ====================================================== */

    const REPORT_STORAGE_KEY = "dailyReports";


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const dateFilter = document.getElementById("dateFilter");
    const locationFilter = document.getElementById("locationFilter");
    const projectFilter = document.getElementById("projectFilter");
    const unitFilter = document.getElementById("unitFilter");

    const totalManpowerEl = document.getElementById("totalManpower");
    const normalManhoursEl = document.getElementById("normalManhours");
    const overtimeManhoursEl = document.getElementById("overtimeManhours");
    const totalManhoursEl = document.getElementById("totalManhours");
    const onProgressEl = document.getElementById("onProgress");
    const completedEl = document.getElementById("completed");

    const reportTableBody = document.getElementById("reportTableBody");
    const progressTableBody = document.getElementById("progressTableBody");
    const materialTableBody = document.getElementById("materialTableBody");


    /* =====================================================
       HELPERS
    ====================================================== */

    function getReports() {

        try {

            const stored = localStorage.getItem(REPORT_STORAGE_KEY);

            if (!stored) {
                return [];
            }

            const parsed = JSON.parse(stored);

            return Array.isArray(parsed) ? parsed : [];

        } catch (error) {

            console.error(
                "Failed to read daily reports:",
                error
            );

            return [];

        }

    }


    function getMasterSchedule() {

        if (
            typeof window.masterSchedule !== "undefined" &&
            Array.isArray(window.masterSchedule)
        ) {
            return window.masterSchedule;
        }

        if (
            typeof masterSchedule !== "undefined" &&
            Array.isArray(masterSchedule)
        ) {
            return masterSchedule;
        }

        return [];

    }


    function number(value) {

        const parsed = parseFloat(value);

        return Number.isFinite(parsed)
            ? parsed
            : 0;

    }


    function formatNumber(value, decimals = 2) {

        return number(value).toLocaleString(
            "en-US",
            {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }
        );

    }


    function formatPercent(value) {

        return `${formatNumber(value, 2)}%`;

    }


    function escapeHTML(value) {

        if (value === null || value === undefined) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function normalize(value) {

        return String(value || "")
            .trim()
            .toLowerCase();

    }


    function getActivityId(activity) {

        return (
            activity?.activityId ||
            activity?.id ||
            ""
        );

    }


    function getActivityName(activity) {

        return (
            activity?.name ||
            activity?.activity ||
            activity?.activityName ||
            "-"
        );

    }


    function getWorkPackage(activity) {

        return (
            activity?.workPackage ||
            activity?.category ||
            activity?.wbs ||
            "-"
        );

    }


    function getQuantity(activity) {

        return number(
            activity?.quantity ??
            activity?.actualQuantity ??
            activity?.actualToday ??
            0
        );

    }


    function getPlannedQuantity(activity) {

        return number(
            activity?.plannedQuantity ??
            activity?.planned ??
            0
        );

    }


    function getUnit(activity) {

        return (
            activity?.unit ||
            activity?.quantityUnit ||
            "-"
        );

    }


    function getWeight(activity) {

        return number(
            activity?.weight ??
            activity?.bobot ??
            0
        );

    }


    /* =====================================================
       MASTER SCHEDULE MAP
    ====================================================== */

    function createScheduleMap() {

        const schedule = getMasterSchedule();

        const map = new Map();

        schedule.forEach(item => {

            const id = getActivityId(item);

            if (!id) {
                return;
            }

            map.set(String(id), item);

        });

        return map;

    }


    /* =====================================================
       REPORT FILTERING
    ====================================================== */

    function getFilteredReports() {

        const reports = getReports();

        const selectedDate =
            dateFilter?.value || "All";

        const selectedLocation =
            locationFilter?.value || "All";

        const selectedProject =
            projectFilter?.value || "All";

        const selectedUnit =
            unitFilter?.value || "All";


        return reports.filter(report => {

            const reportDate =
                report.reportDate ||
                report.date ||
                "";


            const reportLocation =
                report.location ||
                "";


            const reportProject =
                report.project ||
                "";


            const reportUnit =
                report.unit ||
                "";


            if (
                selectedDate !== "All" &&
                selectedDate !== "" &&
                reportDate !== selectedDate
            ) {
                return false;
            }


            if (
                selectedLocation !== "All" &&
                normalize(reportLocation) !==
                normalize(selectedLocation)
            ) {
                return false;
            }


            if (
                selectedProject !== "All" &&
                normalize(reportProject) !==
                normalize(selectedProject)
            ) {
                return false;
            }


            if (
                selectedUnit !== "All" &&
                normalize(reportUnit) !==
                normalize(selectedUnit)
            ) {
                return false;
            }


            return true;

        });

    }


    /* =====================================================
       FILTER OPTIONS
    ====================================================== */

    function populateFilters() {

        const reports = getReports();

        const currentProject =
            projectFilter?.value || "All";

        const currentUnit =
            unitFilter?.value || "All";


        if (projectFilter) {

            const projects = [
                ...new Set(
                    reports
                        .map(report => report.project)
                        .filter(Boolean)
                )
            ];

            projectFilter.innerHTML = `
                <option value="All">
                    All Projects
                </option>
            `;

            projects.forEach(project => {

                const option =
                    document.createElement("option");

                option.value = project;
                option.textContent = project;

                projectFilter.appendChild(option);

            });


            if (
                projects.includes(currentProject)
            ) {
                projectFilter.value =
                    currentProject;
            }

        }


        if (unitFilter) {

            const units = [
                ...new Set(
                    reports
                        .map(report => report.unit)
                        .filter(Boolean)
                )
            ];

            unitFilter.innerHTML = `
                <option value="All">
                    All Units
                </option>
            `;

            units.forEach(unit => {

                const option =
                    document.createElement("option");

                option.value = unit;
                option.textContent = unit;

                unitFilter.appendChild(option);

            });


            if (
                units.includes(currentUnit)
            ) {
                unitFilter.value =
                    currentUnit;
            }

        }

    }


    /* =====================================================
       KPI - MANPOWER
    ====================================================== */

    function updateManpowerKPI(reports) {

        let totalManpower = 0;
        let normalManhours = 0;
        let overtimeManhours = 0;


        reports.forEach(report => {

            const foreman =
                number(report.foreman);

            const headWorker =
                number(report.headWorker);

            const skilledWorker =
                number(report.skilledWorker);

            const staffOffice =
                number(report.staffOffice);


            const manpower =
                number(
                    report.manpower
                ) ||
                (
                    foreman +
                    headWorker +
                    skilledWorker +
                    staffOffice
                );


            const normalHours =
                number(
                    report.normalHours
                );


            const overtimeHours =
                number(
                    report.overtimeHours
                );


            totalManpower += manpower;

            normalManhours +=
                manpower * normalHours;

            overtimeManhours +=
                manpower * overtimeHours;

        });


        const totalManhours =
            normalManhours +
            overtimeManhours;


        if (totalManpowerEl) {
            totalManpowerEl.textContent =
                formatNumber(totalManpower, 0);
        }


        if (normalManhoursEl) {
            normalManhoursEl.textContent =
                formatNumber(normalManhours, 2);
        }


        if (overtimeManhoursEl) {
            overtimeManhoursEl.textContent =
                formatNumber(overtimeManhours, 2);
        }


        if (totalManhoursEl) {
            totalManhoursEl.textContent =
                formatNumber(totalManhours, 2);
        }

    }


    /* =====================================================
       ACTIVITY DATA
    ====================================================== */

    function buildActivityData(reports) {

        const scheduleMap =
            createScheduleMap();


        const activityMap =
            new Map();


        reports.forEach(report => {

            const activities =
                Array.isArray(report.activities)
                    ? report.activities
                    : [];


            activities.forEach(activity => {

                const activityId =
                    getActivityId(activity);


                const key =
                    activityId ||
                    `${normalize(report.project)}|
                     ${normalize(report.unit)}|
                     ${normalize(getActivityName(activity))}`;


                if (!activityMap.has(key)) {

                    const scheduleItem =
                        scheduleMap.get(
                            String(activityId)
                        );


                    activityMap.set(
                        key,
                        {

                            activityId,

                            project:
                                report.project || "",

                            unitProject:
                                report.unit || "",

                            workPackage:
                                getWorkPackage(
                                    activity
                                ),

                            activity:
                                getActivityName(
                                    activity
                                ),

                            plannedQuantity:
                                getPlannedQuantity(
                                    activity
                                ) ||
                                number(
                                    scheduleItem?.plannedQuantity
                                ),

                            quantityUnit:
                                getUnit(
                                    activity
                                ) ||
                                scheduleItem?.unit ||
                                "-",

                            weight:
                                getWeight(
                                    activity
                                ) ||
                                number(
                                    scheduleItem?.weight
                                ),

                            actualToday: 0,

                            dates: [],

                            statuses: []

                        }
                    );

                }


                const item =
                    activityMap.get(key);


                item.actualToday +=
                    getQuantity(activity);


                if (report.reportDate) {

                    item.dates.push(
                        report.reportDate
                    );

                }


                if (activity.status) {

                    item.statuses.push(
                        activity.status
                    );

                }

            });

        });


        return [...activityMap.values()];

    }


    /* =====================================================
       CUMULATIVE ACTUAL
    ====================================================== */

    function getAllReportsForActivity(
        activityId,
        project,
        unitProject
    ) {

        const reports =
            getReports();


        let total = 0;


        reports.forEach(report => {

            if (
                project &&
                normalize(report.project) !==
                normalize(project)
            ) {
                return;
            }


            if (
                unitProject &&
                normalize(report.unit) !==
                normalize(unitProject)
            ) {
                return;
            }


            const activities =
                Array.isArray(report.activities)
                    ? report.activities
                    : [];


            activities.forEach(activity => {

                if (
                    activityId &&
                    String(
                        getActivityId(activity)
                    ) === String(activityId)
                ) {

                    total +=
                        getQuantity(activity);

                }

            });

        });


        return total;

    }


    /* =====================================================
       PROGRESS CALCULATION
    ====================================================== */

    function calculateProgress(item) {

        const cumulativeActual =
            getAllReportsForActivity(
                item.activityId,
                item.project,
                item.unitProject
            );


        const planned =
            number(
                item.plannedQuantity
            );


        let progress = 0;


        if (planned > 0) {

            progress =
                (
                    cumulativeActual /
                    planned
                ) * 100;

        }


        progress =
            Math.max(
                0,
                Math.min(
                    100,
                    progress
                )
            );


        const weightedProgress =
            (
                progress *
                number(item.weight)
            ) / 100;


        return {

            cumulativeActual,

            progress,

            weightedProgress

        };

    }


    /* =====================================================
       OVERALL PROGRESS
    ====================================================== */

    function calculateOverallProgress(
        reports
    ) {

        const activities =
            buildActivityData(reports);


        let totalWeightedProgress = 0;

        let totalWeight = 0;


        activities.forEach(item => {

            const result =
                calculateProgress(item);


            totalWeightedProgress +=
                result.weightedProgress;


            totalWeight +=
                number(item.weight);

        });


        /*
         * Because the selected reports can represent
         * only part of the project, we calculate
         * weighted progress against the schedule
         * represented by the activities.
         */

        if (totalWeight <= 0) {

            return 0;

        }


        return (
            totalWeightedProgress /
            totalWeight
        ) * 100;

    }


    /* =====================================================
       ACTIVITY STATUS KPI
    ====================================================== */

    function updateActivityKPI(reports) {

        const activities =
            buildActivityData(reports);


        let onProgress = 0;
        let completed = 0;


        activities.forEach(item => {

            const result =
                calculateProgress(item);


            if (result.progress >= 100) {

                completed++;

            } else if (
                result.cumulativeActual > 0
            ) {

                onProgress++;

            }

        });


        if (onProgressEl) {

            onProgressEl.textContent =
                onProgress;

        }


        if (completedEl) {

            completedEl.textContent =
                completed;

        }

    }


    /* =====================================================
       RECENT DAILY REPORTS
    ====================================================== */

    function renderReports(reports) {

        if (!reportTableBody) {
            return;
        }


        reportTableBody.innerHTML = "";


        if (reports.length === 0) {

            reportTableBody.innerHTML = `
                <tr>
                    <td colspan="9"
                        style="text-align:center;">
                        No daily reports recorded.
                    </td>
                </tr>
            `;

            return;

        }


        const sortedReports =
            [...reports].sort(
                (a, b) =>
                    String(
                        b.reportDate ||
                        b.date ||
                        ""
                    ).localeCompare(
                        String(
                            a.reportDate ||
                            a.date ||
                            ""
                        )
                    )
            );


        sortedReports.forEach(report => {

            const activities =
                Array.isArray(report.activities)
                    ? report.activities
                    : [];


            const manpower =
                number(
                    report.manpower
                ) ||
                (
                    number(report.foreman) +
                    number(report.headWorker) +
                    number(report.skilledWorker) +
                    number(report.staffOffice)
                );


            const normalHours =
                number(
                    report.normalHours
                );


            const overtimeHours =
                number(
                    report.overtimeHours
                );


            const manhours =
                manpower *
                (
                    normalHours +
                    overtimeHours
                );


            const statuses =
                activities.map(
                    activity =>
                        activity.status
                );


            let status = "—";


            if (
                statuses.includes("Completed")
            ) {

                status = "Completed";

            } else if (
                statuses.includes("On Progress")
            ) {

                status = "On Progress";

            } else if (
                statuses.length > 0
            ) {

                status =
                    statuses[0] || "—";

            }


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${escapeHTML(
                        report.reportDate ||
                        report.date ||
                        "-"
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        report.location || "-"
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        report.project || "-"
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        report.unit || "-"
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        report.weather || "-"
                    )}
                </td>

                <td>
                    ${formatNumber(
                        manpower,
                        0
                    )}
                </td>

                <td>
                    ${formatNumber(
                        manhours,
                        2
                    )}
                </td>

                <td>
                    ${activities.length}
                </td>

                <td>
                    ${escapeHTML(status)}
                </td>

            `;


            reportTableBody.appendChild(row);

        });

    }


    /* =====================================================
       DAILY PROGRESS TABLE
    ====================================================== */

    function renderProgressTable(reports) {

        if (!progressTableBody) {
            return;
        }


        progressTableBody.innerHTML = "";


        if (reports.length === 0) {

            progressTableBody.innerHTML = `
                <tr>
                    <td colspan="8"
                        style="text-align:center;">
                        No progress data recorded.
                    </td>
                </tr>
            `;

            return;

        }


        const rows = [];


        reports.forEach(report => {

            const activities =
                Array.isArray(report.activities)
                    ? report.activities
                    : [];


            activities.forEach(activity => {

                const planned =
                    getPlannedQuantity(
                        activity
                    );


                const actual =
                    getQuantity(
                        activity
                    );


                let progress = 0;


                if (planned > 0) {

                    progress =
                        (
                            actual /
                            planned
                        ) * 100;

                }


                progress =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            progress
                        )
                    );


                rows.push({

                    date:
                        report.reportDate ||
                        report.date ||
                        "-",

                    project:
                        report.project ||
                        "-",

                    unit:
                        report.unit ||
                        "-",

                    activity:
                        getActivityName(
                            activity
                        ),

                    quantity:
                        actual,

                    quantityUnit:
                        getUnit(
                            activity
                        ),

                    plannedQuantity:
                        planned,

                    progress

                });

            });

        });


        rows.sort(
            (a, b) =>
                String(b.date)
                    .localeCompare(
                        String(a.date)
                    )
        );


        rows.forEach(item => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${escapeHTML(
                        item.date
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        item.project
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        item.unit
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        item.activity
                    )}
                </td>

                <td>
                    ${formatNumber(
                        item.quantity,
                        3
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        item.quantityUnit
                    )}
                </td>

                <td>
                    ${formatNumber(
                        item.plannedQuantity,
                        3
                    )}
                </td>

                <td>
                    ${formatPercent(
                        item.progress
                    )}
                </td>

            `;


            progressTableBody.appendChild(row);

        });

    }


    /* =====================================================
       MATERIAL SUMMARY
    ====================================================== */

    function renderMaterials(reports) {

        if (!materialTableBody) {
            return;
        }


        materialTableBody.innerHTML = "";


        const materialMap =
            new Map();


        reports.forEach(report => {

            const materials =
                Array.isArray(report.materials)
                    ? report.materials
                    : [];


            materials.forEach(material => {

                const name =
                    material.name ||
                    material.materialName ||
                    "-";


                const unit =
                    material.unit ||
                    "-";


                const quantity =
                    number(
                        material.quantity
                    );


                const key =
                    `${normalize(name)}|
                     ${normalize(unit)}`;


                if (!materialMap.has(key)) {

                    materialMap.set(
                        key,
                        {

                            name,

                            quantity: 0,

                            unit

                        }
                    );

                }


                materialMap.get(key)
                    .quantity += quantity;

            });

        });


        const materials =
            [...materialMap.values()];


        if (materials.length === 0) {

            materialTableBody.innerHTML = `
                <tr>
                    <td colspan="3"
                        style="text-align:center;">
                        No material data recorded.
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
                    ${escapeHTML(
                        material.name
                    )}
                </td>

                <td>
                    ${Number(material.quantity).toLocaleString("id-ID", {
                        maximumFractionDigits: 3
                    })} 
                </td>

                <td>
                    ${escapeHTML(
                        material.unit
                    )}
                </td>

            `;


            materialTableBody.appendChild(row);

        });

    }


    /* =====================================================
       MAIN RENDER
    ====================================================== */

    function renderDashboard() {

        const filteredReports =
            getFilteredReports();


        updateManpowerKPI(
            filteredReports
        );


        updateActivityKPI(
            filteredReports
        );


        renderReports(
            filteredReports
        );


        renderProgressTable(
            filteredReports
        );


        renderMaterials(
            filteredReports
        );

    }


    /* =====================================================
       FILTER EVENTS
    ====================================================== */

    if (dateFilter) {

        dateFilter.addEventListener(
            "change",
            renderDashboard
        );

    }


    if (locationFilter) {

        locationFilter.addEventListener(
            "change",
            () => {

                populateFilters();

                renderDashboard();

            }
        );

    }


    if (projectFilter) {

        projectFilter.addEventListener(
            "change",
            renderDashboard
        );

    }


    if (unitFilter) {

        unitFilter.addEventListener(
            "change",
            renderDashboard
        );

    }


    /* =====================================================
       STORAGE UPDATE
    ====================================================== */

    window.addEventListener(
        "storage",
        event => {

            if (
                event.key ===
                REPORT_STORAGE_KEY
            ) {

                populateFilters();

                renderDashboard();

            }

        }
    );


    /* =====================================================
       INITIAL LOAD
    ====================================================== */

    populateFilters();

    renderDashboard();


});
