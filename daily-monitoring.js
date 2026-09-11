/* =========================================================
   PROJECT CONTROL SYSTEM
   DAILY MONITORING
   ========================================================= */


/* =========================================================
   CONFIG
   ========================================================= */

const REPORT_STORAGE_KEY = "dailyReports";


/* =========================================================
   MASTER PROJECT DATA
   ========================================================= */

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
            "Unit 01",
            "Unit 02",
            "Unit 03",
            "Unit 04",
            "Unit 05",
            "Unit 06",
            "Unit 07",
            "Unit 08",
            "Unit 09",
            "Unit 10"
        ],

        "Buana Royale Residence": [
            "Unit 01",
            "Unit 02",
            "Unit 03"
        ],

        "Andalusia": [
            "Unit 01"
        ]

    }

};


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const dateFilter =
    document.getElementById("dateFilter");

const locationFilter =
    document.getElementById("locationFilter");

const projectFilter =
    document.getElementById("projectFilter");

const unitFilter =
    document.getElementById("unitFilter");


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


const reportTableBody =
    document.getElementById("reportTableBody");

const progressTableBody =
    document.getElementById("progressTableBody");

const materialTableBody =
    document.getElementById("materialTableBody");


const plannedProgressElement =
    document.getElementById("plannedProgress");

const actualProgressElement =
    document.getElementById("actualProgress");

const progressDeviationElement =
    document.getElementById("progressDeviation");

const progressStatusElement =
    document.getElementById("progressStatus");


const sCurveChart =
    document.getElementById("sCurveChart");


/* =========================================================
   DATA
   ========================================================= */

function getReports() {

    try {

        const raw =
            localStorage.getItem(
                REPORT_STORAGE_KEY
            );

        if (!raw) {
            return [];
        }

        const data =
            JSON.parse(raw);

        return Array.isArray(data)
            ? data
            : [];

    } catch (error) {

        console.error(
            "Failed to read daily reports:",
            error
        );

        return [];

    }

}


/* =========================================================
   REPORT DATE HELPER
   ========================================================= */

function getReportDate(report) {

    return String(
        report?.reportDate ??
        report?.date ??
        ""
    ).trim();

}


/* =========================================================
   MASTER SCHEDULE
   ========================================================= */

function getMasterSchedule() {

    try {

        if (
            typeof masterSchedule !== "undefined" &&
            Array.isArray(masterSchedule)
        ) {

            return masterSchedule;

        }

    } catch (error) {

        console.warn(
            "masterSchedule is not directly available."
        );

    }


    if (
        typeof window !== "undefined" &&
        Array.isArray(window.masterSchedule)
    ) {

        return window.masterSchedule;

    }


    return [];

}


/* =========================================================
   NUMBER HELPERS
   ========================================================= */

function number(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return 0;

    }


    let text =
        String(value)
            .trim()
            .replace(/\s/g, "");


    /*
       Support:
       1.500
       1,500
       1.500,50
       1,500.50
    */

    if (
        text.includes(".") &&
        text.includes(",")
    ) {

        if (
            text.lastIndexOf(",") >
            text.lastIndexOf(".")
        ) {

            text =
                text
                    .replace(/\./g, "")
                    .replace(",", ".");

        }

        else {

            text =
                text.replace(/,/g, "");

        }

    }

    else if (
        text.includes(",")
    ) {

        text =
            text.replace(",", ".");

    }


    const parsed =
        parseFloat(text);


    return Number.isFinite(parsed)
        ? parsed
        : 0;

}


function formatNumber(
    value,
    decimals = 0
) {

    return number(value).toLocaleString(
        "en-US",
        {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }
    );

}


function formatQuantity(value) {

    return number(value).toLocaleString(
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
   MANPOWER HELPERS
   ========================================================= */

function getReportManpower(report) {

    const manpower =
        report?.manpower || {};


    const foreman =
        number(
            manpower.foreman ??
            report?.foreman
        );


    const headWorker =
        number(
            manpower.headWorker ??
            report?.headWorker
        );


    const skilledWorker =
        number(
            manpower.skilledWorker ??
            report?.skilledWorker
        );


    const staffOffice =
        number(
            manpower.staffOffice ??
            report?.staffOffice
        );


    const calculatedTotal =
        foreman +
        headWorker +
        skilledWorker +
        staffOffice;


    const storedTotal =
        number(
            report?.totalManpower
        );


    const total =
        storedTotal > 0
            ? storedTotal
            : calculatedTotal;


    return {

        foreman,

        headWorker,

        skilledWorker,

        staffOffice,

        total

    };

}


/* =========================================================
   HOURS HELPERS
   ========================================================= */

function getReportHours(report) {

    const hours =
        report?.hours || {};


    const normal =
        number(
            hours.normal ??
            report?.normalHours
        );


    const overtime =
        number(
            hours.overtime ??
            report?.overtimeHours
        );


    return {

        normal,

        overtime

    };

}


/* =========================================================
   MANHOUR HELPER
   ========================================================= */

function getReportManhours(report) {

    const manpower =
        getReportManpower(
            report
        );


    const hours =
        getReportHours(
            report
        );


    const normal =
        manpower.total *
        hours.normal;


    const overtime =
        manpower.total *
        hours.overtime;


    return {

        normal,

        overtime,

        total:
            normal +
            overtime

    };

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
   SCHEDULE DATE GETTERS
   ========================================================= */

function getActivityStart(activity) {

    return String(
        activity?.plannedStart ??
        activity?.startDate ??
        activity?.start ??
        ""
    ).trim();

}


function getActivityFinish(activity) {

    return String(
        activity?.plannedFinish ??
        activity?.finishDate ??
        activity?.finish ??
        ""
    ).trim();

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
        activity?.actualQuantity ??
        activity?.quantity ??
        0
    );

}


/* =========================================================
   SCHEDULE MAP
   ========================================================= */

function createScheduleMap() {

    const schedule =
        getMasterSchedule();

    const map =
        new Map();


    schedule.forEach(item => {

        const id =
            getActivityId(
                item
            );


        if (!id) {
            return;
        }


        map.set(
            id,
            item
        );

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
            getReportDate(
                report
            );


        const reportLocation =
            String(
                report.location ?? ""
            ).trim();


        const reportProject =
            String(
                report.project ?? ""
            ).trim();


        const reportUnit =
            String(
                report.unit ?? ""
            ).trim();


        /* DATE */

        if (
            dateFilter?.value &&
            reportDate !==
            dateFilter.value
        ) {

            return false;

        }


        /* LOCATION */

        if (
            locationFilter?.value &&
            locationFilter.value !== "All" &&
            reportLocation !==
            locationFilter.value
        ) {

            return false;

        }


        /* PROJECT */

        if (
            projectFilter?.value &&
            projectFilter.value !== "All" &&
            reportProject !==
            projectFilter.value
        ) {

            return false;

        }


        /* UNIT */

        if (
            unitFilter?.value &&
            unitFilter.value !== "All" &&
            reportUnit !==
            unitFilter.value
        ) {

            return false;

        }


        return true;

    });

}


/* =========================================================
   POPULATE LOCATION
   ========================================================= */

function populateLocations() {

    if (!locationFilter) {
        return;
    }


    const current =
        locationFilter.value;


    locationFilter.innerHTML = `
        <option value="All">
            All Locations
        </option>
    `;


    Object.keys(projectData)
        .forEach(location => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                location;


            option.textContent =
                location;


            locationFilter.appendChild(
                option
            );

        });


    if (
        current &&
        (
            current === "All" ||
            projectData[current]
        )
    ) {

        locationFilter.value =
            current;

    }

}


/* =========================================================
   POPULATE PROJECT
   ========================================================= */

function populateProjects() {

    if (!projectFilter) {
        return;
    }


    const location =
        locationFilter?.value ||
        "All";


    const current =
        projectFilter.value;


    projectFilter.innerHTML = `
        <option value="All">
            All Projects
        </option>
    `;


    let projects = [];


    if (
        location !== "All" &&
        projectData[location]
    ) {

        projects =
            Object.keys(
                projectData[location]
            );

    }

    else {

        Object.values(projectData)
            .forEach(locationProjects => {

                Object.keys(
                    locationProjects
                )
                .forEach(project => {

                    if (
                        !projects.includes(
                            project
                        )
                    ) {

                        projects.push(
                            project
                        );

                    }

                });

            });

    }


    projects.forEach(project => {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            project;


        option.textContent =
            project;


        projectFilter.appendChild(
            option
        );

    });


    if (
        projects.includes(current)
    ) {

        projectFilter.value =
            current;

    }

    else {

        projectFilter.value =
            "All";

    }

}


/* =========================================================
   POPULATE UNIT
   ========================================================= */

function populateUnits() {

    if (!unitFilter) {
        return;
    }


    const location =
        locationFilter?.value ||
        "All";


    const project =
        projectFilter?.value ||
        "All";


    const current =
        unitFilter.value;


    unitFilter.innerHTML = `
        <option value="All">
            All Units
        </option>
    `;


    let units = [];


    /* LOCATION + PROJECT */

    if (
        location !== "All" &&
        project !== "All" &&
        projectData[location] &&
        projectData[location][project]
    ) {

        units =
            [
                ...projectData[location][project]
            ];

    }


    /* LOCATION ONLY */

    else if (
        location !== "All" &&
        project === "All" &&
        projectData[location]
    ) {

        Object.values(
            projectData[location]
        )
        .forEach(projectUnits => {

            projectUnits.forEach(unit => {

                if (
                    !units.includes(unit)
                ) {

                    units.push(unit);

                }

            });

        });

    }


    /* ALL LOCATION + PROJECT */

    else if (
        location === "All" &&
        project !== "All"
    ) {

        Object.values(projectData)
            .forEach(locationProjects => {

                Object.values(
                    locationProjects
                )
                .forEach(projectUnits => {

                    projectUnits.forEach(unit => {

                        if (
                            !units.includes(unit)
                        ) {

                            units.push(unit);

                        }

                    });

                });

            });

    }


    /* ALL */

    else {

        Object.values(projectData)
            .forEach(locationProjects => {

                Object.values(
                    locationProjects
                )
                .forEach(projectUnits => {

                    projectUnits.forEach(unit => {

                        if (
                            !units.includes(unit)
                        ) {

                            units.push(unit);

                        }

                    });

                });

            });

    }


    units.forEach(unit => {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            unit;


        option.textContent =
            unit;


        unitFilter.appendChild(
            option
        );

    });


    if (
        units.includes(current)
    ) {

        unitFilter.value =
            current;

    }

    else {

        unitFilter.value =
            "All";

    }

}


/* =========================================================
   POPULATE ALL FILTERS
   ========================================================= */

function populateFilters() {

    const currentLocation =
        locationFilter?.value ||
        "All";


    const currentProject =
        projectFilter?.value ||
        "All";


    const currentUnit =
        unitFilter?.value ||
        "All";


    populateLocations();


    if (locationFilter) {

        if (
            currentLocation === "All" ||
            projectData[currentLocation]
        ) {

            locationFilter.value =
                currentLocation;

        }

    }


    populateProjects();


    if (projectFilter) {

        if (
            currentProject === "All" ||
            [...projectFilter.options]
                .some(
                    option =>
                        option.value ===
                        currentProject
                )
        ) {

            projectFilter.value =
                currentProject;

        }

    }


    populateUnits();


    if (unitFilter) {

        if (
            currentUnit === "All" ||
            [...unitFilter.options]
                .some(
                    option =>
                        option.value ===
                        currentUnit
                )
        ) {

            unitFilter.value =
                currentUnit;

        }

    }

}


/* =========================================================
   MANPOWER KPI
   ========================================================= */

function updateManpowerKPI(
    reports
) {

    let manpower =
        0;


    let normalManhoursValue =
        0;


    let overtimeManhoursValue =
        0;


    let totalManhoursValue =
        0;


    reports.forEach(report => {

        const reportManpower =
            getReportManpower(
                report
            );


        const reportManhours =
            getReportManhours(
                report
            );


        manpower +=
            reportManpower.total;


        normalManhoursValue +=
            reportManhours.normal;


        overtimeManhoursValue +=
            reportManhours.overtime;


        totalManhoursValue +=
            reportManhours.total;

    });


    if (totalManpower) {

        totalManpower.textContent =
            formatNumber(
                manpower
            );

    }


    if (normalManhours) {

        normalManhours.textContent =
            formatNumber(
                normalManhoursValue
            );

    }


    if (overtimeManhours) {

        overtimeManhours.textContent =
            formatNumber(
                overtimeManhoursValue
            );

    }


    if (totalManhours) {

        totalManhours.textContent =
            formatNumber(
                totalManhoursValue
            );

    }


    console.log(
        "=== MANPOWER KPI ==="
    );


    console.log(
        "Filtered Reports:",
        reports
    );


    console.log(
        "Total Manpower:",
        manpower
    );


    console.log(
        "Normal Manhours:",
        normalManhoursValue
    );


    console.log(
        "Overtime Manhours:",
        overtimeManhoursValue
    );


    console.log(
        "Total Manhours:",
        totalManhoursValue
    );

}


/* =========================================================
   ACTIVITY DATA
   ========================================================= */

function buildActivityData(
    reports
) {

    const scheduleMap =
        createScheduleMap();


    const activityMap =
        new Map();


    reports.forEach(report => {

        const project =
            String(
                report.project ?? ""
            );


        const unit =
            String(
                report.unit ?? ""
            );


        const activities =
            Array.isArray(
                report.activities
            )
                ? report.activities
                : [];


        activities.forEach(activity => {

            const activityId =
                getReportActivityId(
                    activity
                );


            if (!activityId) {
                return;
            }


            const key =
                [
                    normalize(project),
                    normalize(unit),
                    activityId
                ].join("|");


            if (
                !activityMap.has(key)
            ) {

                const master =
                    scheduleMap.get(
                        activityId
                    );


                activityMap.set(
                    key,
                    {

                        project,

                        unit,

                        activity:
                            getReportActivityName(
                                activity
                            ) ||
                            getActivityName(
                                master
                            ),

                        activityId,

                        workPackage:
                            getReportWorkPackage(
                                activity
                            ) ||
                            getWorkPackage(
                                master
                            ),

                        plannedQuantity:
                            getActivityPlannedQuantity(
                                master
                            ),

                        quantityUnit:
                            getActivityUnit(
                                master
                            ),

                        weight:
                            getActivityWeight(
                                master
                            ),

                        dailyQuantity:
                            0,

                        status:
                            activity.status ||
                            "On Progress"

                    }
                );

            }


            const item =
                activityMap.get(
                    key
                );


            item.dailyQuantity +=
                getReportQuantity(
                    activity
                );


            if (
                normalize(
                    activity.status
                ) ===
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
            String(
                report.project ?? ""
            ) !==
            String(
                project ?? ""
            )
        ) {

            return;

        }


        if (
            String(
                report.unit ?? ""
            ) !==
            String(
                unitProject ?? ""
            )
        ) {

            return;

        }


        const reportDate =
            getReportDate(
                report
            );


        if (
            untilDate &&
            reportDate >
            untilDate
        ) {

            return;

        }


        const activities =
            Array.isArray(
                report.activities
            )
                ? report.activities
                : [];


        activities.forEach(activity => {

            if (
                getReportActivityId(
                    activity
                ) !==
                String(activityId)
            ) {

                return;

            }


            total +=
                getReportQuantity(
                    activity
                );

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
            (
                actual /
                planned
            ) *
            100
        );


    const weight =
        number(
            item.weight
        );


    const weightedProgress =
        (
            progress /
            100
        ) *
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
        buildActivityData(
            reports
        );


    let progressCount =
        0;


    let completedCount =
        0;


    activityData.forEach(item => {

        if (
            normalize(
                item.status
            ) ===
            "completed"
        ) {

            completedCount++;

        }

        else {

            progressCount++;

        }

    });


    if (onProgress) {

        onProgress.textContent =
            formatNumber(
                progressCount
            );

    }


    if (completed) {

        completed.textContent =
            formatNumber(
                completedCount
            );

    }

}


/* =========================================================
   DANREM CHECK
   ========================================================= */

function isDANREMProjectSelected() {

    const location =
        locationFilter?.value ||
        "All";


    const project =
        projectFilter?.value ||
        "All";


    const unit =
        unitFilter?.value ||
        "All";


    if (
        location ===
        "Tasikmalaya"
    ) {

        return false;

    }


    if (
        location !== "All" &&
        location !== "Kalimantan"
    ) {

        return false;

    }


    if (
        project !== "All" &&
        normalize(project) !==
        "tipe 200"
    ) {

        return false;

    }


    if (
        unit !== "All" &&
        normalize(unit) !==
        "danrem"
    ) {

        return false;

    }


    return true;

}


/* =========================================================
   GET PROGRESS DATE
   ========================================================= */

function getProgressDate() {

    if (
        dateFilter?.value
    ) {

        return dateFilter.value;

    }


    const reports =
        getReports()
            .filter(
                report =>
                    getReportDate(
                        report
                    )
            );


    if (
        !reports.length
    ) {

        return "";

    }


    return reports
        .map(
            report =>
                getReportDate(
                    report
                )
        )
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
        getActivityStart(
            activity
        );


    const finish =
        getActivityFinish(
            activity
        );


    if (
        !start ||
        !finish ||
        !targetDate
    ) {

        return 0;

    }


    if (
        targetDate <
        start
    ) {

        return 0;

    }


    if (
        targetDate >=
        finish
    ) {

        return 100;

    }


    const startDate =
        new Date(
            start +
            "T00:00:00"
        );


    const finishDate =
        new Date(
            finish +
            "T00:00:00"
        );


    const currentDate =
        new Date(
            targetDate +
            "T00:00:00"
        );


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
            (
                elapsed /
                totalDuration
            ) *
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


    let plannedProgress =
        0;


    schedule.forEach(activity => {

        const weight =
            getActivityWeight(
                activity
            );


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

    });


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


    const reports =
        getReports();


    const selectedLocation =
        locationFilter?.value ||
        "All";


    const selectedProject =
        projectFilter?.value ||
        "All";


    const selectedUnit =
        unitFilter?.value ||
        "All";


    const selectedReports =
        reports.filter(report => {

            const reportDate =
                getReportDate(
                    report
                );


            if (
                untilDate &&
                reportDate >
                untilDate
            ) {

                return false;

            }


            if (
                selectedLocation !==
                "All" &&
                String(
                    report.location ??
                    ""
                ) !==
                selectedLocation
            ) {

                return false;

            }


            if (
                selectedProject !==
                "All" &&
                String(
                    report.project ??
                    ""
                ) !==
                selectedProject
            ) {

                return false;

            }


            if (
                selectedUnit !==
                "All" &&
                String(
                    report.unit ??
                    ""
                ) !==
                selectedUnit
            ) {

                return false;

            }


            return true;

        });


    let actualProgress =
        0;


    schedule.forEach(activity => {

        const activityId =
            getActivityId(
                activity
            );


        const weight =
            getActivityWeight(
                activity
            );


        const plannedQuantity =
            getActivityPlannedQuantity(
                activity
            );


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
                Array.isArray(
                    report.activities
                )
                    ? report.activities
                    : [];


            activities.forEach(
                reportActivity => {

                    if (
                        getReportActivityId(
                            reportActivity
                        ) !==
                        activityId
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

    const reports =
        getReports();


    if (
        !reports.length
    ) {

        return "No Data";

    }


    if (
        deviation >=
        -1
    ) {

        return "On Schedule";

    }


    if (
        deviation >=
        -5
    ) {

        return "Slightly Behind";

    }


    return "Behind Schedule";

}


/* =========================================================
   UPDATE PROJECT PROGRESS
   ========================================================= */

function updateProjectProgressOverview() {

    if (
        !isDANREMProjectSelected()
    ) {

        if (
            plannedProgressElement
        ) {

            plannedProgressElement.textContent =
                "—";

        }


        if (
            actualProgressElement
        ) {

            actualProgressElement.textContent =
                "—";

        }


        if (
            progressDeviationElement
        ) {

            progressDeviationElement.textContent =
                "—";

        }


        if (
            progressStatusElement
        ) {

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

        if (
            plannedProgressElement
        ) {

            plannedProgressElement.textContent =
                "0.00%";

        }


        if (
            actualProgressElement
        ) {

            actualProgressElement.textContent =
                "0.00%";

        }


        if (
            progressDeviationElement
        ) {

            progressDeviationElement.textContent =
                "0.00%";

        }


        if (
            progressStatusElement
        ) {

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


    if (
        plannedProgressElement
    ) {

        plannedProgressElement.textContent =
            formatPercent(
                planned
            );

    }


    if (
        actualProgressElement
    ) {

        actualProgressElement.textContent =
            formatPercent(
                actual
            );

    }


    if (
        progressDeviationElement
    ) {

        progressDeviationElement.textContent =
            formatPercent(
                deviation
            );

    }


    if (
        progressStatusElement
    ) {

        progressStatusElement.textContent =
            status;

    }

}


/* =========================================================
   S-CURVE DATE RANGE
   ========================================================= */

function getSCurveDateRange() {

    const schedule =
        getMasterSchedule();


    const reports =
        getReports();


    const dates = [];


    schedule.forEach(activity => {

        const start =
            getActivityStart(
                activity
            );


        const finish =
            getActivityFinish(
                activity
            );


        if (start) {
            dates.push(start);
        }


        if (finish) {
            dates.push(finish);
        }

    });


    reports.forEach(report => {

        const date =
            getReportDate(
                report
            );


        if (date) {
            dates.push(date);
        }

    });


    if (!dates.length) {

        return null;

    }


    dates.sort();


    return {

        start:
            dates[0],

        end:
            dates[dates.length - 1]

    };

}


/* =========================================================
   GENERATE DATE ARRAY
   ========================================================= */

function generateSCurveDates(
    startDate,
    endDate
) {

    const dates = [];


    if (
        !startDate ||
        !endDate
    ) {

        return dates;

    }


    const start =
        new Date(
            startDate +
            "T00:00:00"
        );


    const end =
        new Date(
            endDate +
            "T00:00:00"
        );


    if (
        Number.isNaN(
            start.getTime()
        ) ||
        Number.isNaN(
            end.getTime()
        )
    ) {

        return dates;

    }


    let current =
        new Date(
            start
        );


    while (
        current <= end
    ) {

        const iso =
            current
                .toISOString()
                .slice(
                    0,
                    10
                );


        dates.push(
            iso
        );


        current.setDate(
            current.getDate() +
            7
        );

    }


    if (
        dates.length &&
        dates[dates.length - 1] !==
        endDate
    ) {

        dates.push(
            endDate
        );

    }


    return dates;

}


/* =========================================================
   S-CURVE DRAWING
   ========================================================= */

function drawSCurve() {

    if (!sCurveChart) {
        return;
    }


    const canvas =
        sCurveChart;


    const wrapper =
        canvas.parentElement;


    if (!wrapper) {
        return;
    }


    /*
       S-Curve hanya digunakan
       untuk Master Schedule DANREM.
    */

    if (
        !isDANREMProjectSelected()
    ) {

        const ctx =
            canvas.getContext(
                "2d"
            );


        const width =
            wrapper.clientWidth;


        const height =
            wrapper.clientHeight;


        const dpr =
            window.devicePixelRatio ||
            1;


        canvas.width =
            width *
            dpr;


        canvas.height =
            height *
            dpr;


        canvas.style.width =
            width +
            "px";


        canvas.style.height =
            height +
            "px";


        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        ctx.font =
            "14px Arial";


        ctx.textAlign =
            "center";


        ctx.textBaseline =
            "middle";


        ctx.fillText(
            "S-Curve available for Kalimantan → Tipe 200 → DANREM",
            width / 2,
            height / 2
        );


        return;

    }


    const dateRange =
        getSCurveDateRange();


    if (
        !dateRange
    ) {

        return;

    }


    const dates =
        generateSCurveDates(
            dateRange.start,
            dateRange.end
        );


    if (
        dates.length < 2
    ) {

        return;

    }


    const plannedValues =
        dates.map(date =>
            calculatePlannedProjectProgress(
                date
            )
        );


    const actualValues =
        dates.map(date =>
            calculateActualProjectProgress(
                date
            )
        );


    const width =
        wrapper.clientWidth;


    const height =
        wrapper.clientHeight;


    const dpr =
        window.devicePixelRatio ||
        1;


    canvas.width =
        width *
        dpr;


    canvas.height =
        height *
        dpr;


    canvas.style.width =
        width +
        "px";


    canvas.style.height =
        height +
        "px";


    const ctx =
        canvas.getContext(
            "2d"
        );


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /*
       ============================================
       CHART AREA
       ============================================
    */

    const margin = {

        top: 30,

        right: 35,

        bottom: 65,

        left: 60

    };


    const chartWidth =
        width -
        margin.left -
        margin.right;


    const chartHeight =
        height -
        margin.top -
        margin.bottom;


    if (
        chartWidth <= 0 ||
        chartHeight <= 0
    ) {

        return;

    }


    /*
       ============================================
       BACKGROUND
       ============================================
    */

    ctx.fillStyle =
        "#ffffff";


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /*
       ============================================
       GRID
       ============================================
    */

    ctx.lineWidth =
        1;


    ctx.strokeStyle =
        "#e5e7eb";


    ctx.font =
        "11px Arial";


    ctx.fillStyle =
        "#6b7280";


    ctx.textAlign =
        "right";


    ctx.textBaseline =
        "middle";


    for (
        let percentage = 0;
        percentage <= 100;
        percentage += 20
    ) {

        const y =
            margin.top +
            chartHeight -
            (
                percentage /
                100
            ) *
            chartHeight;


        ctx.beginPath();


        ctx.moveTo(
            margin.left,
            y
        );


        ctx.lineTo(
            width -
            margin.right,
            y
        );


        ctx.stroke();


        ctx.fillText(
            percentage +
            "%",
            margin.left -
            10,
            y
        );

    }


    /*
       ============================================
       AXIS
       ============================================
    */

    ctx.strokeStyle =
        "#9ca3af";


    ctx.lineWidth =
        1.2;


    ctx.beginPath();


    ctx.moveTo(
        margin.left,
        margin.top
    );


    ctx.lineTo(
        margin.left,
        margin.top +
        chartHeight
    );


    ctx.lineTo(
        width -
        margin.right,
        margin.top +
        chartHeight
    );


    ctx.stroke();


    /*
       ============================================
       X-AXIS DATE LABEL
       ============================================
    */

    ctx.fillStyle =
        "#6b7280";


    ctx.font =
        "10px Arial";


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "top";


    const labelEvery =
        Math.max(
            1,
            Math.ceil(
                dates.length /
                8
            )
        );


    dates.forEach(
        (date, index) => {

            if (
                index % labelEvery !== 0 &&
                index !==
                dates.length - 1
            ) {

                return;

            }


            const x =
                margin.left +
                (
                    index /
                    (
                        dates.length -
                        1
                    )
                ) *
                chartWidth;


            const dateObject =
                new Date(
                    date +
                    "T00:00:00"
                );


            const label =
                dateObject.toLocaleDateString(
                    "id-ID",
                    {
                        day: "2-digit",
                        month: "short"
                    }
                );


            ctx.fillText(
                label,
                x,
                margin.top +
                chartHeight +
                12
            );

        }
    );


    /*
       ============================================
       DRAW LINE FUNCTION
       ============================================
    */

    function drawLine(
        values,
        lineColor,
        lineWidth
    ) {

        if (
            !values.length
        ) {

            return;

        }


        ctx.beginPath();


        values.forEach(
            (value, index) => {

                const x =
                    margin.left +
                    (
                        index /
                        (
                            values.length -
                            1
                        )
                    ) *
                    chartWidth;


                const safeValue =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            number(value)
                        )
                    );


                const y =
                    margin.top +
                    chartHeight -
                    (
                        safeValue /
                        100
                    ) *
                    chartHeight;


                if (
                    index === 0
                ) {

                    ctx.moveTo(
                        x,
                        y
                    );

                }

                else {

                    ctx.lineTo(
                        x,
                        y
                    );

                }

            }
        );


        ctx.strokeStyle =
            lineColor;


        ctx.lineWidth =
            lineWidth;


        ctx.lineJoin =
            "round";


        ctx.lineCap =
            "round";


        ctx.stroke();

    }


    /*
       ============================================
       PLANNED LINE
       ============================================
    */

    drawLine(
        plannedValues,
        "#2563eb",
        3
    );


    /*
       ============================================
       ACTUAL LINE
       ============================================
    */

    drawLine(
        actualValues,
        "#16a34a",
        3
    );


    /*
       ============================================
       LEGEND
       ============================================
    */

    const legendY =
        height -
        22;


    ctx.font =
        "12px Arial";


    ctx.textAlign =
        "left";


    ctx.textBaseline =
        "middle";


    /*
       Planned
    */

    ctx.strokeStyle =
        "#2563eb";


    ctx.lineWidth =
        3;


    ctx.beginPath();


    ctx.moveTo(
        margin.left,
        legendY
    );


    ctx.lineTo(
        margin.left + 25,
        legendY
    );


    ctx.stroke();


    ctx.fillStyle =
        "#374151";


    ctx.fillText(
        "Planned",
        margin.left + 35,
        legendY
    );


    /*
       Actual
    */

    const actualLegendX =
        margin.left + 115;


    ctx.strokeStyle =
        "#16a34a";


    ctx.lineWidth =
        3;


    ctx.beginPath();


    ctx.moveTo(
        actualLegendX,
        legendY
    );


    ctx.lineTo(
        actualLegendX + 25,
        legendY
    );


    ctx.stroke();


    ctx.fillStyle =
        "#374151";


    ctx.fillText(
        "Actual",
        actualLegendX + 35,
        legendY
    );

}


/* =========================================================
   RECENT DAILY REPORTS
   ========================================================= */

function renderReports(
    reports
) {

    if (
        !reportTableBody
    ) {

        return;

    }


    if (
        !reports.length
    ) {

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
                    getReportDate(b)
                        .localeCompare(
                            getReportDate(a)
                        )
            );


    reportTableBody.innerHTML =
        sortedReports
            .map(report => {


                const manpowerData =
                    getReportManpower(
                        report
                    );


                const manhourData =
                    getReportManhours(
                        report
                    );


                const manpower =
                    manpowerData.total;


                const manhours =
                    manhourData.total;


                const activities =
                    Array.isArray(
                        report.activities
                    )
                        ? report.activities
                        : [];


                const activityCount =
                    activities.length;


                const statuses =
                    activities.map(
                        activity =>
                            normalize(
                                activity.status
                            )
                    );


                let status =
                    "On Progress";


                if (
                    activityCount > 0 &&
                    statuses.every(
                        value =>
                            value ===
                            "completed"
                    )
                ) {

                    status =
                        "Completed";

                }


                return `
                    <tr>

                        <td>
                            ${escapeHTML(
                                getReportDate(
                                    report
                                )
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                report.location
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                report.project
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                report.unit
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                report.weather
                            )}
                        </td>

                        <td>
                            ${formatNumber(
                                manpower
                            )}
                        </td>

                        <td>
                            ${formatNumber(
                                manhours
                            )}
                        </td>

                        <td>
                            ${formatNumber(
                                activityCount
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                status
                            )}
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

    if (
        !progressTableBody
    ) {

        return;

    }


    const scheduleMap =
        createScheduleMap();


    const rows = [];


    reports.forEach(report => {

        const activities =
            Array.isArray(
                report.activities
            )
                ? report.activities
                : [];


        activities.forEach(activity => {

            const activityId =
                getReportActivityId(
                    activity
                );


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
                    getReportDate(
                        report
                    ),

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


    if (
        !rows.length
    ) {

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
        rows
            .map(row => {

                return `
                    <tr>

                        <td>
                            ${escapeHTML(
                                row.date
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                row.project
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                row.unit
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                row.activity
                            )}
                        </td>

                        <td>
                            ${formatQuantity(
                                row.quantity
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                row.quantityUnit
                            )}
                        </td>

                        <td>
                            ${formatQuantity(
                                row.plannedQuantity
                            )}
                        </td>

                        <td>
                            ${formatPercent(
                                row.progress
                            )}
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

    if (
        !materialTableBody
    ) {

        return;

    }


    const materialMap =
        new Map();


    reports.forEach(report => {

        const materials =
            Array.isArray(
                report.materials
            )
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


            if (
                !name
            ) {

                return;

            }


            const key =
                [
                    normalize(name),
                    normalize(unit)
                ].join("|");


            if (
                !materialMap.has(
                    key
                )
            ) {

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
            ).quantity +=
                quantity;

        });

    });


    const materials =
        [
            ...materialMap.values()
        ];


    if (
        !materials.length
    ) {

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
        materials
            .map(material => {

                return `
                    <tr>

                        <td>
                            ${escapeHTML(
                                material.name
                            )}
                        </td>

                        <td>
                            ${formatQuantity(
                                material.quantity
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                material.unit
                            )}
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


    /*
       S-Curve
    */

    drawSCurve();

}


/* =========================================================
   FILTER EVENTS
   ========================================================= */


/* LOCATION */

if (
    locationFilter
) {

    locationFilter.addEventListener(
        "change",
        () => {

            populateProjects();

            populateUnits();

            renderDashboard();

        }
    );

}


/* PROJECT */

if (
    projectFilter
) {

    projectFilter.addEventListener(
        "change",
        () => {

            populateUnits();

            renderDashboard();

        }
    );

}


/* UNIT */

if (
    unitFilter
) {

    unitFilter.addEventListener(
        "change",
        renderDashboard
    );

}


/* DATE */

if (
    dateFilter
) {

    dateFilter.addEventListener(
        "change",
        renderDashboard
    );

}


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
   WINDOW RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        drawSCurve();

    }
);


/* =========================================================
   INITIAL LOAD
   ========================================================= */

populateFilters();

renderDashboard();


/* =========================================================
   DEBUG REPORT DATA
   ========================================================= */

console.log(
    "====================================="
);

console.log(
    "DAILY MONITORING INITIALIZED"
);

console.log(
    "Reports:",
    getReports()
);

console.log(
    "Master Schedule:",
    getMasterSchedule()
);

console.log(
    "====================================="
);
