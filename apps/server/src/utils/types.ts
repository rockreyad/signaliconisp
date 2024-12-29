export interface BkashConfig {
  grant_token_url: string;
  refresh_token_url: string;
  create_payment_url: string;
  execute_payment_url: string;
  backend_callback_url: string;
  frontend_success_url: string;
  frontend_fail_url: string;
  username: string;
  password: string;
  app_key: string;
  app_secret: string;
}

export interface TokenHeaders extends Record<string, string> {
  'Content-Type': string;
  Accept: string;
  username: string;
  password: string;
}

export interface AuthHeaders extends Record<string, string> {
  'Content-Type': string;
  Accept: string;
  authorization: string;
  'x-app-key': string;
}

export interface ApiResponse<T> {
  status: boolean;
  data: T;
  message: string;
}

export interface BkashExecuteResponse {
  paymentID: string;
  trxID: string;
  transactionStatus: string;
  amount: string;
  currency: string;
  intent: string;
  paymentExecuteTime: string;
  merchantInvoiceNumber: string;
  payerType: string;
  payerReference: string;
  customerMsisdn: string;
  payerAccount: string;
  statusCode: string;
  statusMessage: string;
}
