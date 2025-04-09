import { model } from "@medusajs/framework/utils"

const YandexMarketCatalogExport = model.define("yandex_market_catalog_export", {
  id: model.id().primaryKey(),
  file_name: model.text().nullable(),
  file_path: model.text().nullable(),
  last_export_at: model.dateTime().nullable(),
  is_active : model.boolean().default(false),
})
  
export default YandexMarketCatalogExport