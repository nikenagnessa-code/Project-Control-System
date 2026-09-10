/* =========================================================
   PROJECT CONTROL SYSTEM
   DAILY MONITORING
   ========================================================= */


/* =========================================================
   CONFIG
   ========================================================= */

const REPORT_STORAGE_KEY = "dailyReports";


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const dateFilter = document.getElementById("dateFilter");
const locationFilter = document.getElementById("locationFilter");
const projectFilter = document.getElementById("projectFilter");
const unitFilter = document.getElementById("unitFilter");

const totalManpower = document.getElementById("totalManpower");
const normalManhours = document.getElementById("normalManhours");
const overtimeManhours = document.getElementById("overtimeManhours");
const totalManhours = document.getElementById("totalManhours");

const onProgress = document.getElementById("onProgress");
const completed = document.getElementById("completed");

const reportTableBody = document.getElementById("reportTableBody");
const progressTableBody = document.getElementById("progressTableBody");
const materialTableBody = document.getElementById("materialTableBody");


/* PROJECT PROGRESS */

const plannedProgressElement =
    document.getElementById("plannedProgress");

const actualProgressElement =
    document.getElementById("actualProgress");

const progressDeviationElement =
    document.getElementById("progressDeviation");

const progressStatusElement =
    document.getElementById("progressStatus");


/* =========================================================
   DATA
   ========================================================= */

function getReports() {

    try {

        const data =
            JSON.parse(
                localStorage.getItem(REPORT_STORAGE_KEY)
            );

        return Array.isArray(data) ? data : [];

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
        typeof masterSchedule !== "undefined" &&
        Array.isArray(masterSchedule)
    ) {

        return masterSchedule;

    }

    return [];

}


/* =========================================================
   NUMBER HELPERS
   ========================================================= */

function number(value) {

    const parsed =
        parseFloat(value);

    return Number.isFinite(parsed)
        ? parsed
        : 0;

}


function formatNumber(value, decimals = 0) {

    return number(value).toLocaleString(
        "en-US",
        {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }
    );

}


function formatQuantity(value) {

    const parsed =
        number(value);

    return parsed.toLocaleString(
        "id-ID",
        {
            maximumFractionDigits: 3
        }
    );

}


function formatPercent(value) {

    return number(value).toLocaleString(
        "en-US",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    ) + "%";

}


/* =========================================================
   TEXT HELPERS
   ========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function normalize(value) {

    return String(value ?? "")
        .trim()
        .toLowerCase();

}


/* =========================================================
   ACTIVITY GETTERS
   ========================================================= */

function getActivityId(activity) {

    return String(
        activity?.activityId ??
        activity?.id ??
        ""
    );

}


function getActivityName(activity) {

    return String(
        activity?.activity ??
        activity?.activityName ??
        activity?.name ??
        ""
    );

}


function getWorkPackage(activity) {

    return String(
        activity?.workPackage ??
        activity?.package ??
        ""
    );

}


function getActivityQuantity(activity) {

    return number(
        activity?.quantity ??
        activity?.plannedQuantity ??
        0
    );

}


function getActivityPlannedQuantity(activity) {

    return number(
        activity?.plannedQuantity ??
        activity?.quantity ??
        0
    );

}


function getActivityUnit(activity) {

    return String(
        activity?.quantityUnit ??
        activity?.unit ??
        ""
    );

}


function getActivityWeight(activity) {

    return number(
        activity?.weight ??
        0
    );

}


/* =========================================================
   REPORT ACTIVITY GETTERS
   ========================================================= */

function getReportActivityId(activity) {

    return String(
        activity?.activityId ??
        activity?.id ??
        ""
    );

}


function getReportActivityName(activity) {

    return String(
        activity?.activity ??
        activity?.activityName ??
        activity?.name ??
        ""
    );

}


function getReportWorkPackage(activity) {

    return String(
        activity?.workPackage ??
        activity?.package ??
        ""
    );

}


function getReportQuantity(activity) {

    return number(
        activity?.quantity ??
        activity?.actualQuantity ??
        0
    );

}


/* =========================================================
   SCHEDULE MAP
   ========================================================= */

function createScheduleMap() {

    const schedule =
        getMasterSchedule();

    const map = new Map();

    schedule.forEach(item => {

        const id =
            getActivityId(item);

        if (!id) {
            return;
        }

        map.set(id, item);

    });

    return map;

}


/* =========================================================
   FILTER REPORTS
   ========================================================= */

function getFilteredReports() {

    const reports =
        getReports();

    return reports.filter(report => {

        const reportDate =
            String(report.date ?? "");

        const reportLocation =
            String(
                report.location ??
                ""
            );

        const reportProject =
            String(
                report.project ??
                ""
            );

        const reportUnit =
            String(
                report.unit ??
                ""
            );


        /* DATE */

        if (
            dateFilter?.value &&
            reportDate !== dateFilter.value
        ) {

            return false;

        }


        /* LOCATION */

        if (
            locationFilter?.value &&
            locationFilter.value !== "All" &&
            reportLocation !== locationFilter.value
        ) {

            return false;

        }


        /* PROJECT */

        if (
            projectFilter?.value &&
            projectFilter.value !== "All" &&
            reportProject !== projectFilter.value
        ) {

            return false;

        }


        /* UNIT */

        if (
            unitFilter?.value &&
            unitFilter.value !== "All" &&
            reportUnit !== unitFilter.value
        ) {

            return false;

        }


        return true;

    });

}


/* =========================================================
   POPULATE FILTERS
   ========================================================= */

function populateFilters() {

    const reports =
        getReports();


    /* PROJECT */

    const projects =
        [
            ...new Set(
                reports
                    .map(report => report.project)
                    .filter(Boolean)
            )
        ];


    if (projectFilter) {

        const current =
            projectFilter.value;

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
            projects.includes(current)
        ) {

            projectFilter.value = current;

        }

    }


    /* UNIT */

    const units =
        [
            ...new Set(
                reports
                    .map(report => report.unit)
                    .filter(Boolean)
            )
        ];


    if (unitFilter) {

        const current =
            unitFilter.value;

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
            units.includes(current)
        ) {

            unitFilter.value = current;

        }

    }

}


/* =========================================================
   MANPOWER KPI
   ========================================================= */

function updateManpowerKPI(reports) {

    let manpower = 0;
    let normalHours = 0;
    let overtimeHours = 0;


    reports.forEach(report => {

        const foreman =
            number(report.foreman);

        const headWorker =
            number(report.headWorker);

        const skilledWorker =
            number(report.skilledWorker);

        const staffOffice =
            number(report.staffOffice);


        manpower +=
            foreman +
            headWorker +
            skilledWorker +
            staffOffice;


        const totalPeople =
            foreman +
            headWorker +
            skilledWorker +
            staffOffice;


        normalHours +=
            totalPeople *
            number(report.normalHours);


        overtimeHours +=
            totalPeople *
            number(report.overtimeHours);

    });


    if (totalManpower) {

        totalManpower.textContent =
            formatNumber(manpower);

    }


    if (normalManhours) {

        normalManhours.textContent =
            formatNumber(normalHours);

    }


    if (overtimeManhours) {

        overtimeManhours.textContent =
            formatNumber(overtimeHours);

    }


    if (totalManhours) {

        totalManhours.textContent =
            formatNumber(
                normalHours +
                overtimeHours
            );

    }

}


/* =========================================================
   ACTIVITY DATA
   ========================================================= */

function buildActivityData(reports) {

    const scheduleMap =
        createScheduleMap();

    const activityMap =
        new Map();


    reports.forEach(report => {

        const project =
            String(
                report.project ??
                ""
            );

        const unit =
            String(
                report.unit ??
                ""
            );


        const activities =
            Array.isArray(report.activities)
                ? report.activities
                : [];


        activities.forEach(activity => {

            const activityId =
                getReportActivityId(activity);

            if (!activityId) {
                return;
            }


            const key =
                [
                    normalize(project),
                    normalize(unit),
                    activityId
                ].join("|");


            if (!activityMap.has(key)) {

                const master =
                    scheduleMap.get(activityId);


                activityMap.set(
                    key,
                    {
                        project,
                        unit,
                        activityId,
                        activity:
                            getReportActivityName(activity) ||
                            getActivityName(master),

                        workPackage:
                            getReportWorkPackage(activity) ||
                            getWorkPackage(master),

                        plannedQuantity:
                            getActivityPlannedQuantity(master),

                        quantityUnit:
                            getActivityUnit(master),

                        weight:
                            getActivityWeight(master),

                        dailyQuantity: 0,

                        status:
                            activity.status ||
                            "On Progress"
                    }
                );

            }


            const item =
                activityMap.get(key);


            item.dailyQuantity +=
                getReportQuantity(activity);


            if (
                normalize(activity.status) ===
                "completed"
            ) {

                item.status =
                    "Completed";

            }

        });

    });


    return [
        ...activityMap.values()
    ];

}


/* =========================================================
   GET ALL REPORTS FOR ACTIVITY
   ========================================================= */

function getAllReportsForActivity(
    activityId,
    project,
    unitProject,
    untilDate = ""
) {

    const reports =
        getReports();


    let total =
        0;


    reports.forEach(report => {

        if (
            String(report.project ?? "") !==
            String(project ?? "")
        ) {

            return;

        }


        if (
            String(report.unit ?? "") !==
            String(unitProject ?? "")
        ) {

            return;

        }


        if (
            untilDate &&
            String(report.date ?? "") >
            untilDate
        ) {

            return;

        }


        const activities =
            Array.isArray(report.activities)
                ? report.activities
                : [];


        activities.forEach(activity => {

            if (
                getReportActivityId(activity) !==
                String(activityId)
            ) {

                return;

            }


            total +=
                getReportQuantity(activity);

        });

    });


    return total;

}


/* =========================================================
   CALCULATE ACTIVITY PROGRESS
   ========================================================= */

function calculateProgress(
    item,
    untilDate = ""
) {

    const planned =
        number(
            item.plannedQuantity
        );


    if (
        planned <= 0
    ) {

        return {
            progress: 0,
            weightedProgress: 0
        };

    }


    const actual =
        getAllReportsForActivity(
            item.activityId,
            item.project,
            item.unit,
            untilDate
        );


    const progress =
        Math.min(
            100,
            (actual / planned) * 100
        );


    const weight =
        number(item.weight);


    const weightedProgress =
        (progress / 100) *
        weight;


    return {
        progress,
        weightedProgress
    };

}


/* =========================================================
   UPDATE ACTIVITY KPI
   ========================================================= */

function updateActivityKPI(
    reports
) {

    const activityData =
        buildActivityData(reports);


    let progressCount = 0;
    let completedCount = 0;


    activityData.forEach(item => {

        if (
            normalize(item.status) ===
            "completed"
        ) {

            completedCount++;

        } else {

            progressCount++;

        }

    });


    if (onProgress) {

        onProgress.textContent =
            formatNumber(progressCount);

    }


    if (completed) {

        completed.textContent =
            formatNumber(completedCount);

    }

}


/* =========================================================
   PROJECT PROGRESS
   ========================================================= */

/*
    MASTER SCHEDULE YANG KITA PAKAI SEKARANG:

    Kalimantan
        → Tipe 200
            → DANREM

    Planned progress dihitung berdasarkan:

    Activity Weight
          ×
    Planned completion percentage
          =
    Weighted Planned Progress


    Actual progress:

    Cumulative Actual Quantity
          ÷
    Planned Quantity
          ×
    Activity Weight
          =
    Weighted Actual Progress
*/


function isDANREMProjectSelected() {

    const location =
        locationFilter?.value || "All";

    const project =
        projectFilter?.value || "All";

    const unit =
        unitFilter?.value || "All";


    /*
        Kalau user sedang memilih Tasikmalaya,
        jangan pakai master schedule DANREM.
    */

    if (
        location === "Tasikmalaya"
    ) {

        return false;

    }


    /*
        Kalau project/unit tertentu dipilih,
        kita hanya gunakan master schedule
        untuk DANREM / Tipe 200.
    */

    if (
        project !== "All" &&
        !normalize(project).includes("tipe 200")
    ) {

        return false;

    }


    if (
        unit !== "All" &&
        normalize(unit) !== "danrem"
    ) {

        return false;

    }


    return true;

}


/* =========================================================
   GET REPORT END DATE
   ========================================================= */

function getProgressDate() {

    /*
        Jika user memilih tanggal,
        progress dihitung sampai tanggal tersebut.
    */

    if (
        dateFilter?.value
    ) {

        return dateFilter.value;

    }


    /*
        Jika tidak ada tanggal filter,
        gunakan tanggal laporan terakhir.
    */

    const reports =
        getReports()
            .filter(report => report.date);


    if (!reports.length) {

        return "";

    }


    return reports
        .map(report => report.date)
        .sort()
        .at(-1);

}


/* =========================================================
   PLANNED ACTIVITY PROGRESS
   ========================================================= */

function calculatePlannedActivityProgress(
    activity,
    targetDate
) {

    const start =
        activity.plannedStart;

    const finish =
        activity.plannedFinish;


    if (
        !start ||
        !finish ||
        !targetDate
    ) {

        return 0;

    }


    /*
        Sebelum mulai
    */

    if (
        targetDate < start
    ) {

        return 0;

    }


    /*
        Setelah selesai
    */

    if (
        targetDate >= finish
    ) {

        return 100;

    }


    const startDate =
        new Date(start + "T00:00:00");

    const finishDate =
        new Date(finish + "T00:00:00");

    const currentDate =
        new Date(targetDate + "T00:00:00");


    const totalDuration =
        finishDate -
        startDate;


    const elapsed =
        currentDate -
        startDate;


    if (
        totalDuration <= 0
    ) {

        return 0;

    }


    return Math.max(
        0,
        Math.min(
            100,
            (elapsed / totalDuration) *
            100
        )
    );

}


/* =========================================================
   CALCULATE PLANNED PROJECT PROGRESS
   ========================================================= */

function calculatePlannedProjectProgress(
    targetDate
) {

    const schedule =
        getMasterSchedule();


    if (
        !schedule.length ||
        !targetDate
    ) {

        return 0;

    }


    /*
        Master Schedule hanya untuk DANREM.
    */

    let totalWeight =
        0;

    let plannedProgress =
        0;


    schedule.forEach(activity => {

        const weight =
            getActivityWeight(activity);


        if (
            weight <= 0
        ) {

            return;

        }


        const activityProgress =
            calculatePlannedActivityProgress(
                activity,
                targetDate
            );


        plannedProgress +=
            (
                activityProgress /
                100
            ) *
            weight;


        totalWeight +=
            weight;

    });


    if (
        totalWeight <= 0
    ) {

        return 0;

    }


    /*
        Karena bobot master schedule
        adalah bobot terhadap keseluruhan proyek,
        kita tidak membagi lagi dengan totalWeight.
    */

    return Math.min(
        100,
        plannedProgress
    );

}


/* =========================================================
   CALCULATE ACTUAL PROJECT PROGRESS
   ========================================================= */

function calculateActualProjectProgress(
    untilDate
) {

    const schedule =
        getMasterSchedule();


    if (
        !schedule.length
    ) {

        return 0;

    }


    /*
        Tentukan project/unit dari filter.

        Kalau All, gunakan laporan DANREM
        yang memiliki activity ID di master schedule.
    */

    const reports =
        getReports();


    let selectedReports =
        reports;


    const selectedLocation =
        locationFilter?.value || "All";

    const selectedProject =
        projectFilter?.value || "All";

    const selectedUnit =
        unitFilter?.value || "All";


    selectedReports =
        selectedReports.filter(report => {

            if (
                untilDate &&
                String(report.date ?? "") >
                untilDate
            ) {

                return false;

            }


            if (
                selectedLocation !== "All" &&
                String(report.location ?? "") !==
                selectedLocation
            ) {

                return false;

            }


            if (
                selectedProject !== "All" &&
                String(report.project ?? "") !==
                selectedProject
            ) {

                return false;

            }


            if (
                selectedUnit !== "All" &&
                String(report.unit ?? "") !==
                selectedUnit
            ) {

                return false;

            }


            return true;

        });


    let actualProgress =
        0;


    /*
        Kita hitung activity satu per satu
        menggunakan bobot master schedule.
    */

    schedule.forEach(activity => {

        const activityId =
            getActivityId(activity);


        const weight =
            getActivityWeight(activity);


        const plannedQuantity =
            getActivityPlannedQuantity(activity);


        if (
            !activityId ||
            weight <= 0 ||
            plannedQuantity <= 0
        ) {

            return;

        }


        let actualQuantity =
            0;


        selectedReports.forEach(report => {

            const activities =
                Array.isArray(report.activities)
                    ? report.activities
                    : [];


            activities.forEach(
                reportActivity => {

                    if (
                        getReportActivityId(
                            reportActivity
                        ) !== activityId
                    ) {

                        return;

                    }


                    actualQuantity +=
                        getReportQuantity(
                            reportActivity
                        );

                }
            );

        });


        const completion =
            Math.min(
                1,
                actualQuantity /
                plannedQuantity
            );


        actualProgress +=
            completion *
            weight;

    });


    return Math.min(
        100,
        actualProgress
    );

}


/* =========================================================
   PROJECT STATUS
   ========================================================= */

function getProjectStatus(
    deviation
) {

    /*
        Tidak ada actual data
    */

    if (
        !getReports().length
    ) {

        return "No Data";

    }


    /*
        Toleransi kecil supaya
        -0.01% tidak langsung dianggap behind.
    */

    if (
        deviation >= -1
    ) {

        return "On Schedule";

    }


    if (
        deviation >= -5
    ) {

        return "Slightly Behind";

    }


    return "Behind Schedule";

}


/* =========================================================
   UPDATE PROJECT PROGRESS OVERVIEW
   ========================================================= */

function updateProjectProgressOverview() {

    /*
        Master schedule kita saat ini hanya
        untuk Kalimantan → Tipe 200 → DANREM.
    */

    if (
        !isDANREMProjectSelected()
    ) {

        if (plannedProgressElement) {

            plannedProgressElement.textContent =
                "—";

        }

        if (actualProgressElement) {

            actualProgressElement.textContent =
                "—";

        }

        if (progressDeviationElement) {

            progressDeviationElement.textContent =
                "—";

        }

        if (progressStatusElement) {

            progressStatusElement.textContent =
                "Not Available";

        }

        return;

    }


    const progressDate =
        getProgressDate();


    if (
        !progressDate
    ) {

        if (plannedProgressElement) {

            plannedProgressElement.textContent =
                "0.00%";

        }

        if (actualProgressElement) {

            actualProgressElement.textContent =
                "0.00%";

        }

        if (progressDeviationElement) {

            progressDeviationElement.textContent =
                "0.00%";

        }

        if (progressStatusElement) {

            progressStatusElement.textContent =
                "No Data";

        }

        return;

    }


    const planned =
        calculatePlannedProjectProgress(
            progressDate
        );


    const actual =
        calculateActualProjectProgress(
            progressDate
        );


    const deviation =
        actual -
        planned;


    const status =
        getProjectStatus(
            deviation
        );


    if (plannedProgressElement) {

        plannedProgressElement.textContent =
            formatPercent(planned);

    }


    if (actualProgressElement) {

        actualProgressElement.textContent =
            formatPercent(actual);

    }


    if (progressDeviationElement) {

        progressDeviationElement.textContent =
            formatPercent(deviation);

    }


    if (progressStatusElement) {

        progressStatusElement.textContent =
            status;

    }

}


/* =========================================================
   RECENT DAILY REPORTS TABLE
   ========================================================= */

function renderReports(
    reports
) {

    if (!reportTableBody) {
        return;
    }


    if (!reports.length) {

        reportTableBody.innerHTML = `
            <tr>
                <td colspan="9">
                    No daily reports found.
                </td>
            </tr>
        `;

        return;

    }


    const sortedReports =
        [...reports]
            .sort(
                (a, b) =>
                    String(b.date ?? "")
                        .localeCompare(
                            String(a.date ?? "")
                        )
            );


    reportTableBody.innerHTML =
        sortedReports
            .map(report => {

                const manpower =
                    number(report.foreman) +
                    number(report.headWorker) +
                    number(report.skilledWorker) +
                    number(report.staffOffice);


                const manhours =
                    (
                        manpower *
                        (
                            number(report.normalHours) +
                            number(report.overtimeHours)
                        )
                    );


                const activities =
                    Array.isArray(report.activities)
                        ? report.activities
                        : [];


                const activityCount =
                    activities.length;


                const statuses =
                    activities.map(
                        activity =>
                            normalize(activity.status)
                    );


                let status =
                    "On Progress";


                if (
                    activityCount > 0 &&
                    statuses.every(
                        value =>
                            value === "completed"
                    )
                ) {

                    status =
                        "Completed";

                }


                return `
                    <tr>

                        <td>
                            ${escapeHTML(report.date)}
                        </td>

                        <td>
                            ${escapeHTML(report.location)}
                        </td>

                        <td>
                            ${escapeHTML(report.project)}
                        </td>

                        <td>
                            ${escapeHTML(report.unit)}
                        </td>

                        <td>
                            ${escapeHTML(report.weather)}
                        </td>

                        <td>
                            ${formatNumber(manpower)}
                        </td>

                        <td>
                            ${formatNumber(manhours)}
                        </td>

                        <td>
                            ${formatNumber(activityCount)}
                        </td>

                        <td>
                            ${escapeHTML(status)}
                        </td>

                    </tr>
                `;

            })
            .join("");

}


/* =========================================================
   DAILY PROGRESS TABLE
   ========================================================= */

function renderProgressTable(
    reports
) {

    if (!progressTableBody) {
        return;
    }


    const scheduleMap =
        createScheduleMap();


    const rows = [];


    reports.forEach(report => {

        const activities =
            Array.isArray(report.activities)
                ? report.activities
                : [];


        activities.forEach(activity => {

            const activityId =
                getReportActivityId(activity);


            const master =
                scheduleMap.get(
                    activityId
                );


            const plannedQuantity =
                getActivityPlannedQuantity(
                    master
                );


            const actualQuantity =
                getReportQuantity(
                    activity
                );


            let progress =
                0;


            if (
                plannedQuantity > 0
            ) {

                progress =
                    (
                        actualQuantity /
                        plannedQuantity
                    ) *
                    100;

            }


            rows.push({

                date:
                    report.date,

                project:
                    report.project,

                unit:
                    report.unit,

                activity:
                    getReportActivityName(
                        activity
                    ) ||
                    getActivityName(
                        master
                    ),

                quantity:
                    actualQuantity,

                quantityUnit:
                    getActivityUnit(
                        master
                    ),

                plannedQuantity,

                progress

            });

        });

    });


    if (!rows.length) {

        progressTableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    No progress data found.
                </td>
            </tr>
        `;

        return;

    }


    rows.sort(
        (a, b) =>
            String(b.date)
                .localeCompare(
                    String(a.date)
                )
    );


    progressTableBody.innerHTML =
        rows.map(row => {

            return `
                <tr>

                    <td>
                        ${escapeHTML(row.date)}
                    </td>

                    <td>
                        ${escapeHTML(row.project)}
                    </td>

                    <td>
                        ${escapeHTML(row.unit)}
                    </td>

                    <td>
                        ${escapeHTML(row.activity)}
                    </td>

                    <td>
                        ${formatQuantity(row.quantity)}
                    </td>

                    <td>
                        ${escapeHTML(row.quantityUnit)}
                    </td>

                    <td>
                        ${formatQuantity(row.plannedQuantity)}
                    </td>

                    <td>
                        ${formatPercent(row.progress)}
                    </td>

                </tr>
            `;

        })
        .join("");

}


/* =========================================================
   MATERIAL SUMMARY
   ========================================================= */

function renderMaterials(
    reports
) {

    if (!materialTableBody) {
        return;
    }


    const materialMap =
        new Map();


    reports.forEach(report => {

        const materials =
            Array.isArray(report.materials)
                ? report.materials
                : [];


        materials.forEach(material => {

            const name =
                String(
                    material.name ??
                    material.materialName ??
                    ""
                ).trim();


            const unit =
                String(
                    material.unit ??
                    ""
                ).trim();


            const quantity =
                number(
                    material.quantity
                );


            if (!name) {
                return;
            }


            const key =
                [
                    normalize(name),
                    normalize(unit)
                ].join("|");


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


            materialMap.get(
                key
            ).quantity += quantity;

        });

    });


    const materials =
        [
            ...materialMap.values()
        ];


    if (!materials.length) {

        materialTableBody.innerHTML = `
            <tr>
                <td colspan="3">
                    No material data found.
                </td>
            </tr>
        `;

        return;

    }


    materialTableBody.innerHTML =
        materials.map(material => {

            return `
                <tr>

                    <td>
                        ${escapeHTML(material.name)}
                    </td>

                    <td>
                        ${formatQuantity(
                            material.quantity
                        )}
                    </td>

                    <td>
                        ${escapeHTML(material.unit)}
                    </td>

                </tr>
            `;

        })
        .join("");

}


/* =========================================================
   RENDER DASHBOARD
   ========================================================= */

function renderDashboard() {

    const reports =
        getFilteredReports();


    updateManpowerKPI(
        reports
    );


    updateActivityKPI(
        reports
    );


    renderReports(
        reports
    );


    renderProgressTable(
        reports
    );


    renderMaterials(
        reports
    );


    updateProjectProgressOverview();

}


/* =========================================================
   FILTER EVENTS
   ========================================================= */

[
    dateFilter,
    locationFilter,
    projectFilter,
    unitFilter
].forEach(element => {

    if (!element) {
        return;
    }


    element.addEventListener(
        "change",
        renderDashboard
    );

});


/* =========================================================
   STORAGE EVENT
   ========================================================= */

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


/* =========================================================
   INITIAL LOAD
   ========================================================= */

populateFilters();

renderDashboard();
