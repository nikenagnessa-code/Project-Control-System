const masterSchedule = [

    // =========================================================
    // KALIMANTAN - TIPE 200 - DANREM
    // =========================================================

    // ... SEMUA DATA ACTIVITY MASTER SCHEDULE
    // yang sudah kita susun sebelumnya
    // Galian & Pondasi
    // Pilecap
    // Sloof
    // Kolom
    // Plat Lantai
    // Ring Balok
    // Plat Dak
    // Rangka Atap
    // Pasangan
    // Finishing
    // Plafond
    // Interior
    // Kusen/Pintu/Jendela
    // Pengecatan
    // Sanitair
    // Sarpras
    // Elektrikal
    // Tata Udara
    // Plumbing

];


// =========================================================
// BASELINE SCHEDULE
// KALIMANTAN - TIPE 200 - DANREM
// =========================================================

const workPackageSchedule = {

    "Galian & Pondasi": {
        plannedStart: "2026-04-13",
        plannedFinish: "2026-05-24"
    },

    "Pilecap P1": {
        plannedStart: "2026-04-27",
        plannedFinish: "2026-06-21"
    },

    "Sloof S1": {
        plannedStart: "2026-04-27",
        plannedFinish: "2026-06-21"
    },

    "Kolom K1": {
        plannedStart: "2026-04-27",
        plannedFinish: "2026-06-21"
    },

    "Kolom K2": {
        plannedStart: "2026-04-27",
        plannedFinish: "2026-06-21"
    },

    "Kolom K3": {
        plannedStart: "2026-04-27",
        plannedFinish: "2026-06-21"
    },

    "Kolom Kp": {
        plannedStart: "2026-04-27",
        plannedFinish: "2026-06-21"
    },

    "Plat Lantai": {
        plannedStart: "2026-04-27",
        plannedFinish: "2026-06-21"
    },

    "Ring Balok RB1": {
        plannedStart: "2026-05-25",
        plannedFinish: "2026-07-19"
    },

    "Ring Balok RB2": {
        plannedStart: "2026-05-25",
        plannedFinish: "2026-07-19"
    },

    "Plat Dak Atap": {
        plannedStart: "2026-05-25",
        plannedFinish: "2026-07-19"
    },

    "Rangka Atap": {
        plannedStart: "2026-06-08",
        plannedFinish: "2026-08-02"
    },

    "Pasangan": {
        plannedStart: "2026-05-11",
        plannedFinish: "2026-07-19"
    },

    "Finishing Lantai & Keramik Dinding": {
        plannedStart: "2026-06-22",
        plannedFinish: "2026-08-23"
    },

    "Plafond": {
        plannedStart: "2026-07-27",
        plannedFinish: "2026-08-23"
    },

    "Interior": {
        plannedStart: "2026-08-17",
        plannedFinish: "2026-08-30"
    },

    "Kusen, Pintu & Jendela": {
        plannedStart: "2026-06-01",
        plannedFinish: "2026-08-02"
    },

    "Pengecatan": {
        plannedStart: "2026-07-20",
        plannedFinish: "2026-08-30"
    },

    "Sanitair": {
        plannedStart: "2026-08-10",
        plannedFinish: "2026-08-30"
    },

    "Sarpras": {
        plannedStart: "2026-08-17",
        plannedFinish: "2026-08-30"
    },

    "Elektrikal": {
        plannedStart: "2026-06-22",
        plannedFinish: "2026-08-23"
    },

    "Tata Udara": {
        plannedStart: "2026-07-20",
        plannedFinish: "2026-08-30"
    },

    "Plumbing": {
        plannedStart: "2026-06-08",
        plannedFinish: "2026-08-30"
    },

    "Instalasi Pemipaan": {
        plannedStart: "2026-05-18",
        plannedFinish: "2026-08-02"
    }

};


// =========================================================
// APPLY BASELINE DATE TO EACH ACTIVITY
// =========================================================

masterSchedule.forEach(item => {

    const schedule = workPackageSchedule[item.workPackage];

    if (schedule) {
        item.plannedStart = schedule.plannedStart;
        item.plannedFinish = schedule.plannedFinish;
    }

});
