import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search, Phone, Mail, MapPin, Menu, X, ChevronDown, ChevronRight,
  Award, Users, BookOpen, GraduationCap, Calendar, FileText, Image as ImageIcon,
  CheckCircle2, Clock, AlertCircle, Download, Share2, ExternalLink, ArrowUp,
  ShieldCheck, Lock, LogOut, Plus, Edit3, Trash2, Save, Eye, BarChart3,
  Heart, Sparkles, Compass, Star, Send, MessageCircle, Play, Layers,
  FolderOpen, Settings, Database, RefreshCw, Printer, Check, Info, Globe
} from 'lucide-react';

// ============================================================================
// 1. INJEKSI FONT & STYLING KUSTOM (POPPINS & INTER)
// ============================================================================
const FontAndStyleInjector = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    document.title = 'MI Mathaliul Falah 01 Tulakan - Yayasan Karsono Jepara';
  }, []);

  return (
    <style>{`
      body {
        font-family: 'Inter', sans-serif;
        scroll-behavior: smooth;
        background-color: #f8fafc;
        color: #1e293b;
      }
      h1, h2, h3, h4, h5, h6, .font-heading {
        font-family: 'Poppins', sans-serif;
      }
      .islamic-pattern {
        background-color: #064e3b;
        background-image: radial-gradient(rgba(217, 119, 6, 0.14) 1.5px, transparent 1.5px),
                          radial-gradient(rgba(16, 185, 129, 0.12) 1.5px, #064e3b 1.5px);
        background-size: 36px 36px;
        background-position: 0 0, 18px 18px;
      }
      .islamic-subtle {
        background-image: linear-gradient(135deg, rgba(6, 78, 59, 0.03) 25%, transparent 25%),
                          linear-gradient(225deg, rgba(6, 78, 59, 0.03) 25%, transparent 25%),
                          linear-gradient(45deg, rgba(6, 78, 59, 0.03) 25%, transparent 25%),
                          linear-gradient(315deg, rgba(6, 78, 59, 0.03) 25%, #ffffff 25%);
        background-position: 16px 0, 16px 0, 0 0, 0 0;
        background-size: 32px 32px;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fadeIn 0.35s ease-out forwards;
      }
    `}</style>
  );
};

// ============================================================================
// 2. LOGO SVG KUSTOM MI MATHALIUL FALAH 01 TULAKAN
// ============================================================================
const MadrasahLogo = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bintang Segi Delapan Islami (Rub el Hizb) */}
    <rect x="20" y="20" width="60" height="60" rx="6" fill="#064e3b" stroke="#d97706" strokeWidth="3" />
    <rect x="20" y="20" width="60" height="60" rx="6" transform="rotate(45 50 50)" fill="#047857" stroke="#f59e0b" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="28" fill="#064e3b" stroke="#fbbf24" strokeWidth="2" />
    {/* Kubah & Kitab Terbuka */}
    <path d="M34 56 C34 45, 50 48, 50 54 C50 48, 66 45, 66 56 L66 64 C66 58, 50 60, 50 65 C50 60, 34 58, 34 64 Z" fill="#ffffff" />
    <path d="M50 54 L50 65" stroke="#d97706" strokeWidth="2" />
    {/* Bintang & Bulan Sabit Emas di Atas */}
    <path d="M50 28 L52 33 L57 33 L53 36 L54.5 41 L50 38 L45.5 41 L47 36 L43 33 L48 33 Z" fill="#fbbf24" />
  </svg>
);

// Lencana Penanda Konten Demo agar jelas terpisah dari data resmi
const DemoBadge = ({ text = "DATA DEMO" }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-amber-100 text-amber-800 border border-amber-300">
    <Info className="w-3 h-3" /> {text}
  </span>
);

// ============================================================================
// 3. DATA AWAL (DATA RESMI + DATA DEMO YANG DITANDAI JELAS)
// ============================================================================
const INITIAL_DATA = {
  settings: {
    namaMadrasah: "MI Mathaliul Falah 01 Tulakan",
    yayasan: "Yayasan Karsono",
    alamat: "Desa Tulakan, Kecamatan Donorojo, Kabupaten Jepara, Jawa Tengah",
    kodePos: "59454",
    akreditasi: "A",
    kepalaMadrasah: "Rois Ibadurrohman, S.Pd.I.",
    status: "Madrasah Ibtidaiyah Swasta",
    nsm: "1112332000XX [DEMO]",
    npsn: "60712XXX [DEMO]",
    slogan: "Mewujudkan Generasi Islami, Berprestasi, Berakhlakul Karimah.",
    telepon: "+62 812-2800-0101 [DEMO]",
    whatsapp: "6281228000101",
    email: "info@mimathaliulfalah01tulakan.sch.id [DEMO]",
    jamOperasional: "Senin – Sabtu: 07.00 – 13.30 WIB",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    mapsEmbedUrl: "https://www.google.com/maps?q=Tulakan,+Donorojo,+Jepara,+Jawa+Tengah&output=embed",
    mapsDirectUrl: "https://maps.google.com/?q=Desa+Tulakan,+Kecamatan+Donorojo,+Kabupaten+Jepara,+Jawa+Tengah"
  },
  stats: {
    pesertaDidik: 119,
    tenagaPendidik: 13,
    rombonganBelajar: 6,
    akreditasi: "A",
    pengunjungHariIni: 148,
    totalPengunjung: 18492
  },
  profile: {
    sambutanJudul: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    sambutanIsi: `Puji syukur kehadirat Allah SWT atas limpahan rahmat, taufik, dan hidayah-Nya sehingga Website Resmi MI Mathaliul Falah 01 Tulakan di bawah naungan Yayasan Karsono dapat hadir sebagai jendela informasi dan komunikasi bagi seluruh civitas akademika, wali murid, dan masyarakat luas.\n\nSebagai lembaga pendidikan dasar berciri khas Islam di Desa Tulakan, Kecamatan Donorojo, Kabupaten Jepara yang telah terakreditasi A, kami berkomitmen menyelenggarakan pendidikan berkualitas yang memadukan keunggulan akademik, penguatan literasi-numerasi, Kurikulum Berbasis Cinta (KBC), serta pembiasaan akhlakul karimah dalam kehidupan sehari-hari.\n\nSemoga kehadiran portal digital ini semakin mempererat sinergi antara madrasah, orang tua, dan masyarakat dalam mengantarkan putra-putri kita menjadi generasi sholeh-sholehah yang cerdas, mandiri, dan berdaya saing.\n\nWassalamu'alaikum Warahmatullahi Wabarakatuh.`,
    sejarah: `[KONTEN DEMO] MI Mathaliul Falah 01 Tulakan didirikan atas prakarsa para tokoh agama, ulama, dan sesepuh masyarakat Desa Tulakan di bawah naungan Yayasan Karsono. Berawal dari kepedulian terhadap pentingnya pendidikan dasar yang menyeimbangkan ilmu pengetahuan umum dan pendalaman ajaran Islam Ahlussunnah wal Jama'ah, madrasah ini terus tumbuh dan mendapat kepercayaan tinggi dari masyarakat Kecamatan Donorojo dan sekitarnya hingga berhasil meraih predikat Akreditasi A.`,
    visi: "Terwujudnya generasi muslim yang beriman, bertakwa, berakhlakul karimah, unggul dalam prestasi akademik maupun non-akademik, serta peduli terhadap sesama dan lingkungan.",
    misi: [
      "Menanamkan nilai-nilai keimanan, ketakwaan, dan akhlakul karimah melalui pembiasaan ibadah harian.",
      "Menyelenggarakan pembelajaran aktif, kreatif, mendalam (Deep Learning), dan berbasis kasih sayang (Kurikulum Berbasis Cinta).",
      "Mengembangkan potensi literasi, numerasi, sains, serta keterampilan abad ke-21 bagi seluruh peserta didik.",
      "Membina bakat dan minat siswa melalui kegiatan ekstrakurikuler keagamaan, seni, olahraga, dan kepramukaan.",
      "Membangun tata kelola madrasah yang profesional, transparan, dan bersinergi dengan Yayasan Karsono, orang tua, dan masyarakat."
    ],
    tujuan: [
      "Menghasilkan lulusan yang fasih membaca Al-Qur'an, hafal juz 'amma, dan tertib melaksanakan ibadah wajib maupun sunnah.",
      "Mencapai ketuntasan belajar optimal dan berprestasi dalam ajang Kompetisi Sains Madrasah (KSM) serta PORSENI.",
      "Menciptakan lingkungan belajar yang aman, ramah anak, bersih, dan penuh kekeluargaan."
    ],
    sarpras: [
      { nama: "Ruang Kelas Nyaman & Terang", jumlah: "6 Ruang", kondisi: "Baik", demo: true },
      { nama: "Kantor Kepala Madrasah & Dewan Guru", jumlah: "1 Ruang", kondisi: "Baik", demo: true },
      { nama: "Musholla / Tempat Ibadah Praktik", jumlah: "1 Unit", kondisi: "Baik", demo: true },
      { nama: "Perpustakaan & Pojok Baca Literasi", jumlah: "1 Ruang", kondisi: "Baik", demo: true },
      { nama: "Ruang UKS & Layanan Kesehatan", jumlah: "1 Ruang", kondisi: "Baik", demo: true },
      { nama: "Halaman Upacara & Lapangan Olahraga", jumlah: "1 Area", kondisi: "Baik", demo: true }
    ]
  },
  // Distribusi 119 Siswa dalam 6 Rombongan Belajar
  rombel: [
    { id: 1, kelas: "Kelas 1", waliKelas: "Siti Aminah, S.Pd.I. [DEMO]", putra: 11, putri: 10, total: 21 },
    { id: 2, kelas: "Kelas 2", waliKelas: "Ahmad Fauzi, S.Pd. [DEMO]", putra: 10, putri: 10, total: 20 },
    { id: 3, kelas: "Kelas 3", waliKelas: "Nurul Hidayah, S.Pd.I. [DEMO]", putra: 9, putri: 11, total: 20 },
    { id: 4, kelas: "Kelas 4", waliKelas: "Muhammad Ridwan, S.Pd. [DEMO]", putra: 10, putri: 9, total: 19 },
    { id: 5, kelas: "Kelas 5", waliKelas: "Dewi Fatimah, S.Pd. [DEMO]", putra: 9, putri: 11, total: 20 },
    { id: 6, kelas: "Kelas 6", waliKelas: "Abdul Hakim, S.Pd.I. [DEMO]", putra: 10, putri: 9, total: 19 }
  ],
  // 13 Tenaga Pendidik (Kepala Madrasah Resmi + 12 Guru Contoh Demo)
  teachers: [
    { id: 1, nama: "Rois Ibadurrohman, S.Pd.I.", jabatan: "Kepala Madrasah", mapel: "Manajemen & Al-Qur'an Hadits", status: "Resmi", pendidikan: "S1 Pendidikan Agama Islam" },
    { id: 2, nama: "Siti Aminah, S.Pd.I.", jabatan: "Guru Kelas 1", mapel: "Tematik & Baca Tulis Qur'an", status: "Demo", pendidikan: "S1 PGMI" },
    { id: 3, nama: "Ahmad Fauzi, S.Pd.", jabatan: "Guru Kelas 2", mapel: "Tematik & Matematika", status: "Demo", pendidikan: "S1 PGSD" },
    { id: 4, nama: "Nurul Hidayah, S.Pd.I.", jabatan: "Guru Kelas 3", mapel: "Tematik & Akidah Akhlak", status: "Demo", pendidikan: "S1 PAI" },
    { id: 5, nama: "Muhammad Ridwan, S.Pd.", jabatan: "Guru Kelas 4", mapel: "IPAS & Literasi", status: "Demo", pendidikan: "S1 PGMI" },
    { id: 6, nama: "Dewi Fatimah, S.Pd.", jabatan: "Guru Kelas 5", mapel: "Bahasa Indonesia & Numerasi", status: "Demo", pendidikan: "S1 Pendidikan Bahasa" },
    { id: 7, nama: "Abdul Hakim, S.Pd.I.", jabatan: "Guru Kelas 6", mapel: "Fikih & SKI", status: "Demo", pendidikan: "S1 PAI" },
    { id: 8, nama: "Umi Kulsum, S.Pd.", jabatan: "Guru Mapel", mapel: "Bahasa Arab", status: "Demo", pendidikan: "S1 Pendidikan Bahasa Arab" },
    { id: 9, nama: "Zainal Abidin, S.Pd.", jabatan: "Guru Mapel", mapel: "PJOK & Pembina Pramuka", status: "Demo", pendidikan: "S1 Penjaskesrek" },
    { id: 10, nama: "Lailatul Qodriyah, S.Pd.", jabatan: "Guru Mapel", mapel: "Bahasa Inggris", status: "Demo", pendidikan: "S1 Pendidikan Bahasa Inggris" },
    { id: 11, nama: "Miftahul Huda, S.Pd.I.", jabatan: "Guru Tahfidz", mapel: "Tahfidz & Tilawah Al-Qur'an", status: "Demo", pendidikan: "S1 Ilmu Al-Qur'an" },
    { id: 12, nama: "Rina Marlina, S.Pd.", jabatan: "Guru Mapel", mapel: "Seni Budaya & Rebana", status: "Demo", pendidikan: "S1 PGMI" },
    { id: 13, nama: "Khoirul Anam, S.Kom.", jabatan: "Operator & Guru TIK", mapel: "Informatika & Tata Usaha", status: "Demo", pendidikan: "S1 Sistem Informasi" }
  ],
  news: [
    {
      id: 1,
      judul: "[DEMO] Pembukaan Penerimaan Peserta Didik Baru (PPDB) Tahun Pelajaran 2026/2027",
      kategori: "Pengumuman",
      tanggal: "2026-11-05",
      penulis: "Panitia PPDB",
      views: 342,
      gambar: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80",
      ringkasan: "MI Mathaliul Falah 01 Tulakan resmi membuka pendaftaran peserta didik baru tahun pelajaran 2026/2027 secara online maupun langsung di sekretariat madrasah.",
      isi: "MI Mathaliul Falah 01 Tulakan di bawah naungan Yayasan Karsono membuka kesempatan bagi putra-putri terbaik di Desa Tulakan, Kecamatan Donorojo, dan sekitarnya untuk bergabung menjadi bagian dari keluarga besar madrasah berakreditasi A.\n\nPendaftaran dapat dilakukan secara mudah melalui menu PPDB Online pada website resmi ini atau datang langsung ke kantor madrasah pada jam kerja. Tersedia program unggulan Tahfidz Juz 30, pembiasaan ibadah harian, serta Kurikulum Berbasis Cinta yang ramah anak."
    },
    {
      id: 2,
      judul: "[DEMO] Implementasi Kurikulum Berbasis Cinta (KBC) dan Deep Learning di Kelas",
      kategori: "Akademik",
      tanggal: "2026-10-28",
      penulis: "Tim Kurikulum",
      views: 219,
      gambar: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
      ringkasan: "Dewan guru MI Mathaliul Falah 01 Tulakan mengintegrasikan pendekatan Pembelajaran Mendalam (Deep Learning) dengan nilai kasih sayang.",
      isi: "Dalam upaya meningkatkan mutu pembelajaran, seluruh tenaga pendidik MI Mathaliul Falah 01 Tulakan menerapkan Kurikulum Berbasis Cinta (KBC) yang menekankan empati, penghormatan kepada sesama, cinta lingkungan, dan cinta ilmu pengetahuan.\n\nDipadukan dengan metode Pembelajaran Mendalam (Deep Learning), siswa diajak memahami konsep secara bermakna (meaningful), berkesadaran (mindful), dan menggembirakan (joyful)."
    },
    {
      id: 3,
      judul: "[DEMO] Peringatan Maulid Nabi Muhammad SAW & Pentas Seni Rebana Siswa",
      kategori: "Kegiatan",
      tanggal: "2026-10-15",
      penulis: "Kesiswaan",
      views: 287,
      gambar: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=80",
      ringkasan: "Suasana khidmat dan meriah menyelimuti halaman madrasah saat seluruh siswa melantunkan shalawat bersama grup rebana madrasah.",
      isi: "Keluarga besar MI Mathaliul Falah 01 Tulakan menyelenggarakan peringatan Maulid Nabi Muhammad SAW yang diikuti oleh seluruh 119 peserta didik, dewan guru, serta pengurus Yayasan Karsono.\n\nAcara diisi dengan pembacaan maulid, mauidhoh hasanah oleh Kepala Madrasah Bapak Rois Ibadurrohman, S.Pd.I., serta penampilan grup ekstrakurikuler Seni Rebana dan Tilawah Al-Qur'an."
    },
    {
      id: 4,
      judul: "[DEMO] Siswa MI Mathaliul Falah 01 Tulakan Raih Juara Tilawah Tingkat Kecamatan",
      kategori: "Prestasi",
      tanggal: "2026-09-22",
      penulis: "Admin Madrasah",
      views: 415,
      gambar: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
      ringkasan: "Membanggakan! Perwakilan siswa berhasil menyabet juara 1 cabang Tilawah Al-Qur'an pada ajang PORSENI MI Kecamatan Donorojo.",
      isi: "Prestasi membanggakan kembali ditorehkan oleh peserta didik MI Mathaliul Falah 01 Tulakan. Dalam ajang Pekan Olahraga dan Seni (PORSENI) Madrasah Ibtidaiyah tingkat Kecamatan Donorojo, delegasi madrasah meraih gelar juara pada cabang Tilawah Al-Qur'an dan Pidato Bahasa Arab."
    }
  ],
  gallery: [
    {
      id: 1,
      judul: "[DEMO] Pembelajaran Aktif & Literasi di Kelas",
      kategori: "Kegiatan Pembelajaran",
      tipe: "foto",
      tanggal: "2026-10-20",
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
      deskripsi: "Siswa-siswi antusias mengikuti kegiatan literasi membaca dan diskusi kelompok bersama wali kelas."
    },
    {
      id: 2,
      judul: "[DEMO] Pembiasaan Shalat Dhuha & Tadarus Pagi",
      kategori: "Kegiatan Keagamaan",
      tipe: "foto",
      tanggal: "2026-10-18",
      url: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=900&q=80",
      deskripsi: "Kegiatan rutin pagi hari sebelum pembelajaran dimulai untuk membentuk karakter religius peserta didik."
    },
    {
      id: 3,
      judul: "[DEMO] Latihan Rutin Pramuka Penggalang & Siaga",
      kategori: "Kegiatan Pramuka",
      tipe: "foto",
      tanggal: "2026-10-12",
      url: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=80",
      deskripsi: "Melatih kemandirian, kedisiplinan, dan kerja sama tim melalui kegiatan kepramukaan setiap hari Jumat."
    },
    {
      id: 4,
      judul: "[DEMO] Ekstrakurikuler Seni Rebana & Shalawat",
      kategori: "Kegiatan Ekstrakurikuler",
      tipe: "foto",
      tanggal: "2026-10-05",
      url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80",
      deskripsi: "Pelestarian seni budaya Islam melalui grup rebana kebanggaan MI Mathaliul Falah 01 Tulakan."
    },
    {
      id: 5,
      judul: "[DEMO] Peringatan Hari Santri & Hari Besar Islam",
      kategori: "Kegiatan Hari Besar Islam",
      tipe: "foto",
      tanggal: "2026-10-22",
      url: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=900&q=80",
      deskripsi: "Upacara dan kirab santri dalam rangka memperingati Hari Santri Nasional di Desa Tulakan."
    },
    {
      id: 6,
      judul: "[DEMO] Rapat Kerja & Workshop KBC Dewan Guru",
      kategori: "Kegiatan Guru",
      tipe: "foto",
      tanggal: "2026-09-30",
      url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80",
      deskripsi: "Peningkatan kompetensi 13 tenaga pendidik dalam menyusun perangkat pembelajaran mendalam."
    },
    {
      id: 7,
      judul: "[DEMO] Bakti Sosial & Berbagi Jumat Berkah",
      kategori: "Kegiatan Sosial",
      tipe: "foto",
      tanggal: "2026-09-18",
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
      deskripsi: "Menumbuhkan kepedulian sosial siswa terhadap warga sekitar Desa Tulakan."
    }
  ],
  achievements: [
    { id: 1, tahun: "2026", judul: "Juara 1 Tilawah Al-Qur'an Putra PORSENI Kec. Donorojo [DEMO]", tingkat: "Kecamatan", kategori: "Siswa" },
    { id: 2, tahun: "2025", judul: "Predikat Akreditasi A (Unggul) BAN-PDM", tingkat: "Nasional", kategori: "Madrasah" },
    { id: 3, tahun: "2025", judul: "Juara 2 Kompetisi Sains Madrasah (KSM) Matematika [DEMO]", tingkat: "Kabupaten", kategori: "Siswa" },
    { id: 4, tahun: "2025", judul: "Juara Harapan 1 Festival Rebana Pelajar Jepara [DEMO]", tingkat: "Kabupaten", kategori: "Siswa" }
  ],
  agendas: [
    { id: 1, tanggal: "2026-11-16", judul: "Upacara Bendera & Pembinaan Karakter", lokasi: "Halaman Madrasah", kategori: "Rutin" },
    { id: 2, tanggal: "2026-12-01", judul: "Asesmen Sumatif Akhir Semester (ASAS) Gasal [DEMO]", lokasi: "Ruang Kelas 1-6", kategori: "Akademik" },
    { id: 3, tanggal: "2026-12-19", judul: "Penerimaan Rapor Semester Gasal & Pertemuan Wali Murid [DEMO]", lokasi: "Aula Madrasah", kategori: "Akademik" },
    { id: 4, tanggal: "2027-01-10", judul: "Seleksi Gelombang 1 PPDB Tahun Pelajaran 2026/2027 [DEMO]", lokasi: "Sekretariat PPDB", kategori: "PPDB" }
  ],
  documents: [
    { id: 1, nama: "Kurikulum Operasional Madrasah (KOM) 2026/2027 [DEMO]", kategori: "Dokumen Kurikulum", tanggal: "2026-07-15", ukuran: "2.4 MB", deskripsi: "Dokumen acuan penyelenggaraan kurikulum merdeka berbasis cinta di MI Mathaliul Falah 01 Tulakan." },
    { id: 2, nama: "Kalender Pendidikan Madrasah TP 2026/2027 [DEMO]", kategori: "Kalender Pendidikan", tanggal: "2026-07-10", ukuran: "850 KB", deskripsi: "Jadwal hari efektif belajar, libur semester, dan agenda hari besar Islam." },
    { id: 3, nama: "Jadwal Pelajaran Kelas 1 s.d. Kelas 6 [DEMO]", kategori: "Jadwal Pelajaran", tanggal: "2026-07-18", ukuran: "640 KB", deskripsi: "Distribusi jam pelajaran seluruh rombongan belajar semester gasal." },
    { id: 4, nama: "Tata Tertib Peserta Didik & Peraturan Akademik [DEMO]", kategori: "Peraturan Akademik", tanggal: "2026-07-12", ukuran: "510 KB", deskripsi: "Pedoman kedisiplinan, seragam, dan etika pergaulan siswa di lingkungan madrasah." },
    { id: 5, nama: "Brosur & Formulir Pendaftaran PPDB 2026/2027 [DEMO]", kategori: "Formulir", tanggal: "2026-11-01", ukuran: "1.8 MB", deskripsi: "Informasi lengkap persyaratan, alur pendaftaran, dan formulir cetak PPDB." },
    { id: 6, nama: "Program Kerja Ekstrakurikuler & Kesiswaan [DEMO]", kategori: "Dokumen Kesiswaan", tanggal: "2026-08-02", ukuran: "1.1 MB", deskripsi: "Rencana kegiatan Pramuka, Seni Rebana, dan Tilawah Al-Qur'an." }
  ],
  ppdbList: [
    {
      noPendaftaran: "PPDB-2026-0001",
      namaLengkap: "Muhammad Al-Fatih [DEMO]",
      nik: "3320120101190001",
      tempatLahir: "Jepara",
      tanggalLahir: "2019-05-14",
      jenisKelamin: "Laki-laki",
      asalTk: "RA Mathaliul Falah Tulakan",
      namaAyah: "H. Sulaiman",
      namaIbu: "Siti Khodijah",
      noHp: "081234567890",
      alamat: "RT 02 RW 01 Desa Tulakan, Kec. Donorojo, Jepara",
      berkasKk: "KK_AlFatih.pdf",
      berkasAkta: "Akta_AlFatih.pdf",
      status: "Diterima",
      tanggalDaftar: "2026-11-06"
    },
    {
      noPendaftaran: "PPDB-2026-0002",
      namaLengkap: "Aisyah Azzahra [DEMO]",
      nik: "3320124508190002",
      tempatLahir: "Jepara",
      tanggalLahir: "2019-08-17",
      jenisKelamin: "Perempuan",
      asalTk: "TK Pertiwi Tulakan",
      namaAyah: "Ahmad Zaeni",
      namaIbu: "Nur Aini",
      noHp: "085712345678",
      alamat: "RT 04 RW 02 Desa Tulakan, Kec. Donorojo, Jepara",
      berkasKk: "KK_Aisyah.pdf",
      berkasAkta: "Akta_Aisyah.pdf",
      status: "Terverifikasi",
      tanggalDaftar: "2026-11-09"
    }
  ],
  testimonials: [
    { id: 1, nama: "Bapak H. Ahmad Muzakki [DEMO]", peran: "Wali Murid Kelas 4", teks: "Alhamdulillah, sejak sekolah di MI Mathaliul Falah 01 Tulakan, anak saya semakin rajin shalat berjamaah dan hafalan juz ammanya bertambah pesat." },
    { id: 2, nama: "Ibu Siti Rohmah [DEMO]", peran: "Wali Murid Kelas 2", teks: "Guru-gurunya sangat sabar dan penuh kasih sayang dalam membimbing anak. Lingkungan madrasah di bawah Yayasan Karsono juga sangat nyaman dan aman." },
    { id: 3, nama: "Bapak Eko Prasetyo [DEMO]", peran: "Alumni & Wali Murid", teks: "Meskipun berada di desa, kualitas pendidikannya unggul dan sudah terakreditasi A. Anak-anak tidak hanya pintar pelajaran umum tapi juga berakhlak baik." }
  ],
  academicInfo: {
    kom: "Kurikulum Operasional Madrasah (KOM) MI Mathaliul Falah 01 Tulakan disusun berdasarkan regulasi Kementerian Agama RI yang mengintegrasikan Kurikulum Merdeka dengan kekhasan nilai-nilai keislaman Ahlussunnah wal Jama'ah dan kearifan lokal Jepara.",
    kbc: "Kurikulum Berbasis Cinta (KBC) adalah pendekatan pendidikan humanis-religius yang menumbuhkan lima pilar cinta: Cinta kepada Allah & Rasul-Nya, Cinta kepada Diri Sendiri, Cinta kepada Sesama Manusia, Cinta kepada Ilmu Pengetahuan, serta Cinta kepada Alam Lingkungan.",
    deepLearning: "Pembelajaran Mendalam (Deep Learning) diterapkan melalui tiga prinsip utama: Mindful Learning (belajar dengan kesadaran penuh), Meaningful Learning (pembelajaran bermakna yang kontekstual dengan kehidupan sehari-hari siswa), dan Joyful Learning (suasana kelas yang menyenangkan tanpa tekanan).",
    literasiNumerasi: "Program pembiasaan 15 menit membaca sebelum pelajaran, pojok baca kelas, klinik numerasi ceria, serta asesmen diagnostik berkala untuk memastikan setiap siswa menguasai kompetensi dasar membaca, menulis, berhitung, dan bernalar kritis."
  }
};

// ============================================================================
// 4. KOMPONEN UTAMA APLIKASI
// ============================================================================
export default function App() {
  // State Utama dengan Persistensi LocalStorage
  const [siteData, setSiteData] = useState(() => {
    try {
      const saved = localStorage.getItem('mi_mf01_tulakan_db_v1');
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch {
      return INITIAL_DATA;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mi_mf01_tulakan_db_v1', JSON.stringify(siteData));
    } catch (e) {
      console.error("Gagal menyimpan ke localStorage:", e);
    }
  }, [siteData]);

  // Navigasi Halaman & Sub-halaman
  const [activePage, setActivePage] = useState('beranda');
  const [subTab, setSubTab] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Pencarian Global, Modal Berita, Lightbox Galeri, Sitemap, Toast & Cookie
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [sitemapOpen, setSitemapOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(() => localStorage.getItem('mi_mf01_cookie') === 'true');
  const [toast, setToast] = useState(null);

  // Autentikasi Admin
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [adminTab, setAdminTab] = useState('dashboard');

  const notify = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 350);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigateTo = (page, tab = '') => {
    setActivePage(page);
    setSubTab(tab);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hitung Total Siswa otomatis dari Rombel (default 119)
  const totalSiswaAktual = useMemo(() => {
    return siteData.rombel.reduce((acc, r) => acc + Number(r.total || 0), 0);
  }, [siteData.rombel]);

  // Buka Detail Berita sekaligus menambah jumlah pembaca
  const handleOpenNews = (newsItem) => {
    setSiteData(prev => ({
      ...prev,
      news: prev.news.map(n => n.id === newsItem.id ? { ...n, views: (n.views || 0) + 1 } : n)
    }));
    setSelectedNews({ ...newsItem, views: (newsItem.views || 0) + 1 });
  };

  // Unduh Dokumen Simulasi Nyata (membuat file teks/ringkasan resmi yang dapat diunduh langsung)
  const handleDownloadDoc = (doc) => {
    const content = `====================================================================
DOKUMEN RESMI ${siteData.settings.namaMadrasah.toUpperCase()}
Naungan: ${siteData.settings.yayasan}
Alamat: ${siteData.settings.alamat}
Status: ${siteData.settings.status} | Akreditasi: ${siteData.settings.akreditasi}
Kepala Madrasah: ${siteData.settings.kepalaMadrasah}
====================================================================

Judul Dokumen : ${doc.nama}
Kategori      : ${doc.kategori}
Tanggal Unggah: ${doc.tanggal}
Deskripsi     : ${doc.deskripsi}

Catatan: Dokumen ini diunduh melalui Portal Resmi ${siteData.settings.namaMadrasah}.
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.nama.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    notify(`Mengunduh "${doc.nama}"...`);
  };

  // Hasil Pencarian Global
  const globalSearchResults = useMemo(() => {
    const q = globalSearchQuery.trim().toLowerCase();
    if (!q) return { news: [], teachers: [], docs: [] };
    return {
      news: siteData.news.filter(n => n.judul.toLowerCase().includes(q) || n.isi.toLowerCase().includes(q)),
      teachers: siteData.teachers.filter(t => t.nama.toLowerCase().includes(q) || t.mapel.toLowerCase().includes(q)),
      docs: siteData.documents.filter(d => d.nama.toLowerCase().includes(q) || d.kategori.toLowerCase().includes(q))
    };
  }, [globalSearchQuery, siteData]);

  // Struktur Menu Navigasi
  const navMenus = [
    { id: 'beranda', label: 'Beranda' },
    {
      id: 'profil',
      label: 'Profil',
      children: [
        { tab: 'sejarah', label: 'Sejarah Madrasah' },
        { tab: 'visimisi', label: 'Visi, Misi & Tujuan' },
        { tab: 'identitas', label: 'Identitas Madrasah' },
        { tab: 'struktur', label: 'Struktur Organisasi' },
        { tab: 'kepala', label: 'Profil Kepala Madrasah' },
        { tab: 'guru', label: 'Data Guru & Tendik' },
        { tab: 'siswa', label: 'Data Peserta Didik' },
        { tab: 'sarpras', label: 'Sarana & Prasarana' },
        { tab: 'prestasi', label: 'Prestasi Madrasah' }
      ]
    },
    {
      id: 'akademik',
      label: 'Akademik',
      children: [
        { tab: 'kom', label: 'Kurikulum Operasional (KOM)' },
        { tab: 'kbc', label: 'Kurikulum Berbasis Cinta (KBC)' },
        { tab: 'deeplearning', label: 'Pembelajaran Mendalam' },
        { tab: 'literasi', label: 'Literasi & Numerasi' },
        { tab: 'kalender', label: 'Kalender & Agenda Madrasah' },
        { tab: 'jadwal', label: 'Jadwal Pelajaran & Prota/Promes' },
        { tab: 'asesmen', label: 'Perangkat & Asesmen' }
      ]
    },
    {
      id: 'kesiswaan',
      label: 'Kesiswaan',
      children: [
        { tab: 'pesertadidik', label: 'Data Peserta Didik' },
        { tab: 'ekskul', label: 'Ekstrakurikuler (Pramuka, Rebana, Tilawah)' },
        { tab: 'keagamaan', label: 'Kegiatan Keagamaan' },
        { tab: 'prestasisiswa', label: 'Prestasi Siswa' },
        { tab: 'tatatertib', label: 'Tata Tertib Siswa' }
      ]
    },
    { id: 'berita', label: 'Berita' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'ppdb', label: 'PPDB', highlight: true },
    { id: 'dokumen', label: 'Dokumen' },
    { id: 'kontak', label: 'Kontak' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <FontAndStyleInjector />

      {/* NOTIFIKASI TOAST */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl bg-emerald-950 text-white border border-amber-500/40 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-sm font-medium">{toast.msg}</span>
        </div>
      )}

      {/* ====================================================================
          TOP BAR & HEADER UTAMA
         ==================================================================== */}
      <div className="bg-emerald-950 text-emerald-100 text-xs border-b border-emerald-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Desa Tulakan, Kec. Donorojo, Kab. Jepara, Jawa Tengah</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-emerald-300">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Terakreditasi {siteData.settings.akreditasi} • {siteData.settings.yayasan}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${siteData.settings.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-amber-300 hover:text-amber-200 font-medium transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp Madrasah</span>
            </a>
            <span className="text-emerald-700">|</span>
            <div className="flex items-center gap-2.5">
              <a href={siteData.settings.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-amber-400 transition">FB</a>
              <a href={siteData.settings.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-amber-400 transition">IG</a>
              <a href={siteData.settings.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-amber-400 transition">YT</a>
            </div>
            <span className="text-emerald-700">|</span>
            <button
              onClick={() => navigateTo('admin')}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-emerald-950 font-semibold transition"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdminAuth ? 'Dashboard Admin' : 'Login Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* NAVBAR UTAMA */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Identitas */}
            <button
              onClick={() => navigateTo('beranda')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <MadrasahLogo className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 transition-transform duration-300 group-hover:scale-105" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                    {siteData.settings.yayasan}
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                    AKREDITASI {siteData.settings.akreditasi}
                  </span>
                </div>
                <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-emerald-950 leading-tight">
                  {siteData.settings.namaMadrasah}
                </h1>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Donorojo • Jepara • Jawa Tengah
                </p>
              </div>
            </button>

            {/* Menu Desktop */}
            <nav className="hidden xl:flex items-center gap-1">
              {navMenus.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.id)}
                  onMouseLeave={() => item.children && setOpenDropdown(null)}
                >
                  <button
                    onClick={() => navigateTo(item.id, item.children ? item.children[0].tab : '')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-all ${
                      item.highlight
                        ? 'bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm ml-1'
                        : activePage === item.id
                        ? 'bg-emerald-50 text-emerald-800 font-semibold'
                        : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.children && <ChevronDown className="w-3.5 h-3.5 opacity-70" />}
                  </button>

                  {item.children && openDropdown === item.id && (
                    <div className="absolute left-0 top-full pt-1 w-64 z-50 animate-fade-in">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden">
                        {item.children.map((sub) => (
                          <button
                            key={sub.tab}
                            onClick={() => navigateTo(item.id, sub.tab)}
                            className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center justify-between transition"
                          >
                            <span>{sub.label}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-emerald-600 opacity-60" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Tombol Pencarian Global */}
              <button
                onClick={() => setGlobalSearchOpen(true)}
                aria-label="Cari di Website"
                className="ml-2 p-2.5 rounded-lg text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 transition"
              >
                <Search className="w-5 h-5" />
              </button>
            </nav>

            {/* Tombol Mobile */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                onClick={() => setGlobalSearchOpen(true)}
                className="p-2.5 rounded-lg text-slate-600 hover:bg-slate-100"
                aria-label="Cari"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg text-emerald-950 hover:bg-emerald-50"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Menu Mobile */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-200 max-h-[80vh] overflow-y-auto px-4 py-4 space-y-2 shadow-xl">
            {navMenus.map((item) => (
              <div key={item.id} className="border-b border-slate-100 pb-2">
                <button
                  onClick={() => navigateTo(item.id, item.children ? item.children[0].tab : '')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-semibold flex items-center justify-between ${
                    item.highlight
                      ? 'bg-amber-500 text-white'
                      : activePage === item.id
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'text-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.children && <ChevronRight className="w-4 h-4" />}
                </button>
                {item.children && (
                  <div className="pl-4 mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {item.children.map((sub) => (
                      <button
                        key={sub.tab}
                        onClick={() => navigateTo(item.id, sub.tab)}
                        className="text-left text-xs text-slate-600 hover:text-emerald-700 py-1.5 px-2 rounded hover:bg-slate-50"
                      >
                        • {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </header>

      {/* ====================================================================
          KONTEN UTAMA BERDASARKAN HALAMAN AKTIF
         ==================================================================== */}
      <main className="flex-grow">
        {activePage === 'beranda' && (
          <HomePage
            siteData={siteData}
            totalSiswa={totalSiswaAktual}
            navigateTo={navigateTo}
            onOpenNews={handleOpenNews}
            onOpenLightbox={setLightboxItem}
          />
        )}

        {activePage === 'profil' && (
          <ProfilPage
            siteData={siteData}
            subTab={subTab || 'sejarah'}
            setSubTab={setSubTab}
            totalSiswa={totalSiswaAktual}
          />
        )}

        {activePage === 'akademik' && (
          <AkademikPage
            siteData={siteData}
            subTab={subTab || 'kom'}
            setSubTab={setSubTab}
            onDownload={handleDownloadDoc}
          />
        )}

        {activePage === 'kesiswaan' && (
          <KesiswaanPage
            siteData={siteData}
            subTab={subTab || 'pesertadidik'}
            setSubTab={setSubTab}
            totalSiswa={totalSiswaAktual}
          />
        )}

        {activePage === 'berita' && (
          <BeritaPage
            siteData={siteData}
            onOpenNews={handleOpenNews}
          />
        )}

        {activePage === 'galeri' && (
          <GaleriPage
            siteData={siteData}
            onOpenLightbox={setLightboxItem}
          />
        )}

        {activePage === 'ppdb' && (
          <PpdbPage
            siteData={siteData}
            setSiteData={setSiteData}
            notify={notify}
          />
        )}

        {activePage === 'dokumen' && (
          <DokumenPage
            siteData={siteData}
            onDownload={handleDownloadDoc}
          />
        )}

        {activePage === 'kontak' && (
          <KontakPage
            siteData={siteData}
            notify={notify}
          />
        )}

        {activePage === 'admin' && (
          <AdminPortal
            isAdminAuth={isAdminAuth}
            setIsAdminAuth={setIsAdminAuth}
            adminTab={adminTab}
            setAdminTab={setAdminTab}
            siteData={siteData}
            setSiteData={setSiteData}
            notify={notify}
            navigateTo={navigateTo}
          />
        )}
      </main>

      {/* ====================================================================
          FOOTER LENGKAP
         ==================================================================== */}
      <footer className="bg-emerald-950 text-emerald-100 border-t-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Kolom 1: Identitas */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MadrasahLogo className="w-12 h-12 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    {siteData.settings.yayasan}
                  </span>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {siteData.settings.namaMadrasah}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-emerald-200/90 leading-relaxed">
                {siteData.settings.status} Terakreditasi <strong>{siteData.settings.akreditasi}</strong>. {siteData.settings.slogan}
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a href={siteData.settings.facebook} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-emerald-900 hover:bg-amber-500 hover:text-emerald-950 text-xs font-semibold transition">Facebook</a>
                <a href={siteData.settings.instagram} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-emerald-900 hover:bg-amber-500 hover:text-emerald-950 text-xs font-semibold transition">Instagram</a>
                <a href={siteData.settings.youtube} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-emerald-900 hover:bg-amber-500 hover:text-emerald-950 text-xs font-semibold transition">YouTube</a>
              </div>
            </div>

            {/* Kolom 2: Tautan Cepat */}
            <div>
              <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Navigasi Utama
              </h4>
              <ul className="space-y-2.5 text-sm text-emerald-200">
                <li><button onClick={() => navigateTo('profil', 'sejarah')} className="hover:text-amber-400 transition">Profil & Sejarah Madrasah</button></li>
                <li><button onClick={() => navigateTo('profil', 'visimisi')} className="hover:text-amber-400 transition">Visi, Misi & Tujuan</button></li>
                <li><button onClick={() => navigateTo('akademik', 'kbc')} className="hover:text-amber-400 transition">Kurikulum Berbasis Cinta (KBC)</button></li>
                <li><button onClick={() => navigateTo('akademik', 'deeplearning')} className="hover:text-amber-400 transition">Pembelajaran Mendalam</button></li>
                <li><button onClick={() => navigateTo('ppdb')} className="hover:text-amber-400 transition font-semibold text-amber-300">PPDB Online 2026/2027</button></li>
                <li><button onClick={() => navigateTo('dokumen')} className="hover:text-amber-400 transition">Pusat Unduhan Dokumen</button></li>
              </ul>
            </div>

            {/* Kolom 3: Kontak & Alamat */}
            <div>
              <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Kontak & Alamat
              </h4>
              <ul className="space-y-3 text-sm text-emerald-200">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <span>{siteData.settings.alamat}, Kode Pos {siteData.settings.kodePos}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{siteData.settings.telepon}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="break-all">{siteData.settings.email}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{siteData.settings.jamOperasional}</span>
                </li>
              </ul>
            </div>

            {/* Kolom 4: Lokasi Google Maps */}
            <div>
              <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Lokasi Madrasah
              </h4>
              <div className="rounded-xl overflow-hidden border border-emerald-800 h-36 bg-emerald-900">
                <iframe
                  title="Peta Lokasi MI Mathaliul Falah 01 Tulakan"
                  src={siteData.settings.mapsEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                ></iframe>
              </div>
              <a
                href={siteData.settings.mapsDirectUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Buka di Google Maps
              </a>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300">
            <p>© {new Date().getFullYear()} {siteData.settings.namaMadrasah} ({siteData.settings.yayasan}). Hak Cipta Dilindungi.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => setSitemapOpen(true)} className="hover:text-amber-400 transition">Sitemap Website</button>
              <span>•</span>
              <button onClick={() => navigateTo('admin')} className="hover:text-amber-400 transition">Portal Operator</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          FLOATING WHATSAPP, BACK TO TOP & COOKIE BANNER
         ==================================================================== */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Kembali ke atas"
            className="p-3 rounded-full bg-emerald-900 hover:bg-emerald-800 text-white shadow-lg border border-emerald-700 transition transform hover:-translate-y-0.5"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
        <a
          href={`https://wa.me/${siteData.settings.whatsapp}?text=${encodeURIComponent('Assalamualaikum, saya ingin bertanya informasi mengenai MI Mathaliul Falah 01 Tulakan.')}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-xl transition transform hover:scale-105"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm hidden sm:inline">Tanya Madrasah</span>
        </a>
      </div>

      {!cookieAccepted && (
        <div className="fixed bottom-4 left-4 right-4 md:right-auto md:max-w-md z-40 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <p className="text-xs text-slate-600 leading-relaxed">
            Website resmi ini menggunakan penyimpanan lokal browser untuk menjaga kenyamanan navigasi dan layanan PPDB Anda.
          </p>
          <button
            onClick={() => {
              localStorage.setItem('mi_mf01_cookie', 'true');
              setCookieAccepted(true);
            }}
            className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold shrink-0"
          >
            Mengerti
          </button>
        </div>
      )}

      {/* ====================================================================
          MODAL PENCARIAN GLOBAL
         ==================================================================== */}
      {globalSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
            <div className="p-4 border-b border-slate-200 flex items-center gap-3">
              <Search className="w-5 h-5 text-emerald-700" />
              <input
                type="text"
                autoFocus
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                placeholder="Cari berita, nama guru, kurikulum, atau dokumen madrasah..."
                className="w-full text-sm focus:outline-none"
              />
              <button onClick={() => setGlobalSearchOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-5 max-h-96 overflow-y-auto space-y-4">
              {!globalSearchQuery.trim() ? (
                <p className="text-xs text-slate-500 text-center py-6">
                  Ketik kata kunci seperti <strong>"PPDB"</strong>, <strong>"Kurikulum"</strong>, <strong>"Rois"</strong>, atau <strong>"Jadwal"</strong>.
                </p>
              ) : (
                <>
                  {globalSearchResults.news.length > 0 && (
                    <div>
                      <h5 className="text-xs font-bold uppercase text-emerald-800 mb-2">Berita ({globalSearchResults.news.length})</h5>
                      <div className="space-y-1.5">
                        {globalSearchResults.news.map(n => (
                          <button
                            key={n.id}
                            onClick={() => { setGlobalSearchOpen(false); handleOpenNews(n); }}
                            className="w-full text-left p-2.5 rounded-lg hover:bg-emerald-50 text-sm font-medium text-slate-800 block"
                          >
                            {n.judul}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {globalSearchResults.teachers.length > 0 && (
                    <div>
                      <h5 className="text-xs font-bold uppercase text-emerald-800 mb-2">Tenaga Pendidik ({globalSearchResults.teachers.length})</h5>
                      <div className="space-y-1.5">
                        {globalSearchResults.teachers.map(t => (
                          <button
                            key={t.id}
                            onClick={() => { setGlobalSearchOpen(false); navigateTo('profil', 'guru'); }}
                            className="w-full text-left p-2.5 rounded-lg hover:bg-emerald-50 text-sm text-slate-700 block"
                          >
                            <strong>{t.nama}</strong> — {t.jabatan} ({t.mapel})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {globalSearchResults.docs.length > 0 && (
                    <div>
                      <h5 className="text-xs font-bold uppercase text-emerald-800 mb-2">Dokumen ({globalSearchResults.docs.length})</h5>
                      <div className="space-y-1.5">
                        {globalSearchResults.docs.map(d => (
                          <button
                            key={d.id}
                            onClick={() => { setGlobalSearchOpen(false); handleDownloadDoc(d); }}
                            className="w-full text-left p-2.5 rounded-lg hover:bg-emerald-50 text-sm text-slate-700 flex items-center justify-between"
                          >
                            <span>{d.nama}</span>
                            <Download className="w-4 h-4 text-emerald-700" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {globalSearchResults.news.length === 0 && globalSearchResults.teachers.length === 0 && globalSearchResults.docs.length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-6">Tidak ditemukan hasil untuk "{globalSearchQuery}".</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL BACA BERITA LENGKAP
         ==================================================================== */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-in">
            <div className="relative h-56 sm:h-72 bg-emerald-950 shrink-0">
              <img src={selectedNews.gambar} alt={selectedNews.judul} className="w-full h-full object-cover opacity-90" />
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold">
                {selectedNews.kategori}
              </span>
            </div>
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedNews.tanggal}</span>
                <span>• Oleh: {selectedNews.penulis}</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {selectedNews.views} kali dibaca</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-emerald-950 leading-snug">{selectedNews.judul}</h2>
              <div className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                {selectedNews.isi}
              </div>
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold text-slate-500">Bagikan informasi ini:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(selectedNews.judul + ' - MI Mathaliul Falah 01 Tulakan')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      notify('Tautan berita berhasil disalin!');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    Salin Tautan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          LIGHTBOX GALERI FOTO
         ==================================================================== */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightboxItem(null)}>
          <div className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={lightboxItem.url} alt={lightboxItem.judul} className="w-full max-h-[70vh] object-contain bg-black" />
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:bg-amber-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-amber-400">{lightboxItem.kategori} • {lightboxItem.tanggal}</span>
                <h3 className="text-lg font-bold mt-0.5">{lightboxItem.judul}</h3>
                <p className="text-xs text-slate-300 mt-1">{lightboxItem.deskripsi}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL SITEMAP WEBSITE
         ==================================================================== */}
      {sitemapOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-2xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-emerald-950">Peta Situs (Sitemap) {siteData.settings.namaMadrasah}</h3>
              <button onClick={() => setSitemapOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
              {navMenus.map(m => (
                <div key={m.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <button
                    onClick={() => { setSitemapOpen(false); navigateTo(m.id, m.children ? m.children[0].tab : ''); }}
                    className="font-bold text-emerald-800 hover:underline"
                  >
                    {m.label}
                  </button>
                  {m.children && (
                    <ul className="mt-1.5 space-y-1 text-xs text-slate-600 pl-3 border-l-2 border-amber-400">
                      {m.children.map(c => (
                        <li key={c.tab}>
                          <button onClick={() => { setSitemapOpen(false); navigateTo(m.id, c.tab); }} className="hover:text-emerald-700">
                            {c.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 5. KOMPONEN HALAMAN BERANDA (HOME)
// ============================================================================
function HomePage({ siteData, totalSiswa, navigateTo, onOpenNews, onOpenLightbox }) {
  const unggulan = [
    {
      icon: BookOpen,
      title: "Tahfidz & Tilawah Al-Qur'an",
      desc: "Program pembiasaan membaca Al-Qur'an tartil dan hafalan Juz 30 terstruktur setiap pagi."
    },
    {
      icon: Heart,
      title: "Kurikulum Berbasis Cinta (KBC)",
      desc: "Pendidikan ramah anak yang menumbuhkan cinta kepada Allah, sesama, ilmu, dan lingkungan."
    },
    {
      icon: Sparkles,
      title: "Pembelajaran Mendalam (Deep Learning)",
      desc: "Proses belajar bermakna, berkesadaran, dan menggembirakan untuk mengasah nalar kritis siswa."
    },
    {
      icon: GraduationCap,
      title: "Penguatan Literasi & Numerasi",
      desc: "Klinik numerasi ceria, pojok baca kelas, dan pembinaan olimpiade sains madrasah (KSM)."
    }
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <section className="islamic-pattern text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/90 border border-amber-400/50 text-amber-300 text-xs font-semibold">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{siteData.settings.yayasan} • Terakreditasi {siteData.settings.akreditasi}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                {siteData.settings.namaMadrasah}
              </h1>

              <p className="text-lg sm:text-xl font-medium text-amber-300 leading-relaxed">
                "{siteData.settings.slogan}"
              </p>

              <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
                Lembaga pendidikan dasar berciri khas Islam di Desa Tulakan, Kecamatan Donorojo, Kabupaten Jepara yang memadukan keunggulan akademik, karakter Qur'ani, dan Kurikulum Berbasis Cinta.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo('ppdb')}
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Pendaftaran Peserta Didik Baru</span>
                </button>
                <button
                  onClick={() => navigateTo('profil', 'identitas')}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm sm:text-base transition flex items-center gap-2"
                >
                  <span>Profil Madrasah</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Kartu Visual Madrasah */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-4 border-amber-500/40 shadow-2xl bg-emerald-900">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80"
                  alt="Kegiatan Belajar MI Mathaliul Falah 01 Tulakan"
                  className="w-full h-72 sm:h-80 object-cover"
                />
                <div className="p-5 bg-gradient-to-t from-emerald-950 via-emerald-950/95 to-emerald-900/90">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">Kepala Madrasah</span>
                      <p className="text-base font-bold text-white">{siteData.settings.kepalaMadrasah}</p>
                    </div>
                    <DemoBadge text="FOTO ILUSTRASI" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KARTU STATISTIK MADRASAH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: "Peserta Didik", value: totalSiswa, suffix: "Siswa", icon: Users, color: "text-emerald-700 bg-emerald-50" },
            { label: "Tenaga Pendidik", value: siteData.teachers.length, suffix: "Guru", icon: GraduationCap, color: "text-amber-700 bg-amber-50" },
            { label: "Rombongan Belajar", value: siteData.rombel.length, suffix: "Rombel", icon: Layers, color: "text-emerald-700 bg-emerald-50" },
            { label: "Status Akreditasi", value: siteData.settings.akreditasi, suffix: "Unggul", icon: Award, color: "text-amber-700 bg-amber-50" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-100 flex items-center gap-4">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 ${stat.color}`}>
                <stat.icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-950">{stat.value}</span>
                  <span className="text-xs font-semibold text-amber-600">{stat.suffix}</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SAMBUTAN KEPALA MADRASAH & PROFIL SINGKAT */}
      <section className="py-16 lg:py-20 islamic-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="w-60 h-72 rounded-3xl overflow-hidden border-4 border-emerald-800 shadow-xl bg-emerald-900 relative">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
                  alt={siteData.settings.kepalaMadrasah}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <DemoBadge text="FOTO DEMO" />
                </div>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-lg font-bold text-emerald-950">{siteData.settings.kepalaMadrasah}</h3>
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Kepala {siteData.settings.namaMadrasah}</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <span>SAMBUTAN KEPALA MADRASAH</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950">
                {siteData.profile.sambutanJudul}
              </h2>
              <div className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                {siteData.profile.sambutanIsi}
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  onClick={() => navigateTo('profil', 'visimisi')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-sm font-semibold transition"
                >
                  Visi & Misi Madrasah
                </button>
                <button
                  onClick={() => navigateTo('profil', 'guru')}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-sm font-semibold transition"
                >
                  Lihat 13 Tenaga Pendidik
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM UNGGULAN MADRASAH */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Keunggulan Pendidikan</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 mt-1">Program Unggulan Madrasah</h2>
            <p className="text-sm text-slate-600 mt-2">
              Memadukan kurikulum nasional Kementerian Agama dengan pembinaan karakter Islami dan inovasi pembelajaran modern.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {unggulan.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 hover:bg-emerald-950 hover:text-white border border-slate-200/80 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 group-hover:bg-amber-500 text-emerald-800 group-hover:text-emerald-950 flex items-center justify-center mb-4 transition">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-emerald-950 group-hover:text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 group-hover:text-emerald-100 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BERITA & INFORMASI TERBARU */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Kabar Madrasah</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 mt-1">Berita & Informasi Terbaru</h2>
            </div>
            <button
              onClick={() => navigateTo('berita')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-amber-600 transition"
            >
              <span>Lihat Semua Berita</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteData.news.slice(0, 3).map((item) => (
              <article key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition flex flex-col">
                <div className="relative h-48 overflow-hidden bg-emerald-900">
                  <img src={item.gambar} alt={item.judul} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-950/90 text-amber-300 text-[11px] font-semibold">
                    {item.kategori}
                  </span>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                      <span>{item.tanggal}</span>
                      <span>•</span>
                      <span>{item.views} dibaca</span>
                    </div>
                    <h3 className="text-base font-bold text-emerald-950 line-clamp-2 hover:text-emerald-700 cursor-pointer" onClick={() => onOpenNews(item)}>
                      {item.judul}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3">{item.ringkasan}</p>
                  </div>
                  <button
                    onClick={() => onOpenNews(item)}
                    className="text-xs font-bold text-emerald-800 hover:text-amber-600 inline-flex items-center gap-1 pt-2 border-t border-slate-100"
                  >
                    <span>Baca Selengkapnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALERI KEGIATAN PILIHAN */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Dokumentasi Visual</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 mt-1">Galeri Kegiatan Madrasah</h2>
            </div>
            <button
              onClick={() => navigateTo('galeri')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-amber-600 transition"
            >
              <span>Jelajahi Galeri Lengkap</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {siteData.gallery.slice(0, 4).map((g) => (
              <div
                key={g.id}
                onClick={() => onOpenLightbox(g)}
                className="group relative rounded-2xl overflow-hidden h-52 sm:h-60 cursor-pointer bg-slate-900 shadow-sm"
              >
                <img src={g.url} alt={g.judul} className="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] font-semibold text-amber-300 uppercase">{g.kategori}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 mt-0.5">{g.judul}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONI ORANG TUA / WALI MURID */}
      <section className="py-16 bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <DemoBadge text="TESTIMONI DEMO" />
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">Suara Orang Tua & Wali Murid</h2>
            <p className="text-sm text-emerald-200 mt-2">
              Kepercayaan masyarakat Desa Tulakan dan Kecamatan Donorojo adalah amanah terbesar kami.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteData.testimonials.map((t) => (
              <div key={t.id} className="p-6 rounded-2xl bg-emerald-900/70 border border-emerald-800 space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-sm text-emerald-100 italic leading-relaxed">"{t.teks}"</p>
                <div className="pt-2 border-t border-emerald-800">
                  <p className="text-sm font-bold text-white">{t.nama}</p>
                  <p className="text-xs text-amber-300">{t.peran}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// 6. KOMPONEN HALAMAN PROFIL MADRASAH
// ============================================================================
function ProfilPage({ siteData, subTab, setSubTab, totalSiswa }) {
  const [searchTeacher, setSearchTeacher] = useState('');

  const tabs = [
    { id: 'sejarah', label: 'Sejarah Madrasah' },
    { id: 'visimisi', label: 'Visi, Misi & Tujuan' },
    { id: 'identitas', label: 'Identitas Madrasah' },
    { id: 'struktur', label: 'Struktur Organisasi' },
    { id: 'kepala', label: 'Profil Kepala Madrasah' },
    { id: 'guru', label: 'Data Guru & Tendik (13)' },
    { id: 'siswa', label: `Data Peserta Didik (${totalSiswa})` },
    { id: 'sarpras', label: 'Sarana & Prasarana' },
    { id: 'prestasi', label: 'Prestasi Madrasah' }
  ];

  const filteredTeachers = siteData.teachers.filter(t =>
    t.nama.toLowerCase().includes(searchTeacher.toLowerCase()) ||
    t.jabatan.toLowerCase().includes(searchTeacher.toLowerCase()) ||
    t.mapel.toLowerCase().includes(searchTeacher.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 mb-8 islamic-pattern">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Profil Lembaga</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold mt-1">{siteData.settings.namaMadrasah}</h1>
        <p className="text-sm text-emerald-200 mt-2">{siteData.settings.yayasan} • {siteData.settings.alamat}</p>
      </div>

      {/* Submenu Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              subTab === t.id
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-fade-in">
        {subTab === 'sejarah' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-emerald-950">Sejarah Berdirinya Madrasah</h2>
              <DemoBadge text="NARASI DEMO DAPAT DIEDIT ADMIN" />
            </div>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{siteData.profile.sejarah}</p>
          </div>
        )}

        {subTab === 'visimisi' && (
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs font-bold uppercase text-amber-700">Visi Madrasah</span>
              <p className="text-lg sm:text-xl font-bold text-emerald-950 mt-2 leading-relaxed">"{siteData.profile.visi}"</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-emerald-950 mb-3">Misi Madrasah</h3>
                <ul className="space-y-2.5">
                  {siteData.profile.misi.map((m, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-950 mb-3">Tujuan Madrasah</h3>
                <ul className="space-y-2.5">
                  {siteData.profile.tujuan.map((tj, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Star className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                      <span>{tj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {subTab === 'identitas' && (
          <div>
            <h2 className="text-xl font-bold text-emerald-950 mb-5">Identitas Resmi Madrasah</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <tbody className="divide-y divide-slate-200">
                  {[
                    ["Nama Madrasah", siteData.settings.namaMadrasah],
                    ["Yayasan Penyelenggara", siteData.settings.yayasan],
                    ["Status Madrasah", siteData.settings.status],
                    ["Akreditasi", `Peringkat ${siteData.settings.akreditasi}`],
                    ["Kepala Madrasah", siteData.settings.kepalaMadrasah],
                    ["NSM / NPSN", `${siteData.settings.nsm} / ${siteData.settings.npsn}`],
                    ["Alamat Lengkap", `${siteData.settings.alamat} (${siteData.settings.kodePos})`],
                    ["Jumlah Peserta Didik", `${totalSiswa} Siswa (${siteData.rombel.length} Rombongan Belajar)`],
                    ["Jumlah Tenaga Pendidik", `${siteData.teachers.length} Orang`],
                    ["Kontak & Email", `${siteData.settings.telepon} | ${siteData.settings.email}`]
                  ].map(([k, v], i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <th className="py-3.5 px-4 font-semibold text-slate-600 w-1/3 bg-slate-50/60">{k}</th>
                      <td className="py-3.5 px-4 font-medium text-emerald-950">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {subTab === 'struktur' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-emerald-950">Struktur Organisasi Madrasah</h2>
              <DemoBadge text="BAGAN STRUKTUR" />
            </div>
            <div className="flex flex-col items-center space-y-4 py-4">
              <div className="px-6 py-3 rounded-xl bg-amber-500 text-emerald-950 font-bold text-center shadow">
                Ketua {siteData.settings.yayasan} & Komite Madrasah
              </div>
              <div className="w-0.5 h-6 bg-slate-300"></div>
              <div className="px-6 py-4 rounded-xl bg-emerald-900 text-white font-bold text-center shadow-lg">
                <span className="text-xs text-amber-300 block">Kepala Madrasah</span>
                {siteData.settings.kepalaMadrasah}
              </div>
              <div className="w-0.5 h-6 bg-slate-300"></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <span className="text-xs font-bold text-emerald-800 block">Koordinator Kurikulum</span>
                  <p className="text-sm font-semibold mt-1">Abdul Hakim, S.Pd.I. [DEMO]</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <span className="text-xs font-bold text-emerald-800 block">Tata Usaha & Operator</span>
                  <p className="text-sm font-semibold mt-1">Khoirul Anam, S.Kom. [DEMO]</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <span className="text-xs font-bold text-emerald-800 block">Koordinator Kesiswaan</span>
                  <p className="text-sm font-semibold mt-1">Zainal Abidin, S.Pd. [DEMO]</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-center w-full max-w-3xl">
                <span className="text-xs font-bold text-slate-600 block">Wali Kelas 1 s.d. Kelas 6 & Guru Mata Pelajaran</span>
                <p className="text-sm font-semibold text-emerald-950 mt-1">Dewan Guru ({siteData.teachers.length} Tenaga Pendidik)</p>
              </div>
            </div>
          </div>
        )}

        {subTab === 'kepala' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="rounded-2xl overflow-hidden border-2 border-emerald-800">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" alt={siteData.settings.kepalaMadrasah} className="w-full h-72 object-cover" />
            </div>
            <div className="md:col-span-2 space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Pimpinan Madrasah</span>
              <h2 className="text-2xl font-bold text-emerald-950">{siteData.settings.kepalaMadrasah}</h2>
              <p className="text-sm text-slate-600">Kepala {siteData.settings.namaMadrasah} ({siteData.settings.yayasan})</p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm space-y-2">
                <p><strong>Jabatan:</strong> Kepala Madrasah Ibtidaiyah</p>
                <p><strong>Unit Kerja:</strong> {siteData.settings.namaMadrasah}, Desa Tulakan, Kec. Donorojo, Kab. Jepara</p>
                <p><strong>Fokus Pengembangan:</strong> Penguatan mutu akademik Terakreditasi A, budaya religius Islami, Kurikulum Berbasis Cinta (KBC), serta digitalisasi layanan madrasah.</p>
              </div>
            </div>
          </div>
        )}

        {subTab === 'guru' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-emerald-950">Data Guru & Tenaga Kependidikan ({siteData.teachers.length} Orang)</h2>
                <p className="text-xs text-slate-500 mt-0.5">Kepala Madrasah tercantum resmi; daftar guru lainnya adalah data contoh [DEMO] yang dapat diperbarui melalui Dashboard Admin.</p>
              </div>
              <input
                type="text"
                value={searchTeacher}
                onChange={(e) => setSearchTeacher(e.target.value)}
                placeholder="Cari nama atau mapel..."
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-sm w-full sm:w-64 focus:outline-none focus:border-emerald-700"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTeachers.map((t) => (
                <div key={t.id} className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 transition bg-slate-50/50">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-emerald-950 text-sm">{t.nama}</h3>
                    {t.status === 'Resmi' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">RESMI</span>
                    ) : (
                      <DemoBadge text="DEMO" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-amber-700 mt-1">{t.jabatan}</p>
                  <p className="text-xs text-slate-600 mt-1">Pengampu: {t.mapel}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{t.pendidikan}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {subTab === 'siswa' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-emerald-950">Rekapitulasi Data Peserta Didik</h2>
                <p className="text-xs text-slate-500">Total Resmi: <strong>{totalSiswa} Peserta Didik</strong> dalam <strong>{siteData.rombel.length} Rombongan Belajar</strong> (Rincian per kelas bertanda DEMO).</p>
              </div>
              <DemoBadge text="RINCIAN ROMBEL DEMO" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-emerald-900 text-white">
                  <tr>
                    <th className="py-3 px-4">Rombel / Kelas</th>
                    <th className="py-3 px-4">Wali Kelas</th>
                    <th className="py-3 px-4 text-center">Putra</th>
                    <th className="py-3 px-4 text-center">Putri</th>
                    <th className="py-3 px-4 text-center">Jumlah Siswa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {siteData.rombel.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-emerald-950">{r.kelas}</td>
                      <td className="py-3 px-4 text-slate-700">{r.waliKelas}</td>
                      <td className="py-3 px-4 text-center">{r.putra}</td>
                      <td className="py-3 px-4 text-center">{r.putri}</td>
                      <td className="py-3 px-4 text-center font-bold text-emerald-800">{r.total}</td>
                    </tr>
                  ))}
                  <tr className="bg-amber-50 font-bold text-emerald-950">
                    <td colSpan={2} className="py-3 px-4">TOTAL KESELURUHAN PESERTA DIDIK</td>
                    <td className="py-3 px-4 text-center">{siteData.rombel.reduce((a, b) => a + Number(b.putra), 0)}</td>
                    <td className="py-3 px-4 text-center">{siteData.rombel.reduce((a, b) => a + Number(b.putri), 0)}</td>
                    <td className="py-3 px-4 text-center text-base text-emerald-900">{totalSiswa} Siswa</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {subTab === 'sarpras' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-emerald-950">Sarana & Prasarana Madrasah</h2>
              <DemoBadge text="DATA DEMO" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siteData.profile.sarpras.map((s, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-emerald-950">{s.nama}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Kondisi: {s.kondisi}</p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">{s.jumlah}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {subTab === 'prestasi' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-emerald-950">Prestasi Madrasah & Peserta Didik</h2>
            <div className="space-y-3">
              {siteData.achievements.map((a) => (
                <div key={a.id} className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-emerald-50/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
                      {a.tahun}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-emerald-950">{a.judul}</h4>
                      <span className="text-xs text-slate-500">Kategori: {a.kategori} • Tingkat {a.tingkat}</span>
                    </div>
                  </div>
                  <Award className="w-5 h-5 text-amber-500 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 7. KOMPONEN HALAMAN AKADEMIK
// ============================================================================
function AkademikPage({ siteData, subTab, setSubTab, onDownload }) {
  const [selectedClass, setSelectedClass] = useState('Kelas 1');

  const tabs = [
    { id: 'kom', label: 'Kurikulum Operasional (KOM)' },
    { id: 'kbc', label: 'Kurikulum Berbasis Cinta (KBC)' },
    { id: 'deeplearning', label: 'Pembelajaran Mendalam' },
    { id: 'literasi', label: 'Literasi & Numerasi' },
    { id: 'kalender', label: 'Kalender & Agenda' },
    { id: 'jadwal', label: 'Jadwal & Prota/Promes' },
    { id: 'asesmen', label: 'Perangkat & Asesmen' }
  ];

  const jadwalDemo = {
    "Kelas 1": ["07.00: Shalat Dhuha & Tahfidz", "07.30: Bahasa Indonesia / Literasi", "09.00: Istirahat", "09.30: Matematika Ceria", "11.00: Akidah Akhlak"],
    "Kelas 2": ["07.00: Shalat Dhuha & Tahfidz", "07.30: Matematika", "09.00: Istirahat", "09.30: Bahasa Arab", "11.00: Seni Budaya"],
    "Kelas 3": ["07.00: Shalat Dhuha & Tadarus", "07.30: IPAS", "09.00: Istirahat", "09.30: Fikih", "11.00: Bahasa Jawa"],
    "Kelas 4": ["07.00: Shalat Dhuha & Tadarus", "07.30: Al-Qur'an Hadits", "09.00: Istirahat", "09.30: Matematika", "11.00: PJOK"],
    "Kelas 5": ["07.00: Shalat Dhuha & Tadarus", "07.30: IPAS & Deep Learning", "09.00: Istirahat", "09.30: Bahasa Inggris", "11.00: SKI"],
    "Kelas 6": ["07.00: Shalat Dhuha & Tadarus", "07.30: Numerasi & Literasi", "09.00: Istirahat", "09.30: Akidah Akhlak", "11.00: Bimbingan KSM"]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 mb-8 islamic-pattern">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Standar Pendidikan Unggul</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold mt-1">Akademik & Kurikulum Madrasah</h1>
        <p className="text-sm text-emerald-200 mt-2">Integrasi Kurikulum Merdeka Kemenag, Kurikulum Berbasis Cinta (KBC), dan Deep Learning.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              subTab === t.id ? 'bg-emerald-800 text-white' : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-fade-in">
        {subTab === 'kom' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-emerald-950">Kurikulum Operasional Madrasah (KOM)</h2>
            <p className="text-slate-700 leading-relaxed">{siteData.academicInfo.kom}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <h4 className="font-bold text-emerald-950 text-sm">Intrakurikuler</h4>
                <p className="text-xs text-slate-600 mt-1">Mata pelajaran PAI (Al-Qur'an Hadits, Akidah Akhlak, Fikih, SKI, Bahasa Arab) dan Mapel Umum.</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <h4 className="font-bold text-emerald-950 text-sm">Kokurikuler (P5RA)</h4>
                <p className="text-xs text-slate-600 mt-1">Projek Penguatan Profil Pelajar Pancasila dan Rahmatan lil 'Alamin.</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <h4 className="font-bold text-emerald-950 text-sm">Muatan Lokal Khas</h4>
                <p className="text-xs text-slate-600 mt-1">Tahfidz Juz 30, Baca Tulis Al-Qur'an (BTQ), Bahasa Jawa, dan Ke-NU-an / Aswaja.</p>
              </div>
            </div>
          </div>
        )}

        {subTab === 'kbc' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl font-bold text-emerald-950">Kurikulum Berbasis Cinta (KBC)</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">{siteData.academicInfo.kbc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              {["Cinta Allah & Rasul", "Cinta Diri Sendiri", "Cinta Sesama Manusia", "Cinta Ilmu Pengetahuan", "Cinta Alam Semesta"].map((pilar, i) => (
                <div key={i} className="p-4 rounded-xl bg-emerald-950 text-white text-center">
                  <span className="text-xs font-bold text-amber-400">Pilar {i + 1}</span>
                  <p className="text-sm font-bold mt-1">{pilar}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {subTab === 'deeplearning' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl font-bold text-emerald-950">Pembelajaran Mendalam (Deep Learning)</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">{siteData.academicInfo.deepLearning}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/60">
                <h4 className="font-bold text-emerald-900">1. Mindful Learning</h4>
                <p className="text-xs text-slate-600 mt-1">Menghadirkan kesadaran penuh dan fokus siswa terhadap tujuan dan manfaat setiap materi yang dipelajari.</p>
              </div>
              <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/60">
                <h4 className="font-bold text-amber-900">2. Meaningful Learning</h4>
                <p className="text-xs text-slate-600 mt-1">Menghubungkan konsep pelajaran dengan pengalaman nyata dan nilai-nilai kehidupan Islami sehari-hari.</p>
              </div>
              <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/60">
                <h4 className="font-bold text-emerald-900">3. Joyful Learning</h4>
                <p className="text-xs text-slate-600 mt-1">Menciptakan ruang kelas yang ceria, interaktif, kolaboratif, dan bebas dari rasa takut.</p>
              </div>
            </div>
          </div>
        )}

        {subTab === 'literasi' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-emerald-950">Program Literasi & Numerasi Madrasah</h2>
            <p className="text-slate-700 leading-relaxed">{siteData.academicInfo.literasiNumerasi}</p>
          </div>
        )}

        {subTab === 'kalender' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-emerald-950">Kalender Pendidikan & Agenda Kegiatan</h2>
            <div className="space-y-3">
              {siteData.agendas.map(ag => (
                <div key={ag.id} className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-amber-600">{ag.tanggal} • {ag.kategori}</span>
                    <h4 className="font-bold text-emerald-950 text-sm mt-0.5">{ag.judul}</h4>
                    <p className="text-xs text-slate-500">Lokasi: {ag.lokasi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {subTab === 'jadwal' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-emerald-950">Jadwal Pelajaran, Prota & Promes</h2>
                <DemoBadge text="CONTOH JADWAL" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(jadwalDemo).map(kls => (
                  <button
                    key={kls}
                    onClick={() => setSelectedClass(kls)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${selectedClass === kls ? 'bg-amber-500 text-emerald-950' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {kls}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-emerald-900 mb-3">Jadwal Harian {selectedClass}</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {jadwalDemo[selectedClass].map((item, idx) => (
                  <li key={idx} className="p-2.5 bg-white rounded-lg border border-slate-100 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              {siteData.documents.slice(0, 3).map(doc => (
                <button
                  key={doc.id}
                  onClick={() => onDownload(doc)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Unduh {doc.nama}
                </button>
              ))}
            </div>
          </div>
        )}

        {subTab === 'asesmen' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-emerald-950">Perangkat Pembelajaran, Asesmen & Evaluasi</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Evaluasi belajar dilaksanakan secara komprehensif meliputi Asesmen Diagnostik (awal pembelajaran), Asesmen Formatif (proses harian), Asesmen Sumatif Lingkup Materi, Asesmen Sumatif Akhir Semester (ASAS), serta Asesmen Madrasah (AM) bagi kelas 6.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 8. KOMPONEN HALAMAN KESISWAAN
// ============================================================================
function KesiswaanPage({ siteData, subTab, setSubTab, totalSiswa }) {
  const tabs = [
    { id: 'pesertadidik', label: `Data Peserta Didik (${totalSiswa})` },
    { id: 'ekskul', label: 'Ekstrakurikuler' },
    { id: 'keagamaan', label: 'Kegiatan Keagamaan' },
    { id: 'prestasisiswa', label: 'Prestasi Siswa' },
    { id: 'tatatertib', label: 'Tata Tertib Siswa' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 mb-8 islamic-pattern">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Pembinaan Karakter & Bakat</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold mt-1">Kesiswaan & Ekstrakurikuler</h1>
        <p className="text-sm text-emerald-200 mt-2">Mengembangkan potensi spiritual, intelektual, seni, dan kepemimpinan {totalSiswa} peserta didik.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              subTab === t.id ? 'bg-emerald-800 text-white' : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-fade-in">
        {subTab === 'pesertadidik' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-emerald-950">Sebaran {totalSiswa} Peserta Didik dalam {siteData.rombel.length} Rombel</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {siteData.rombel.map(r => (
                <div key={r.id} className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <span className="text-xs font-bold text-amber-700">{r.kelas}</span>
                  <p className="text-2xl font-extrabold text-emerald-950 my-1">{r.total}</p>
                  <span className="text-[11px] text-slate-600">L: {r.putra} | P: {r.putri}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {subTab === 'ekskul' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-emerald-950">Kegiatan Ekstrakurikuler Unggulan</h2>
              <DemoBadge text="JADWAL DEMO" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { nama: "Pramuka (Siaga & Penggalang)", jadwal: "Setiap Jumat, 14.00 WIB", pembina: "Zainal Abidin, S.Pd. [DEMO]", desc: "Membentuk kemandirian, disiplin, tali-temali, baris-berbaris, dan cinta tanah air." },
                { nama: "Seni Rebana & Shalawat", jadwal: "Setiap Sabtu, 13.00 WIB", pembina: "Rina Marlina, S.Pd. [DEMO]", desc: "Melestarikan kesenian tradisional Islami khas Jepara dan syiar shalawat Nabi." },
                { nama: "Tilawah & Tahfidz Al-Qur'an", jadwal: "Setiap Rabu, 13.30 WIB", pembina: "Miftahul Huda, S.Pd.I. [DEMO]", desc: "Pembinaan seni baca Al-Qur'an (qira'ah mujawwadah) dan persiapan lomba PORSENI." }
              ].map((ek, i) => (
                <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">{ek.jadwal}</span>
                  <h3 className="text-base font-bold text-emerald-950 pt-1">{ek.nama}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{ek.desc}</p>
                  <p className="text-xs font-semibold text-emerald-800 pt-2 border-t border-slate-200">Pembina: {ek.pembina}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {subTab === 'keagamaan' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-emerald-950">Pembiasaan Kegiatan Keagamaan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { judul: "Shalat Dhuha & Shalat Zhuhur Berjamaah", ket: "Dilaksanakan rutin setiap hari efektif belajar untuk melatih kedisiplinan ibadah." },
                { judul: "Tadarus Al-Qur'an & Hafalan Juz 'Amma", ket: "Membaca surat-surat pendek dan doa harian bersama sebelum jam pertama dimulai." },
                { judul: "Istighotsah & Pembacaan Manaqib / Maulid", ket: "Dilaksanakan pada hari Jumat tertentu untuk menanamkan tradisi amaliyah Ahlussunnah wal Jama'ah." },
                { judul: "Peringatan Hari Besar Islam (PHBI)", ket: "Peringatan Maulid Nabi, Isra' Mi'raj, Muharram, Pesantren Kilat Ramadhan, dan Idul Adha." }
              ].map((k, i) => (
                <div key={i} className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <h4 className="font-bold text-emerald-950 text-sm">{k.judul}</h4>
                  <p className="text-xs text-slate-600 mt-1">{k.ket}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {subTab === 'prestasisiswa' && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-emerald-950">Prestasi Membanggakan Siswa</h2>
            {siteData.achievements.filter(a => a.kategori === 'Siswa').map(a => (
              <div key={a.id} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-600">Tahun {a.tahun} • Tingkat {a.tingkat}</span>
                  <h4 className="font-bold text-emerald-950 text-sm">{a.judul}</h4>
                </div>
                <Award className="w-5 h-5 text-amber-500" />
              </div>
            ))}
          </div>
        )}

        {subTab === 'tatatertib' && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-emerald-950">Tata Tertib Peserta Didik</h2>
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>Hadir di madrasah paling lambat pukul 06.55 WIB sebelum kegiatan pembiasaan pagi dimulai.</li>
              <li>Berpakaian seragam madrasah rapi, bersih, sopan, dan menutup aurat sesuai ketentuan hari.</li>
              <li>Membiasakan budaya 5S (Senyum, Salam, Sapa, Sopan, Santun) kepada guru, orang tua, dan teman.</li>
              <li>Menjaga kebersihan ruang kelas, musholla, dan lingkungan madrasah.</li>
              <li>Mengikuti seluruh kegiatan intrakurikuler dan ekstrakurikuler dengan tertib dan penuh tanggung jawab.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 9. KOMPONEN HALAMAN BERITA & INFORMASI
// ============================================================================
function BeritaPage({ siteData, onOpenNews }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');

  const categories = ['Semua', 'Pengumuman', 'Akademik', 'Kegiatan', 'Prestasi'];

  const filteredNews = siteData.news.filter(n => {
    const matchCat = category === 'Semua' || n.kategori === category;
    const matchQ = n.judul.toLowerCase().includes(search.toLowerCase()) || n.ringkasan.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  const popularNews = [...siteData.news].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 mb-8 islamic-pattern">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Publikasi Resmi</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold mt-1">Berita & Informasi Madrasah</h1>
        <p className="text-sm text-emerald-200 mt-2">Ikuti perkembangan kegiatan, pengumuman akademik, dan prestasi terbaru {siteData.settings.namaMadrasah}.</p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                category === c ? 'bg-emerald-800 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul berita..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-emerald-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Daftar Berita Utama */}
        <div className="lg:col-span-8 space-y-6">
          {filteredNews.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
              <p className="text-slate-500 text-sm">Tidak ada berita yang sesuai dengan filter pencarian.</p>
            </div>
          ) : (
            filteredNews.map(n => (
              <article key={n.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition grid grid-cols-1 sm:grid-cols-12">
                <div className="sm:col-span-5 h-48 sm:h-auto bg-emerald-900">
                  <img src={n.gambar} alt={n.judul} className="w-full h-full object-cover" />
                </div>
                <div className="sm:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">{n.kategori}</span>
                      <span>• {n.tanggal}</span>
                      <span>• {n.views} dibaca</span>
                    </div>
                    <h2
                      onClick={() => onOpenNews(n)}
                      className="text-lg font-bold text-emerald-950 hover:text-emerald-700 cursor-pointer leading-snug"
                    >
                      {n.judul}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2">{n.ringkasan}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <button
                      onClick={() => onOpenNews(n)}
                      className="text-xs font-bold text-emerald-800 hover:text-amber-600 inline-flex items-center gap-1"
                    >
                      <span>Baca Selengkapnya</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(n.judul)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Share WA
                    </a>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Sidebar Berita Populer */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-emerald-950 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" /> Berita Terpopuler
            </h3>
            <div className="divide-y divide-slate-100 mt-2">
              {popularNews.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => onOpenNews(p)}
                  className="w-full text-left py-3 flex items-start gap-3 group"
                >
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-emerald-700 line-clamp-2">
                      {p.judul}
                    </h4>
                    <span className="text-[11px] text-slate-400">{p.views} kali dibaca</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ============================================================================
// 10. KOMPONEN HALAMAN GALERI FOTO & VIDEO
// ============================================================================
function GaleriPage({ siteData, onOpenLightbox }) {
  const [activeCat, setActiveCat] = useState('Semua');

  const categories = [
    'Semua',
    'Kegiatan Pembelajaran',
    'Kegiatan Keagamaan',
    'Kegiatan Ekstrakurikuler',
    'Kegiatan Pramuka',
    'Kegiatan Hari Besar Islam',
    'Kegiatan Guru',
    'Kegiatan Sosial'
  ];

  const filtered = activeCat === 'Semua'
    ? siteData.gallery
    : siteData.gallery.filter(g => g.kategori === activeCat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 mb-8 islamic-pattern">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Dokumentasi Kegiatan</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold mt-1">Galeri Foto & Video Madrasah</h1>
        <p className="text-sm text-emerald-200 mt-2">Klik pada foto untuk memperbesar tampilan (Lightbox).</p>
      </div>

      {/* Filter Kategori */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setActiveCat(c)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeCat === c ? 'bg-emerald-800 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div
            key={item.id}
            onClick={() => onOpenLightbox(item)}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition cursor-pointer group"
          >
            <div className="relative h-56 bg-slate-900 overflow-hidden">
              <img src={item.url} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-950/85 text-amber-300 text-[10px] font-bold">
                {item.kategori}
              </span>
            </div>
            <div className="p-4">
              <span className="text-[11px] text-slate-400">{item.tanggal}</span>
              <h3 className="text-sm font-bold text-emerald-950 mt-0.5">{item.judul}</h3>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">{item.deskripsi}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 11. KOMPONEN HALAMAN PPDB ONLINE INTERAKTIF
// ============================================================================
function PpdbPage({ siteData, setSiteData, notify }) {
  const [tab, setTab] = useState('formulir');
  const [submittedReg, setSubmittedReg] = useState(null);
  const [cekQuery, setCekQuery] = useState('');

  // Form State
  const [form, setForm] = useState({
    namaLengkap: '',
    nik: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: 'Laki-laki',
    asalTk: '',
    namaAyah: '',
    namaIbu: '',
    noHp: '',
    alamat: '',
    berkasKk: '',
    berkasAkta: '',
    captchaInput: ''
  });

  // Captcha sederhana anti-spam
  const [captchaNums] = useState(() => ({
    a: Math.floor(Math.random() * 6) + 2,
    b: Math.floor(Math.random() * 6) + 1
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(form.captchaInput) !== captchaNums.a + captchaNums.b) {
      notify('Jawaban verifikasi keamanan (captcha) belum tepat!', 'error');
      return;
    }

    const nextNumber = String(siteData.ppdbList.length + 1).padStart(4, '0');
    const regCode = `PPDB-2026-${nextNumber}`;
    const newEntry = {
      noPendaftaran: regCode,
      namaLengkap: form.namaLengkap,
      nik: form.nik,
      tempatLahir: form.tempatLahir,
      tanggalLahir: form.tanggalLahir,
      jenisKelamin: form.jenisKelamin,
      asalTk: form.asalTk || 'Tidak Ada / Langsung',
      namaAyah: form.namaAyah,
      namaIbu: form.namaIbu,
      noHp: form.noHp,
      alamat: form.alamat,
      berkasKk: form.berkasKk || 'Terlampir_KK.pdf',
      berkasAkta: form.berkasAkta || 'Terlampir_Akta.pdf',
      status: 'Menunggu Verifikasi',
      tanggalDaftar: new Date().toISOString().slice(0, 10)
    };

    setSiteData(prev => ({
      ...prev,
      ppdbList: [newEntry, ...prev.ppdbList]
    }));

    setSubmittedReg(newEntry);
    notify(`Pendaftaran berhasil! Nomor Anda: ${regCode}`);
  };

  const hasilCek = useMemo(() => {
    const q = cekQuery.trim().toLowerCase();
    if (!q) return [];
    return siteData.ppdbList.filter(p =>
      p.noPendaftaran.toLowerCase().includes(q) ||
      p.namaLengkap.toLowerCase().includes(q)
    );
  }, [cekQuery, siteData.ppdbList]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 mb-8 islamic-pattern flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-500 text-emerald-950 text-xs font-extrabold uppercase">
            Tahun Pelajaran 2026/2027
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold mt-3">Penerimaan Peserta Didik Baru (PPDB)</h1>
          <p className="text-sm text-emerald-200 mt-2 max-w-2xl">
            Bergabunglah bersama {siteData.settings.namaMadrasah} ({siteData.settings.yayasan}) — Terakreditasi {siteData.settings.akreditasi}.
          </p>
        </div>
        <a
          href={`https://wa.me/${siteData.settings.whatsapp}?text=${encodeURIComponent('Assalamualaikum Panitia PPDB MI Mathaliul Falah 01 Tulakan, saya ingin konsultasi pendaftaran siswa baru.')}`}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm inline-flex items-center gap-2 shrink-0 self-start"
        >
          <MessageCircle className="w-5 h-5" /> Konsultasi Panitia via WhatsApp
        </a>
      </div>

      {/* Tab Navigasi PPDB */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { id: 'formulir', label: '1. Formulir Pendaftaran Online' },
          { id: 'info', label: '2. Syarat & Jadwal Pendaftaran' },
          { id: 'status', label: '3. Cek Status Verifikasi & Kelulusan' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              tab === t.id ? 'bg-emerald-800 text-white shadow' : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: FORMULIR PENDAFTARAN */}
      {tab === 'formulir' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          {submittedReg ? (
            <div className="max-w-xl mx-auto text-center space-y-5 py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-950">Pendaftaran Berhasil Dikirim!</h2>
              <p className="text-sm text-slate-600">Simpan nomor pendaftaran di bawah ini untuk memantau status verifikasi oleh panitia madrasah.</p>
              <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-dashed border-emerald-400 space-y-2 text-left">
                <div className="flex justify-between items-center border-b border-emerald-200 pb-2">
                  <span className="text-xs font-semibold text-slate-500">NOMOR PENDAFTARAN</span>
                  <span className="text-lg font-extrabold text-emerald-900">{submittedReg.noPendaftaran}</span>
                </div>
                <p className="text-sm"><strong>Nama Calon Siswa:</strong> {submittedReg.namaLengkap}</p>
                <p className="text-sm"><strong>NIK:</strong> {submittedReg.nik}</p>
                <p className="text-sm"><strong>Orang Tua:</strong> {submittedReg.namaAyah} & {submittedReg.namaIbu}</p>
                <p className="text-sm"><strong>Status Saat Ini:</strong> <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-xs">{submittedReg.status}</span></p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button onClick={() => window.print()} className="px-5 py-2.5 rounded-xl bg-emerald-900 text-white text-sm font-semibold flex items-center gap-2">
                  <Printer className="w-4 h-4" /> Cetak Bukti Daftar
                </button>
                <button onClick={() => { setSubmittedReg(null); setTab('status'); setCekQuery(submittedReg.noPendaftaran); }} className="px-5 py-2.5 rounded-xl bg-amber-500 text-emerald-950 text-sm font-bold">
                  Cek Status Sekarang
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-emerald-950">Formulir Pendaftaran Peserta Didik Baru</h2>
                <p className="text-xs text-slate-500 mt-1">Isi data calon peserta didik dengan benar. Data akan langsung masuk ke sistem database admin madrasah.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Lengkap Calon Siswa *</label>
                  <input required type="text" value={form.namaLengkap} onChange={e => setForm({ ...form, namaLengkap: e.target.value })} placeholder="Sesuai Akta Kelahiran" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">NIK Calon Siswa (16 Digit) *</label>
                  <input required type="text" value={form.nik} onChange={e => setForm({ ...form, nik: e.target.value })} placeholder="3320xxxxxxxxxxxx" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Tempat Lahir *</label>
                  <input required type="text" value={form.tempatLahir} onChange={e => setForm({ ...form, tempatLahir: e.target.value })} placeholder="Contoh: Jepara" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Tanggal Lahir *</label>
                  <input required type="date" value={form.tanggalLahir} onChange={e => setForm({ ...form, tanggalLahir: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Jenis Kelamin *</label>
                  <select value={form.jenisKelamin} onChange={e => setForm({ ...form, jenisKelamin: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white">
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Asal RA / TK / PAUD</label>
                  <input type="text" value={form.asalTk} onChange={e => setForm({ ...form, asalTk: e.target.value })} placeholder="Nama RA/TK sebelumnya" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Ayah Kandung *</label>
                  <input required type="text" value={form.namaAyah} onChange={e => setForm({ ...form, namaAyah: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Ibu Kandung *</label>
                  <input required type="text" value={form.namaIbu} onChange={e => setForm({ ...form, namaIbu: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Nomor WhatsApp Orang Tua / Wali *</label>
                  <input required type="tel" value={form.noHp} onChange={e => setForm({ ...form, noHp: e.target.value })} placeholder="08xxxxxxxxxx" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Alamat Lengkap *</label>
                  <input required type="text" value={form.alamat} onChange={e => setForm({ ...form, alamat: e.target.value })} placeholder="RT/RW, Desa Tulakan, Kec. Donorojo" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Unggah Scan Kartu Keluarga (KK)</label>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setForm({ ...form, berkasKk: e.target.files?.[0]?.name || '' })} className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-800 file:font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Unggah Scan Akta Kelahiran</label>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setForm({ ...form, berkasAkta: e.target.files?.[0]?.name || '' })} className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-800 file:font-semibold" />
                </div>
              </div>

              {/* Proteksi Anti-Spam */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-amber-950 font-semibold">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Verifikasi Keamanan: Berapa hasil dari <strong>{captchaNums.a} + {captchaNums.b}</strong> ?</span>
                </div>
                <input
                  required
                  type="number"
                  value={form.captchaInput}
                  onChange={e => setForm({ ...form, captchaInput: e.target.value })}
                  placeholder="Jawaban"
                  className="px-3.5 py-2 rounded-lg border border-amber-300 bg-white text-sm w-32 font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg transition"
              >
                Kirim Formulir Pendaftaran PPDB
              </button>
            </form>
          )}
        </div>
      )}

      {/* TAB 2: SYARAT & JADWAL */}
      {tab === 'info' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
            <h3 className="text-lg font-bold text-emerald-950">Persyaratan Pendaftaran</h3>
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>Berusia minimal 6 tahun pada bulan Juli tahun berjalan (atau 5 tahun 6 bulan dengan kesiapan psikologis).</li>
              <li>Mengisi formulir pendaftaran online atau langsung di sekretariat madrasah.</li>
              <li>Fotokopi / Scan Akta Kelahiran calon peserta didik (2 lembar).</li>
              <li>Fotokopi / Scan Kartu Keluarga (KK) terbaru (2 lembar).</li>
              <li>Fotokopi KTP kedua orang tua / wali.</li>
              <li>Pas foto berwarna ukuran 3x4 (4 lembar).</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-emerald-950">Jadwal Gelombang PPDB</h3>
              <DemoBadge text="JADWAL DEMO" />
            </div>
            <div className="space-y-3 text-sm">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs font-bold text-emerald-800">Gelombang 1 (Inden & Reguler)</span>
                <p className="font-semibold text-slate-800">November 2026 – Februari 2027</p>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-xs font-bold text-amber-800">Gelombang 2 (Pemenuhan Kuota)</span>
                <p className="font-semibold text-slate-800">Maret – Juni 2027</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-600">Masa Ta'aruf Siswa Madrasah (MATSAMA)</span>
                <p className="font-semibold text-slate-800">Pertengahan Juli 2027</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CEK STATUS VERIFIKASI & HASIL SELEKSI */}
      {tab === 'status' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-emerald-950">Cek Status Verifikasi & Pengumuman Seleksi</h2>
            <p className="text-xs text-slate-500 mt-1">Masukkan Nomor Pendaftaran (contoh: <strong>PPDB-2026-0001</strong>) atau Nama Lengkap Calon Siswa.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <input
              type="text"
              value={cekQuery}
              onChange={e => setCekQuery(e.target.value)}
              placeholder="Contoh: PPDB-2026-0001 atau Muhammad..."
              className="flex-grow px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          {cekQuery.trim() && (
            <div className="space-y-3">
              {hasilCek.length === 0 ? (
                <p className="text-sm text-slate-500">Data pendaftaran dengan kata kunci "{cekQuery}" belum ditemukan.</p>
              ) : (
                hasilCek.map(p => (
                  <div key={p.noPendaftaran} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-emerald-800">{p.noPendaftaran} • Daftar: {p.tanggalDaftar}</span>
                      <h4 className="text-base font-bold text-emerald-950 mt-0.5">{p.namaLengkap}</h4>
                      <p className="text-xs text-slate-600">Asal TK/RA: {p.asalTk} • Orang Tua: {p.namaAyah}</p>
                    </div>
                    <div>
                      <span className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold ${
                        p.status === 'Diterima'
                          ? 'bg-emerald-600 text-white'
                          : p.status === 'Terverifikasi'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 12. KOMPONEN HALAMAN DOWNLOAD DOKUMEN
// ============================================================================
function DokumenPage({ siteData, onDownload }) {
  const [cat, setCat] = useState('Semua');
  const [q, setQ] = useState('');

  const categories = [
    'Semua',
    'Dokumen Kurikulum',
    'Kalender Pendidikan',
    'Jadwal Pelajaran',
    'Peraturan Akademik',
    'Dokumen Kesiswaan',
    'Formulir'
  ];

  const filtered = siteData.documents.filter(d => {
    const matchC = cat === 'Semua' || d.kategori === cat;
    const matchQ = d.nama.toLowerCase().includes(q.toLowerCase()) || d.deskripsi.toLowerCase().includes(q.toLowerCase());
    return matchC && matchQ;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 mb-8 islamic-pattern">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Layanan Informasi Publik</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold mt-1">Pusat Unduhan Dokumen Madrasah</h1>
        <p className="text-sm text-emerald-200 mt-2">Unduh dokumen kurikulum, kalender pendidikan, jadwal pelajaran, dan formulir resmi.</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                cat === c ? 'bg-emerald-800 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Cari nama dokumen..."
          className="px-4 py-2 rounded-xl border border-slate-300 text-sm bg-white w-full md:w-64"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(doc => (
          <div key={doc.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold">{doc.kategori}</span>
                <span>{doc.tanggal} • {doc.ukuran}</span>
              </div>
              <h3 className="text-base font-bold text-emerald-950 mt-1">{doc.nama}</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{doc.deskripsi}</p>
            </div>
            <button
              onClick={() => onDownload(doc)}
              className="self-start px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-2 transition"
            >
              <Download className="w-4 h-4" /> Download Dokumen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 13. KOMPONEN HALAMAN KONTAK
// ============================================================================
function KontakPage({ siteData, notify }) {
  const [msg, setMsg] = useState({ nama: '', kontak: '', subjek: '', isi: '' });

  const handleSend = (e) => {
    e.preventDefault();
    notify('Terima kasih! Pesan Anda telah diterima oleh Tata Usaha Madrasah.');
    setMsg({ nama: '', kontak: '', subjek: '', isi: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 mb-8 islamic-pattern">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Hubungi Kami</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold mt-1">Kontak & Lokasi Madrasah</h1>
        <p className="text-sm text-emerald-200 mt-2">Silakan hubungi kami untuk informasi akademik, kesiswaan, maupun PPDB.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-emerald-950">Informasi Kontak Resmi</h2>
            <div className="space-y-3 text-sm text-slate-700">
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <span><strong>Alamat:</strong><br />{siteData.settings.alamat}, Kode Pos {siteData.settings.kodePos}</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-700 shrink-0" />
                <span><strong>Telepon / WA:</strong> {siteData.settings.telepon}</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-700 shrink-0" />
                <span><strong>Email:</strong> {siteData.settings.email}</span>
              </p>
              <p className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-emerald-700 shrink-0" />
                <span><strong>Jam Pelayanan:</strong> {siteData.settings.jamOperasional}</span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 h-64 bg-slate-100">
            <iframe
              title="Google Maps MI Mathaliul Falah 01 Tulakan"
              src={siteData.settings.mapsEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
          <h2 className="text-xl font-bold text-emerald-950 mb-4">Kirim Pesan atau Pertanyaan</h2>
          <form onSubmit={handleSend} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                <input required type="text" value={msg.nama} onChange={e => setMsg({ ...msg, nama: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp / Email *</label>
                <input required type="text" value={msg.kontak} onChange={e => setMsg({ ...msg, kontak: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Perihal / Subjek *</label>
              <input required type="text" value={msg.subjek} onChange={e => setMsg({ ...msg, subjek: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Isi Pesan *</label>
              <textarea required rows={4} value={msg.isi} onChange={e => setMsg({ ...msg, isi: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"></textarea>
            </div>
            <button type="submit" className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm inline-flex items-center gap-2">
              <Send className="w-4 h-4" /> Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 14. DASHBOARD ADMIN LENGKAP (12 MODUL CRUD REAL-TIME + BACKUP JSON)
// ============================================================================
function AdminPortal({ isAdminAuth, setIsAdminAuth, adminTab, setAdminTab, siteData, setSiteData, notify, navigateTo }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // State Form Tambah/Edit di Admin
  const [newsForm, setNewsForm] = useState({ id: null, judul: '', kategori: 'Kegiatan', ringkasan: '', isi: '', gambar: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80' });
  const [galleryForm, setGalleryForm] = useState({ judul: '', kategori: 'Kegiatan Pembelajaran', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80', deskripsi: '' });
  const [teacherForm, setTeacherForm] = useState({ nama: '', jabatan: 'Guru Mapel', mapel: '', pendidikan: 'S1' });
  const [achForm, setAchForm] = useState({ tahun: '2026', judul: '', tingkat: 'Kecamatan', kategori: 'Siswa' });
  const [agendaForm, setAgendaForm] = useState({ tanggal: '2026-12-10', judul: '', lokasi: 'Madrasah', kategori: 'Akademik' });
  const [docForm, setDocForm] = useState({ nama: '', kategori: 'Dokumen Kurikulum', ukuran: '1.2 MB', deskripsi: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'madrasah01') {
      setIsAdminAuth(true);
      notify('Login berhasil! Selamat datang di Dashboard Operator Madrasah.');
    } else {
      notify('Username atau password salah! Gunakan kredensial demo.', 'error');
    }
  };

  // Backup & Restore JSON
  const handleBackupJson = () => {
    const blob = new Blob([JSON.stringify(siteData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_mi_mathaliul_falah_01_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify('File backup database JSON berhasil diunduh!');
  };

  const handleResetDemo = () => {
    setSiteData(INITIAL_DATA);
    notify('Seluruh data berhasil dikembalikan ke pengaturan awal!');
  };

  if (!isAdminAuth) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 islamic-subtle">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <MadrasahLogo className="w-14 h-14 mx-auto" />
            <h1 className="text-xl font-extrabold text-emerald-950">Login Portal Administrator</h1>
            <p className="text-xs text-slate-500">{siteData.settings.namaMadrasah}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Username Operator</label>
              <input required type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Masukkan username" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi</label>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-sm transition">
              Masuk ke Dashboard
            </button>
          </form>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-2">
            <div className="text-xs text-amber-900">
              <p className="font-bold">Akses Uji Coba (Demo):</p>
              <p>User: <code>admin</code> | Pass: <code>madrasah01</code></p>
            </div>
            <button
              type="button"
              onClick={() => { setUsername('admin'); setPassword('madrasah01'); }}
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-emerald-950 text-xs font-bold shrink-0"
            >
              Isi Otomatis
            </button>
          </div>
        </div>
      </div>
    );
  }

  const adminMenus = [
    { id: 'dashboard', label: '1. Statistik & Ringkasan', icon: BarChart3 },
    { id: 'berita', label: '2. Manajemen Berita', icon: FileText },
    { id: 'galeri', label: '3. Manajemen Galeri', icon: ImageIcon },
    { id: 'profil', label: '4. Manajemen Profil', icon: BookOpen },
    { id: 'guru', label: '5. Data Guru (13)', icon: Users },
    { id: 'siswa', label: '6. Data Siswa & Rombel', icon: GraduationCap },
    { id: 'prestasi', label: '7. Manajemen Prestasi', icon: Award },
    { id: 'agenda', label: '8. Agenda Kegiatan', icon: Calendar },
    { id: 'akademik', label: '9. Info Akademik & KBC', icon: Sparkles },
    { id: 'ppdb', label: '10. Pendaftar PPDB', icon: CheckCircle2 },
    { id: 'dokumen', label: '11. Dokumen Unduhan', icon: FolderOpen },
    { id: 'pengaturan', label: '12. Identitas & Backup', icon: Settings }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-emerald-950 text-white rounded-2xl p-5 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase">Panel Kendali CMS Madrasah</span>
          <h1 className="text-xl font-extrabold">{siteData.settings.namaMadrasah}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigateTo('beranda')} className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-xs font-semibold">
            Lihat Website Publik
          </button>
          <button onClick={() => setIsAdminAuth(false)} className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-semibold flex items-center gap-1.5">
            <LogOut className="w-3.5 h-3.5" /> Keluar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Admin */}
        <aside className="lg:col-span-3 bg-white rounded-2xl p-3 border border-slate-200 h-fit space-y-1">
          {adminMenus.map(m => (
            <button
              key={m.id}
              onClick={() => setAdminTab(m.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                adminTab === m.id ? 'bg-emerald-800 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <m.icon className="w-4 h-4 shrink-0" />
              <span>{m.label}</span>
            </button>
          ))}
        </aside>

        {/* Konten Modul Admin */}
        <div className="lg:col-span-9 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          {/* 1. STATISTIK */}
          {adminTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-emerald-950">Statistik Pengunjung & Ringkasan Database</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-xs text-slate-500">Pengunjung Hari Ini</span>
                  <p className="text-2xl font-extrabold text-emerald-900">{siteData.stats.pengunjungHariIni}</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-xs text-slate-500">Total Pengunjung</span>
                  <p className="text-2xl font-extrabold text-amber-800">{siteData.stats.totalPengunjung.toLocaleString('id-ID')}</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-xs text-slate-500">Pendaftar PPDB</span>
                  <p className="text-2xl font-extrabold text-emerald-900">{siteData.ppdbList.length}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                  <span className="text-xs text-slate-500">Total Berita</span>
                  <p className="text-2xl font-extrabold text-slate-900">{siteData.news.length}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Seluruh perubahan yang Anda lakukan pada menu di sebelah kiri otomatis tersimpan dan langsung memperbarui tampilan halaman publik website.
              </p>
            </div>
          )}

          {/* 2. MANAJEMEN BERITA */}
          {adminTab === 'berita' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-emerald-950">Manajemen Berita & Informasi</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsForm.id) {
                    setSiteData(prev => ({
                      ...prev,
                      news: prev.news.map(n => n.id === newsForm.id ? { ...n, ...newsForm } : n)
                    }));
                    notify('Berita berhasil diperbarui!');
                  } else {
                    const baru = {
                      ...newsForm,
                      id: Date.now(),
                      tanggal: new Date().toISOString().slice(0, 10),
                      penulis: 'Admin Madrasah',
                      views: 1
                    };
                    setSiteData(prev => ({ ...prev, news: [baru, ...prev.news] }));
                    notify('Berita baru berhasil dipublikasikan!');
                  }
                  setNewsForm({ id: null, judul: '', kategori: 'Kegiatan', ringkasan: '', isi: '', gambar: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80' });
                }}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <h3 className="text-sm font-bold text-emerald-900">{newsForm.id ? 'Edit Berita' : 'Tambah Berita Baru'}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input required type="text" placeholder="Judul Berita" value={newsForm.judul} onChange={e => setNewsForm({ ...newsForm, judul: e.target.value })} className="sm:col-span-2 px-3 py-2 rounded-lg border border-slate-300 text-sm" />
                  <select value={newsForm.kategori} onChange={e => setNewsForm({ ...newsForm, kategori: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white">
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Prestasi">Prestasi</option>
                  </select>
                </div>
                <input required type="text" placeholder="Ringkasan singkat" value={newsForm.ringkasan} onChange={e => setNewsForm({ ...newsForm, ringkasan: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm" />
                <textarea required rows={3} placeholder="Isi lengkap berita..." value={newsForm.isi} onChange={e => setNewsForm({ ...newsForm, isi: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"></textarea>
                <div className="flex gap-2">
                  <button type="submit" className="px-4 py-2 rounded-lg bg-emerald-800 text-white text-xs font-bold">
                    {newsForm.id ? 'Simpan Perubahan' : 'Publikasikan Berita'}
                  </button>
                  {newsForm.id && (
                    <button type="button" onClick={() => setNewsForm({ id: null, judul: '', kategori: 'Kegiatan', ringkasan: '', isi: '', gambar: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80' })} className="px-4 py-2 rounded-lg bg-slate-200 text-xs font-bold">
                      Batal
                    </button>
                  )}
                </div>
              </form>

              <div className="space-y-2">
                {siteData.news.map(n => (
                  <div key={n.id} className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-amber-600">{n.kategori} • {n.tanggal}</span>
                      <h4 className="text-sm font-bold text-slate-800">{n.judul}</h4>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => setNewsForm(n)} className="p-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => { setSiteData(prev => ({ ...prev, news: prev.news.filter(x => x.id !== n.id) })); notify('Berita dihapus.'); }} className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. MANAJEMEN GALERI */}
          {adminTab === 'galeri' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-emerald-950">Manajemen Galeri Foto & Video</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const baru = { ...galleryForm, id: Date.now(), tipe: 'foto', tanggal: new Date().toISOString().slice(0, 10) };
                  setSiteData(prev => ({ ...prev, gallery: [baru, ...prev.gallery] }));
                  setGalleryForm({ judul: '', kategori: 'Kegiatan Pembelajaran', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80', deskripsi: '' });
                  notify('Foto galeri berhasil ditambahkan!');
                }}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input required type="text" placeholder="Judul Kegiatan" value={galleryForm.judul} onChange={e => setGalleryForm({ ...galleryForm, judul: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-300 text-sm" />
                  <select value={galleryForm.kategori} onChange={e => setGalleryForm({ ...galleryForm, kategori: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white">
                    <option value="Kegiatan Pembelajaran">Kegiatan Pembelajaran</option>
                    <option value="Kegiatan Keagamaan">Kegiatan Keagamaan</option>
                    <option value="Kegiatan Ekstrakurikuler">Kegiatan Ekstrakurikuler</option>
                    <option value="Kegiatan Pramuka">Kegiatan Pramuka</option>
                    <option value="Kegiatan Hari Besar Islam">Kegiatan Hari Besar Islam</option>
                    <option value="Kegiatan Guru">Kegiatan Guru</option>
                    <option value="Kegiatan Sosial">Kegiatan Sosial</option>
                  </select>
                </div>
                <input required type="text" placeholder="URL Gambar" value={galleryForm.url} onChange={e => setGalleryForm({ ...galleryForm, url: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm" />
                <input required type="text" placeholder="Deskripsi singkat foto" value={galleryForm.deskripsi} onChange={e => setGalleryForm({ ...galleryForm, deskripsi: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm" />
                <button type="submit" className="px-4 py-2 rounded-lg bg-emerald-800 text-white text-xs font-bold">Tambah ke Galeri</button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {siteData.gallery.map(g => (
                  <div key={g.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={g.url} alt={g.judul} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold text-amber-600">{g.kategori}</span>
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{g.judul}</h4>
                      </div>
                    </div>
                    <button onClick={() => { setSiteData(prev => ({ ...prev, gallery: prev.gallery.filter(x => x.id !== g.id) })); notify('Item galeri dihapus.'); }} className="p-2 rounded-lg bg-red-100 text-red-700"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. MANAJEMEN PROFIL */}
          {adminTab === 'profil' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-emerald-950">Edit Konten Profil & Sambutan Kepala Madrasah</h2>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sambutan Kepala Madrasah ({siteData.settings.kepalaMadrasah})</label>
                <textarea rows={5} value={siteData.profile.sambutanIsi} onChange={e => setSiteData(prev => ({ ...prev, profile: { ...prev.profile, sambutanIsi: e.target.value } }))} className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Visi Madrasah</label>
                <textarea rows={2} value={siteData.profile.visi} onChange={e => setSiteData(prev => ({ ...prev, profile: { ...prev.profile, visi: e.target.value } }))} className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sejarah Madrasah</label>
                <textarea rows={4} value={siteData.profile.sejarah} onChange={e => setSiteData(prev => ({ ...prev, profile: { ...prev.profile, sejarah: e.target.value } }))} className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"></textarea>
              </div>
              <button onClick={() => notify('Perubahan halaman profil telah tersimpan!')} className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold">Simpan Profil</button>
            </div>
          )}

          {/* 5. MANAJEMEN DATA GURU */}
          {adminTab === 'guru' && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-emerald-950">Manajemen Data Guru & Tenaga Kependidikan ({siteData.teachers.length})</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSiteData(prev => ({
                    ...prev,
                    teachers: [...prev.teachers, { ...teacherForm, id: Date.now(), status: 'Resmi' }]
                  }));
                  setTeacherForm({ nama: '', jabatan: 'Guru Mapel', mapel: '', pendidikan: 'S1' });
                  notify('Data guru baru berhasil ditambahkan!');
                }}
                className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200"
              >
                <input required type="text" placeholder="Nama & Gelar" value={teacherForm.nama} onChange={e => setTeacherForm({ ...teacherForm, nama: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-300 text-xs" />
                <input required type="text" placeholder="Jabatan" value={teacherForm.jabatan} onChange={e => setTeacherForm({ ...teacherForm, jabatan: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-300 text-xs" />
                <input required type="text" placeholder="Mata Pelajaran" value={teacherForm.mapel} onChange={e => setTeacherForm({ ...teacherForm, mapel: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-300 text-xs" />
                <button type="submit" className="px-3 py-2 rounded-lg bg-emerald-800 text-white text-xs font-bold">+ Tambah Guru</button>
              </form>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {siteData.teachers.map(t => (
                  <div key={t.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-emerald-950">{t.nama}</strong> — <span className="text-amber-700 font-semibold">{t.jabatan}</span> ({t.mapel})
                    </div>
                    <button onClick={() => { setSiteData(prev => ({ ...prev, teachers: prev.teachers.filter(x => x.id !== t.id) })); notify('Data guru dihapus.'); }} className="p-1.5 rounded bg-red-100 text-red-700"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. MANAJEMEN DATA SISWA & ROMBEL */}
          {adminTab === 'siswa' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-emerald-950">Manajemen Rombongan Belajar & Jumlah Siswa</h2>
              <div className="space-y-2">
                {siteData.rombel.map(r => (
                  <div key={r.id} className="p-3 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center text-xs">
                    <strong className="text-sm text-emerald-950">{r.kelas}</strong>
                    <input
                      type="text"
                      value={r.waliKelas}
                      onChange={e => setSiteData(prev => ({
                        ...prev,
                        rombel: prev.rombel.map(x => x.id === r.id ? { ...x, waliKelas: e.target.value } : x)
                      }))}
                      className="px-2.5 py-1.5 rounded border border-slate-300"
                    />
                    <div className="flex items-center gap-2">
                      <span>Putra:</span>
                      <input
                        type="number"
                        value={r.putra}
                        onChange={e => {
                          const p = Number(e.target.value);
                          setSiteData(prev => ({
                            ...prev,
                            rombel: prev.rombel.map(x => x.id === r.id ? { ...x, putra: p, total: p + Number(x.putri) } : x)
                          }));
                        }}
                        className="w-16 px-2 py-1 rounded border border-slate-300"
                      />
                      <span>Putri:</span>
                      <input
                        type="number"
                        value={r.putri}
                        onChange={e => {
                          const pi = Number(e.target.value);
                          setSiteData(prev => ({
                            ...prev,
                            rombel: prev.rombel.map(x => x.id === r.id ? { ...x, putri: pi, total: Number(x.putra) + pi } : x)
                          }));
                        }}
                        className="w-16 px-2 py-1 rounded border border-slate-300"
                      />
                    </div>
                    <span className="font-bold text-emerald-800 text-right">Total: {r.total} Siswa</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. MANAJEMEN PRESTASI */}
          {adminTab === 'prestasi' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-emerald-950">Manajemen Prestasi Madrasah & Siswa</h2>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setSiteData(prev => ({ ...prev, achievements: [{ ...achForm, id: Date.now() }, ...prev.achievements] }));
                  setAchForm({ tahun: '2026', judul: '', tingkat: 'Kecamatan', kategori: 'Siswa' });
                  notify('Prestasi berhasil ditambahkan!');
                }}
                className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200"
              >
                <input required type="text" placeholder="Tahun" value={achForm.tahun} onChange={e => setAchForm({ ...achForm, tahun: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-300 text-xs" />
                <input required type="text" placeholder="Judul Prestasi" value={achForm.judul} onChange={e => setAchForm({ ...achForm, judul: e.target.value })} className="sm:col-span-2 px-3 py-2 rounded-lg border border-slate-300 text-xs" />
                <button type="submit" className="px-3 py-2 rounded-lg bg-emerald-800 text-white text-xs font-bold">+ Tambah</button>
              </form>
              {siteData.achievements.map(a => (
                <div key={a.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <span><strong>[{a.tahun}]</strong> {a.judul}</span>
                  <button onClick={() => setSiteData(prev => ({ ...prev, achievements: prev.achievements.filter(x => x.id !== a.id) }))} className="p-1.5 rounded bg-red-100 text-red-700"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
          )}

          {/* 8. AGENDA KEGIATAN */}
          {adminTab === 'agenda' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-emerald-950">Manajemen Agenda & Kalender Kegiatan</h2>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setSiteData(prev => ({ ...prev, agendas: [{ ...agendaForm, id: Date.now() }, ...prev.agendas] }));
                  setAgendaForm({ tanggal: '2026-12-10', judul: '', lokasi: 'Madrasah', kategori: 'Akademik' });
                  notify('Agenda kegiatan ditambahkan!');
                }}
                className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200"
              >
                <input required type="date" value={agendaForm.tanggal} onChange={e => setAgendaForm({ ...agendaForm, tanggal: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-300 text-xs" />
                <input required type="text" placeholder="Nama Agenda" value={agendaForm.judul} onChange={e => setAgendaForm({ ...agendaForm, judul: e.target.value })} className="sm:col-span-2 px-3 py-2 rounded-lg border border-slate-300 text-xs" />
                <button type="submit" className="px-3 py-2 rounded-lg bg-emerald-800 text-white text-xs font-bold">+ Tambah</button>
              </form>
              {siteData.agendas.map(ag => (
                <div key={ag.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <span><strong>{ag.tanggal}</strong> — {ag.judul}</span>
                  <button onClick={() => setSiteData(prev => ({ ...prev, agendas: prev.agendas.filter(x => x.id !== ag.id) }))} className="p-1.5 rounded bg-red-100 text-red-700"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
          )}

          {/* 9. INFORMASI AKADEMIK */}
          {adminTab === 'akademik' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-emerald-950">Manajemen Informasi Kurikulum (KOM, KBC, Deep Learning)</h2>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kurikulum Operasional Madrasah (KOM)</label>
                <textarea rows={3} value={siteData.academicInfo.kom} onChange={e => setSiteData(prev => ({ ...prev, academicInfo: { ...prev.academicInfo, kom: e.target.value } }))} className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kurikulum Berbasis Cinta (KBC)</label>
                <textarea rows={3} value={siteData.academicInfo.kbc} onChange={e => setSiteData(prev => ({ ...prev, academicInfo: { ...prev.academicInfo, kbc: e.target.value } }))} className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pembelajaran Mendalam (Deep Learning)</label>
                <textarea rows={3} value={siteData.academicInfo.deepLearning} onChange={e => setSiteData(prev => ({ ...prev, academicInfo: { ...prev.academicInfo, deepLearning: e.target.value } }))} className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"></textarea>
              </div>
              <button onClick={() => notify('Informasi akademik berhasil disimpan!')} className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold">Simpan Perubahan</button>
            </div>
          )}

          {/* 10. MANAJEMEN PENDAFTAR PPDB */}
          {adminTab === 'ppdb' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-emerald-950">Manajemen Pendaftaran Peserta Didik Baru ({siteData.ppdbList.length})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-slate-200">
                  <thead className="bg-emerald-900 text-white">
                    <tr>
                      <th className="p-3">No. Daftar</th>
                      <th className="p-3">Nama Calon Siswa</th>
                      <th className="p-3">Orang Tua & WA</th>
                      <th className="p-3">Status Verifikasi</th>
                      <th className="p-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {siteData.ppdbList.map(p => (
                      <tr key={p.noPendaftaran}>
                        <td className="p-3 font-bold text-emerald-900">{p.noPendaftaran}</td>
                        <td className="p-3">
                          <strong>{p.namaLengkap}</strong>
                          <span className="block text-slate-500">{p.jenisKelamin} • {p.asalTk}</span>
                        </td>
                        <td className="p-3">{p.namaAyah} ({p.noHp})</td>
                        <td className="p-3">
                          <select
                            value={p.status}
                            onChange={e => {
                              const newSt = e.target.value;
                              setSiteData(prev => ({
                                ...prev,
                                ppdbList: prev.ppdbList.map(x => x.noPendaftaran === p.noPendaftaran ? { ...x, status: newSt } : x)
                              }));
                              notify(`Status ${p.noPendaftaran} diubah menjadi "${newSt}"`);
                            }}
                            className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold"
                          >
                            <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                            <option value="Terverifikasi">Terverifikasi</option>
                            <option value="Diterima">Diterima</option>
                            <option value="Cadangan">Cadangan</option>
                          </select>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => {
                              setSiteData(prev => ({ ...prev, ppdbList: prev.ppdbList.filter(x => x.noPendaftaran !== p.noPendaftaran) }));
                              notify('Data pendaftar dihapus.');
                            }}
                            className="p-1.5 rounded bg-red-100 text-red-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 11. MANAJEMEN DOKUMEN UNDUHAN */}
          {adminTab === 'dokumen' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-emerald-950">Manajemen Pusat Unduhan Dokumen</h2>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setSiteData(prev => ({
                    ...prev,
                    documents: [{ ...docForm, id: Date.now(), tanggal: new Date().toISOString().slice(0, 10) }, ...prev.documents]
                  }));
                  setDocForm({ nama: '', kategori: 'Dokumen Kurikulum', ukuran: '1.2 MB', deskripsi: '' });
                  notify('Dokumen baru berhasil diunggah!');
                }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200"
              >
                <input required type="text" placeholder="Nama File Dokumen" value={docForm.nama} onChange={e => setDocForm({ ...docForm, nama: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-300 text-xs" />
                <select value={docForm.kategori} onChange={e => setDocForm({ ...docForm, kategori: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white">
                  <option value="Dokumen Kurikulum">Dokumen Kurikulum</option>
                  <option value="Kalender Pendidikan">Kalender Pendidikan</option>
                  <option value="Jadwal Pelajaran">Jadwal Pelajaran</option>
                  <option value="Peraturan Akademik">Peraturan Akademik</option>
                  <option value="Dokumen Kesiswaan">Dokumen Kesiswaan</option>
                  <option value="Formulir">Formulir</option>
                </select>
                <input required type="text" placeholder="Deskripsi singkat" value={docForm.deskripsi} onChange={e => setDocForm({ ...docForm, deskripsi: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-300 text-xs" />
                <button type="submit" className="sm:col-span-3 px-4 py-2 rounded-lg bg-emerald-800 text-white text-xs font-bold">+ Tambah Dokumen Unduhan</button>
              </form>
              {siteData.documents.map(d => (
                <div key={d.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-emerald-950">{d.nama}</strong> <span className="text-slate-500">({d.kategori})</span>
                  </div>
                  <button onClick={() => setSiteData(prev => ({ ...prev, documents: prev.documents.filter(x => x.id !== d.id) }))} className="p-1.5 rounded bg-red-100 text-red-700"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
          )}

          {/* 12. PENGATURAN IDENTITAS & BACKUP */}
          {adminTab === 'pengaturan' && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-emerald-950">Pengaturan Identitas Madrasah & Backup Database</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold block mb-1">Nama Madrasah</label>
                  <input type="text" value={siteData.settings.namaMadrasah} onChange={e => setSiteData(prev => ({ ...prev, settings: { ...prev.settings, namaMadrasah: e.target.value } }))} className="w-full px-3 py-2 rounded-lg border border-slate-300" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Yayasan</label>
                  <input type="text" value={siteData.settings.yayasan} onChange={e => setSiteData(prev => ({ ...prev, settings: { ...prev.settings, yayasan: e.target.value } }))} className="w-full px-3 py-2 rounded-lg border border-slate-300" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Kepala Madrasah</label>
                  <input type="text" value={siteData.settings.kepalaMadrasah} onChange={e => setSiteData(prev => ({ ...prev, settings: { ...prev.settings, kepalaMadrasah: e.target.value } }))} className="w-full px-3 py-2 rounded-lg border border-slate-300" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Nomor WhatsApp (Format 628xxx)</label>
                  <input type="text" value={siteData.settings.whatsapp} onChange={e => setSiteData(prev => ({ ...prev, settings: { ...prev.settings, whatsapp: e.target.value } }))} className="w-full px-3 py-2 rounded-lg border border-slate-300" />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-bold block mb-1">Alamat Lengkap</label>
                  <input type="text" value={siteData.settings.alamat} onChange={e => setSiteData(prev => ({ ...prev, settings: { ...prev.settings, alamat: e.target.value } }))} className="w-full px-3 py-2 rounded-lg border border-slate-300" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
                <button onClick={() => notify('Pengaturan identitas madrasah berhasil disimpan!')} className="px-4 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5">
                  <Save className="w-4 h-4" /> Simpan Identitas
                </button>
                <button onClick={handleBackupJson} className="px-4 py-2.5 rounded-xl bg-amber-500 text-emerald-950 text-xs font-bold flex items-center gap-1.5">
                  <Database className="w-4 h-4" /> Backup Database (JSON)
                </button>
                <button onClick={handleResetDemo} className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4" /> Reset ke Data Awal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}