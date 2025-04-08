import { Modules } from "@medusajs/framework/utils"
import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { MARKETPLACE_YANDEX_MARKET_MODULE } from '../modules/marketplace-yandex-market';
import MarketplaceYandexMarketModuleService from '../modules/marketplace-yandex-market/service';
import yml from "yandex-market-language";


export type UploadYmlStepInput = {
  fileName: string;
};

export const UploadYmlStepInput = createStep(
  'upload-yml-step',
  async (input: UploadYmlStepInput, { container }) => {
    const testYmlObject = {
      name: "BestSeller",
      company: "Tne Best inc.",
      url: "http://best.seller.ru",
      platform: "uCoz",
      version: "1.0",
      agency: "Технологичные решения",
      email: "example-email@gmail.com",
      categories: [
        { id: "1", name: "Бытовая техника" },
        { id: "10", parentId: "1", name: "Мелкая техника для кухни" },
        { id: "101", parentId: "10", name: "Сэндвичницы и приборы для выпечки" },
      ],
      offers: [
        {
          id: "901299",
          name: "Мороженица Brand 3811",
          vendor: "Brand",
          vendorCode: "A1234567B",
          categoryId: "10",
          picture: ["http://best.seller.ru/img/model_12345.jpg"],
          description:
            "<h3>Мороженица Brand 3811</h3> <p>Это прибор, который придётся по вкусу всем любителям десертов и сладостей, ведь с его помощью вы сможете делать вкусное домашнее мороженое из натуральных ингредиентов.</p>",
          manufacturer_warranty: true,
          country_of_origin: "Китай",
          barcode: ["4601546021298"],
          param: [
            { name: "Цвет", value: "белый" },
          ],
          weight: 3.6,
          dimensions: [20.1, 20.5, 22.5],
          "service-life-days": "P2Y",
          "comment-life-days": "Использовать при температуре не ниже -10 градусов.",
          "warranty-days": "P1Y",
          "comment-warranty":
            "Гарантия не распространяется на механические повреждения покрытия чаши.",
        },
        {
          id: "123467",
          name: "Сэндвичница Brand A1234567B",
          vendor: "Brand",
          vendorCode: "A1234567B",
          categoryId: "101",
          picture: ["http://best.seller.ru/img/device56789.jpg"],
          param: [
            { name: "Мощность", value: "750 Вт" },
          ],
          description:
            "Сэндвичница 2 в 1: можно приготовить как сэндвичи, так и вафли.",
          manufacturer_warranty: true,
          country_of_origin: "Россия",
          barcode: ["9876543210"],
          weight: 1.03,
          dimensions: [20.8, 23.5, 9.0],
        },
      ],
    };
    const YML = yml(testYmlObject, { validate: false });
    const ymlString = YML.end({ pretty: true });
    const fileModuleService = container.resolve(
      Modules.FILE
    )
    const [fileDTO] = await fileModuleService.createFiles([{
      filename: input.fileName || `yandex-market-${Date.now()}.yml`,
      mimeType: 'application/x-yaml',
      content: ymlString,
    }]);

    return new StepResponse({ymlUrl: fileDTO.url, ymlId: fileDTO.id, ymlString});
  },
);

export type UploadYmlWorkflowInput = {
  fileName: string;
};

export const uploadYmlWorkflow = createWorkflow(
  'upload-yml-workflow',
  (input: UploadYmlWorkflowInput) => {
    const yml = UploadYmlStepInput(input);
    return new WorkflowResponse(yml);
  }
);