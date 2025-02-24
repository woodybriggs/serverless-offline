'use strict'

const { parse } = JSON

exports.handler = async (event) => {
  const { body, queryStringParameters, requestContext } = event
  const statusCode =
    queryStringParameters && queryStringParameters.statusCode
      ? Number(queryStringParameters.statusCode)
      : 200

  if (
    queryStringParameters &&
    queryStringParameters.throwError &&
    requestContext &&
    requestContext.routeKey === '$connect'
  ) {
    throw new Error('Throwing error during connect phase')
  }

  if (
    body &&
    parse(body).throwError &&
    requestContext &&
    requestContext.routeKey === '$default'
  ) {
    throw new Error('Throwing error from incoming message')
  }

  return {
    statusCode,
    body: body || undefined,
  }
}
