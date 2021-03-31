export class GameDto {
  publicId: string;
  createdDate: Date;
  closed: boolean;

  constructor(json?: any) {
    if (json) {
      this.publicId = json.publicId;
      this.createdDate = json.createdDate;
      this.closed = json.closed;
    }
  }
}
