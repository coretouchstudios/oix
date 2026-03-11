import { PromptEngine } from '../../core/prompt-engine/promptEngine'
import { ReasoningEngine } from '../../core/reasoning-engine/reasoningEngine'
import { ArchitecturePlanner } from './planner'
import { TemplateEngine } from '../../core/template-engine/templateEngine'
import { CodeEngine } from '../code-engine/codeEngine'
import { ProjectGenerator } from '../project-generator/projectGenerator'

export class BuilderEngine {

  promptEngine = new PromptEngine()
  reasoningEngine = new ReasoningEngine()
  planner = new ArchitecturePlanner()
  templateEngine = new TemplateEngine()
  codeEngine = new CodeEngine()
  generator = new ProjectGenerator()

  async build(prompt:string){

    const structuredPrompt = await this.promptEngine.parse(prompt)

    const reasoning = await this.reasoningEngine.analyze(structuredPrompt)

    const architecture = await this.planner.plan(reasoning)

    const templates = await this.templateEngine.selectTemplates(architecture)

    const code = await this.codeEngine.generateCode(templates)

    const project = await this.generator.generateProject(code)

    return project

  }

}
