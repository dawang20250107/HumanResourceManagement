import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommandService {
  constructor(private readonly prisma: PrismaService) {}

  async suggestions(query?: string): Promise<string[]> {
    const rows = await this.prisma.commandSuggestion.findMany({ orderBy: { order: 'asc' } });
    const all = rows.map((r) => r.text);
    const q = query?.trim();
    if (!q) return all;
    return all.filter((text) => text.includes(q));
  }
}
