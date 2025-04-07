import { MedusaService } from "@medusajs/framework/utils"
import YandexMarketCampaign from "./models/yandex-market-campaign"
import YandexMarketBusiness from "./models/yandex-market-business"


class MarketplaceYandexMarketModuleService extends MedusaService({
  YandexMarketCampaign,
  YandexMarketBusiness,
}){
}

export default MarketplaceYandexMarketModuleService