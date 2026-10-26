import sales from './sales'
import recruiter from './recruiter'
import productManager from './product-manager'
import founder from './founder'
import customerSuccess from './customer-success'
import softwareProfessional from './software-professional'

export type UseCase = {
  slug: string
  role: string
  short: string // one line for the nav menu
  headline: string
  intro: string
  moments: [string, string][] // [call type, how Roofle helps]
  questions: string[] // sample questions Roofle might suggest
  outcomes: [string, string][]
}

export const USE_CASES: UseCase[] = [sales, recruiter, productManager, founder, customerSuccess, softwareProfessional]
export const bySlug = (slug: string) => USE_CASES.find(u => u.slug === slug)
