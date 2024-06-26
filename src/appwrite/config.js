import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredimage, status, userId,authorName }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          featuredimage,
          status,
          userId,
          authorName
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: createPost :: error ", error);
    }
  }

  async updatePost(slug, { title, content, featuredimage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: updatePost :: Error ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service  :: deletePost :: Error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
       slug
      );
    } catch (error) {
      console.log("Appwrite Service :: getPost :: Error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal('status', ['active'])]) {
    try {
       const posts = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
      return posts;
    } catch (error) {
      console.log("Appwrite :: listPost :: Error",error);
      throw error;
    }
  }

  //file upload service

  async uploadFile(file){
    try{
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
    }catch(error){
        console.log("Appwrite service :: uploadFile :: Error", error)
        return false
    }
  }

  async deleteFile(fileId){
    try{
        return await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
        return true
    }catch(error){
        console.log("Appwrite service :: deleteFile :: Error", error)
        return false

    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId,
    )
  }
}

const service = new Service();
export default service;
