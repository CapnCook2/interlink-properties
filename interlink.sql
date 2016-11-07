-- phpMyAdmin SQL Dump
-- version 2.11.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 10, 2016 at 06:50 AM
-- Server version: 5.1.57
-- PHP Version: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `a4256217_interli`
--

-- --------------------------------------------------------

--
-- Table structure for table `rent`
--

DROP TABLE IF EXISTS `rent`;
CREATE TABLE IF NOT EXISTS `rent` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `added` timestamp NULL DEFAULT NULL,
  `name` varchar(25) COLLATE latin1_general_ci DEFAULT NULL,
  `bhk` varchar(25) COLLATE latin1_general_ci DEFAULT NULL,
  `phone` varchar(25) COLLATE latin1_general_ci DEFAULT NULL,
  `rent` varchar(25) COLLATE latin1_general_ci DEFAULT NULL,
  `address` varchar(25) COLLATE latin1_general_ci DEFAULT NULL,
  `sector` varchar(25) COLLATE latin1_general_ci DEFAULT NULL,
  `bachelors` tinyint(1) DEFAULT NULL,
  `job` tinyint(1) DEFAULT NULL,
  `business` tinyint(1) DEFAULT NULL,
  `type` varchar(25) COLLATE latin1_general_ci DEFAULT NULL,
  `rooms` tinyint(1) DEFAULT NULL,
  `kitchen` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=24 ;

--
-- Dumping data for table `rent`
--

INSERT INTO `rent` VALUES(23, '2016-10-10 06:43:19', 'himank', '3BHK', '678217638', '56235748', 'ncjksn jciwojo 3213 iwnom', '23', 1, 1, 0, 'Flat', 0, 1);
INSERT INTO `rent` VALUES(2, '2016-10-10 06:45:20', 'nagpal', '2BHK', '67432876', '748923', 'ncfkjwdn njsdknvc', '12', 1, 0, 1, 'Independent Floor', 1, 0);
