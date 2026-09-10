/* =========================================================
   PROJECT CONTROL SYSTEM
   MASTER SCHEDULE
   KALIMANTAN - TIPE 200 - DANREM
   ========================================================= */


const masterSchedule = [

    /* =====================================================
       STRUKTUR
       GALIAN & PONDASI
    ===================================================== */

    {
        activityId: "STR-GAL-001",
        workPackage: "Galian & Pondasi",
        activity: "Pengukuran / Pemasangan Bouwplank",
        plannedQuantity: 68,
        quantityUnit: "m'",
        weight: 0.314662
    },

    {
        activityId: "STR-GAL-002",
        workPackage: "Galian & Pondasi",
        activity: "Galian Tanah Pondasi dan Sloof",
        plannedQuantity: 62.8575,
        quantityUnit: "m³",
        weight: 0.336858
    },

    {
        activityId: "STR-GAL-003",
        workPackage: "Galian & Pondasi",
        activity: "Pengadaan Cerucuk P. 4m + Pancang",
        plannedQuantity: 626,
        quantityUnit: "Bh",
        weight: 0.872940
    },

    {
        activityId: "STR-GAL-004",
        workPackage: "Galian & Pondasi",
        activity: "Urugan Pasir Bawah Pondasi dan Sloof",
        plannedQuantity: 6.22,
        quantityUnit: "m³",
        weight: 0.127344
    },

    {
        activityId: "STR-GAL-005",
        workPackage: "Galian & Pondasi",
        activity: "Lantai Kerja Bawah Pondasi dan Sloof",
        plannedQuantity: 3.11,
        quantityUnit: "m³",
        weight: 0.166656
    },

    {
        activityId: "STR-GAL-006",
        workPackage: "Galian & Pondasi",
        activity: "Urugan Tanah Peninggian Bangunan",
        plannedQuantity: 100,
        quantityUnit: "m³",
        weight: 1.018705
    },

    {
        activityId: "STR-GAL-007",
        workPackage: "Galian & Pondasi",
        activity: "Pondasi Batu Kali",
        plannedQuantity: 18.5045,
        quantityUnit: "m³",
        weight: 0.882653
    },


    /* =====================================================
       PILECAP P1
    ===================================================== */

    {
        activityId: "STR-PC-001",
        workPackage: "Pilecap P1",
        activity: "Bekisting Pilecap P1",
        plannedQuantity: 39.68,
        quantityUnit: "m²",
        weight: 0.321750
    },

    {
        activityId: "STR-PC-002",
        workPackage: "Pilecap P1",
        activity: "Pembesian Pilecap P1",
        plannedQuantity: 924.63111,
        quantityUnit: "kg",
        weight: 0.989319
    },

    {
        activityId: "STR-PC-003",
        workPackage: "Pilecap P1",
        activity: "Cor Beton Pilecap P1 K-250",
        plannedQuantity: 7.936,
        quantityUnit: "m³",
        weight: 0.879695
    },


    /* =====================================================
       SLOOF S1
    ===================================================== */

    {
        activityId: "STR-SLF-001",
        workPackage: "Sloof S1",
        activity: "Bekisting Sloof S1",
        plannedQuantity: 91.308,
        quantityUnit: "m²",
        weight: 0.755515
    },

    {
        activityId: "STR-SLF-002",
        workPackage: "Sloof S1",
        activity: "Pembesian Sloof S1",
        plannedQuantity: 1151.7246533,
        quantityUnit: "kg",
        weight: 1.232300
    },

    {
        activityId: "STR-SLF-003",
        workPackage: "Sloof S1",
        activity: "Cor Beton Sloof S1 K-250",
        plannedQuantity: 6.8481,
        quantityUnit: "m³",
        weight: 0.759102
    },


    /* =====================================================
       KOLOM
    ===================================================== */

    {
        activityId: "STR-K1-001",
        workPackage: "Kolom K1",
        activity: "Bekisting Kolom K1",
        plannedQuantity: 28,
        quantityUnit: "m²",
        weight: 0.329073
    },

    {
        activityId: "STR-K1-002",
        workPackage: "Kolom K1",
        activity: "Pembesian Kolom K1",
        plannedQuantity: 518.618147,
        quantityUnit: "kg",
        weight: 0.554901
    },

    {
        activityId: "STR-K1-003",
        workPackage: "Kolom K1",
        activity: "Cor Beton Kolom K1 K-225",
        plannedQuantity: 1.764,
        quantityUnit: "m³",
        weight: 0.195537
    },


    {
        activityId: "STR-K2-001",
        workPackage: "Kolom K2",
        activity: "Bekisting Kolom K2",
        plannedQuantity: 51.84,
        quantityUnit: "m²",
        weight: 0.609255
    },

    {
        activityId: "STR-K2-002",
        workPackage: "Kolom K2",
        activity: "Pembesian Kolom K2",
        plannedQuantity: 637.63876,
        quantityUnit: "kg",
        weight: 0.682248
    },

    {
        activityId: "STR-K2-003",
        workPackage: "Kolom K2",
        activity: "Cor Beton Kolom K2 K-225",
        plannedQuantity: 4.32,
        quantityUnit: "m³",
        weight: 0.478866
    },


    {
        activityId: "STR-K3-001",
        workPackage: "Kolom K3",
        activity: "Bekisting Kolom K3",
        plannedQuantity: 28.8,
        quantityUnit: "m²",
        weight: 0.338475
    },

    {
        activityId: "STR-K3-002",
        workPackage: "Kolom K3",
        activity: "Pembesian Kolom K3",
        plannedQuantity: 404.56984,
        quantityUnit: "kg",
        weight: 0.432874
    },

    {
        activityId: "STR-K3-003",
        workPackage: "Kolom K3",
        activity: "Cor Beton Kolom K3 K-225",
        plannedQuantity: 3,
        quantityUnit: "m³",
        weight: 0.332546
    },


    {
        activityId: "STR-KP-001",
        workPackage: "Kolom Kp",
        activity: "Bekisting Kolom Kp",
        plannedQuantity: 79.2,
        quantityUnit: "m²",
        weight: 0.930807
    },

    {
        activityId: "STR-KP-002",
        workPackage: "Kolom Kp",
        activity: "Pembesian Kolom Kp",
        plannedQuantity: 855.23724,
        quantityUnit: "kg",
        weight: 0.915070
    },

    {
        activityId: "STR-KP-003",
        workPackage: "Kolom Kp",
        activity: "Cor Beton Kolom Kp K-225",
        plannedQuantity: 2.97,
        quantityUnit: "m³",
        weight: 0.329220
    },


    /* =====================================================
       PLAT LANTAI
    ===================================================== */

    {
        activityId: "STR-PLT-001",
        workPackage: "Plat Lantai",
        activity: "Urugan Pasir Bawah Plat Lantai t10cm",
        plannedQuantity: 26,
        quantityUnit: "m³",
        weight: 0.532307
    },

    {
        activityId: "STR-PLT-002",
        workPackage: "Plat Lantai",
        activity: "Plastic Sheet",
        plannedQuantity: 220,
        quantityUnit: "m²",
        weight: 0.223645
    },

    {
        activityId: "STR-PLT-003",
        workPackage: "Plat Lantai",
        activity: "Bekisting Plat Lantai t8cm",
        plannedQuantity: 12.24,
        quantityUnit: "m²",
        weight: 0.165171
    },

    {
        activityId: "STR-PLT-004",
        workPackage: "Plat Lantai",
        activity: "Pembesian Plat Lantai t8cm",
        plannedQuantity: 1416.70194,
        quantityUnit: "kg",
        weight: 1.637597
    },

    {
        activityId: "STR-PLT-005",
        workPackage: "Plat Lantai",
        activity: "Cor Beton Plat Lantai t8cm",
        plannedQuantity: 20.8,
        quantityUnit: "m³",
        weight: 2.305651
    },


    /* =====================================================
       STRUKTUR BETON ATAP
    ===================================================== */

    {
        activityId: "STR-RB1-001",
        workPackage: "Ring Balok RB1",
        activity: "Bekisting Ring Balok RB1",
        plannedQuantity: 107.31,
        quantityUnit: "m²",
        weight: 1.285573
    },

    {
        activityId: "STR-RB1-002",
        workPackage: "Ring Balok RB1",
        activity: "Pembesian Ring Balok RB1",
        plannedQuantity: 1082.94412,
        quantityUnit: "kg",
        weight: 1.158707
    },

    {
        activityId: "STR-RB1-003",
        workPackage: "Ring Balok RB1",
        activity: "Cor Beton Ring Balok RB1",
        plannedQuantity: 6.4386,
        quantityUnit: "m³",
        weight: 0.713710
    },


    {
        activityId: "STR-RB2-001",
        workPackage: "Ring Balok RB2",
        activity: "Bekisting Ring Balok RB2",
        plannedQuantity: 11.375,
        quantityUnit: "m²",
        weight: 0.136272
    },

    {
        activityId: "STR-RB2-002",
        workPackage: "Ring Balok RB2",
        activity: "Pembesian Ring Balok RB2",
        plannedQuantity: 124.340227,
        quantityUnit: "kg",
        weight: 0.133039
    },

    {
        activityId: "STR-RB2-003",
        workPackage: "Ring Balok RB2",
        activity: "Cor Beton Ring Balok RB2",
        plannedQuantity: 1.1375,
        quantityUnit: "m³",
        weight: 0.126090
    },


    {
        activityId: "STR-DAK-001",
        workPackage: "Plat Dak Atap",
        activity: "Bekisting Plat Dak Atap",
        plannedQuantity: 21.35,
        quantityUnit: "m²",
        weight: 0.315769
    },

    {
        activityId: "STR-DAK-002",
        workPackage: "Plat Dak Atap",
        activity: "Pembesian Plat Dak Atap",
        plannedQuantity: 179.34,
        quantityUnit: "kg",
        weight: 0.255930
    },

    {
        activityId: "STR-DAK-003",
        workPackage: "Plat Dak Atap",
        activity: "Cor Beton Plat Dak Atap",
        plannedQuantity: 2.562,
        quantityUnit: "m³",
        weight: 0.350610
    },

    {
        activityId: "STR-DAK-004",
        workPackage: "Plat Dak Atap",
        activity: "Waterproofing + Screeding",
        plannedQuantity: 21.35,
        quantityUnit: "m²",
        weight: 0.398679
    },


    /* =====================================================
       RANGKA ATAP
    ===================================================== */

    {
        activityId: "STR-RAT-001",
        workPackage: "Rangka Atap",
        activity: "Pemasangan Rangka Atap",
        plannedQuantity: 493.917469,
        quantityUnit: "m²",
        weight: 12.903074
    },

    {
        activityId: "STR-RAT-002",
        workPackage: "Rangka Atap",
        activity: "Penutup Atap Genteng Keramik",
        plannedQuantity: 493.917469,
        quantityUnit: "m²",
        weight: 5.221363
    },

    {
        activityId: "STR-RAT-003",
        workPackage: "Rangka Atap",
        activity: "Bubungan",
        plannedQuantity: 65.924597,
        quantityUnit: "m'",
        weight: 0.419930
    },

    {
        activityId: "STR-RAT-004",
        workPackage: "Rangka Atap",
        activity: "Lisplank",
        plannedQuantity: 82,
        quantityUnit: "m'",
        weight: 0.418757
    },


    /* =====================================================
       PASANGAN
    ===================================================== */

    {
        activityId: "ARS-DIN-001",
        workPackage: "Pasangan",
        activity: "Pasangan Dinding Bata",
        plannedQuantity: 492.1689,
        quantityUnit: "m²",
        weight: 6.147071
    },

    {
        activityId: "ARS-DIN-002",
        workPackage: "Pasangan",
        activity: "Plesteran",
        plannedQuantity: 984.3378,
        quantityUnit: "m²",
        weight: 4.085166
    },

    {
        activityId: "ARS-DIN-003",
        workPackage: "Pasangan",
        activity: "Acian",
        plannedQuantity: 984.3378,
        quantityUnit: "m²",
        weight: 3.414756
    },

    {
        activityId: "ARS-DIN-004",
        workPackage: "Pasangan",
        activity: "Balok Praktis",
        plannedQuantity: 26.91,
        quantityUnit: "m'",
        weight: 0.194524
    },

    {
        activityId: "ARS-DIN-005",
        workPackage: "Pasangan",
        activity: "Kolom Praktis",
        plannedQuantity: 99.22,
        quantityUnit: "m'",
        weight: 0.717231
    },


    /* =====================================================
       FINISHING LANTAI & KERAMIK DINDING
    ===================================================== */

    {
        activityId: "ARS-LAN-001",
        workPackage: "Finishing Lantai & Keramik Dinding",
        activity: "Urugan Pasir Bawah Keramik",
        plannedQuantity: 10,
        quantityUnit: "m³",
        weight: 0.252758
    },

    {
        activityId: "ARS-LAN-002",
        workPackage: "Finishing Lantai & Keramik Dinding",
        activity: "H.Tile 60x60 Polished",
        plannedQuantity: 176.84,
        quantityUnit: "m²",
        weight: 4.169659
    },

    {
        activityId: "ARS-LAN-003",
        workPackage: "Finishing Lantai & Keramik Dinding",
        activity: "H.Tile 60x60 Unpolished",
        plannedQuantity: 20.52,
        quantityUnit: "m²",
        weight: 0.483835
    },

    {
        activityId: "ARS-LAN-004",
        workPackage: "Finishing Lantai & Keramik Dinding",
        activity: "Keramik Kamar Mandi",
        plannedQuantity: 11.64,
        quantityUnit: "m²",
        weight: 0.274456
    },

    {
        activityId: "ARS-LAN-005",
        workPackage: "Finishing Lantai & Keramik Dinding",
        activity: "Dinding Keramik Kamar Mandi",
        plannedQuantity: 42.2,
        quantityUnit: "m²",
        weight: 0.995021
    },

    {
        activityId: "ARS-LAN-006",
        workPackage: "Finishing Lantai & Keramik Dinding",
        activity: "Plint",
        plannedQuantity: 167.85,
        quantityUnit: "m'",
        weight: 0.841124
    },

    {
        activityId: "ARS-LAN-007",
        workPackage: "Finishing Lantai & Keramik Dinding",
        activity: "Dinding Keramik Motif Batu Alam",
        plannedQuantity: 30.465,
        quantityUnit: "m²",
        weight: 0.768475
    },

    {
        activityId: "ARS-LAN-008",
        workPackage: "Finishing Lantai & Keramik Dinding",
        activity: "Ban-banan",
        plannedQuantity: 40.62,
        quantityUnit: "m'",
        weight: 0.164450
    },


    /* =====================================================
       PLAFOND
    ===================================================== */

    {
        activityId: "ARS-PLF-001",
        workPackage: "Plafond",
        activity: "Plafond PVC",
        plannedQuantity: 293.54,
        quantityUnit: "m²",
        weight: 7.349389
    },

    {
        activityId: "ARS-PLF-002",
        workPackage: "Plafond",
        activity: "Lis Plafon PVC",
        plannedQuantity: 250.2,
        quantityUnit: "m'",
        weight: 1.005828
    },


    /* =====================================================
       INTERIOR / FURNITURE
    ===================================================== */

    {
        activityId: "ARS-INT-001",
        workPackage: "Interior",
        activity: "Kitchen Set",
        plannedQuantity: 1,
        quantityUnit: "ls",
        weight: 2.610452
    },


    /* =====================================================
       KUSEN, PINTU & JENDELA
    ===================================================== */

    {
        activityId: "ARS-KPJ-001",
        workPackage: "Kusen, Pintu & Jendela",
        activity: "Pintu P1",
        plannedQuantity: 9,
        quantityUnit: "unit",
        weight: 3.637514
    },

    {
        activityId: "ARS-KPJ-002",
        workPackage: "Kusen, Pintu & Jendela",
        activity: "Pintu PD",
        plannedQuantity: 4,
        quantityUnit: "unit",
        weight: 2.486958
    },

    {
        activityId: "ARS-KPJ-003",
        workPackage: "Kusen, Pintu & Jendela",
        activity: "Pintu PJ3",
        plannedQuantity: 3,
        quantityUnit: "unit",
        weight: 1.218228
    },

    {
        activityId: "ARS-KPJ-004",
        workPackage: "Kusen, Pintu & Jendela",
        activity: "Jendela J1",
        plannedQuantity: 7,
        quantityUnit: "unit",
        weight: 0.676458
    },

    {
        activityId: "ARS-KPJ-005",
        workPackage: "Kusen, Pintu & Jendela",
        activity: "Jendela J2",
        plannedQuantity: 14,
        quantityUnit: "unit",
        weight: 1.668480
    },

    {
        activityId: "ARS-KPJ-006",
        workPackage: "Kusen, Pintu & Jendela",
        activity: "Bouvenligh BV1",
        plannedQuantity: 3,
        quantityUnit: "unit",
        weight: 0.246236
    },


    /* =====================================================
       PENGECATAN
    ===================================================== */

    {
        activityId: "ARS-CAT-001",
        workPackage: "Pengecatan",
        activity: "Cat Dinding Luar",
        plannedQuantity: 203.8849,
        quantityUnit: "m²",
        weight: 0.907117
    },

    {
        activityId: "ARS-CAT-002",
        workPackage: "Pengecatan",
        activity: "Cat Dinding Dalam",
        plannedQuantity: 288.284,
        quantityUnit: "m²",
        weight: 0.769614
    },


    /* =====================================================
       SANITAIR
    ===================================================== */

    {
        activityId: "PLB-SAN-001",
        workPackage: "Sanitair",
        activity: "Closet Duduk",
        plannedQuantity: 3,
        quantityUnit: "unit",
        weight: 0.710389
    },

    {
        activityId: "PLB-SAN-002",
        workPackage: "Sanitair",
        activity: "Kran Stainless",
        plannedQuantity: 6,
        quantityUnit: "bh",
        weight: 0.041475
    },

    {
        activityId: "PLB-SAN-003",
        workPackage: "Sanitair",
        activity: "Shower",
        plannedQuantity: 3,
        quantityUnit: "bh",
        weight: 0.375431
    },

    {
        activityId: "PLB-SAN-004",
        workPackage: "Sanitair",
        activity: "Jet Shower",
        plannedQuantity: 3,
        quantityUnit: "unit",
        weight: 0.084186
    },

    {
        activityId: "PLB-SAN-005",
        workPackage: "Sanitair",
        activity: "Floor Drain",
        plannedQuantity: 4,
        quantityUnit: "bh",
        weight: 0.045212
    },

    {
        activityId: "PLB-SAN-006",
        workPackage: "Sanitair",
        activity: "Wastafel Meja",
        plannedQuantity: 1,
        quantityUnit: "unit",
        weight: 0.048199
    },

    {
        activityId: "PLB-SAN-007",
        workPackage: "Sanitair",
        activity: "Bak Air",
        plannedQuantity: 0.31,
        quantityUnit: "m³",
        weight: 0.039761
    },

    {
        activityId: "PLB-SAN-008",
        workPackage: "Sanitair",
        activity: "Kitchen Sink",
        plannedQuantity: 1,
        quantityUnit: "bh",
        weight: 0.214573
    },


    /* =====================================================
       MEJA BETON WASTAFEL
    ===================================================== */

    {
        activityId: "PLB-WST-001",
        workPackage: "Sanitair",
        activity: "Bekisting Meja Beton Wastafel",
        plannedQuantity: 0.29,
        quantityUnit: "m²",
        weight: 0.004289
    },

    {
        activityId: "PLB-WST-002",
        workPackage: "Sanitair",
        activity: "Pembesian Meja Beton Wastafel",
        plannedQuantity: 33,
        quantityUnit: "kg",
        weight: 0.047093
    },

    {
        activityId: "PLB-WST-003",
        workPackage: "Sanitair",
        activity: "Cor Beton Meja Wastafel",
        plannedQuantity: 0.17,
        quantityUnit: "m³",
        weight: 0.023265
    },


    /* =====================================================
       SARPRAS
    ===================================================== */

    {
        activityId: "SAR-001",
        workPackage: "Sarpras",
        activity: "Rabat Beton Keliling",
        plannedQuantity: 6.13,
        quantityUnit: "m³",
        weight: 0.328489
    },

    {
        activityId: "SAR-002",
        workPackage: "Sarpras",
        activity: "Saluran Keliling Buis Beton",
        plannedQuantity: 35.5,
        quantityUnit: "m'",
        weight: 0.525124
    },


    /* =====================================================
       ELEKTRIKAL
    ===================================================== */

    {
        activityId: "ELC-001",
        workPackage: "Elektrikal",
        activity: "MCB Box 8 Group",
        plannedQuantity: 1,
        quantityUnit: "unit",
        weight: 0.057427
    },

    {
        activityId: "ELC-002",
        workPackage: "Elektrikal",
        activity: "Titik Lampu",
        plannedQuantity: 21,
        quantityUnit: "titik",
        weight: 0.422518
    },

    {
        activityId: "ELC-003",
        workPackage: "Elektrikal",
        activity: "Titik Stop Kontak",
        plannedQuantity: 16,
        quantityUnit: "titik",
        weight: 0.464287
    },

    {
        activityId: "ELC-004",
        workPackage: "Elektrikal",
        activity: "LED 14W",
        plannedQuantity: 7,
        quantityUnit: "bh",
        weight: 0.269433
    },

    {
        activityId: "ELC-005",
        workPackage: "Elektrikal",
        activity: "LED 9W Downlight",
        plannedQuantity: 4,
        quantityUnit: "bh",
        weight: 0.036355
    },

    {
        activityId: "ELC-006",
        workPackage: "Elektrikal",
        activity: "LED 9W Outbow",
        plannedQuantity: 5,
        quantityUnit: "bh",
        weight: 0.043179
    },

    {
        activityId: "ELC-007",
        workPackage: "Elektrikal",
        activity: "LED 6W Ceiling Holder",
        plannedQuantity: 3,
        quantityUnit: "bh",
        weight: 0.046031
    },

    {
        activityId: "ELC-008",
        workPackage: "Elektrikal",
        activity: "LED TL 1x16W",
        plannedQuantity: 2,
        quantityUnit: "bh",
        weight: 0.046188
    },

    {
        activityId: "ELC-009",
        workPackage: "Elektrikal",
        activity: "Saklar Tunggal",
        plannedQuantity: 12,
        quantityUnit: "bh",
        weight: 0.022055
    },

    {
        activityId: "ELC-010",
        workPackage: "Elektrikal",
        activity: "Saklar Ganda",
        plannedQuantity: 4,
        quantityUnit: "bh",
        weight: 0.011082
    },

    {
        activityId: "ELC-011",
        workPackage: "Elektrikal",
        activity: "Stop Kontak",
        plannedQuantity: 16,
        quantityUnit: "bh",
        weight: 0.026432
    },

    {
        activityId: "ELC-012",
        workPackage: "Elektrikal",
        activity: "Grounding",
        plannedQuantity: 1,
        quantityUnit: "titik",
        weight: 0.012462
    },


    /* =====================================================
       TATA UDARA
    ===================================================== */

    {
        activityId: "TUD-001",
        workPackage: "Tata Udara",
        activity: "Exhaust Fan Toilet",
        plannedQuantity: 3,
        quantityUnit: "buah",
        weight: 0.245681
    },

    {
        activityId: "TUD-002",
        workPackage: "Tata Udara",
        activity: "AC Split 1PK",
        plannedQuantity: 6,
        quantityUnit: "unit",
        weight: 2.251214
    },

    {
        activityId: "TUD-003",
        workPackage: "Tata Udara",
        activity: "Pipa Refrigerant",
        plannedQuantity: 30,
        quantityUnit: "m",
        weight: 0.180724
    },

    {
        activityId: "TUD-004",
        workPackage: "Tata Udara",
        activity: "Insulasi",
        plannedQuantity: 30,
        quantityUnit: "m",
        weight: 0.015060
    },

    {
        activityId: "TUD-005",
        workPackage: "Tata Udara",
        activity: "Drain PVC 3/4",
        plannedQuantity: 30,
        quantityUnit: "m",
        weight: 0.045307
    },

    {
        activityId: "TUD-006",
        workPackage: "Tata Udara",
        activity: "Power NYM 3x1.5",
        plannedQuantity: 60,
        quantityUnit: "m",
        weight: 1.045185
    },

    {
        activityId: "TUD-007",
        workPackage: "Tata Udara",
        activity: "Conduit",
        plannedQuantity: 60,
        quantityUnit: "m",
        weight: 0.060241
    },

    {
        activityId: "TUD-008",
        workPackage: "Tata Udara",
        activity: "Stop Kontak AC",
        plannedQuantity: 6,
        quantityUnit: "bh",
        weight: 0.008921
    }

];



/* =========================================================
   BASELINE SCHEDULE
   KALIMANTAN - TIPE 200 - DANREM
   ========================================================= */

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
    }

};



/* =========================================================
   APPLY BASELINE DATE TO EACH ACTIVITY
   ========================================================= */

masterSchedule.forEach(item => {

    const schedule =
        workPackageSchedule[item.workPackage];

    if (schedule) {

        item.plannedStart =
            schedule.plannedStart;

        item.plannedFinish =
            schedule.plannedFinish;

    }

});



/* =========================================================
   OPTIONAL DEBUG
   ========================================================= */

console.log(
    "Master Schedule loaded:",
    masterSchedule.length,
    "activities"
);
