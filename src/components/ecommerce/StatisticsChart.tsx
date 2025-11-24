"use client";
import React, { useState, useEffect } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { readAllPeminjaman } from "@/lib/peminjaman";
import { FetchUsers } from "@/lib/auth";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface Peminjaman {
  id: number;
  tanggal_peminjaman: string;
}

interface User {
  id: number;
  created_at: string;
}

export default function StatisticsChart() {
  const [series, setSeries] = useState([
    { name: "Jumlah Peminjaman", data: [] },
    { name: "Pengguna Baru", data: [] },
  ]);
  const [loading, setLoading] = useState(true);

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit, sans-serif",
      markers: {
        radius: 12,
      },
      itemMargin: {
        horizontal: 10,
      }
    },
    colors: ["#465FFF", "#9CB9FF"], // Define line colors
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line", // Set the chart type to 'line'
      toolbar: {
        show: false, // Hide chart toolbar
      },
    },
    stroke: {
      curve: "straight", // Define the line style (straight, smooth, or step)
      width: [2, 2], // Line width for each dataset
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0, // Size of the marker points
      strokeColors: "#fff", // Marker border color
      strokeWidth: 2,
      hover: {
        size: 6, // Marker size on hover
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false, // Hide grid lines on x-axis
        },
      },
      yaxis: {
        lines: {
          show: true, // Show grid lines on y-axis
        },
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
    tooltip: {
      enabled: true, // Enable tooltip
      x: {
        format: "dd MMM yyyy", // Format for x-axis tooltip
      },
    },
    xaxis: {
      type: "category", // Category-based x-axis
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false, // Hide x-axis border
      },
      axisTicks: {
        show: false, // Hide x-axis ticks
      },
      tooltip: {
        enabled: false, // Disable tooltip for x-axis points
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px", // Adjust font size for y-axis labels
          colors: ["#6B7280"], // Color of the labels
        },
      },
      title: {
        text: "", // Remove y-axis title
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        setLoading(true);
        const currentYear = new Date().getFullYear();

        const [peminjamanResponse, usersResponse] = await Promise.all([
          readAllPeminjaman(),
          FetchUsers(),
        ]);

        // console.log("DEBUG: Peminjaman Response:", peminjamanResponse);
        // console.log("DEBUG: Users Response:", usersResponse);


        const peminjamanData = (peminjamanResponse?.data || []) as Peminjaman[];
        const usersData = (Array.isArray(usersResponse) ? usersResponse : []) as User[];

        const monthlyLoanCounts = Array(12).fill(0);
        peminjamanData.forEach((item) => {
          const loanDate = new Date(item.tanggal_peminjaman);
          if (loanDate.getFullYear() === currentYear) {
            monthlyLoanCounts[loanDate.getMonth()]++;
          }
        });

        const monthlyUserCounts = Array(12).fill(0);
        usersData.forEach((user) => {
          const registrationDate = new Date(user.created_at);
          if (registrationDate.getFullYear() === currentYear) {
            monthlyUserCounts[registrationDate.getMonth()]++;
          }
        });

        setSeries([
          { name: "Jumlah Peminjaman", data: monthlyLoanCounts },
          { name: "Pengguna Baru", data: monthlyUserCounts },
        ]);
      } catch (error) {
        console.error("Gagal mengambil data statistik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessData();
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Statistik Pengguna & Peminjaman
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Perbandingan pengguna baru dan peminjaman buku tahun {new Date().getFullYear()}
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          {loading ? (
            <div className="flex h-[310px] items-center justify-center">Memuat data statistik...</div>
          ) : (
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={310}
            />
          )}
        </div>
      </div>
    </div>
  );
}
