import { model } from "@medusajs/framework/utils"
import YandexMarketCampaign from "./yandex-market-campaign"

const YandexMarketBusiness = model.define("yandex_market_business", {
  id: model.text().primaryKey(),
  name: model.text(),
  api_key: model.text(),
  campaigns: model.hasMany(() => YandexMarketCampaign),
})
.cascades({
  delete: ["campaigns"],
})
  

export default YandexMarketBusiness