import { MedusaContainer } from "@medusajs/framework/types"
import { uploadYmlWorkflow } from "../workflows/upload-yml"

export default async function myPeriodicJob(container: MedusaContainer) {
  const logger = container.resolve("logger")
  const { result } = await uploadYmlWorkflow(container).run({
    input: {fileName: "test.yml"},
  })
  logger.info(
    `Updated yml-file for yandex-market catalog: ${result.ymlUrl}`)
  logger.info(
    `${result.ymlString}`) 
}

export const config = {
  name: "update-yml-job",
  schedule: "* * * * *", // обновление каждую минуту. Для обновления каджые 10 использовать - "*/10 * * * *"
}