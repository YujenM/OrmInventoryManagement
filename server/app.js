// * Import Module Dependencies
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
require('dotenv').config({path: '../.env'});
const errorHandler = require('errorhandler');
const jwt = require('jsonwebtoken');
const {Sequelize} = require('sequelize')
/* Create Express Server. */
const app = express();

app.use(cors());

app.use(logger('tiny'));

console.log(process.env.PORT)
/* Express Configuration. */
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Primary App Routes. */
app.get('/', (_req, res) => {
  res.status(200).json({
    data: {
      message: 'API endpoints for .',
    },
  });
});


const userSignup = require('./routes/UserRoutes/userAuth');
app.use('/user', userSignup);
const adminroute=require('./routes/AdminRoute/AdminAuth');
app.use('/admin',adminroute);

app.use((req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: 'Token is not valid',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({
      error: 'Auth Token is not supplied',
    });
  }
});

var sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER ,process.env.DB_PASS, {
  host:process.env.DB_HOST,
  dialect: "mysql"
});


const a =async ()=>{
  console.log('------------------------------->')
  try{
  await sequelize.authenticate();
    console.log('connected')
}catch(err){
    console.log(err)
  }

}

a();



/**
 * * Error Handler. Provides full stack - disabled from production
 */
if (process.env.NODE_ENV !== 'production') {
  app.use(errorHandler());
}



app.use((err, _req, res, next) => {
  if (!err) {
    next();
    return;
  }

  return res
    .status(err?.statusCode || err?.status || 500)
    .json({ message: err?.message || 'Something Went Wrong' });
});

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`listening on *:${app.get('port')} in ${app.get('env')} mode`);
});
