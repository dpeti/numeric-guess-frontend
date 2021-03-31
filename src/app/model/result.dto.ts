export class ResultDto {
  result: string;

  constructor(json?: any) {
    if (json) {
      this.result = json.result;
    }
  }
}
