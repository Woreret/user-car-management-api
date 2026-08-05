import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 4000;

const routesPath = path.join(__dirname, '../routes/*.js').replace(/\\/g, '/');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User and Car Management REST API',
            version: '1.0.0',
            description: 'RESTful API for user authentication, profile management, and vehicle management using Node.js, Express.js, PostgreSQL, and JSON Web Tokens (JWT).',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Local Development Server'
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT bearer token'
                }
            },
            schemas: {
                UserRegisterInput: {
                    type: 'object',
                    required: ['name', 'email', 'role', 'password'],
                    properties: {
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john@example.com' },
                        role: { type: 'string', example: 'user' },
                        password: { type: 'string', example: 'secret123' }
                    }
                },
                UserLoginInput: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', example: 'john@example.com' },
                        password: { type: 'string', example: 'secret123' }
                    }
                },
                UpdateUserNameInput: {
                    type: 'object',
                    required: ['newName'],
                    properties: {
                        newName: { type: 'string', example: 'Jane Doe' }
                    }
                },
                CarInput: {
                    type: 'object',
                    required: ['brand', 'model', 'year'],
                    properties: {
                        brand: { type: 'string', example: 'Toyota' },
                        model: { type: 'string', example: 'Camry' },
                        year: { type: 'integer', example: 2022 }
                    }
                },
                CarResponse: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        brand: { type: 'string', example: 'Toyota' },
                        model: { type: 'string', example: 'Camry' },
                        year: { type: 'integer', example: 2022 },
                        user_id: { type: 'integer', example: 5 }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Error message description' }
                    }
                }
            }
        }
    },
    apis: [routesPath],
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
};