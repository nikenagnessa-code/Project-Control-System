document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // ELEMENT
    // =====================================================

    const tableBody = document.getElementById("reportTableBody");
    const materialTableBody =
        document.getElementById("materialTableBody");

    const dateFilter =
        document.getElementById("dateFilter");

    const locationFilter =
        document.getElementById("locationFilter");

    const projectFilter =
        document.getElementById("projectFilter");

    const unitFilter =
        document.getElementById("unitFilter");


    // KPI

    const totalManpowerElement =
        document.getElementById("totalManpower");

    const normalManhoursElement =
        document.getElementById("normalManhours");

    const overtimeManhoursElement =
        document.getElementById("overtimeManhours");

    const totalManhoursElement =
        document.getElementById("totalManhours");

    const onProgressElement =
        document.getElementById("onProgress");

    const completedElement =
        document.getElementById("completed");


    if (!tableBody) return;


    // =====================================================
    // LOAD DATA
    // =====================================================

    const reports =
        JSON.parse(
            localStorage.getItem("dailyReports")
        ) || [];


    // =====================================================
    // PROJECT DATA
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
    // HELPER
    // =====================================================

    function getNumber(value) {

        const number = Number(value);

        return Number.isFinite(number)
            ? number
            : 0;

    }



    // =====================================================
    // SET DEFAULT DATE
    // =====================================================

    function getLatestDate() {

        if (reports.length === 0) {

            const today = new Date();

            const year =
                today.getFullYear();

            const month =
                String(
                    today.getMonth() + 1
                ).padStart(2, "0");

            const day =
                String(
                    today.getDate()
                ).padStart(2, "0");

            return `${year}-${month}-${day}`;

        }


        const dates = reports

            .map(report => report.date)

            .filter(date => date)

            .sort();


        return dates.length > 0
            ? dates[dates.length - 1]
            : "";

    }


    dateFilter.value =
        getLatestDate();



    // =====================================================
    // UPDATE PROJECT FILTER
    // =====================================================

    function updateProjectFilter() {

        const selectedLocation =
            locationFilter.value;


        projectFilter.innerHTML = `
            <option value="All">
                All Projects
            </option>
        `;


        if (
            selectedLocation === "All"
        ) {

            const allProjects = [];


            Object.values(projectData)
                .forEach(locationProjects => {

                    Object.keys(locationProjects)
                        .forEach(project => {

                            if (
                                !allProjects.includes(project)
                            ) {

                                allProjects.push(project);

                            }

                        });

                });


            allProjects.forEach(project => {

                const option =
                    document.createElement("option");

                option.value = project;
                option.textContent = project;

                projectFilter.appendChild(option);

            });

        }

        else {

            const projects =
                projectData[selectedLocation]
                || {};


            Object.keys(projects)
                .forEach(project => {

                    const option =
                        document.createElement("option");

                    option.value = project;
                    option.textContent = project;

                    projectFilter.appendChild(option);

                });

        }


        updateUnitFilter();

    }



    // =====================================================
    // UPDATE UNIT FILTER
    // =====================================================

    function updateUnitFilter() {

        const selectedLocation =
            locationFilter.value;

        const selectedProject =
            projectFilter.value;


        unitFilter.innerHTML = `
            <option value="All">
                All Units
            </option>
        `;


        let units = [];


        // ALL LOCATION

        if (
            selectedLocation === "All"
        ) {

            Object.values(projectData)
                .forEach(locationProjects => {

                    Object.entries(locationProjects)
                        .forEach(
                            ([project, projectUnits]) => {

                                if (
                                    selectedProject === "All"
                                    ||
                                    project === selectedProject
                                ) {

                                    projectUnits.forEach(unit => {

                                        if (
                                            !units.includes(unit)
                                        ) {

                                            units.push(unit);

                                        }

                                    });

                                }

                            }
                        );

                });

        }


        // SPECIFIC LOCATION

        else {

            const projects =
                projectData[selectedLocation]
                || {};


            Object.entries(projects)
                .forEach(
                    ([project, projectUnits]) => {

                        if (
                            selectedProject === "All"
                            ||
                            project === selectedProject
                        ) {

                            projectUnits.forEach(unit => {

                                if (
                                    !units.includes(unit)
                                ) {

                                    units.push(unit);

                                }

                            });

                        }

                    }
                );

        }


        units.forEach(unit => {

            const option =
                document.createElement("option");

            option.value = unit;
            option.textContent = unit;

            unitFilter.appendChild(option);

        });


        updateDashboard();

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


        return reports.filter(report => {

            const dateMatch =
                !selectedDate
                ||
                report.date === selectedDate;


            const locationMatch =
                selectedLocation === "All"
                ||
                report.location === selectedLocation;


            const projectMatch =
                selectedProject === "All"
                ||
                report.project === selectedProject;


            const unitMatch =
                selectedUnit === "All"
                ||
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


        filteredReports.forEach(report => {

            const manpower =
                getNumber(report.totalManpower)
                ||
                (
                    getNumber(report.foreman) +
                    getNumber(report.headWorker) +
                    getNumber(report.skilledWorker) +
                    getNumber(report.laborer) +
                    getNumber(report.staffOffice)
                );


            const normalHours =
                getNumber(
                    report.normalWorkingHours
                )
                ||
                getNumber(
                    report.workingHours
                );


            const overtimeHours =
                getNumber(
                    report.overtimeHours
                );


            const reportNormalManhours =
                getNumber(
                    report.normalManhours
                )
                ||
                manpower * normalHours;


            const reportOvertimeManhours =
                getNumber(
                    report.overtimeManhours
                )
                ||
                manpower * overtimeHours;


            const reportTotalManhours =
                getNumber(
                    report.totalManhours
                )
                ||
                (
                    reportNormalManhours +
                    reportOvertimeManhours
                );


            totalManpower += manpower;

            normalManhours +=
                reportNormalManhours;

            overtimeManhours +=
                reportOvertimeManhours;

            totalManhours +=
                reportTotalManhours;


            if (
                report.status === "On Progress"
            ) {

                onProgress++;

            }


            if (
                report.status === "Completed"
            ) {

                completed++;

            }

        });


        totalManpowerElement.textContent =
            totalManpower;

        normalManhoursElement.textContent =
            normalManhours;

        overtimeManhoursElement.textContent =
            overtimeManhours;

        totalManhoursElement.textContent =
            totalManhours;

        onProgressElement.textContent =
            onProgress;

        completedElement.textContent =
            completed;

    }



    // =====================================================
    // WEATHER ICON
    // =====================================================

    function getWeatherIcon(weather) {

        switch (weather) {

            case "Clear":
                return "☀️";

            case "Cloudy":
                return "☁️";

            case "Rain":
                return "🌧️";

            case "Heavy Rain":
                return "⛈️";

            default:
                return "🌤️";

        }

    }



    // =====================================================
    // STATUS CLASS
    // =====================================================

    function getStatusClass(status) {

        if (
            status === "Completed"
        ) {

            return "status-completed";

        }


        return "status-progress";

    }



    // =====================================================
    // UPDATE REPORT TABLE
    // =====================================================

    function updateReportTable(filteredReports) {

        tableBody.innerHTML = "";


        if (
            filteredReports.length === 0
        ) {

            tableBody.innerHTML = `

                <tr>

                    <td
                        colspan="9"
                        style="
                            text-align:center;
                            padding:30px;
                        "
                    >

                        No daily reports available
                        for the selected filters.

                    </td>

                </tr>

            `;

            return;

        }


        filteredReports
            .slice()
            .reverse()
            .forEach(report => {


                const manpower =
                    getNumber(report.totalManpower)
                    ||
                    (
                        getNumber(report.foreman) +
                        getNumber(report.headWorker) +
                        getNumber(report.skilledWorker) +
                        getNumber(report.laborer) +
                        getNumber(report.staffOffice)
                    );


                const normalHours =
                    getNumber(
                        report.normalWorkingHours
                    )
                    ||
                    getNumber(
                        report.workingHours
                    );


                const overtimeHours =
                    getNumber(
                        report.overtimeHours
                    );


                const manhours =
                    getNumber(
                        report.totalManhours
                    )
                    ||
                    (
                        manpower *
                        (
                            normalHours +
                            overtimeHours
                        )
                    );


                const weatherIcon =
                    getWeatherIcon(
                        report.weather
                    );


                const statusClass =
                    getStatusClass(
                        report.status
                    );


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
                        ${weatherIcon}
                        ${report.weather || "-"}
                    </td>


                    <td>
                        ${manpower}
                    </td>


                    <td>
                        ${manhours}
                    </td>


                    <td>
                        ${report.activity || "-"}
                    </td>


                    <td>

                        <span
                            class="${statusClass}"
                        >
                            ${report.status || "-"}
                        </span>

                    </td>

                `;


                tableBody.appendChild(row);

            });

    }



    // =====================================================
    // UPDATE MATERIAL SUMMARY
    // =====================================================

    function updateMaterialSummary(filteredReports) {

        materialTableBody.innerHTML = "";


        const materialMap = {};


        filteredReports.forEach(report => {

            if (
                !Array.isArray(report.materials)
            ) {

                return;

            }


            report.materials.forEach(material => {

                const name =
                    material.name
                    || "-";


                const unit =
                    material.unit
                    || "-";


                const quantity =
                    getNumber(
                        material.quantity
                    );


                const key =
                    `${name}|||${unit}`;


                if (
                    !materialMap[key]
                ) {

                    materialMap[key] = 0;

                }


                materialMap[key] +=
                    quantity;

            });

        });


        const materials =
            Object.entries(materialMap);


        if (
            materials.length === 0
        ) {

            materialTableBody.innerHTML = `

                <tr>

                    <td
                        colspan="3"
                        style="
                            text-align:center;
                            padding:30px;
                        "
                    >

                        No material records available
                        for the selected filters.

                    </td>

                </tr>

            `;

            return;

        }


        materials.forEach(
            ([key, quantity]) => {

                const [
                    name,
                    unit
                ] = key.split("|||");


                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>
                        ${name}
                    </td>

                    <td>
                        ${quantity}
                    </td>

                    <td>
                        ${unit}
                    </td>

                `;


                materialTableBody.appendChild(row);

            }
        );

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

        }
    );


    projectFilter.addEventListener(
        "change",
        function () {

            updateUnitFilter();

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

});
