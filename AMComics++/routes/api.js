import express from 'express';
const apiRouter = express.Router();
import  data  from '../public/js/infocomics.js';

//Route api
apiRouter.get('/', (req, res) => {
    res.json(data);
  });

export default apiRouter;