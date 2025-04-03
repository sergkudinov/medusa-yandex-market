import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { 
  addCampaignsWorkflow,
} from "../../../../workflows/add-campaigns"

type PostAdminAddCampaignsType = {
  apiKey: string
}

export const POST = async (
  req: MedusaRequest<PostAdminAddCampaignsType>,
  res: MedusaResponse
) => {
  const { result } = await addCampaignsWorkflow(req.scope)
    .run({
      input: {apiKey: "ACMA:ckw2aOp3IKkBd0xpG71IvGxyKNRjj0B6SS6cEeIb:7aa8345b"},
    })

  res.json({ brand: result })
}