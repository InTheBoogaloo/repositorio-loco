"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerUiOptions = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [{
                name: 'Products',
                description: 'API operation related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / Typescript',
            version: '1.0.0',
            description: 'API Docs for products'
        }
    },
    apis: ['./src/router.ts']
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://www.infobae.com/new-resizer/9MRXZlMzwmiyAa-tTwWTVmXeBu8=/arc-anglerfish-arc2-prod-infobae/public/QWJHXUGY25BDFM3NHCCXFX4WVY.JPG');
            height:190px;
            width:500px;
        }
        .swagger-ui .topbar{
            background-color: cyan
        }
    `,
    customSiteTitle: 'Otra documentacion mas'
};
exports.SwaggerUiOptions = SwaggerUiOptions;
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map