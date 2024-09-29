import { Router } from 'express';
import validateRegistration from '../middlewares/ValidatorMiddleware';
import container from 'src/Container';

export default class UserRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const userController = container.resolve('userController');
    /**
     * @swagger
     * components:
     *   schemas:
     *     Address:
     *       type: object
     *       properties:
     *         postalCode:
     *           type: string
     *           description: Postal code (CEP)
     *           example: "12345678"
     *         street:
     *           type: string
     *           description: Street name
     *           example: "Rua Exemplo"
     *         number:
     *           type: string
     *           description: Street number
     *           example: "123"
     *         complement:
     *           type: string
     *           description: Complement (optional)
     *           example: "Apartment 1"
     *         city:
     *           type: string
     *           description: City name
     *           example: "São Paulo"
     *         district:
     *           type: string
     *           description: District name
     *           example: "Centro"
     *         state:
     *           type: string
     *           description: State abbreviation
     *           example: "SP"
     *     Registration:
     *       type: object
     *       required:
     *         - personType
     *         - responsibleCpf
     *         - name
     *         - mobile
     *         - email
     *         - address
     *         - acceptedTerms
     *       properties:
     *         personType:
     *           type: string
     *           description: The type of person (individual or company)
     *           example: "individual"
     *         cnpj:
     *           type: string
     *           description: CNPJ if the personType is 'company'
     *           example: "12345678000199"
     *         responsibleCpf:
     *           type: string
     *           description: CPF of the responsible person
     *           example: "12345678901"
     *         name:
     *           type: string
     *           description: Name of the person or company
     *           example: "João Silva"
     *         mobile:
     *           type: string
     *           description: Mobile phone number
     *           example: "11987654321"
     *         phone:
     *           type: string
     *           description: Optional phone number
     *           example: "1134567890"
     *         email:
     *           type: string
     *           description: Email address
     *           example: "joao@example.com"
     *         address:
     *           $ref: '#/components/schemas/Address'
     *         acceptedTerms:
     *           type: boolean
     *           description: Whether the user accepted the terms
     *           example: true
     *
     * /registration:
     *   post:
     *     summary: Create a new registration
     *     tags: [Registration]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Registration'
     *     responses:
     *       201:
     *         description: Registration successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Registration successful"
     *                 data:
     *                   $ref: '#/components/schemas/Registration'
     *       400:
     *         description: Validation error or user already registered
     */
    this.router.post('/', validateRegistration, userController.createUser.bind(userController));
  }

  public getRoutes() {
    return this.router;
  }
}
