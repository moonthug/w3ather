import { APIGatewayProxyResult } from 'aws-lambda';

export function response<T>(body: T, statusCode: number = 200): APIGatewayProxyResult {
  return {
    statusCode,
    body: JSON.stringify(body)
  }
}
