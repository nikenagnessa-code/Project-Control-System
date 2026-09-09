document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".report-form");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        alert("Daily Report berhasil disimpan!");

    });

});
