import conf from "../conf/conf";
import { Client, Account, ID, OAuthProvider } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // async googleAuth() {
  //   try {
  //     const res =  this.account.createOAuth2Session(
  //       "google",
  //       "http://localhost:5173/",
  //       "http://localhost:5173/login",
        
  //     );
  //     console.log(res);
  //     return res;
  //   } catch (err) {
  //     console.log(" Auth service :: GoogleAuthError :: error", err);
  //     console.error("Error details:", err.message, err.stack);
  //     throw err;
  //   }
  // }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
      throw error;
    }
    // return null;
  }

  async logout() {
    try {
      console.log(await this.account.deleteSessions());
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
