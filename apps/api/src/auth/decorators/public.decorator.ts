import { type CustomDecorator, SetMetadata } from "@nestjs/common";
import { IS_PUBLIC } from "@constants/index";

export const Public = (): CustomDecorator<string> =>
  SetMetadata(IS_PUBLIC, true);
