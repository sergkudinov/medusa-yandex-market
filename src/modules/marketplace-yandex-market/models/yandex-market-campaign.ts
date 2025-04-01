import { model } from "@medusajs/framework/utils"
import YandexMarketBusiness from "./yandex-market-business"

const YandexMarketCampaign = model.define("yandex_market_campaign", {
  id: model.number().primaryKey(),
  name: model.text(),
  business: model.belongsTo(() => YandexMarketBusiness, {
    mappedBy: "campaigns",
  }),
  auth_tokens: model.array().unique(),
  placement_type: model.enum(["Express", "FBS", "FBY", "DBS"]),
  url: model.text(),
  platform: model.text().default("Medusa"),
})

export default YandexMarketCampaign