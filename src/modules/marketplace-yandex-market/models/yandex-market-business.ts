import { model } from "@medusajs/framework/utils"
import YandexMarketCampaign from "./yandex-market-campaign"

const YandexMarketBusiness = model.define("yandex_market_business", {
  id: model.number().primaryKey(),
  name: model.text(),
  auth_tokens: model.array().unique(),
  campaigns: model.hasMany(() => YandexMarketCampaign),
})
.cascades({
  delete: ["campaigns"],
})
  

export default YandexMarketBusiness