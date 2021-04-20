import { APIGatewayProxyResult } from 'aws-lambda';

export function response(body: any, statusCode: number = 200): APIGatewayProxyResult {
  return {
    statusCode,
    body: JSON.stringify(body)
  }
}
