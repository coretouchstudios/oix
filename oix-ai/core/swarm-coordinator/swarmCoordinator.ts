import { UIAgent } from '../../agents/ui-agent/uiAgent'
import { APIAgent } from '../../agents/api-agent/apiAgent'
import { DatabaseAgent } from '../../agents/database-agent/databaseAgent'
import { SecurityAgent } from '../../agents/security-agent/securityAgent'
import { TestingAgent } from '../../agents/testing-agent/testingAgent'
import { OptimizationAgent } from '../../agents/optimization-agent/optimizationAgent'
import { DevOpsAgent } from '../../agents/devops-agent/devopsAgent'

export class SwarmCoordinator {

 ui = new UIAgent()
 api = new APIAgent()
 db = new DatabaseAgent()
 security = new SecurityAgent()
 testing = new TestingAgent()
 optimize = new OptimizationAgent()
 devops = new DevOpsAgent()

 async assign(tasks:any){

  console.log('Assigning tasks to agents')

  return {
   ui: await this.ui.run(),
   api: await this.api.run(),
   database: await this.db.run(),
   security: await this.security.run(),
   testing: await this.testing.run(),
   optimization: await this.optimize.run(),
   deployment: await this.devops.run()
  }

 }

}
