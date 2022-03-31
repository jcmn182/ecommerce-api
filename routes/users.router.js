const express = require('express');
//controllers
const {
    getAllUsers,
    getUserById,
    getproductsbyUserId,
    createNewUser,
    loginUser,
    updateUser,
    deleteUser
} = require('../controllers/users.controllers.js');

//middlewares
const {
    validateSession,
    protectAdmin
  } = require('../middlewares/auth.middlewares.js');

const {
    protectAccountOwner
  } = require('../middlewares/protectAccount.middleware');


const router = express.Router();

router.post('/', createNewUser);

router.post('/login', loginUser);

router.use(validateSession);

router.get('/', protectAdmin, getAllUsers);

router.get('/me', protectAdmin, getproductsbyUserId);


router
  .route('/:id')
  .get(getUserById)
  .patch(protectAccountOwner, updateUser)
  .delete(protectAccountOwner, deleteUser);


module.exports = { usersRouter: router };