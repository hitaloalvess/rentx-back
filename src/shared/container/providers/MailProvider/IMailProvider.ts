interface IVariables {
  [key: string]: string;
}

interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: IVariables,
    path: string,
  ): Promise<void>;
}

export { IMailProvider };
