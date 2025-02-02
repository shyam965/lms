import jwt from "jsonwebtoken";

const genrateAccessToken = async (userId) => {
  const token = await jwt.sign({ id: userId }, process.env.SECRET_ACCESS_KEY, {
    expiresIn: "5d",
  });
  return token;
};
export default genrateAccessToken;
