import { MedusaService } from "@medusajs/framework/utils"
import YandexMarketCampaign from "./models/yandex-market-campaign"
import YandexMarketBusiness from "./models/yandex-market-business"
import YandexMarketCatalogExport from "./models/yandex_market_catalog_export"


class MarketplaceYandexMarketModuleService extends MedusaService({
  YandexMarketCampaign,
  YandexMarketBusiness,
  YandexMarketCatalogExport
}){
}

export default MarketplaceYandexMarketModuleService