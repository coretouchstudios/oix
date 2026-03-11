import { generateDashboard } from "../dashboard/dashboard.engine"
import { getStartupPipeline } from "../pipelines/pipeline.monitor"
import { monitorNodes } from "../monitoring/node.monitor"
import { analyzePortfolio } from "../analytics/portfolio.analytics"

export function runCommandCenter(){

 const dashboard = generateDashboard()
 const pipelines = getStartupPipeline()
 const nodes = monitorNodes()
 const portfolio = analyzePortfolio()

 return {

  dashboard,
  pipelines,
  nodes,
  portfolio

 }

}
