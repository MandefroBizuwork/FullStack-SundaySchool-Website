-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2025 at 04:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sundayschool`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `CATID` int(11) NOT NULL,
  `CATGORYNAME` varchar(200) NOT NULL,
  `DATECREATED` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`CATID`, `CATGORYNAME`, `DATECREATED`) VALUES
(1, 'የመጽሐፍ ቅዱስ ጥናት', '0000-00-00 00:00:00'),
(3, 'የቤተክርስቲያን ታሪክ', '2025-10-10 13:08:12'),
(4, 'የመዝሙር ትምህርት', '2025-10-10 13:08:26');

-- --------------------------------------------------------

--
-- Table structure for table `contents`
--

CREATE TABLE `contents` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(400) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contents`
--

INSERT INTO `contents` (`id`, `title`, `category`, `description`, `content`, `event_date`, `file_path`, `created_at`, `updated_at`) VALUES
(5, 'የእድል እና መንፈሳዊ ስርአት ክስተት', 'ክንውን', 'በዚህ ጊዜ ተማሪዎች በመንፈሳዊ ትምህርቶች ላይ ተሳትፈዋል...', '<h3><strong>በዚህ ጊዜ ተማሪዎች በመንፈሳዊ ትምህርቶች ላይ ተሳትፈዋል።</strong></h3><h4>በዚህ ክስተት የተወዳጁ አስተምህሮች ተሳትፈው በመንፈሳዊ ስራ ተጋብዙ።</h4>', '0000-00-00', 'public/uploads/1760419335761.png', '2025-10-14 05:22:15', '2025-10-14 05:48:03'),
(7, 'የእድል እና መንፈሳዊ ስርአት ክስተት', 'ክንውን', 'በዚህ ጊዜ ተማሪዎች በመንፈሳዊ ትምህርቶች ላይ ተሳትፈዋል', '<h5><strong>ዝርዝር ጽሑፍ —</strong> <em>ይህ የእድል እና መንፈሳዊ ስርአት ክስተት በትምህርት ቤታችን የተደረገ ሲሆን ተማሪዎች ለተለያዩ እምነታዊ እና ባህላዊ ጉዳዮች እውቀት አግኝተዋል።</em></h5>', '2025-10-15', 'public/uploads/1760419809381.jfif', '2025-10-14 05:30:09', '2025-10-14 05:49:20'),
(8, 'አዲስ ኮርስ የተጀመረ — የመንፈሳዊ መርማሪያ ለጀማሪዎች...', 'ትምህርት', 'በዚህ ጊዜ ተማሪዎች በመንፈሳዊ ትምህርቶች ላይ ተሳትፈዋል', '<h5>ዝርዝር ጽሑፍ — እንኳን ደህና መጡ፤ ይህ ኮርስ የጥናት ማዕከል እና የመማር መንገድ ነው።</h5>', '2025-10-16', 'public/uploads/1760419856422.jpg', '2025-10-14 05:30:56', '2025-10-14 05:49:43'),
(9, 'የመዝሙር ደረጃ ማስተካከያ', 'መዝሙር', 'በመዝሙር ክፍል አዲስ ማስተካከያዎች ተደርጓል..', '<h5>ዝርዝር ጽሑፍ — የመዝሙር አቅምን ለማሳደግ እንቅስቃሴ የተዘጋጅቷል።</h5>', '2025-10-16', 'public/uploads/1760419909732.jpg', '2025-10-14 05:31:49', '2025-10-14 05:50:02');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `subtitle` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `catid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `Title`, `subtitle`, `description`, `catid`) VALUES
(17, 'የመጽሐፍ ቅዱስ ጽሁፎች በምን ላይ ነበር የተጻፉት?', '', '<h2 class=\"ql-align-justify\"><strong>በጥንት ዘመን ጽሑፎች የሚፃፉት በድንጋይ፣ በሸክላ ጡቦች፣ ለመጻፊያ በተዘጋጀ ፓፒረስ፣ በተፋቁ የእንሰሳት ቆዳዎች ወይም</strong> ብራናዎች፣ በእንጨት፣ በዝሆን ጥርስ፣ በስብርባሪ ሸክላዎች፣ በብረት ዕቃዎች ላይ ነበር። በመጨረሻ በእኛ ዘመን በወረቀት ላይ ሆነ። የአፃፃፍ ሂደቱ ደግሞ አብዛኛው ሰው በጥቂቱም ቢሆን መፃፍ የሚችል ቢሆንም እንኳ አንዳንድ ደብዳቤዎች ወይም ጽሑፎች ግን የሚጻፉት ጥሩ መጻፍ በሚችሉ ፀሐፊዎች ነበር (በአገራችን የቁም ጸሃፊዎች የሚባሉትን ያስታውሷል)። አንዳንዶቹ መንደር ውስጥ የሚገኙ የግል ጸሐፊዎች ሲሆኑ ሌሎቹ ደግሞ በክፍያ የሚሰሩ ጸሐፊዎች ነበሩ። </h2><h2 class=\"ql-align-justify\"><br></h2><h2 class=\"ql-align-justify\">በሌላ አነጋገር አንዳንዶቹ አማተር ሲሆኑ ሌሎቹ ደግሞ በክፍያ የሚሰሩ ፕሮፌሽናል ፀሐፊዎች ነበሩ ማለት ነው። ጸሐፊዎቹ በፓፒረስ ላይ በሚጽፉበት <strong>ጊዜ በፖፒረሱ ላይ የሚገኙትን</strong> መስመሮች ለጽሑፎቻቸው በሚያመች መልኩ ወደ አግድሞሽ አዙረው ፓፒረሶቹ ላይ በሚገኘው ተፈጥሯዊ መስመር በመከተል ጽሑፎቻቸውን ሳያንጋድዱ ይጽፋሉ። በብራና ሲጠቀሙ ግን ቀለም ባልነካው ሹል ነገር ጽሑፎቻቸው እንዳይንጋደዱ የሚረዷቸውን አግድም መስመሮች ያሰምራሉ በተጨማሪም ሁለት ወይም ሦስት አምድና ኅዳግ (margin) ለመስራት የሚያመቹ መስመሮችን ጽሑፍ ከመጀመራቸው በፊት ያዘጋጃሉ። ይህ በዚህ ሁኔታ ቀጥሎ ዘመን እየተለወጠ ሲመጣ፤ እነዚህ ከፓፒረስ <strong>ለመፃፊያነት የተዘጋጁ ቅጠሎች እርስ በርሳቸው</strong> ተደራርበውና ታጥፈው ሲሰፉ፤ ከጥቅሉ (scroll) በተሻለ እንደ ዘመናችን መጽሐፍ በሚመስል መልክ ተዘጋጅተው ቀረቡ። </h2><h2 class=\"ql-align-justify\"><br></h2><h2 class=\"ql-align-justify\"><strong><em>በተጨማሪ ከፓፒረስ</em></strong> ተክል ከተዘጋጁት ጥንታዊ የመጽሐፍ ጥቅሎች ይልቅ፤በተመሳሳይ መንገድ ከእንሰሳት ቆዳ ተፍቆ በሚሰራ ብራና ላይ መፃፍ አመቺ ሆኖ ተገኘ። ይህም አዲስ ግኝት በቀላሉ ከቦታ ቦታ ለማዘዋወርና ለረጅም ዘመን ለማገልገል ስለሚያስችል ተፈላጊ ሆነ። ስለዚህ ከፓፒረስና ከብራና የተዘጋጁት እነዚህ መጽሐፍት፤ በተለያዩ ሰዎች የተጻፉ ጽሑፎችን በአንድ ጥራዝ ለማድረግ በማስቻላቸው ተወዳጅነትን አተረፉ። ስማቸውም “የተጠረዘ የጥንት ጽሁፍ” “codex” በመባል ታወቀ፤ የመጻሕፍት <strong>አዘገጃጀትም ከጥቅልል ወደ ጥራዝ ተቀየረ።</strong> በተለይ ከብራና የሚዘጋጀው የጥራዝ ጽሁፍ (ኮዴክስ) አዲስ ግኝት በቀላሉ ጹሑፍን በፊትና በጀርባው ለመፃፍ ከማስቻሉም በተጨማሪ ረዘም ያሉ ጽሑፎችን ለመጻፍ ስላስቻለ ተመራጭ </h2><h2 class=\"ql-align-justify\">እየሆነ መጣ። በዚህ የጥራዝ አሠራር መነሻነትም የወረቀት ጽሁፍና ጥራዝ መነሻ በማግኘት እስከዘመናችን ድረስ በአገልግሎት ላይ የዋለ መገልገያ ለመሆን ችሏል። ማስታወሻ፤ በዚህ በተከታታይ በምናወጣው ጽሁፍ የመጀመሪያ ክፍል በጥንት ጊዜ መልእክት እንዴት ይተላለፍ እንደነበር፣ መጽሐፍ ቅዱስ ስሙን ከየት እንዳገኘ፤ የተጻፈበት ዓላማ ምን እንደሆነ፤ የተጻፈበት ቋንቋ ምን እንደሆነና በምን ላይ እንደተጻፈ ጠቅለል ያለ ሃሳብ ለመዳሰስ ሞክረናል። በቀጣዩ ክፍሎች መጽሐፍ ቅዱስ ወደ እኛ ለሚያደርሰው መልዕክት የተጠቀመባቸውን አራት ተያያዥ ሒደቶችንና ሌሎች <strong><em>ጉዳዮችን እንመለከታለን።</em></strong></h2><p><br></p>', 1),
(20, 'የፍጥረት ታሪክ', 'እንዴት እንደተፈጠረ ዓለም', '<h2>በመጀመሪያ ምዕራፍ ውስጥ የተገለጸው የፍጥረት ታሪክን በጥሩ መንገድ እናውቃለን።</h2>', 1),
(21, 'እምነትና ታዛዥነት', 'የአብርሃም እምነት ', '<h2>አብርሃም እንዴት በእግዚአብሔር ቃል ላይ እምነት አሳየ እና በታዛዥነት ይመራል በሚል ትምህርት እንመለከታለን።</h2>', 1),
(22, 'የመጀመሪያው ቤተክርስቲያን', 'በኢየሩሳሌም የተጀመረው ስራ', '<h2>የመጀመሪያው ቤተክርስቲያን እንዴት በመንፈስ ቅዱስ ኃይል ተጀመረ እና በምዕራፍ ሁሉ ተስፋ እንዴት እንደተሰፋ እንመለከታለን።</h2>', 3),
(23, 'የኢትዮጵያ ቤተክርስቲያን መነሻ', 'እንዴት ተመሰረተች', '<h2>የኢትዮጵያ ቤተክርስቲያን መነሻን፣ የእንደ ፊሊፖስና የኢትዮጵያዊው ኢያቆብ ታሪክ ጋር በተያያዘ እንመለከታለን።</h2>', 3),
(24, 'የመዝሙር ታሪክ', 'መጀመሪያ መዝሙሮች እንዴት ተጀመሩ', '<h2>በመጽሐፍ ቅዱስ ውስጥ መዝሙሮች እንዴት ተጀመሩ እና በዘመናት ውስጥ እንዴት እንደተስፋፋ እንመለከታለን።</h2>', 4),
(25, 'መዝሙርና መንፈስ ቅዱስ', 'መዝሙር በመንፈሳዊ ህይወት ውስጥ', '<h2>መዝሙር በመንፈሳዊ ሕይወት ውስጥ ያለውን ተፅዕኖ፣ የመንፈስ ቅዱስ ስራ ጋር ያለውን ግንኙነት እና የአመስጋን ኃይል እንመለከታለን።</h2>', 4);

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `author_name` varchar(150) DEFAULT NULL,
  `submission_date` date DEFAULT curdate(),
  `file_path` varchar(255) DEFAULT NULL,
  `file_type` enum('image','pdf','other') DEFAULT 'image',
  `approval_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `title`, `description`, `author_name`, `submission_date`, `file_path`, `file_type`, `approval_status`, `created_at`, `updated_at`) VALUES
(2, 'የሱታፌ ግብዣ', '<p><strong><em><u>በኤማሁስ ዘንድ የሚነሡት ርእሶች</u></em></strong> እና የሚቀርቡበት መንገድ የሚስማምዎ እና እርስዎም በመድረኩ ላይ በሚደረገው ተዋሥኦ ለመሳተፍ</p><p> የሚወዱ እና የሚፈቅዱ ቢሆን ያለመዘግየት በፈቀዱት ርእስ ጽሑፎችን ጽፈው ያጋሩን ።</p>', NULL, '2025-10-08', 'public/images/1760270868781.jpg', 'image', 'pending', '2025-10-12 12:07:48', '2025-10-12 12:07:48'),
(4, 'የሱታፌ ግብዣ', 'የኦርቶዶክስ ሰንበት ትምህርት ቤታችን በማህበረሰቡ ልጆች እምነታቸውንና እውቀታቸውን በአንድነት እንዲያጠናክሩ ተቋቁሟል። በመጽሐፍ ቅዱስ፣ በቅዱሳን ታሪክ እና በቤተክርስቲያን ባህል ላይ የተመሠረተ ትምህርት እንዲያገኙ በትጋት እንሠራለን።\r\n\r\n ስያሜ\r\n\r\nማኅበረ ቅዱሳን እግዚአብሔር ያከበራቸው የነቢያት፣ የሐዋርያት፣ የጻድቃንና የሰማዕታት በአጠቃላይ የቅዱሳን ገድል፣ ትሩፋትና አማላጅነት የሚዘከርበት በመሆኑ ‹‹ማኅበረ ቅዱሳን›› የሚል ስያሜውን አግኝቷል፡፡\r\n\r\n ራእይ\r\n\r\nበእምነት የተመሠረተ፣ በትምህርት የተጠናከረ ማህበረሰብ መፍጠር።\r\n\r\n ተልእኮ\r\n\r\nተማሪዎች የመንፈሳዊ እና የማህበራዊ ሕይወትን አንድ በማድረግ የተሟላ እድገት እንዲያገኙ መርዳት።\r\n\r\nዓላማዎች\r\nየቤተ ክርስቲያን ተቋማዊ አስተዳደር፣ የአሠራር ሥርዐትና አስተሳሰብ፣ በቴክኖሎጂ እና በልዩ ልዩ መንገዶች በመደገፍ ዘመኑን ለዋጀ ጠንካራ አገልግሎት ማብቃት፤\r\nየከፍተኛ ትምህርት ተቋማት ተማሪዎችን ሙሉ ሰብእናን የሚገነባ ሥርዐተ ትምህርት በማስተማር ዘመኑን የዋጁ ምሉዕ ኦርቶዶክሳዊ የሆኑ በቤተ ክርስቲያን አስተዳደራዊ መዋቅር የሚያገለግሉ እንዲሁም በማኅበራዊ፣ በኢኮኖሚያዊ በፖለቲካዊ እና በሀገር አስተዳደር ጉዳዮች መሪ/ንቁ ተሳታፊ አገልጋዮችን ማፍራት እና ማሠማራት፤\r\nየተተኪውን ትውልድ ምንጭ ለማጎልበት የሰ/ት/ቤቶችን አቅም በማጠናከር የሕጻናት እና የወጣቶችን የተተኪነት ሚና ማሳደግ፤\r\nኦርቶዶክሳዊ መንፈሳዊነትን በተግባር የሚገልጽ ቤተሰብ እና አንድነቱን የጠበቀ ኦርቶዶክሳዊ ማኅበረሰብ በመገንባት የተደራጀ እና የተናበበ አገልግሎት መስጠት፤\r\nበተደራጀ እና ተደራሹን ማእከል ባደረገ መንገድ ስብከተ ወንጌልንና ሐዋርያዊ ተልእኮን ዘርፈ ብዙ በሆኑ መንገዶች በመላው ዓለም ማስፋፋት፤\r\nበቤተ ክርስቲያን ላይ የሚነዙትን የርእዮተ ዓለም፣ የሐሰት ትርክቶች እና የአጽራረ ቤተ ክርስቲያንን እንቅስቃሴ ጥናት እና ምርምር ላይ ተመርኩዞ መሞገት እና የተሳሳቱትን በማረም፣ በጠንካራ የዕቅበተ እምነት አገልግሎት የቤተ ክርስቲያንን ሕልውና ማስጠበቅ፤\r\nበተመረጡ ገዳማት እና አብነት ትምህርት ቤቶች የልኅቀት ማእከል እና የተለየ ክርስቲያናዊ ተልእኮ የሚፈጽሙ እንዲሆኑ የሚያስችል ሁለገብ የአእምሮ ልማት ድጋፍ ማድረግ፤\r\nማኅበሩ ዘመኑን የዋጀ ተቋማዊ የአሠራር ሥርዓት በመዘርጋት ተልእኮውን ማሳካት የሚችልበት አቅም መፍጥር ( በአመራር፣ በሰው ኃይል፣ በመንፈሳዊነት፣ በግንኙነት፣ በዕውቀት፣በልማት፣ በፋይናንስ፣ በቴክኖሎጂ)፤\r\nዓለም አቀፍ ግንኙነትና የትብብር አገልግሎትን መርሕ ያደረገ የኦርቶዶክሳውያን ኢኮኖሚያዊ፣ ማኅበራዊና ፖለቲካዊ ተሳትፎ ማሳደግ፣', NULL, '2025-10-08', 'public/images/1760271366240.jpg', 'image', 'pending', '2025-10-12 12:16:06', '2025-10-12 12:17:00'),
(5, 'ዘጠነኛው ዙር የኢትዮጰያ ንግድ ባንክ ታላቁ ሩጫ በእንጦጦ ፓርክ ተካሄደ', '<p>የኢትዮጵያ ንግድ ባንክ ታላቁ ሩጫ በእንጦጦ ፓርክ ለዘጠነኛ ጊዜ ዛሬ በአዲስ አበባ እንጦጦ ፓርክ ውስጥ በደመቀ ሁኔታ ተካሄዷል፡፡</p><p>በታላቁ ሩጫ በኢትዮጵያ እና በኢትዮጵያ ንግድ ባንክ አጋርነት በየወሩ በሚዘጋጀው በዚሁ የሩጫ ውድድር ላይ የባንካችን የስራ መሪዎች፣ ሠራተኞችና የተለያዩ የህብረተሰብ ክፍሎች ተሳትፈዋል፡፡</p><p>የባንካችን ከስተመር ኤክሲፒሪያንስ ምክትል ፕሬዚደንት አቶ ኃይለየሱስ በቀለ እና የሰው ሃይል ምክትል ፕሬዚደንት ወ/ሮ ኢየሩሳሌም አምሃ በውድድሩ ላይ በተለያየ ዘርፍ አሸናፊ ለሆኑ አትሌቶች የምስክር ወረቀት እና የሜዳሊያ ሽልማት አበርክተዋል፡፡</p><p>የባንካችን የሰው ሃይል ምክትል ፕሬዚደንት በመርሐ – ግብሩ ላይ እንደተናገሩት፤ ውድድሩ ባንካችን የማህበራዊ ኃላፊነቱን ከሚወጣባቸው መንገዶች አንዱ ማሳያ ነው ብለዋል፡፡ በተከታታይ እየተከናወነ ያለው ይኸው ስፖርታዊ እንቅስቃሴ ባንካችን ለሰራተኞቹና ለማህበረሰባችን ጤንነት መጠበቅ የሰጠውን ትኩረት እና ቁርጠኝነት የሚያረጋግጥ ነው ሲሉ ተናግረዋል፡፡ ውድድሩ የባንካችንን ሰራተኞች ለማቀራረብና ለውጤታማነት ጉልሕ ድርሻ እንደሚኖረው ገልጸዋል፡፡</p><p>በኢትዮጵያ ንግድ ባንክ ሰራተኞች መካከል በተደረገው የሩጫ ውድድር በሴቶች ንጋቷ ሃብታሙ እና በወንዶች ሳሙኤል እንደሻው አሸናፊ ሆነዋል፡፡&nbsp;</p>', NULL, '2025-10-13', 'public/images/1760354445361.png', 'image', 'pending', '2025-10-13 11:20:45', '2025-10-13 11:20:45'),
(8, 'አቡነ ቀለምትጦስ', '<p>የኦርቶዶክስ ሰንበት ትምህርት ቤታችን በማህበረሰቡ ልጆች እምነታቸውንና እውቀታቸውን በአንድነት እንዲያጠናክሩ ተቋቁሟል። በመጽሐፍ ቅዱስ፣ በቅዱሳን ታሪክ እና በቤተክርስቲያን ባህል ላይ የተመሠረተ ትምህርት እንዲያገኙ በትጋት</p>', NULL, NULL, 'public/images/1760355162629.png', 'image', 'pending', '2025-10-13 11:32:42', '2025-10-13 11:32:42'),
(9, 'በአስተዳደርና በቅሬታ ሰሚ ኮሚቴ የታዩ ጉዳዮች (26) ', '<p>የባንካችን ከስተመር ኤክሲፒሪያንስ ምክትል ፕሬዚደንት አቶ ኃይለየሱስ በቀለ እና የሰው ሃይል ምክትል ፕሬዚደንት ወ/ሮ ኢየሩሳሌም አምሃ በውድድሩ ላይ በተለያየ ዘርፍ አሸናፊ ለሆኑ አትሌቶች የምስክር ወረቀት እና የሜዳሊያ ሽልማት አበርክተዋል፡፡</p><p>የባንካችን የሰው ሃይል ምክትል ፕሬዚደንት በመርሐ – ግብሩ ላይ እንደተናገሩት፤ ውድድሩ ባንካችን የማህበራዊ ኃላፊነቱን ከሚወጣባቸው መንገዶች አንዱ ማሳያ ነው ብለዋል፡፡ በተከታታይ እየተከናወነ ያለው ይኸው ስፖርታዊ እንቅስቃሴ ባንካችን ለሰራተኞቹና ለማህበረሰባችን ጤንነት መጠበቅ የሰጠውን ትኩረት እና ቁርጠኝነት የሚያረጋግጥ ነው ሲሉ ተናግረዋል፡፡ ውድድሩ የባንካችንን ሰራተኞች ለማቀራረብና ለውጤታማነት ጉልሕ ድርሻ እንደሚኖረው ገልጸዋል፡፡</p><p>በኢትዮጵያ ንግድ ባንክ ሰራተኞች መካከል በተደረገው የሩጫ ውድድር በሴቶች ንጋቷ ሃብታሙ እና በወንዶች ሳሙኤል እንደሻው አሸናፊ ሆነዋል፡፡&nbsp;</p>', NULL, NULL, 'public/images/1760357567741.jpg', 'image', 'pending', '2025-10-13 12:12:47', '2025-10-13 12:12:47'),
(10, 'ssssssssss', '<p>mmmmmmmmm</p>', 'ssdddddd', '2025-10-17', 'public/images/1760624197574.jpg', 'image', 'pending', '2025-10-16 14:16:37', '2025-10-16 14:16:37');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `username` varchar(25) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `Role` varchar(20) NOT NULL,
  `status` int(11) NOT NULL,
  `FirstName` varchar(25) NOT NULL,
  `LastName` varchar(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `username`, `password`, `Role`, `status`, `FirstName`, `LastName`, `email`, `timestamp`) VALUES
(3, 'mb123456', '$2b$10$wh353e8N3UsI5xxAEJ8D3.oJmmMtQALbfOSu11u7TH.Ls3NsvS.s.', 'አድሚን', 0, 'ማንደፍሮ', 'ብዙወርቅ', 'ednam717@gmail.com', '2025-01-17 16:39:23'),
(4, 'blen123456', '$2b$10$47irmlWRrh55zqnSrqJy9ewRDGMIP/iSLQR77Q.eYwZr5q8jtCwl.', 'አድሚን', 0, 'ሃይሚ', 'ከበደ', 'blen@gmail.com', '2025-01-17 16:40:12'),
(11, 'l123456', '$2b$10$d8i28tqMWCO5J2Pio8uxoe5D1UpIkAe0qNh.PS6u/FvPNk28AX1jm', 'አባል', 0, 'ልዩ', 'ከበደ', 'liyu@gmail.com', '2025-10-14 11:59:44'),
(16, 'ማ12346', '$2b$10$MLXcepSRyURLySRMqslM5eC4mWWjinBM70AlOPhjpRrGJbF/jgCtq', 'አባል', 0, 'ጆሲ', 'ቅጣው', 'josi@gmail.com', '2025-10-14 15:38:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CATID`);

--
-- Indexes for table `contents`
--
ALTER TABLE `contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_CAT` (`catid`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `CATID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `contents`
--
ALTER TABLE `contents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `FK_CAT` FOREIGN KEY (`catid`) REFERENCES `category` (`CATID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
