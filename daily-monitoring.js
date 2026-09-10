document.addEventListener("DOMContentLoaded", function () {

    const tableBody = document.getElementById("reportTableBody");
    const dateFilter = document.getElementById("dateFilter");
    const unitFilter = document.getElementById("unitFilter");

    if (!tableBody) return;

    const reports = JSON.parse(
        localStorage.getItem("dailyReports")
    ) || [];


    // =========================
    // ELEMENT KPI
    // =========================

    const kpiCards = document.querySelectorAll(".kpi-card");

    const manpowerElement =
        kpiCards[0]?.querySelector("strong");

    const manhoursElement =
        kpiCards[1]?.querySelector("strong");

    const progressElement =
        kpiCards[2]?.querySelector("strong");

    const completedElement =
        kpiCards[3]?.querySelector("strong");


    // =========================
    // SET DEFAULT DATE
    // =========================

    if (reports.length > 0) {

        // Ambil tanggal terbaru dari laporan
        const latestDate = reports
            .map(report => report.date)
            .filter(date => date)
            .sort()
            .pop();

        dateFilter.value = latestDate;

    } else {

        // Jika belum ada data
        const today = new Date();

        const year = today.getFullYear();
        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");

        dateFilter.value =
            `${year}-${month}-${day}`;
    }


    // =========================
    // UPDATE DASHBOARD
    // =========================

    function updateDashboard() {

        const selectedDate = dateFilter.value;
        const selectedUnit = unitFilter.value;


        // Filter data berdasarkan tanggal
        let filteredReports = reports.filter(function (report) {

            const dateMatch =
                report.date === selectedDate;

            const unitMatch =
                selectedUnit === "All" ||
                report.unit === selectedUnit;

            return dateMatch && unitMatch;

        });


        // =========================
        // CALCULATE KPI
        // =========================

        let totalManpower = 0;
        let totalManhours = 0;
        let onProgress = 0;
        let completed = 0;


        filteredReports.forEach(function (report) {

            const manpower =
                Number(report.foreman || 0) +
                Number(report.headWorker || 0) +
                Number(report.skilledWorker || 0) +
                Number(report.laborer || 0);

            const workingHours =
                Number(report.workingHours || 0);


            totalManpower += manpower;

            totalManhours +=
                manpower * workingHours;


            if (report.status === "On Progress") {
                onProgress++;
            }

            if (report.status === "Completed") {
                completed++;
            }

        });


        // =========================
        // UPDATE KPI
        // =========================

        manpowerElement.textContent =
            totalManpower;

        manhoursElement.textContent =
            totalManhours;

        progressElement.textContent =
            onProgress;

        completedElement.textContent =
            completed;


        // =========================
        // UPDATE TABLE
        // =========================

        tableBody.innerHTML = "";


        if (filteredReports.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="6"
                        style="text-align:center; padding:30px;">
                        No daily reports available
                        for the selected date and unit.
                    </td>
                </tr>
            `;

            return;
        }


        // Terbaru di atas
        filteredReports
            .slice()
            .reverse()
            .forEach(function (report) {

                const manpower =
                    Number(report.foreman || 0) +
                    Number(report.headWorker || 0) +
                    Number(report.skilledWorker || 0) +
                    Number(report.laborer || 0);


                // Weather icon
                let weatherIcon = "🌤️";

                if (report.weather === "Clear") {
                    weatherIcon = "☀️";
                } else if (report.weather === "Cloudy") {
                    weatherIcon = "☁️";
                } else if (report.weather === "Rain") {
                    weatherIcon = "🌧️";
                } else if (report.weather === "Heavy Rain") {
                    weatherIcon = "⛈️";
                }


                // Status class
                let statusClass =
                    "status-progress";

                if (report.status === "Completed") {
                    statusClass =
                        "status-completed";
                }


                const row =
                    document.createElement("tr");


                row.innerHTML = `
                    <td>
                        ${report.date || "-"}
                    </td>

                    <td>
                        ${report.project || "-"} /
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
                        ${report.activity || "-"}
                    </td>

                    <td>
                        <span class="${statusClass}">
                            ${report.status || "-"}
                        </span>
                    </td>
                `;


                tableBody.appendChild(row);

            });

    }


    // =========================
    // FILTER EVENTS
    // =========================

    dateFilter.addEventListener(
        "change",
        updateDashboard
    );

    unitFilter.addEventListener(
        "change",
        updateDashboard
    );


    // Jalankan pertama kali
    updateDashboard();

});
