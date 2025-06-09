import { BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseIntPipe implements PipeTransform {
  transform(value: string): number {
    if (isNaN(parseInt(value)) || Number(value) <= 0)
      throw new BadRequestException(`"${value}" не является числом`);

    return Number(value);
  }
}
