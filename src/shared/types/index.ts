interface MultilangText {
  uz: string;
  ru: string;
  en: string;
}

export interface IReviewTargets {
  id: string;
  active: boolean;
  company_id: string;
  created_at: string;
  updated_at: string;
  name: MultilangText;
  description: MultilangText;
  image: string;
}
