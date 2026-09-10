document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".report-form");

    if (!form) return;


    // ==============================
    // MATERIAL - ADD NEW ROW
    // ==============================

    const materialContainer =
        document.getElementById("materialContainer");

    const addMaterialBtn =
        document.getElementById("addMaterialBtn");


    addMaterialBtn.addEventListener("click", function () {

        const materialRow =
            document.createElement("div");

        materialRow.className = "material-row";

        materialRow.innerHTML = `

            <div class="form-group">

                <label>Material</label>

                <input
                    type="text"
                    class="material-name"
                    placeholder="Example: Cement, sand, rebar..."
                >

            </div>


            <div class="form-group">

                <label>Quantity</label>

                <input
                    type="number"
                    class="material-quantity"
                    min="0"
                    step="0.01"
                    placeholder="Quantity"
                >

            </div>


            <div class="form-group">

                <label>Unit</label>

                <select class="material-unit">

                    <option value="">Select Unit</option>
                    <option>kg</option>
                    <option>ton</option>
                    <option>m³</option>
                    <option>m²</option>
                    <option>pcs</option>
                    <option>batang</option>
                    <option>sak</option>
                    <option>lembar</option>
                    <option>rit</option>

                </select>

            </div>


            <button
                type="button"
                class="remove-material-btn"
            >
                Remove
            </button>

        `;

        materialContainer.appendChild(materialRow);

    });


    // ==============================
    // MATERIAL - REMOVE ROW
    // ==============================

    document.addEventListener("click", function (event) {

        if (
            event.target.classList.contains(
                "remove-material-btn"
            )
        ) {

            const row =
                event.target.closest(".material-row");

            if (row) {

                row.remove();

            }

        }

    });


    // ==============================
    // FORM SUBMIT
    // ==============================

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        // ==============================
        // BASIC INFORMATION
        // ==============================

        const report = {

            date:
                document.getElementById("reportDate").value,

            project:
                document.getElementById("project").value,

            unit:
                document.getElementById("unit").value,

            weather:
                document.getElementById("weather").value,


            // ==============================
            // MANPOWER
            // ==============================

            foreman:
                Number(document.getElementById("foreman").value || 0),

            headWorker:
                Number(document.getElementById("headWorker").value || 0),

            skilledWorker:
                Number(document.getElementById("skilledWorker").value || 0),

            staffOffice:
                Number(document.getElementById("staffOffice").value || 0),


            // ==============================
            // WORKING HOURS
            // ==============================

            normalHours:
                Number(document.getElementById("normalHours").value || 0),

            overtimeHours:
                Number(document.getElementById("overtimeHours").value || 0),


            // ==============================
            // WORK ACTIVITIES
            // ==============================

            activity:
                document.getElementById("activity").value,

            status:
                document.getElementById("status").value,


            // ==============================
            // MATERIALS
            // ==============================

            materials: [],


            // ==============================
            // DAILY NOTES
            // ==============================

            notes:
                document.getElementById("notes").value

        };


        // ==============================
        // COLLECT MATERIALS
        // ==============================

        const materialRows =
            document.querySelectorAll(".material-row");


        materialRows.forEach(function (row) {

            const name =
                row
                    .querySelector(".material-name")
                    .value
                    .trim();


            const quantity =
                row
                    .querySelector(".material-quantity")
                    .value;


            const unit =
                row
                    .querySelector(".material-unit")
                    .value;


            // Only save completed material rows

            if (
                name !== "" &&
                quantity !== "" &&
                unit !== ""
            ) {

                report.materials.push({

                    name: name,

                    quantity: Number(quantity),

                    unit: unit

                });

            }

        });


        // ==============================
        // TOTAL MANPOWER
        // ==============================

        report.totalManpower =

            report.foreman +

            report.headWorker +

            report.skilledWorker +

            report.staffOffice;


        // ==============================
        // MAN-HOURS
        // ==============================

        report.normalManhours =

            report.totalManpower *
            report.normalHours;


        report.overtimeManhours =

            report.totalManpower *
            report.overtimeHours;


        report.totalManhours =

            report.normalManhours +
            report.overtimeManhours;


        // ==============================
        // SAVE REPORT
        // ==============================

        let reports =

            JSON.parse(
                localStorage.getItem("dailyReports")
            ) || [];


        reports.push(report);


        localStorage.setItem(

            "dailyReports",

            JSON.stringify(reports)

        );


        // ==============================
        // SUCCESS MESSAGE
        // ==============================

        alert(
            "Daily Report berhasil disimpan!"
        );


        // ==============================
        // REDIRECT
        // ==============================

        window.location.assign(
            "./daily-monitoring.html"
        );

    });

});
