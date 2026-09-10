document.addEventListener("DOMContentLoaded", function () {

    const tableBody = document.getElementById("reportTableBody");

    if (!tableBody) return;

    const reports = JSON.parse(
        localStorage.getItem("dailyReports")
    ) || [];

    // =========================
    // KPI ELEMENTS
    // =========================

    const kpiCards = document.querySelectorAll(".kpi-card");

    const manpowerElement = kpiCards[0]?.querySelector("strong");
    const manhoursElement = kpiCards[1]?.querySelector("strong");
    const progressElement = kpiCards[2]?.querySelector("strong");
    const completedElement = kpiCards[3]?.querySelector("strong");


    // =========================
    // EMPTY DATA
    // =========================

    if (reports.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding:30px;">
                    No daily reports available.
                </td>
            </tr>
        `;

        if (manpowerElement) manpowerElement.textContent = "0";
        if (manhoursElement) manhoursElement.textContent = "0";
        if (progressElement) progressElement.textContent = "0";
        if (completedElement) completedElement.textContent = "0";

        return;
    }


    // =========================
    // CALCULATE KPI
    // =========================

    let totalManpower = 0;
    let totalManhours = 0;
    let onProgress = 0;
    let completed = 0;

    reports.forEach(function (report) {

        const manpower =
            Number(report.foreman || 0) +
            Number(report.headWorker || 0) +
            Number(report.skilledWorker || 0) +
            Number(report.laborer || 0);

        const workingHours =
            Number(report.workingHours || 0);

        totalManpower += manpower;

        totalManhours += manpower * workingHours;

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

    if (manpowerElement) {
        manpowerElement.textContent = totalManpower;
    }

    if (manhoursElement) {
        manhoursElement.textContent = totalManhours;
    }

    if (progressElement) {
        progressElement.textContent = onProgress;
    }

    if (completedElement) {
        completedElement.textContent = completed;
    }


    // =========================
    // DISPLAY TABLE
    // =========================

    tableBody.innerHTML = "";

    const sortedReports = [...reports].reverse();

    sortedReports.forEach(function (report) {

        const manpower =
            Number(report.foreman || 0) +
            Number(report.headWorker || 0) +
            Number(report.skilledWorker || 0) +
            Number(report.laborer || 0);

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

        let statusClass = "status-progress";

        if (report.status === "Completed") {
            statusClass = "status-completed";
        }

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${report.date || "-"}</td>

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

});
