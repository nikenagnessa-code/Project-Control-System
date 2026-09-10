document.addEventListener("DOMContentLoaded", function () {

    const tableBody = document.getElementById("reportTableBody");

    if (!tableBody) return;

    // Ambil data daily report dari localStorage
    const reports = JSON.parse(
        localStorage.getItem("dailyReports")
    ) || [];

    // Jika belum ada data
    if (reports.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 30px;">
                    No daily reports available.
                </td>
            </tr>
        `;

        return;
    }

    // Tampilkan laporan terbaru di paling atas
    reports.reverse();

    reports.forEach(function (report) {

        // Hitung total manpower
        const totalManpower =
            Number(report.foreman || 0) +
            Number(report.headWorker || 0) +
            Number(report.skilledWorker || 0) +
            Number(report.laborer || 0);

        // Tentukan icon cuaca
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

        // Tentukan class status
        let statusClass = "status-progress";

        if (report.status === "Completed") {
            statusClass = "status-completed";
        }

        // Buat baris tabel
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${report.date || "-"}</td>

            <td>
                ${report.project || "-"} /
                ${report.unit || "-"}
            </td>

            <td>
                ${weatherIcon} ${report.weather || "-"}
            </td>

            <td>
                ${totalManpower}
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
