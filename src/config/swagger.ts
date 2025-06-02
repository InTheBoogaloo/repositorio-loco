import swaggerJSDoc  from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options= {
    swaggerDefinition: {
        openapi:'3.0.2',
        tags:[{
            name:'Products',
            description:'API operation related to products'
        }
        ],
         info:{
            title:'REST API Node.js / Express / Typescript',
            version:'1.0.0',
            description:'API Docs for products'
        }
       
    },
    apis:['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)
const SwaggerUiOptions: SwaggerUiOptions = {
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
export default swaggerSpec
export{
    SwaggerUiOptions
}