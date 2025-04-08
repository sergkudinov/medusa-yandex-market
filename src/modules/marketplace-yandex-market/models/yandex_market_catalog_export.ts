import { model } from "@medusajs/framework/utils"

const YandexMarketCatalogExport = model.define("yandex_market_catalog_export", {
  id: model.id().primaryKey(),
  file_name: model.text(),
  file_path: model.text().nullable(),
  schedule: model.text(),
})
  
export default YandexMarketCatalogExport