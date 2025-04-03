import { model } from "@medusajs/framework/utils"
import YandexMarketBusiness from "./yandex-market-business"

const YandexMarketCampaign = model.define("yandex_market_campaign", {
  domain: model.text(),
  id: model.number().primaryKey(),
  client_id: model.number(),
  business: model.belongsTo(() => YandexMarketBusiness, {
    mappedBy: "campaigns",
  }),
  placement_type: model.text(),
  url: model.text().nullable(),
  platform: model.text().default("Medusa"),
})

export default YandexMarketCampaign