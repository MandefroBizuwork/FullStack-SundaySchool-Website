const express = require("express");
// const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const path = require("path");

require("dotenv").config();

const app = express();
const corsOptions = {
  origin: "http://localhost:3000", // your frontend URL
  credentials: true, // Allow credentials (cookies, Authorization headers, etc.)
};
app.use(cors(corsOptions)); // Use the custom CORS options
//  //Make sure to put in this order: bodyParser.json() first.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser here
// app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require("./Router/UserRouter");
const courseRoutes = require("./Router/CourseRouter");
const documentRoutes = require("./Router/DocumentRouter");
const contentsRoutes = require("./Router/ContentsRouter");
//jobs midle ware
// const dbcon = require("./DBconfig/Dbconfig");
app.use("/api/user", userRoutes);
app.use("/course", courseRoutes);
app.use("/documents", documentRoutes);
app.use("/contents", contentsRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));
async function StartServer() {
  try {
    app.listen(2000, (err) => {
      console.log("runing on port 2000");
    });
  } catch (err) {
    console.log(" server errorr");
  }
}
StartServer();

// let connection;
// async function ConnectDb() {
//   try{
//      connection = await mysql.createConnection({
//       host: process.env.DB_HOST, // or 127.0.0.1
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database:  process.env.DB_DATABASE,
//     });

//     connection.connect(function(err) {
//       if (err) {
//         console.error('Database cannot be connected' );
//         return;
//       }
//       console.log('Database Connected successfully ');
//     });
//   }
//   catch(er)
//  { console.log("Db connection errorr")}
// }
// ConnectDb()

// //create schemas controler
// app.get("/install",(req,res)=>{

//     // let productTable='CREATE TABLE Persons (  Personid int NOT NULL AUTO_INCREMENT, LastName varchar(255) NOT NULL,   FirstName varchar(255),   Age int,  PRIMARY KEY (Personid)); ';
//     // mysqlcon.query(productTable,(err,results,field)=>{
//     //     if(err)console.log(err)
//     //         else console.log("table created successfully")
//     // })

//     let VacancyTable='CREATE TABLE IF NOT EXISTS Jobs(JOB_ID int NOT NULL AUTO_INCREMENT,JOB_TITLE varchar(35) NOT NULL, COMPANY varchar(10) NOT NULL,LOCATION varchar(10) NOT NULL, DESCRIPTION varchar(10), SALARY decimal(6,0),PRIMARY KEY (JOB_ID));'

//     connection.query(VacancyTable,(err,result)=>{
//         if(err)console.log(err)
//             else console.log("table created successfully")
//     })

// })

// //loading jobs controlor
// app.get("/", (req, res) => {
//   let JobsTable = "SELECT * FROM jobs ORDER BY SALARY DESC ";
//   connection.query(JobsTable, (err, rows, fields) => {
//     // console.log(rows);
//     let data = { Jobs: [] };
//     data.Jobs = rows;
//     let result = JSON.stringify(data);

//     if (!err) {
//       res.end(result);
//     } else {
//         return res
//           .status(500)
//           .json({
//             message: `no data found here ${err.sqlMessage || err.message
//             }`,
//           });
//     }
//   });
// });

// //post a job controler
// //http://localhost:2000/ManageJobs/PostJob
// app.post("/ManageJobs/PostJob", (req, res) => {
//   const reqBody = req.body;

//   const sql =
//     "INSERT INTO jobs (COMPANY, DESCRIPTION, JOB_TITLE, LOCATION, SALARY) VALUES (?, ?, ?, ?, ?)";

//   connection.query(
//     sql,
//     [
//       reqBody.Company,
//       reqBody.Description,
//       reqBody.Jtitle,
//       reqBody.Location,
//       reqBody.Salary,
//     ],
//     (err, result) => {
//       if (err) {
//         // Log the error and send it in the response (for debugging purposes)
//         console.error("Database Insertion Error:", err);

//         // Include more details in the response for debugging
//         return res
//           .status(500)
//           .json({
//             message: `Error during registration for ${req.body.Company}: ${r.sqlMessage || err.message
//             }`,
//           });
//       } else {
//         // Log the insert ID for debugging (optional)
//         console.log("Insert ID:", result.insertId);

//         // Return success response with affected rows
//         return res
//           .status(200)
//           .json({
//             message: "Job posted successfully",
//             affectedRows: result.affectedRows,
//           });
//       }
//     }
//   );
// });

// //update job controller
// //http://localhost:2000/jobs/${selectedJob.JOB_ID}

// // Update job controller
// // http://localhost:2000/ManageJobs/:jobID

// app.put("/ManageJobs/UpdateJob/:jobID", (req, res) => {
//   const jobId = req.params.jobID;
//   const updatedJob = req.body;
//   console.log(jobId)
//   const sql =
//     "UPDATE jobs SET COMPANY = ?, DESCRIPTION = ?, JOB_TITLE = ?, LOCATION = ?, SALARY = ? WHERE JOB_ID = ?";

//   connection.query(
//     sql,
//     [
//       updatedJob.Company,
//       updatedJob.Description,
//       updatedJob.Jtitle,
//       updatedJob.Location,
//       updatedJob.Salary,
//       jobId, // jobId to update the specific job
//     ],
//     (err, result) => {
//       if (err) {
//         console.error("Database Update Error:", err);
//         return res.status(500).json({
//           message: "Error updating job",
//           error: err.message, // For debugging
//         });
//       } else {
//         console.log(result)
//         return res.status(200).json({
//           message: "Job updated successfully",
//           affectedRows: result.affectedRows,
//           JobsData:result
//         });
//       }
//     }
//   );
// });

// //delete job controler
// app.delete("/ManageJobs/DeleteJob/:jobID", (req, res) => {
//   const jobId = req.params.jobID;

//   console.log(jobId)
//   const sql =
//     "DELETE FROM JOBS WHERE JOB_ID = ?";

//   connection.query(
//     sql,
//     [
//       jobId, // jobId to DELETE the specific job
//     ],
//     (err, result) => {
//       if (err) {
//         console.error("JOB delete Error:", err);
//         return res.status(500).json({
//           message: "Error deleting job",
//           error: err.message, // For debugging
//         });
//       } else {
//         return res.status(200).json({
//           message: "Job deleted successfully",
//           affectedRows: result.affectedRows,
//         });
//       }
//     }
//   );
// });

// // //
// // // Multer setup for file upload
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //       cb(null, "./public/images");
// //   },
// //   filename: function (req, file, cb) {
// //       cb(null, Date.now() + "-" + file.originalname);
// //   }
// // });

// // const upload = multer({ storage: storage });

// // // Upload route
// // app.post('/upload', upload.single('myimage'), (req, res) => {
// //   if (!req.file) {
// //       return res.status(400).send('No file uploaded!');
// //   }

// //   const image = req.file.filename;
// //   const sql = "INSERT INTO img_upload(image) VALUES(?)";
// //   dbcon.query(sql, [image], (err) => {
// //       if (err) {
// //           console.error("Database insertion error:", err);
// //           return res.status(500).send('Database error');
// //       }

// //       console.log("File uploaded:", req.file);
// //       res.send('The file uploaded successfully!');
// //   });
// //   console.log(req.file)
// //   console.log("hh")
// // });

// // // Route to get images
// // app.get("/", (req, res) => {
// //   const sql = "SELECT * FROM `img_upload`";
// //   dbcon.query(sql, (err, result) => {
// //       if (err) {
// //           console.error("Database retrieval error:", err);
// //           return res.status(500).send('Database error');
// //       }
// //       res.json(result);
// //   });
// // });

// // // Serve static files from the 'public' directory
// // app.use(express.static("public"));

// //email service

// const nodemailer = require('nodemailer');

// // ConfigureNodemailer
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   family: 4 // Use IPv4
// });

// async function ConfigureNodemailer() {
//   try{

// transporter.verify((error, success) => {
//   if (error) {
//     console.log('Error with email transporter:');
//   } else {
//     console.log('Email transporter is ready');
//   }
// });
//   }
//   catch(er){
//     console.log("Email transporter not ready")
//   }
// }
// ConfigureNodemailer();

// app.post('/api/send-email', (req, res) => {
//   const { from, subject, message } = req.body;

//   const mailOptions = {
//     from: process.env.EMAIL_USER, // Authenticated email as the sender
//     to: process.env.EMAIL_USER, // Recipient (you can also use another address here)
//     subject: "From " + from + ":   " + subject, // Including the user's email in the subject for clarity
//     text: message,
//     replyTo: from // Set the user's input email as the reply-to address
//   };

// console.log(mailOptions)
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log(error); // Log the error before responding
//     return res.status(500).json({ message: 'Failed to send email', error });
//   }
//   res.status(200).json({ message: 'Email sent successfully', info });
//   console.log("Email sent successfully");
// });

// });

// // // Sending SMS
// // // Sending SMS

// // const twilio = require('twilio');
// // // Twilio credentials from .env file
// // const accountSid = process.env.TWILIO_ACCOUNT_SID;
// // const authToken = process.env.TWILIO_AUTH_TOKEN;

// // // Twilio client setup
// // const client = twilio(accountSid, authToken);

// // // Endpoint to send SMS
// // app.post('/api/send-sms', (req, res) => {
// //   const { to, message, from } = req.body;

// //   // Ensure 'from' is provided
// //   if (!from) {
// //     return res.status(400).json({ success: false, error: "A 'From' number is required." });
// //   }
// //   else console.log(req.body)

// //   client.messages
// //     .create({
// //       body: message,
// //       from: process.env.TWILIO_PHONE_NUMBER,
// //       to: to
// //     })
// //     .then((message) => res.status(200).json({ success: true, message: 'SMS sent successfully', sid: message.sid }))
// //     .catch((error) => res.status(500).json({ success: false, error: error.message }));
// // });

// const mockUser = { email: 'user@example.com', password: 'mb123' };
// const SECRET_KEY = '8IVAraxfaIv6VCTzzykXpGKVZ51zCH4m';
// app.post('/api/login', (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body); // Log the request body to check incoming data

//   if (email === mockUser.email && password === mockUser.password) {
//       const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

//       // Set the cookie with token
//       res.cookie('token', token, {
//           httpOnly: true, // Accessible only by the server
//           secure:true,// process.env.NODE_ENV === 'production', // Set `secure` flag in production
//           sameSite: 'Strict', // CSRF protection
//           maxAge: 60 * 60 * 1000 // 1 hour expiration
//       });

//       res.json({ message: 'Login successful' });
//   } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//   }
// });

// // server.js - Add a protected route
// app.get('/api/protected', (req, res) => {
//   const token = req.cookies.token; // Access the token from cookies
//   console.log('Cookies:', req.cookies);
//   if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' });
//   }

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//       if (err) {
//           return res.status(401).json({ message: 'Unauthorized' });
//       }
//       res.json({ message: 'Authorized', user: decoded });
//   });
// });

// // Endpoint to send verification code
// app.post("/sendCode",async (req, res) => {
//   try{

//   const { email } = req.body;
//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   const code = Math.floor(100000 + Math.random() * 900000).toString();
//   VerCode[email] = { code, expiresAt: Date.now() + 5 * 60 * 1000 }; // Code valid for 5 minutes

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Verification Code",
//     html: `<h2>Your verification code is: ${code}</h2>`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       // console.error(error);
//       return res.status(500).json({ message: 'Failed to send email' });
//     }
//     console.log(`Verification code sent to ${email}`);
//     res.status(200).json({ message: `Verification code sent to ${email}` });
//   });
// }catch(err){
//   console.log("Something went wrong!")
// }

// });

// // Endpoint to verify the code
// const VerCode={}
// app.post('/verify-code', (req, res) => {
//   const { email, code } = req.body;
//   if (!email || !code) {
//     return res.json({ message: 'Email and code are required' });
//   }

//   const record = VerCode[email];
//   if (record && record.code === code && record.expiresAt > Date.now()) {
//     console.log('Access granted');
//     delete VerCode[email];
//     return res.json({ message: 'Verification successful' });
//   } else {
//     console.log('Invalid or expired code');
//     return res.json({ message: 'Invalid or expired code' });
//   }
// });

// // Multer setup for file upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, "./public/documents");
//   },
//   filename: function (req, file, cb) {
//       cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// app.post("/documents/upload",upload.single("myDocument"),(req,res)=>{

//    const doc = req.file.filename;
//   const sql = "INSERT INTO documents(documents) VALUES(?)";
//   connection.query(sql, [doc], (err) => {
//       if (err) {
//           console.error("Database insertion error:", err);
//           return res.status(500).json({msg:'Database error'});
//       }

//       console.log("File uploaded:", req.file);
//       return res.status(200).json({message:'The file uploaded successfully!'});
//   });
//   console.log(req.file)

// });

// //Route to delete a document
// app.delete("/documents/delete/:id", (req, res) => {
//   const { id } = req.params; // Destructure the id from the request body

// //  console.log(id)

//   const deleteQuery = "DELETE FROM `documents` WHERE id = ?";

//   connection.query(deleteQuery, [id], (err, result) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res.status(500).json({ message: "Database error occurred." });
//     }

//     if (result.affectedRows === 0) {
//       // No rows were deleted, meaning the ID does not exist
//       return res.status(404).json({ message: "Document not found." });
//     }

//     // Successfully deleted
//     return res.status(200).json({ message: "Document deleted successfully." });
//   });

// });

// // Route to get documents
// app.get("/documents", (req, res) => {
//   const selectDoc = "SELECT * FROM documents;";
//   connection.query(selectDoc, (err, rows) => {
//       if (err) {
//           console.error("Database retrieval error:", err);
//           return res.status(500).json({message:'Database error'});
//       }

//       let data = { Documents: [] };
//       data.Documents = rows;
//       let result = JSON.stringify(data);

//       if (!err) {
//         res.end(result);
//       } else {
//           return res
//             .status(500)
//             .json({
//               message: `no data found here ${err.sqlMessage || err.message
//               }`,
//             });
//       }
//   });
// });

// // Serve static files from the 'public' directory
 app.use(express.static("public"));
