import { MedusaContainer } from "@medusajs/framework/types"
import { uploadYmlWorkflow } from "../workflows/upload-yml"

export default async function myPeriodicJob(container: MedusaContainer) {
  const logger = container.resolve("logger")
  const { result } = await uploadYmlWorkflow(container).run({
    input: {fileName: "test.xml"},
  })
  // TODO display generated files count
  logger.info(`Updated yml-file for yandex-market catalog: ${result.fileName}`)
}

export const config = {
  name: "update-yml-job",
  schedule: "*/10 * * * *", // TODO decide the schedule period