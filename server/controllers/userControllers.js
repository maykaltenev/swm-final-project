import bcrypt from "bcrypt";
import generateToken from "../helpers/authenticationHelper.js";
import User from "../models/user.js";

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(firstName, lastName, email, password)
  const hashedPassword = await bcrypt.hash(password, 11);
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(409).json({ message: "User is already registered!" });
    }
    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    console.log(createdUser)
    return res.status(201).json({ message: "User created", createdUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: " user not found" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const token = await generateToken(user);
      return res
        .status(200)
        .cookie("jwt", token, {
          httpOnly: true,
          secure: false,
          sameSite: false,
        })
        .json({ user });
    } else {
      return res.status(400).json({ message: "No access granted" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserData = async (req, res) => {
  const { id } = req.body;

  try {
    const userData = await User.findOne({ _id: id });

    return res.status(200).json(userData);
  } catch (error) {
    return res.send(error.message);
  }
};
//checking
export const getUserDatas = async (req, res) => {


  try {
    const userDatas = await User.find();

    return res.status(200).json(userDatas);
  } catch (error) {
    return res.send(error.message);
  }
};
/* ----------------------- */
export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("jwt", {
        httpOnly: true,
        secure: false,
        sameSite: false,
      })
      .send("User logged out");
  } catch (error) {
    res.send(error);
  }
};

export const updateQuizTimer = async (req, res) => {
  const { start, end, id } = req.body;

  try {
    const addQuizTimer = await User.findByIdAndUpdate(
      id,
      { $set: { "quizTimer.start": start, "quizTimer.end": end } },
      { new: true }
    );
    if (!addQuizTimer) return;

    return res.status(200).json({ message: addQuizTimer });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};
export const updateUserQuizResults = async (req, res) => {
  const { userId, sessionId, resultPercentage, quizType } = req.body;
  console.log(resultPercentage);
  try {
    const session = await User.findOne({
      _id: userId,
      "quizResults.sessionId": sessionId,
    });

    console.log(session);

    if (session) {
      return;
    }

    const updateUserQuizResult = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          quizResults: {
            sessionId,
            resultPercentage,
            quizType,
            createdOn: Date.now(),
          },
        },
      },
      { new: true }
    );

    console.log(updateUserQuizResult);
    return res.status(200).json(updateUserQuizResult);
  } catch (error) {
    return res.send(error);
  }
};
