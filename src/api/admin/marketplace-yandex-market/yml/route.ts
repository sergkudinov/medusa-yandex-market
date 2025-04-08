import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { 
  uploadYmlWorkflow,
} from "../../../../workflows/upload-yml"

type PostAdminUploadYmlType = {
  fileName: string
}

export const POST = async (
  req: MedusaRequest<PostAdminUploadYmlType>,
  res: MedusaResponse
) => {
  const { result } = await uploadYmlWorkflow(req.scope)
    .run({
      input: {fileName: "test.xml"},
    })

  res.json({ ymlUrl: result })
}