const { ApolloServer, gql } = require('apollo-server');
const mongoose = require("mongoose");
const Product  = require("./models/product");
const axios = require('axios');

const typeDefs = gql`

type User {
 _id: ID 
 name: String
 password: String
 email: String

}

type UserLogin {
 _id: ID 
 name: String
 password: String
 email: String
 token: String

}

type Product {
 _id: ID 
 name: String
 price: Int
 category: ID

 

}



type Category {
 _id: ID 
 name: String
 reference: Int
 

}


 input ProductInput {
  name: String
  price: Int
  category: ID 


 }

 input UserInput {
  name: String
  password: String
  email: String 
 


 }

 input CategoryInput {
  name: String
  reference: Int


 }



type Query {
    products: [Product]
    categories: [Category]
    getProduct(category: ID): [Product]


  }

  type Mutation {
    
    createProduct(input: ProductInput) : Product
    createCategory(input: CategoryInput) : Category
    updateProduct(_id: ID, input: ProductInput): Product
    deleteProduct(_id: ID) : Product
    deleteCategory(_id: ID) : Category
    createUser(input: UserInput) : User
    loginUser(input: UserInput) : UserLogin
  }

  




`;



const resolvers = {
 
 Query: {

                  async products (){
                    const a = await axios.get("http://localhost:4005/product");
                   

                    return a.data.result; },

                     async categories (){
                    const categ = await axios.get("http://localhost:4005/category");
                   

                    return categ.data.result; },

                    getProduct: async (_, {category }) => {
    const res = await axios.get("http://localhost:4005/product/" + category);
    return res.data.result;
},

                   







},

Mutation: {


deleteProduct: async (_, { _id }) => {
    const res = await axios.delete("http://localhost:4005/product/" + _id);
    return res.data;
},
deleteCategory: async (_, { _id }) => {
    const res = await axios.delete("http://localhost:4005/category/" + _id);
    return res.data;
},


createProduct: async (_, { input }) => {
    const res = await axios.post("http://localhost:4005/product/",input);
  
    return res.data;
},
createCategory: async (_, { input }) => {
    const res = await axios.post("http://localhost:4005/category/",input);
  
    return res.data;
},

createUser: async (_, { input }) => {
    const resUser = await axios.post("http://localhost:4005/register",input);
  
    return resUser.data;
},

loginUser: async (_, { input }) => {
    const logUser = await axios.post("http://localhost:4005/auth",input);
  
    return logUser.data;
},


updateProduct: async (_, { input,_id }) => {
    const res = await axios.put("http://localhost:4005/product/" + _id ,input);
    console.log("aaaaa",res)
    return res.data;
},


        },








};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


mongoose.connect("mongodb://localhost:27017/aa").then(() => {
  console.log("connected to MongoDB");
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  server.listen(4001).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});









