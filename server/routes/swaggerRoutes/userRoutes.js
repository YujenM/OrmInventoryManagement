/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management endpoints
 */

/**
 * @swagger
 * /fetchuser/getuser:
 *   get:
 *     summary: Fetch user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */


/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully authenticated. Returns a JWT token.
 *         
 *       400:
 *         description: Bad request (Invalid credentials)
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: User Signup
 *     description: Authorizes the user and stores the data in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Yujen Maharjan
 *               email:
 *                 type: string
 *                 example: maharjanyuzen@gmail.com
 *               password:
 *                 type: string
 *                 example: Iambatman@123
 *               address:
 *                 type: string
 *                 example: Patan
 *     responses:
 *       200:
 *         description: Successfully signed up
 *       400:
 *         description: Signup failed
 *       500:
 *         description: Internal Server Error
 */