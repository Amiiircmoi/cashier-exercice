import { Injectable } from '@nestjs/common';
import { DataService } from '../data.service';
import { Invoice } from 'src/entities/invoice.entity';

@Injectable()
export class InvoicesService {
  constructor(private service: DataService) { }

  async getInvoices(): Promise<Invoice[]> {
    return await this.service.findAllClosedInvoices();
  }

  async getInvoice(id: number): Promise<Invoice> {
    return this.service.findOneInvoice(id);
  }
}
