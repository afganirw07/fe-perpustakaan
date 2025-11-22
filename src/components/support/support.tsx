export default function Support() {
    return (
        <>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-8">
                
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
                    Pusat Bantuan Perpustakaan
                </h1>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Selamat datang di halaman Pusat Bantuan. Halaman ini disediakan untuk membantu 
                    Anda menyelesaikan berbagai kendala yang mungkin Anda temui saat menggunakan 
                    layanan perpustakaan digital. Kami berkomitmen memberikan pengalaman membaca 
                    yang nyaman, terstruktur, dan mudah diakses oleh setiap pengguna.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-3">
                    Tujuan Halaman Support
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Pusat Bantuan ini dirancang untuk menyediakan informasi dan panduan terkait 
                    penggunaan sistem perpustakaan. Mulai dari proses peminjaman buku, pengembalian, 
                    hingga penanganan masalah teknis yang mungkin muncul. Dengan adanya halaman ini, 
                    kami berharap setiap pengguna bisa mendapatkan solusi dengan cepat dan jelas.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-3">
                    Layanan yang Dapat Kami Bantu
                </h2>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <li>Panduan peminjaman dan pengembalian buku secara online.</li>
                    <li>Kendala dalam mengakses akun atau melakukan login.</li>
                    <li>Permasalahan terkait ketersediaan buku.</li>
                    <li>Informasi mengenai keterlambatan dan kebijakan denda.</li>
                    <li>Pembaharuan data pengguna yang tidak sesuai.</li>
                    <li>Pertanyaan umum seputar penggunaan sistem perpustakaan.</li>
                    <li>Laporan buku rusak, salah data, atau tidak muncul pada katalog.</li>
                </ul>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-3">
                    Panduan Singkat Penggunaan Sistem
                </h2>
                <ul className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <li>Masuk ke akun Anda menggunakan email dan kata sandi terdaftar.</li>
                    <li>Cari buku melalui fitur pencarian atau jelajahi kategori yang tersedia.</li>
                    <li>Buka detail buku untuk melihat deskripsi, penulis, dan status ketersediaan.</li>
                    <li>Klik tombol peminjaman apabila buku tersedia.</li>
                    <li>Pantau status peminjaman Anda melalui halaman riwayat peminjaman.</li>
                    <li>Kembalikan buku tepat waktu agar tidak terkena denda.</li>
                </ul>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-3">
                    Kebijakan dan Ketentuan Penting
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Untuk menjaga kelancaran layanan, terdapat beberapa ketentuan yang perlu diperhatikan:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <li>Pengguna wajib menjaga akun masing-masing dan tidak membagikan informasi login.</li>
                    <li>Buku yang telah dipinjam harus dikembalikan sesuai tanggal yang ditetapkan.</li>
                    <li>Keterlambatan pengembalian dapat dikenakan denda berdasarkan kebijakan perpustakaan.</li>
                    <li>Buku yang rusak atau hilang selama masa peminjaman menjadi tanggung jawab peminjam.</li>
                    <li>Pihak perpustakaan berhak memperbarui aturan sewaktu-waktu sesuai kebutuhan operasional.</li>
                </ul>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-3">
                    Kontak Dukungan
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                    Jika Anda membutuhkan bantuan lebih lanjut atau memiliki pertanyaan yang tidak 
                    terjawab dalam halaman ini, Anda dapat menghubungi tim dukungan perpustakaan melalui:
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Email: <span className="font-medium">support@perpustakaan.com</span><br />
                    Telepon: <span className="font-medium">(+62) 812-3456-7890</span><br />
                    Jam Operasional: Senin – Jumat, 08.00 – 16.00
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-10">
                    Terima kasih telah menggunakan layanan perpustakaan digital. Kami berharap 
                    halaman ini dapat membantu menjawab kebutuhan dan pertanyaan Anda dengan cepat dan tepat.
                </p>
            </div>
        </>
    );
}
