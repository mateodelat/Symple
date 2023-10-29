import {
  type ArgumentMetadata,
  BadRequestException,
  Injectable,
  type PipeTransform,
} from "@nestjs/common";

@Injectable()
export class CheckAmountEmployeesStringPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): string {
    const options = {
      "1-10": "1-10",
      "11-25": "11-25",
      "26-50": "26-50",
      "50+": "50+",
    };
    if (options[value] !== undefined) return value;
    throw new BadRequestException(
      'The string received for amountOfEmployees is malformed, valid values: "1-10", "11-25", "26-50", "50+"',
    );
  }
}
