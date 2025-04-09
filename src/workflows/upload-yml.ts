import { Modules } from "@medusajs/framework/utils"
import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';


export type UploadYmlStepInput = {
  fileName: string;
};

export const UploadYmlStepInput = createStep(
  'upload-yml-step',
  async (input: UploadYmlStepInput, { container }) => {
    const ymlString = `<?xml version="1.0" encoding="windows-1251"?><!DOCTYPE yml_catalog SYSTEM "shops.dtd"><yml_catalog date="2025-03-28 16:45"><shop><name>Привет</name><company>Интер-Флора</company><url>https://flora46.ru</url><platform>1C-Bitrix</platform><currencies><currency id="RUB" rate="1" /></currencies><categories><category id="52">Коробки</category><category id="53" parentId="52">Плайм-пакеты</category></categories><offers><offer id="899" available="true"><url>https://flora46.ru/catalog/box/baskets/santorini/?r1=yandext&amp;r2=</url><price>19600</price><currencyId>RUB</currencyId><categoryId>51</categoryId><picture>https://flora46.ru/upload/iblock/622/4wsv7o238askehhgaco063cqu8wufdpq.jpeg</picture><name>Санторини (Средний)</name><description></description><param name="Состав">Роза (Россия,60 см) 11 шт • Роза (Микс) 10 шт • Корзина средняя • Флористическая губка 3 шт • Упаковка 3 шт • Статица 2 шт • Фисташка 10 шт • Трахелиум 7 шт • Эвкалипт 3 шт</param></offer><offer id="857" available="true"><url>https://flora46.ru/catalog/box/playm/gerbery-i-alstromerii-v-playm-pakete/?r1=yandext&amp;r2=</url><price>2640</price><currencyId>RUB</currencyId><categoryId>53</categoryId><picture>https://flora46.ru/upload/iblock/3cc/tj1kdxh8iaz1qu7dsekzzku3riil8lpa.JPG</picture><name>Герберы и альстромерии в плайм-пакете (Маленький)</name><description></description><param name="Состав">Гербера 3 шт • Альстромерия • Хризантема кустовая • Плайм-пакет (средний) • Аспидистра 2 шт • Рускус (60 см) 3 шт</param></offer></offers></shop></yml_catalog>`;
    // TODO change this to cache storage (redis or in-memory)
    const fileModuleService = container.resolve(
      Modules.FILE
    )
    const fileDTO = await fileModuleService.createFiles({
      filename: input.fileName || `yandex-market.xml`,
      mimeType: 'application/xml',
      content: ymlString,
      access: 'public'
    });

    return new StepResponse({
      filePath: fileDTO.url, // TODO parse URL and get only path like "/static/filename.xml"
      fileName: fileDTO.id,
    });
  },
);

export type UploadYmlWorkflowInput = {
  fileName: string;
};

export const uploadYmlWorkflow = createWorkflow(
  'upload-yml-workflow',
  (input: UploadYmlWorkflowInput) => {
    // TODO:
    // `getExportsStep` - get all existing active exports
    // `generateExportFilesStep` - generate YML files
    // `updateExportsStep` - save `last_export_at`, `file_name`, `file_path`
    // response with files array
    const yml = UploadYmlStepInput(input);
    return new WorkflowResponse(yml);
  }
);