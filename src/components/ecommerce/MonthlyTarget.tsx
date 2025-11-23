"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { readAllPeminjaman } from "@/lib/peminjaman";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface Peminjaman {
  id: number;
  tanggal_peminjaman: string;
  tanggal_pengembalian: string | null;
  status: "disetuju" | "dikembalikan";
}

export default function StatistikPeminjaman() {
  const [peminjaman, setPeminjaman] = useState<Peminjaman[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await readAllPeminjaman();
        // console.log("=====================================", response);
        
        if (response && Array.isArray(response.data)) {
          setPeminjaman(response.data);
          // console.log("DEBUG: Peminjaman state set to:", response.data);
        } else {
          // console.error("Format data tidak sesuai, diharapkan { data: [...] }");
          setPeminjaman([]);
        }
      } catch (error) {
        console.error("Gagal mengambil data peminjaman:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const processChartData = () => {
    const monthlyCounts = Array(12).fill(0);
    const currentYear = new Date().getFullYear();

    if (!Array.isArray(peminjaman)) {
      console.log("DEBUG: peminjaman is not an array in processChartData.");
      return monthlyCounts; 
    }

    peminjaman.forEach((item) => {
      const loanDate = new Date(item.tanggal_peminjaman);
    
      if (loanDate.getFullYear() === currentYear) {
        const month = loanDate.getMonth();
        monthlyCounts[month]++;
      }
    });
    return monthlyCounts;
  };

  const series = [
    {
      name: "Jumlah Peminjaman",
      data: processChartData(),
    },
  ];

  const options: ApexOptions = {
    legend: {
      show: false,
    },
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
      fontFamily: "Outfit, sans-serif",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: { curve: "smooth", width: 2 },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
        "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
      ],
    },
    yaxis: {
      min: 0,
      labels: {
        formatter: (val) => val.toFixed(0),
      },
    },
  };

  const dataPeminjaman = Array.isArray(peminjaman) ? peminjaman : [];
  const totalPeminjaman = dataPeminjaman.length;
  const sedangDipinjam = dataPeminjaman.filter(p => p.status === 'disetuju').length;
  const sudahDikembalikan = dataPeminjaman.filter(p => p.status === 'dikembalikan').length;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-default dark:border-gray-800 dark:bg-gray-900">
      <div className="px-5 pt-5 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Statistik Peminjaman
            </h3>
            <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
              Grafik peminjaman buku selama tahun {new Date().getFullYear()}
            </p>
          </div>
        </div>
        <div className="relative mt-4">
          <div className="max-h-[350px]">
            {loading ? (
              <div className="flex h-64 items-center justify-center">Memuat data...</div>
            ) : (
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={250}
            />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 border-t border-gray-200 px-6 py-3.5 dark:border-gray-800 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Total Peminjaman
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {totalPeminjaman}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Sedang Dipinjam
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {sedangDipinjam}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Sudah Kembali
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {sudahDikembalikan}
          </p>
        </div>
      </div>
    </div>
  );
}
