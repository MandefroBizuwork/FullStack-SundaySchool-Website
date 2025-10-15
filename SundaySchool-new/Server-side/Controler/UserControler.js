const dbcon = require("../DBconfig/Dbconfig");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function Register(req, res) {
  const { Fname, Lname, username, Password, Email } = req.body;

  // Validate input
  if (!Fname || !Lname || !username || !Password || !Email) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide all required information" });
  }

  try {
    // Check if user already exists
    const [existingUser] = await dbcon.query(
      "SELECT userid FROM users WHERE username = ? OR email = ?",
      [username, Email]
    );

    if (existingUser.length > 0) {
      return res.status(StatusCodes.CONFLICT).json({ msg: "User already exists" });
    }

    // Validate password length
    if (Password.length < 8) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Password must be at least 8 characters long" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // Insert new user into database
    await dbcon.query(
      "INSERT INTO users (FirstName, LastName, username, email, password) VALUES (?, ?, ?, ?, ?)",
      [Fname, Lname, username, Email, hashedPassword]
    );

    res.status(StatusCodes.CREATED).json({ msg: "Registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
  }
}

async function Login(req, res) {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide all required information" });
  }

  try {
    // Check if user exists
    const [user] = await dbcon.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (!user || user.length === 0) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid username or password" });
    }

    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, user[0].password);
    console.log(user[0].password)
    if (!isValidPassword) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid username or password" });
    }
 

    // Generate JWT token
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      { email: user[0].email, userid: user[0].Personid,role:user[0].Role },
      secret,
      { expiresIn: "1h" }
    );

    // Successful login
    return res.status(StatusCodes.OK).json({
      msg: "Login successful",
      user: { id: user[0].Personid, email: user[0].email,role:user[0].Role },
      token: token
    });
  } catch (err) {
    console.error(err.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
  }
}
async function CheckUser(req, res) {
  const email = req.authorizedUser.email;
  const userid = req.authorizedUser.userid;
  const role = req.authorizedUser.role;
  return res.status(StatusCodes.OK).json({ email, userid,role});
}

async function userReport(req,res) {
  const [user] = await dbcon.query("SELECT * FROM users WHERE status = 0");
  // const userCount=user.length
  console.log(user)
  res.status(StatusCodes.OK).json({ latestuser:user});
}

 async function Deleteuser(req, res) {
  try {
    const { username } = req.params;

    // ✅ Ensure username exists
    if (!username) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Username is required" });
    }

    // ✅ Delete user safely using parameterized query
    const [result] = await dbcon.query(
      "DELETE FROM users WHERE username = ?",  [username] );

    // ✅ Check if any rows were deleted
    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }

    console.log(`✅ User '${username}' deleted successfully`);
    res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting user:", err.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Database error" });
  }
}
 async function Updateuser(req, res) {
  try {
    const { username } = req.params;
    const { FirstName, LastName, email, Role } = req.body;
    console.log(Role)

    if (!username) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Username is required" });
    }

    if (!FirstName || !LastName || !email || !Role) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "All fields are required" });
    }

    const [result] = await dbcon.query(
      "UPDATE users SET FirstName = ?, LastName = ?, email = ?, Role = ? WHERE username = ?",
      [FirstName, LastName, email, Role,username, username]
    );

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }

    // Optionally return updated user data
    const [updatedUser] = await dbcon.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    res.status(StatusCodes.OK).json(updatedUser[0]);
  } catch (err) {
    console.error("❌ Error updating user:", err.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Database error" });
  }
}

module.exports = { Login, Register, CheckUser,userReport,Deleteuser,Updateuser};