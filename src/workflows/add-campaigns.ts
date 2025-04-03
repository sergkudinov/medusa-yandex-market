import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { MARKETPLACE_YANDEX_MARKET_MODULE } from '../modules/marketplace-yandex-market';
import MarketplaceYandexMarketModuleService from '../modules/marketplace-yandex-market/service';
import { emitEventStep } from '@medusajs/medusa/core-flows';

import { Configuration, CampaignsApi } from '../../yandex-market-client';

export type GetCampaignsListInput = {
  apiKey: string;
};

export const getCampaignsList = createStep(
  'get-campaigns-list',
  async (input: GetCampaignsListInput) => {
    const config = new Configuration({
      apiKey: input.apiKey,
    });
    const api = new CampaignsApi(config);
    const response = await api.getCampaigns();
    const campaignsList = response.data.campaigns;
    const businesses = campaignsList.map(campaign => ({
      id: campaign.business?.id!,
      name: campaign.business?.name!,
      apiKey: input.apiKey,
    }));
    const campaigns = campaignsList.map(campaign => ({
      domain: campaign.domain!,
      id: campaign.id!,
      client_id: campaign.clientId!,
      business_id: String(campaign.business!.id),
      placement_type: campaign.placementType!,
    }));
    return new StepResponse({campaigns, businesses});
  },
);

export type AddCampaignsStepInput = {
  campaigns: {
    domain: string;
    id: number;
    client_id: number;
    business_id: string;
    placement_type: string;
  }[];
  businesses: {
    id: number;
    name: string;
    apiKey: string;
  }[];
};

export const addCampaignsStep = createStep(
  'add-campaigns-step',
  async (input: AddCampaignsStepInput, { container }) => {
    const marketplaceYandexMarketModuleService: MarketplaceYandexMarketModuleService = 
      container.resolve(MARKETPLACE_YANDEX_MARKET_MODULE);
    const businesses = await marketplaceYandexMarketModuleService.createYandexMarketBusinesses(input.businesses);
    const campaigns = await marketplaceYandexMarketModuleService.createYandexMarketCampaigns(input.campaigns);
    return new StepResponse({businesses, campaigns}, input.businesses.map(business => business.id));
  },
  async (input: number[], { container }) => {
    const marketplaceYandexMarketModuleService: MarketplaceYandexMarketModuleService = 
      container.resolve(MARKETPLACE_YANDEX_MARKET_MODULE);
    await marketplaceYandexMarketModuleService.deleteYandexMarketBusinesses(input);
  }
);

export type AddCampaignsWorkflowInput = {
  apiKey: string;
};

export const addCampaignsWorkflow = createWorkflow(
  'add-campaigns-workflow',
  (input: AddCampaignsWorkflowInput) => {
    const campaignsList = getCampaignsList(input);
    const campaigns = addCampaignsStep(campaignsList)
    return new WorkflowResponse(campaigns);
  }
);
  