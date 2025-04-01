import { model } from "@medusajs/framework/utils"

const YandexMarketCategory = model.define("yandex_market_category", {
  id: model.number().primaryKey(),
  name: model.text(),
})
  
export default YandexMarketCategory