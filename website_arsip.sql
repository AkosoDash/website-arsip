-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2023 at 04:31 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `website_arsip`
--

-- --------------------------------------------------------

--
-- Table structure for table `kategori_surat`
--

CREATE TABLE `kategori_surat` (
  `id_kategori` int(10) NOT NULL,
  `nama_kategori` varchar(100) NOT NULL,
  `judul_kategori` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategori_surat`
--

INSERT INTO `kategori_surat` (`id_kategori`, `nama_kategori`, `judul_kategori`) VALUES
(1, 'asdawdasdawdas', 'hohohoadawasdaw'),
(2, 'gatau juga saya', 'saya juga gatau'),
(3, 'testes', 'ini surat bukan sembarang surat loo'),
(4, 'adadada', 'sdsdsdsd'),
(5, 'hohoho', 'hihihi');

-- --------------------------------------------------------

--
-- Table structure for table `surat`
--

CREATE TABLE `surat` (
  `id_surat` int(11) NOT NULL,
  `nomor_surat` varchar(100) NOT NULL,
  `kategori` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `id_pdf` varchar(255) NOT NULL,
  `pdf_file` varchar(255) NOT NULL,
  `waktu_pengarsipan` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `surat`
--

INSERT INTO `surat` (`id_surat`, `nomor_surat`, `kategori`, `judul`, `id_pdf`, `pdf_file`, `waktu_pengarsipan`) VALUES
(1, '222/111/33322', 5, 'heheheheadaada', '1mHEj2eEvs3uLut3z3iLR76ZSzWrp37uP', 'https://drive.google.com/uc?view&id=1mHEj2eEvs3uLut3z3iLR76ZSzWrp37uP', '2023-11-15'),
(3, '123/123/1/2', 1, 'adasdawd', '1CYAdKXVr6QqnBdVgbQg_LDn0nXUPWpr7', 'https://drive.google.com/uc?view&id=1CYAdKXVr6QqnBdVgbQg_LDn0nXUPWpr7', '2023-11-15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kategori_surat`
--
ALTER TABLE `kategori_surat`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `surat`
--
ALTER TABLE `surat`
  ADD PRIMARY KEY (`id_surat`),
  ADD KEY `kategori` (`kategori`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `surat`
--
ALTER TABLE `surat`
  MODIFY `id_surat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `surat`
--
ALTER TABLE `surat`
  ADD CONSTRAINT `surat_ibfk_1` FOREIGN KEY (`kategori`) REFERENCES `kategori_surat` (`id_kategori`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
