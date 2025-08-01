export interface FAQResource {
  id: number;
  question: string;
  answer: string;
  type?: 'camp' | 'landing_page' | 'waiting_list' | 'ticket_detail';
}

export class FAQ {
  data: FAQ;
  constructor(data: FAQ) {
    this.data = data;
  }
}
