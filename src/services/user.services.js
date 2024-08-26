import Services from "./class.services.js";
import UserDaoMongo from "../persistence/daos/mongodb/user.dao.js";
import jwt from "jsonwebtoken";
import { createHash, isValidPassword } from "../utils/utils.js";
import CartDaoMongo from "../persistence/daos/mongodb/cart.dao.js";
import UserRepository from "../persistence/repository/user.repository.js";
import { sendMail } from "./mailing.services.js";
import config from "../config/config.js";


const userRepository = new UserRepository()
const userDao = new UserDaoMongo();
const cartDao = new CartDaoMongo();

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  generateToken(user, time = "5m") {
    const payload = {
      userId: user._id,
    };
    return jwt.sign(payload, config.SECRET_KEY_JWT, { expiresIn: time });
  }


  async register(user) {
    try {
      const { email, password } = user;
      console.log(user)
      const existUser = await this.dao.getByEmail(email);
      if (!existUser) {
        const cartUser = await cartDao.create();
        if (email === config.EMAIL_ADMIN && password === config.PASS_ADMIN) {
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
            role: "admin",
            cart: cartUser._id,
          });
          await sendMail(user, "register");
          return newUser;
        } else if(email === config.EMAIL_PREMIUM && password === config.PASSP){
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
            role: "PREMIUM",
            cart: cartUser._id,
          });
          await sendMail(user, "register");
          return newUser;
        }
          else {
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
            cart: cartUser._id,
          });
          console.log(newUser + "error")
          await sendMail(user, "register");
          return newUser;
        }
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.dao.getByEmail(email);
      if (!userExist) return null;
      const passValid = isValidPassword(password, userExist);
      if (!passValid) return null;
      if (userExist && passValid) return this.generateToken(userExist);
    } catch (error) {
      throw new Error(error);
    }
  }


  getUserById = async (id) => {
    try {
      return await userRepository.getUserById(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  async tokenResetPass(user){
    try {
      return this.generateToken(user, '1h');
    } catch (error) {
      throw new Error(error)
    }
  }


  async updatePass(user, pass){
    try {
      const Equal = isValidPassword(pass, user);
      if(Equal) return null
      const newPass = createHash(pass);
      return await userDao.update(user._id, {password : newPass})
    } catch (error) {
      throw new Error(error)
    }
  }



}