export class ChatMessageUser {
  public constructor(
    public readonly id: string,
    public readonly login: string,
    public readonly displayName: string,
    public readonly color: string,
  ) {}
}
