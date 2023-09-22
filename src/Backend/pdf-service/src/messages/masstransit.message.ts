export interface MasstransitMessage<TMessageData> {
  messageId: string;
  requestId: string | null;
  correlationId: string | null;
  conversationId: string;
  initiatorId: string | null;
  sourceAddress: string;
  destinationAddress: string;
  responseAddress: string | null;
  faultAddress: string | null;
  messageType: string[];
  message: TMessageData;
  expirationTime: string | null;
  sentTime: string;
  headers: object;
  host: HostInformation;
}

export interface HostInformation {
  machineName: string;
  processName: string;
  processId: number;
  assembly: string;
  assemblyVersion: string;
  frameworkVersion: string;
  massTransitVersion: string;
  operatingSystemVersion: string;
}
