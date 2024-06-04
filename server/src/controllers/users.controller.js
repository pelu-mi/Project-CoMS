import usersServices from "../services/users.services.js";

const createAccount = async (req, res) => {
  try {
    const response = await usersServices.createAccount(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create account",
      status: "failure",
    });
  }
};

const login = async (req, res) => {
  //   try {
  //     const response = await usersServices.login(req.body);
  //     res.status(response.statusCode).json(response);
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Unable to login",
  //       status: "failure",
  //     });
  //   }
  const response = await usersServices.login(req.body);
  res.status(response.statusCode).json(response);
};

export default { createAccount, login };
