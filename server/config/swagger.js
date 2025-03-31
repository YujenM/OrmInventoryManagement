const swaggerJsdoc=require("swagger-jsdoc");
const swaggerUi=require('swagger-ui-express');

const options={
  definition:{
    openapi:"3.0.0",
    info:{
      title:'InventoryManagement',
      version:'1.0.0',
      description:'Api documention for Inventory Management',
    },
    servers:[
      {
        url:"http://localhost:5000",
      },
    ],    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", 
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],

  },
  apis: ["./routes/**/*.js"]
};

const swaggerSpec= swaggerJsdoc(options);

const setupSwagger=(app)=>{
  app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
}

module.exports=setupSwagger;