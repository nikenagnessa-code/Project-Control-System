document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".report-form");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const inputs = form.querySelectorAll("input, select, textarea");

        const report = {
            date: inputs[0].value,
            project: inputs[1].value,
            unit: inputs[2].value,
            weather: inputs[3].value,

            foreman: inputs[4].value || 0,
            headWorker: inputs[5].value || 0,
            skilledWorker: inputs[6].value || 0,
            laborer: inputs[7].value || 0,

            workingHours: inputs[8].value || 0,

            activity: inputs[9].value,
            status: inputs[10].value,

            material: inputs[11].value,
            quantity: inputs[12].value,
            materialUnit: inputs[13].value,

            notes: inputs[14].value
        };

        let reports = JSON.parse(
            localStorage.getItem("dailyReports")
        ) || [];

        reports.push(report);

        localStorage.setItem(
            "dailyReports",
            JSON.stringify(reports)
        );

        alert("Daily Report berhasil disimpan!");

        window.location.href = "daily-monitoring.html";

    });

});
