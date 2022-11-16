-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : sam. 15 oct. 2022 à 15:30
-- Version du serveur : 5.7.33
-- Version de PHP : 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `job_board_epitech`
--

-- --------------------------------------------------------

--
-- Structure de la table `advertisements`
--

CREATE TABLE `advertisements` (
  `id` int(11) NOT NULL,
  `jobName` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `typeContract` varchar(255) NOT NULL,
  `skill` json NOT NULL,
  `companies_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `advertisements`
--

INSERT INTO `advertisements` (`id`, `jobName`, `description`, `typeContract`, `skill`, `companies_ID`) VALUES
(4, 'bonniche', 'passe ton balai jul et ferme ta gueule', 'cdi, 1h par mois a temps plein', '{\"skill\": [\"bien tenir son balai et pas jouer au Quidditch en mode harry potter\"]}', 4),
(6, 'bonniche du bled', 'passe ton balai jul et ferme ta gueule', 'cdi, 1h par mois a temps plein', '{\"skill\": [\"bien tenir son balai et pas jouer au Quidditch en mode harry potter\"]}', 4),
(7, 'Dev Web ', 'c\'est en codant n\'importe comment que l\'on devient n\'importe qui', 'CDD', '{\"skill\": [\"Express\", \"CSS\", \"JS\"]}', 6),
(8, 'Boulanger', 'Faire du pain et des croissants', 'CDI', '{\"skill\": [\"manier la pâte\", \"faire dorée le croissant\"]}', 13),
(9, 'osef', 'osef', 'CDD', '{\"skill\": \"[\'osef\',\'osef\',\'osef\']\"}', 4);

-- --------------------------------------------------------

--
-- Structure de la table `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `adress` text NOT NULL,
  `people_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `companies`
--

INSERT INTO `companies` (`id`, `name`, `adress`, `people_ID`) VALUES
(4, 'la maison du balai', '69, rue du trou noir', NULL),
(5, 'la maison du balai', '69, rue du trou noir', NULL),
(6, 'DEV ACADEMY', '35 rue du chameau', NULL),
(7, 'plk', 'ok', NULL),
(9, 'Louloic', 'ok', NULL),
(10, 'dddd', 'ok', NULL),
(11, 'okokoko', 'kokokoko', NULL),
(12, 'rzerzer', 'ezrezrez', 43),
(13, 'andra N co', 'blabla', 55),
(14, 'ok', 'ok', 95),
(15, 'loic ok', 'loic ok', 96),
(16, 'max', 'ime', 104),
(17, 'dim', 'mea', 105),
(18, 'bb', 'bb', 107),
(19, 'a', 'a', 108),
(20, 'pp', 'pp', 109),
(21, 'qqqq', 'qqqqq', 112),
(22, 'susuusu', 'suuusus', 113),
(23, 'ffff', 'ffff', 114),
(24, 'ggg', 'ggg', 116);

-- --------------------------------------------------------

--
-- Structure de la table `jobinfo`
--

CREATE TABLE `jobinfo` (
  `id` int(11) NOT NULL,
  `advertisements_ID` int(11) NOT NULL,
  `companies_ID` int(11) DEFAULT NULL,
  `people_ID` int(11) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `jobinfo`
--

INSERT INTO `jobinfo` (`id`, `advertisements_ID`, `companies_ID`, `people_ID`, `message`) VALUES
(4, 4, NULL, 7, 'loulou-epitech@gmail.com'),
(5, 4, NULL, 7, 'test-finaldujob-info@gmail.com'),
(6, 4, NULL, 53, 'good good'),
(7, 7, 6, 54, 'devjunior'),
(8, 7, 6, 56, 'hyhyhyhyhhyyhy'),
(9, 4, 4, 60, 'test'),
(10, 4, 4, 60, 'aaaa'),
(11, 8, 13, 74, 'aaaaaaa'),
(12, 4, 4, 74, 'aaaa'),
(13, 4, 4, 74, 'aaaa'),
(14, 4, 4, 74, 'aaaa'),
(15, 7, 6, 75, 'a'),
(16, 4, 4, 78, 'rgergreger'),
(17, 8, 13, 83, 'loic is ready'),
(18, 8, 13, 83, 'loic is ready'),
(19, 9, 4, 42, 'blaablalblla'),
(20, 4, 4, 102, 'aaaaa'),
(21, 4, 4, 103, 'bonjour maxime'),
(22, 7, 6, 104, 'je suis chaud'),
(23, 4, 4, 111, 'qq');

-- --------------------------------------------------------

--
-- Structure de la table `people`
--

CREATE TABLE `people` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `tel` int(15) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `companies_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `people`
--

INSERT INTO `people` (`id`, `firstName`, `lastName`, `tel`, `mail`, `password`, `role`, `companies_ID`) VALUES
(7, 'louloulc9', 'defre', 653454525, 'd.fressine@gmail.com', 'loulou', 'admin', NULL),
(8, 'dimitri', 'defre', 653774725, 'dfsfsd.fressine@gmail.com', 'losdulou', 'admin', NULL),
(9, 'dimitri69', 'defre', 635353535, 'dimitri@gmail.com', 'losdulou', 'admin', NULL),
(10, 'dimitri69', 'defre', 0, 'loulou@gmail.com', 'losdulou', 'admin', NULL),
(11, 'kika', 'd\'amour', 0, 'kika@gmail.com', 'losdulou', 'admin', NULL),
(12, 'mes filles', 'd\'amour', 0, 'lovefamily@gmail.com', 'losdulou', 'admin', NULL),
(13, 'Dimitri', 'Meavilla', 0, 'test@test.com', '3783783783', '0', NULL),
(14, 'Dimitri', 'Meavilla', 0, 'test@tehtjst.com', '7378378378387', '0', NULL),
(15, 'Dimitri', 'Meavilla', 0, 'test@tehtjst.com', '7378378378387', '0', NULL),
(16, 'Dimitri', 'Meavilla', 0, 'test@tehtjst.com', '7378378378387', '0', NULL),
(17, 'Dimitri', 'Meavilla', 0, 'test@tehtjst.com', '7378378378387', '0', NULL),
(18, 'Dimitri', 'Meavilla', 0, 'test@tehtjst.com', '7378378378387', '0', NULL),
(19, 'Dimitri', 'Meavilla', 0, 'test@tehtjst.com', '7378378378387', '0', NULL),
(20, 'Dimitri', 'Meavilla', 0, 'test@tegrgergst.com', 'grehzthzthzth', '0', NULL),
(22, 'Dimitri', 'fezf', 0, 'test@tehtfefezfjst.com', 'efezfezfezf', '0', NULL),
(23, 'andra', 'petite', 0, 'petiteandrea@test.fr', 'andra', '1', NULL),
(24, 'loulouyuu', 'lololol', 0, 'lolol@lol.com', 'lololo', '1', NULL),
(25, 'Dimitri', 'lou', 0, 'loud@ff.fr', 'okokooko', '1', NULL),
(26, 'andra', 'petite', 0, 'test@ddtest.com', 'dd', '1', NULL),
(27, 'andra', 'petite', 0, 'test@tesjjjjjjjjjt.com', 'jj', '1', NULL),
(28, 'andra', 'fezf', 635353535, 'test@tesaaaaaaaaat.com', 'aaaaaaaaaa', '0', NULL),
(29, 'Dimitri', 'Meavilla', 3783378, 'taaaaest@tehtjst.com', 'aaaaaaa', '0', NULL),
(30, 'andra', 'petite', 635353535, 'petiteaaaaaaandrea@test.fr', 'aaaaaaaaaaa', '0', NULL),
(31, 'andra', 'petite', 635353535, 'petiteaaaaaaaaaaandrea@test.fr', 'aaaaaaaaaaa', '0', NULL),
(32, 'Dimitri', 'Meavilla', 51151151, 'tes555t@test.com', '51151', '1', NULL),
(33, 'Dimitri', 'Meavilla', 51151151, 'tesijijij555t@test.com', '51151', '1', NULL),
(34, 'Dimitri', 'Meavilla', 84848848, 'meaviijijlla.73@gmail.com', '84844848', '1', NULL),
(35, 'Dimitri', 'Meavilla', 635353535, 'petiteandreijijiia@test.fr', 'ijijiji', '0', NULL),
(36, 'Dimitri', 'fezf', 635353535, 'petaaaiteandrea@test.fr', 'aaaa', '0', NULL),
(37, 'Dimitri', 'fezf', 635353535, 'petaaaaaaaiteandrea@test.fr', 'aaaa', '1', NULL),
(38, 'loulouyuu', 'lou', 635353535, 'teuhuhuhst@tehtfefezfjst.com', 'uhuhuhuhu', '1', NULL),
(39, 'Dimitri', 'lololol', 6060606, 'tesokot@tehtjst.com', '484848484', '1', NULL),
(40, 'Dimitri', 'Meavilla', 635353535, 'test@testpppppppp.com', '85858585', '', NULL),
(41, 'hector', 'hector', 635353535, 'hector@hector.com', 'hhh', '1', NULL),
(42, 'andra', 'Meavilla', 635353535, 'test@teaazaerazrazrst.com', 'razrazr', '1', NULL),
(43, 'Dimitri', 'rezrzer', 635353535, 'hecrzerzerzetor@hector.com', 'rezrze', '1', NULL),
(44, 'await', 'await', 635353535, 'awaisync@test.com', 'fefze', '0', NULL),
(45, 'andra', 'Meavilla', 635353535, 'st@tegrgergst.com', 'gregerger', '', NULL),
(46, 'Nadjat', 'lou', 635353535, 'teffffffffffst@tehtfefezfjst.com', 'fffffffffffffffffffffffffff', '', NULL),
(47, 'Nadjat', 'fezfezf', 635353535, 'test@tefzefezfezfezfzest.com', 'brebeberb', '', NULL),
(48, 'Nadjat', 'lou', 635353535, 'meavilla.7eeee3@gmail.com', 'eeeeeeeeeee', '', NULL),
(49, 'Dimitri', 'Meavilla', 635353535, 'tefzefst@testzfez.com', 'ezfezfze', '', NULL),
(50, 'Nadjat', 'fzeeeeee', 635353535, 'tesnnuyt@test.com', 'hg,hggh,hg', '', NULL),
(51, 'hector', 'lou', 635353535, 'test@teshhhhhhhht.com', 'hhhhhhhhhh', '', NULL),
(52, 'Dimitri', 'Meavilla', 635353535, 'meavillarr.73@gmail.com', 'rrrr', '', NULL),
(53, 'Dimitri', 'lou', 635353535, 'tesddddddddddddt@tehtfefezfjst.com', 'dddddddddddddddddddd', '', NULL),
(54, 'devjunior', 'devjunior', 635353535, 'devjunior@devjunior.cm', 'devjunior', '', NULL),
(55, 'Dimitri', 'Meavilla', 635353535, 'tesfffffffffffffffffffffft@test.com', 'ehtrhzrh', '1', NULL),
(56, 'Dimitri', 'Meavilla', 635353535, 'tgtgtgtgest@test.com', '5181818181', '', NULL),
(57, 'Dimitri', 'fezf', 635353535, 'test@tqssqsqsest.com', '$2b$10$FWmh.pk6KLm8LmOu1PKa4uqV3nbcpXX.drlwm0f3mivwQD1.w7dfW', '', NULL),
(58, 'Dimitri', 'Meavilla', 635353535, 'tesaaaaat@tehtfefezfjst.com', '$2b$10$.0aBczIs//6ca6fhIUKjueTJ0udDMvkOranv7ky3TPm3vr/3GUlg.', '', NULL),
(59, 'Dimitri', 'Meavilla', 635353535, 'testToken@mail.com', '$2b$10$XDPQaTxOOfQXgzXcy/2XKuHw9n2Z922hYka5M9nNK7M4KhegJe69C', '0', NULL),
(60, 'aa', 'bb', 635353534, 'aa@aa.com', '$2b$10$QhE7FRXo66ntkSBZSMytvOUzhVwPDHulc8nHZuCn58L0IJqtYn4oq', '1', 4),
(61, 'hector', 'hector', 635353535, 'tesaeaeaaaaaaat@test.com', '$2b$10$cMqXW/Xs5BH3FjvTDUXoVODZOSFoD026DDP38/JOmWa5Ph8XgULCe', '', NULL),
(62, 'andra', 'fezf', 635353535, 'tesaaaat@test.com', '$2b$10$oTO6fbX/oMAdNXEN6ftT4upqFzQpZl20yI4D.PxIroJ1QIrzs62jK', '', NULL),
(63, 'devjunior', 'petite', 635353535, 'meazzzzvilla.73@gmail.com', '$2b$10$5Yyiq68sjZXH5VS53ga.p.nwPYOr5yVstsVdDLw4o43O50ZikT.OK', '', NULL),
(64, 'andra', 'Meavilla', 635353535, 'meaaaaavilla.73@gmail.com', '$2b$10$5gei57/w2YMgdFOHkpvZ1uVPgxDd4VBgBsN3E178ItZjhNSaOMkhS', '', NULL),
(65, 'Dimitri', 'await', 635353535, 'aaa@aa.com', '$2b$10$ukDXDQHzmc1eHLgyuXLgnO5VIZtYnhA4L2Aw2nyiAku1zahxcQ07e', '', NULL),
(66, 'hector', 'zzz', 635353535, 'aa@azzza.com', '$2b$10$VH.OJSUQ55eivjpb7teWr.iEz/h3v16w1kGP/feXUUwLPggGhSRxe', '', NULL),
(67, 'ggg', 'ggg', 635353535, 'asssa@aa.com', '$2b$10$TcImqCxNsJoIToe2QSjTV.pofPFf2gl/vnGpL31YYjULvIRJkTJia', '', NULL),
(68, 'Dimitri', 'fezf', 635353535, 'aa@aaaaaaa.com', '$2b$10$Uqnd6L.qWS0BL0KOxdD3ie4F/fbOpzWyB6zV1vg24FEZ2TyopiO.C', '', NULL),
(69, 'Dimitri', 'Meavilla', 635353535, 'aaaaa@aa.com', '$2b$10$lQLbfMgAWHHNK0RzrklhLOxfr/E2.8Iu3WKUIfgtDFwORMLGNlxXa', '', NULL),
(70, 'Dimitri', 'Meavilla', 635353535, 'aaaaaaaaaaaaa@aa.com', '$2b$10$.gNIvPZi3QrtkZSSo/EyUO/IYJmLYWKVfJnGRHVykcBRMv98ierxC', '', NULL),
(71, 'test', 'test', 635353535, 'test@teshhhtht.com', '$2b$10$xEIbzB4Y22Kw0EXnoIwgQujsdF9iSpz3I/O0yfuZ1Uza8NBwXB2nC', '', NULL),
(72, 'loulouyuu', 'lololol', 635353535, 'test@tehtjszzzzzzzzzt.com', '$2b$10$m1.oh7RCEhMINBMIST7Vq.wZwsdUDfQ.9YJPs28Vi5nRdv1Be6WJu', '0', NULL),
(73, 'Dimitri', 'petite', 635353535, 'tessssssst@tehtjst.com', '$2b$10$PL8hrZw86Yn7zVjKfkSv7O1PRo9GR31yuOFkBys7.MnzOMVNhwSN2', '0', NULL),
(74, 'Dimitri', 'lou', 635353535, 'testaaaaaaaaaaaaaaa@tehtjst.com', '$2b$10$hCFkpudV5pG0wQUdHN5Xgu7OOAiGxZn6/GqaBDvXBTYBakEcDnydm', '0', NULL),
(75, 'fy', 'gy', 635353535, 'a@a.a', '$2b$10$3UNBmFJYTgLQlGZB60bRuu4J/ExGcuj5Fq24sN8dw/ex5yvLAUoTC', '0', NULL),
(76, 'andra', 'Meavilla', 37833744, 'tezzzzst@tehtjst.com', '$2b$10$ZTlam787NCUXElMIrzjElOYPUuX4CiykAZee8qY4NvyLapL691tWK', '0', NULL),
(77, 'andra', 'Meavilla', 37833744, 'tezgrgegerzzzst@tehtjst.com', '$2b$10$YPUttG3lpn9ab/yCrY2snurVPoTADTw2cCu.Toip8puj6pRCZkWUC', '0', NULL),
(78, 'andra', 'reggerger', 635353535, 'a@arr.a', '$2b$10$LHXWL6xV7zKxYwKY3lmMRui.ywHCsPvA.JwxxIrn5UeAHt44/vQlO', '0', NULL),
(79, 'tyty', 'hulk', 635353535, 'abc@abc.com', '$2b$10$mSDPtMGRS1jkngfkVo5vCePCrnvLBBCK0Cjj8EWlvlAAMSadrODKK', '0', NULL),
(80, 'tutu', 'tutu', 635353535, 'tutu@tutu.tutu', '$2b$10$dm2hBF3TlHYgRDETxsoiFOgZGVC.XvMKKlRtQLcPltyrQmmhULOfa', '0', NULL),
(81, 'loulouyuu', 'lou', 635353535, 'a@a.aaaaaaa', '$2b$10$EAm9qwWzmwg2O2uzx2rQE..osdEcDqQSFlutggoumVOl..S6xs3Pm', '0', NULL),
(82, 'cbon', 'cbonbonbon', 635353535, 'cbon@cbon.cbon', '$2b$10$tOHejRBnOZrZ/lPHgHF9Ue2tG8s/Ara2bV11Zi2DoQ1g2BJxRFgPe', '0', NULL),
(83, 'loic', 'loic', 635353535, 'loic@loic.loic', '$2b$10$lEcT1hvt0nkL3o/JpBqACeBzJfmBtazkA3a0wc7WDGKiMaJ.KswxC', '0', NULL),
(84, 'dim', 'dim', 635353535, 'dim@dim.dim', '$2b$10$2vrR0CwkJpuSfkXrd5xad.d6sphKAO9E6DCLWCn1VQlIzsqdKfree', '1', NULL),
(85, 'dim2', 'dim2', 635353535, 'dim2@dim2.dim', '$2b$10$otcZNJd8/bZNNRP.sDG.Tu6az/jew5BClo/zceMj/17YY1ZEG/UTO', '1', NULL),
(86, 'ok', 'ok', 635353535, 'ok@ok.okokokok', '$2b$10$9vILFN3/oThrVKDjkvVcXuXBsE6L4Ut88rUfUDJlDYmMidV7.se6i', '1', NULL),
(87, 'pl', 'pl', 635353535, 'pl@pl.pl', '$2b$10$F44xJQxvSdGWfIn33zmJNeqyxM/7yvhR0jXptMckzdS777huPRtku', '1', NULL),
(88, 'oki', 'oki', 635353535, 'oki@oki.oki', '$2b$10$2JwMpl8YM0qQdZHCc.41HOCA34YT7dzmzRWQNYianF64k8D8mvT3W', '1', NULL),
(89, 'lol', 'ool', 635353535, 'ol@lol.lo', '$2b$10$pBILlx467wON4G5mBwJFFOKR0g0mJIAE8fQYNSCfJT42qVPuMdNai', '1', NULL),
(90, 'loulouyuu', 'fezf', 635353535, 'okkk@ok.ok', '$2b$10$jtioCPsiF9T/Ah5NMe1T3OQLY8owTBBYviNmiXVzgD0AuklZ0j5NS', '1', NULL),
(91, 'final', 'fiznl', 635353535, 'fi@fi.fi', '$2b$10$Q5sNJ1uiNd.LxopdTmKZz.cYt54LmEGmFuqbf8d4euXfWSGIhfX/C', '1', NULL),
(92, 'Dimitri', 'Meavilla', 635353535, 'aaaaaaaaaaaaaaaaaaaaa@aa.com', '$2b$10$ZFVW279bANSJ3tb7OjtWxepoiP2K5eaHJclbcSff3uGpOeiInf6Ym', '1', NULL),
(93, 'ok', 'ok', 635353535, 'asasadtest@test.com', '$2b$10$brPRnuRqyIgFS4g2RUmndOZOJ0wV9nC9RG2ytmu9ehMDjz/p7gbPW', '1', NULL),
(94, 'pk', 'pk', 635353535, 'pk@pk.pk', '$2b$10$QaFRa/W87bx.Ie.GTQ/ifutramqtbQIu/7hx2MXhkuyNdFPt0R7N2', '1', NULL),
(95, 'Dimitri', 'dim', 635353535, 'ok@okokok.ok', '$2b$10$FCAX7GsbiDrNpIjJJjXIS.6fnJpXgV3p4XgeF7L.ypDtWM12U8IJO', '1', NULL),
(96, 'loicok', 'loicok', 635353535, 'loicok@loic.loic', '$2b$10$fyxaTgHH6yhYF15c0A2qAur0wAg4sMaHHWEdT/0i9tfPShaOHyXMe', '1', NULL),
(98, 'admin', 'duSite', 635353535, 'admin@duSite.com', '$2b$10$KUH.LVHdQCHV7MZOscLlTub.dH5jqugkc7Y9VBZ0jSs7nY5T0eqcK', '2', NULL),
(99, 'devjunior', 'test', 635353535, 'role0@gmail.com', '$2b$10$Y8BstXyz2RGo66glp9kWiep3jiw4RzH2PeCAXjOPL.QAVcNYtd99q', '0', NULL),
(100, 'loulouyuu', 'a', 635353535, 'aaaaaaaa@aa.com', '$2b$10$9Z6YGeLwPi3kSL.c/vYguOowmtwca.hvH52pNqSuGgb2J2twydNRq', '0', NULL),
(101, 'andra', 'Meavilla', 635353535, 'aaaaaa@aa.com', '$2b$10$deJAnjI3H987iA6YOZI97.fWmE3N.QsGy5NAhwebBm/nDKYoatTqC', '0', NULL),
(102, 'Dimitri', '', 635353535, '', '$2b$10$0Tk3f7G/F6dUgHIB08smuOm.wTsMI5YemUZ1hybD1aMUw8C4/pH5O', '0', NULL),
(103, 'Dimitri', 'Meavilla', 635353535, 'aa@aa888888888.com', '$2b$10$ni8767.4QCetvQBFOBw1L.N34jUdZM82vbxfHWn2j3/H7Nl9lLKjy', '0', NULL),
(104, 'max', 'ime', 635353535, 'max@ime.fr', '$2b$10$jQJACTR/aqopAM3adFVvueBHTN383h8TwgrSm4nBHMVP9Dq0Ngm5K', '1', NULL),
(105, 'dim', 'mea', 635353535, 'dim@mea.com', '$2b$10$ChIKby0IHNXi0oMLTzlgzO0wPLJ3iVnWls6rDc2/WV.bWfwqcWou.', '1', NULL),
(106, 'andra', 'fezf', 635353535, 'bb@bb.com', '$2b$10$IdrZ57S5GLc0FhAvWC2upe4luwe9Gr3/Q.vUcxVj41uPEY0XQQboC', '1', NULL),
(107, 'devjunior', 'lou', 635353535, 'aab@aa.com', '$2b$10$8Duwu7pseOyRkhmpz20ee.u3cqD2To/F15gfHXEopVrteTf6vA0tW', '1', NULL),
(108, 't', 't', 635353535, 'aaaaasassasasaa@aa.com', '$2b$10$zlMcFjBt3Ihibxp0Ljz.8.AznxsJUOZxbSI18WH1ZZq4tq0kerBaK', '1', NULL),
(109, 'pp', 'pp', 635353535, 'aa@pppaa.com', '$2b$10$jp8IQyOTHMTyaVqi0Vn2tekMdBqGCDuIkcYIXaH8a1/2z5ur/Pa36', '1', NULL),
(110, 'Dimitri', 'Meavilla', 635353535, 'okok@okokoko.com', '$2b$10$ZRzo0tYuwMcskPNYBwF.O.JjpX9kbjmSEs1440XJPUFeT4xUq4Sgi', '1', NULL),
(111, 'hector', 'victor', 635353535, 'qq@qq.qq', '$2b$10$XwJXZGvyHaNkLIOT55Aaa.kP6EoOgS8hAz6NWpf4btyTiwUcO5LUC', '0', NULL),
(112, 'hector', 'qqq', 635353535, 'aqqqqqa@aa.com', '$2b$10$KCvfvK0id1FHCBDIjbHH1.CwaL7yb/srneTGECNFR3f1Qy9RQXxdS', '1', NULL),
(113, 'Dimitri', 'Meavilla', 635353535, 'uuuuuuuuuutest@tehtjst.com', '$2b$10$D.AohMDqf1FRGWH.q4sryeXJ0Dm9cCpKax69d2HlWYi8PX66DmWUG', '1', NULL),
(114, 'Dimitri', 'Meavilla', 635353535, 'aaaaaaaaaaaaaaaaffefefeffaaaaa@aa.com', '$2b$10$BdEuZo.vjsFJvT6QvG89n.cZI9l73T0H3g/P.OcsDXtu6ZqTUXIeS', '1', NULL),
(115, 'Nadjataa', 'aaa', 635353535, 'test@tesddddddt.com', '$2b$10$4hBtRwHz.b8v8YhnA/vou.jCLohrME1T2b64hz34Jv0RyKm2m0AEm', '1', NULL),
(116, 'hector', 'petite', 635353535, 'hector@hecto.com', '$2b$10$5p.VUO0.HWdUwEvPPpJ/HuhVclsYYP9juLz74p.mPx50oPNtXFrcu', '1', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `advertisements`
--
ALTER TABLE `advertisements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companies_ID` (`companies_ID`);

--
-- Index pour la table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `people_ID` (`people_ID`);

--
-- Index pour la table `jobinfo`
--
ALTER TABLE `jobinfo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `advertisements_ID` (`advertisements_ID`),
  ADD KEY `people_ID` (`people_ID`),
  ADD KEY `companies_ID` (`companies_ID`);

--
-- Index pour la table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companies_ID` (`companies_ID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `advertisements`
--
ALTER TABLE `advertisements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `jobinfo`
--
ALTER TABLE `jobinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `people`
--
ALTER TABLE `people`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `advertisements`
--
ALTER TABLE `advertisements`
  ADD CONSTRAINT `advertisements_ibfk_1` FOREIGN KEY (`companies_ID`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`people_ID`) REFERENCES `people` (`id`);

--
-- Contraintes pour la table `jobinfo`
--
ALTER TABLE `jobinfo`
  ADD CONSTRAINT `jobinfo_ibfk_271` FOREIGN KEY (`advertisements_ID`) REFERENCES `advertisements` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jobinfo_ibfk_272` FOREIGN KEY (`companies_ID`) REFERENCES `companies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `jobinfo_ibfk_273` FOREIGN KEY (`people_ID`) REFERENCES `people` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `people`
--
ALTER TABLE `people`
  ADD CONSTRAINT `people_ibfk_1` FOREIGN KEY (`companies_ID`) REFERENCES `companies` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
