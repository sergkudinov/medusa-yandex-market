import { MedusaService } from "@medusajs/framework/utils"
import YandexMarketCampaign from "./models/yandex-market-campaign"
import YandexMarketBusiness from "./models/yandex-market-business"
import YandexMarketCategory from "./models/yandex-market-category"


class MarketplaceYandexMarketModuleService extends MedusaService({
  YandexMarketCampaign,
  YandexMarketBusiness,
  YandexMarketCategory,
}){
}

export default MarketplaceYandexMarketModuleService