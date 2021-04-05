-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 05, 2021 lúc 11:10 AM
-- Phiên bản máy phục vụ: 10.4.18-MariaDB
-- Phiên bản PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ql_todo_list`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `id_ground` text DEFAULT NULL,
  `username` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `fullname` text DEFAULT NULL,
  `birthday` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `id_ground`, `username`, `password`, `fullname`, `birthday`) VALUES
(3, NULL, 'admin', '12345', 'Nguyễn Văn Thành', '2000-06-12'),
(4, NULL, 'Hoang', '12345', 'Ngô Văn Hoang', '2000-06-12'),
(5, NULL, 'Hoang3', '12345', 'Ngô Văn Hoang3', '2000-06-12'),
(6, NULL, 'Khai', '12345', 'Ngô Văn Khai', '2000-06-12'),
(7, NULL, 'Khai', '12345', 'Ngô Văn Khai', '2000-06-12'),
(8, NULL, 'Khai', '12345', 'Ngô Văn Khai', '2000-06-12'),
(9, NULL, 'Khai', '12345', 'Ngô Văn Khai', '2000-06-12');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ground`
--

CREATE TABLE `ground` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `password_ground` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `ground`
--

INSERT INTO `ground` (`id`, `name`, `password_ground`) VALUES
(1, 'nhóm lập trình adroid', '12345'),
(3, 'nhóm lập trình ios', '12345'),
(4, 'nhóm lập trình c++', '465321');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `member_ground`
--

CREATE TABLE `member_ground` (
  `id` int(11) NOT NULL,
  `id_ground` int(11) NOT NULL,
  `id_account` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `member_ground`
--

INSERT INTO `member_ground` (`id`, `id_ground`, `id_account`) VALUES
(1, 1, 3),
(4, 1, 7),
(3, 4, 7);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `works`
--

CREATE TABLE `works` (
  `id` int(11) NOT NULL,
  `id_account` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `works`
--

INSERT INTO `works` (`id`, `id_account`, `content`) VALUES
(1, 3, 'làm thực tập cơ sở'),
(2, 3, 'làm thực tập cơ sở3'),
(3, 3, 'làm thực tập cơ sở2'),
(4, 3, 'làm thực tập android'),
(5, 3, 'làm thực tập android 3'),
(6, 3, 'làm thực tập android 9'),
(7, 3, 'làm thực tập thầy Tân'),
(11, 3, 'báo cáo thực tập cơ sở');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `work_ground`
--

CREATE TABLE `work_ground` (
  `id` int(11) NOT NULL,
  `id_ground` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `work_ground`
--

INSERT INTO `work_ground` (`id`, `id_ground`, `content`) VALUES
(1, 4, ' nhat la dda ong bo'),
(2, 4, 'choi boi'),
(3, 4, 'di bao cao thay co'),
(4, 4, 'báo cáo tiến độ'),
(5, 3, 'di hoc sql'),
(6, 3, 'di hoc sql');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `ground`
--
ALTER TABLE `ground`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `member_ground`
--
ALTER TABLE `member_ground`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_ground` (`id_ground`,`id_account`),
  ADD KEY `id_account` (`id_account`);

--
-- Chỉ mục cho bảng `works`
--
ALTER TABLE `works`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_account` (`id_account`);

--
-- Chỉ mục cho bảng `work_ground`
--
ALTER TABLE `work_ground`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `ground`
--
ALTER TABLE `ground`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `member_ground`
--
ALTER TABLE `member_ground`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `works`
--
ALTER TABLE `works`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `work_ground`
--
ALTER TABLE `work_ground`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `member_ground`
--
ALTER TABLE `member_ground`
  ADD CONSTRAINT `member_ground_ibfk_1` FOREIGN KEY (`id_ground`) REFERENCES `ground` (`id`),
  ADD CONSTRAINT `member_ground_ibfk_2` FOREIGN KEY (`id_account`) REFERENCES `account` (`id`);

--
-- Các ràng buộc cho bảng `works`
--
ALTER TABLE `works`
  ADD CONSTRAINT `works_ibfk_1` FOREIGN KEY (`id_account`) REFERENCES `account` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
