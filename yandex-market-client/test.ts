import { Configuration, CampaignsApi} from './';

const config = new Configuration({
  apiKey: 'ACMA:ckw2aOp3IKkBd0xpG71IvGxyKNRjj0B6SS6cEeIb:7aa8345b'
});

const api = new CampaignsApi(config);


async function main() {
  try {
    const response = await api.getCampaigns();
    console.log(response.data);
    const campaignsList = response.data.campaigns;
    const businesses = campaignsList.map(campaign => ({
      id: String(campaign.business?.id!),
      name: campaign.business?.name!,
      api_key: "input.api_key",
    }));
    const campaigns = campaignsList.map(campaign => ({
      domain: campaign.domain!,
      id: String(campaign.id!),
      client_id: campaign.clientId!,
      yandex_market_business_id: String(campaign.business!.id),
      placement_type: campaign.placementType!,
    }));
    console.log({campaigns, businesses});
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

main();