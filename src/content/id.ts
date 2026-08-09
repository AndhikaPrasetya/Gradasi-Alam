import type {SiteContent} from './types';

const id: SiteContent = {
  hero: {
    badge: '655+ Proyek di 17 Kota',
    headline: 'Kami Ciptakan Ruang',
    headlineAccent: 'Asri',
    subhead:
      'Sejak 2018, Gradasi Alam merancang dan merawat taman, vertical garden, dan ruang hijau untuk hunian, korporat, dan komersial di seluruh Indonesia.'
  },
  about: {
    eyebrow: 'Tentang Kami',
    heading: 'Mitra Anda dari Konsep hingga Selesai',
    body: 'Kami mendampingi setiap klien mulai dari survei lokasi dan konsep desain, hingga konstruksi dan perawatan jangka panjang — memastikan ruang eksterior Anda tetap hijau dan nyaman sepanjang waktu.',
    stats: [
      {value: '2018', label: 'Beroperasi sejak'},
      {value: '655+', label: 'Proyek selesai'},
      {value: '17', label: 'Kota di Indonesia'}
    ]
  },
  services: [
    {
      id: 'exterior-design',
      title: 'Exterior Design',
      description: 'Survei lokasi, gambar kerja, dan analisis desain untuk merancang ruang eksterior yang sesuai kebutuhan Anda.'
    },
    {
      id: 'complete-construction',
      title: 'Complete Construction',
      description: 'Pengerjaan hardscape, softscape, kolam, hingga vertical garden secara menyeluruh dan terintegrasi.'
    },
    {
      id: 'intensive-maintenance',
      title: 'Intensive Maintenance',
      description: 'Perawatan irigasi, perawatan tanaman, dan pemeliharaan makro agar taman Anda tetap terjaga.'
    },
    {
      id: 'planting-renting',
      title: 'Planting & Renting',
      description: 'Penyewaan tanaman indoor dalam berbagai ukuran untuk kebutuhan kantor dan acara.'
    }
  ],
  projects: [
    {id: 'residential-1', title: 'Taman Rumah Tinggal, Bogor', category: 'residential', image: '/images/projects/residential-1.svg'},
    {id: 'residential-2', title: 'Vertical Garden Hunian, Depok', category: 'residential', image: '/images/projects/residential-2.svg'},
    {id: 'corporate-1', title: 'Lanskap Kantor Korporat, Jakarta', category: 'corporate', image: '/images/projects/corporate-1.svg'},
    {id: 'indoor-1', title: 'Plant Styling Lobby, Jakarta', category: 'indoor', image: '/images/projects/indoor-1.svg'},
    {id: 'maintenance-1', title: 'Perawatan Taman Berkala, Tangerang', category: 'maintenance', image: '/images/projects/maintenance-1.svg'},
    {id: 'corporate-2', title: 'Rooftop Garden Gedung Komersial, Bekasi', category: 'corporate', image: '/images/projects/corporate-2.svg'}
  ],
  testimonials: [
    {id: 'klien-1', name: 'Klien Residential', role: 'Pemilik Rumah, Bogor', quote: 'Tim Gradasi Alam sangat komunikatif dan hasil tamannya melebihi ekspektasi kami.'},
    {id: 'klien-2', name: 'Klien Korporat', role: 'Manajer Fasilitas, Jakarta', quote: 'Proses dari desain sampai perawatan berjalan rapi, kantor kami jadi lebih asri.'},
    {id: 'klien-3', name: 'Klien Maintenance', role: 'Pengelola Gedung, Tangerang', quote: 'Perawatan berkala membuat taman selalu terlihat terawat tanpa kami perlu repot.'}
  ],
  news: [
    {id: 'news-1', title: 'Tren Desain Eksterior 2026', excerpt: 'Rangkuman gaya taman dan ruang hijau yang banyak dicari tahun ini.'},
    {id: 'news-2', title: 'Merawat Vertical Garden di Musim Hujan', excerpt: 'Tips menjaga vertical garden tetap sehat saat curah hujan tinggi.'},
    {id: 'news-3', title: 'Memilih Tanaman Indoor untuk Kantor', excerpt: 'Panduan memilih tanaman indoor yang tahan ruangan minim cahaya.'}
  ],
  contact: {
    address: 'Jl. Akasia Raya No. 24, Bogor, Indonesia',
    email: 'gradasi.alam@gmail.com',
    whatsapp: '6281222991625'
  }
};

export default id;
