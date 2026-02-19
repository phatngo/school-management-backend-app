/**
 * HTTP status code constants
 * Centralized list of commonly used HTTP status codes.
 */

const HttpStatusCode = {
	// Success
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204,

	// Client errors
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	UNPROCESSABLE_ENTITY: 422,

	// Server errors
	INTERNAL_SERVER_ERROR: 500,
	SERVICE_UNAVAILABLE: 503,
};

const HttpStatus = {
	// Success
	OK: 'OK',
	CREATED: 'Created',
	ACCEPTED: 'Accepted',
	NO_CONTENT: 'No Content',

	// Client errors
	BAD_REQUEST: 'BAD_REQUEST',
	UNAUTHORIZED: 'UNAUTHORIZED',
	FORBIDDEN: 'FORBIDDEN',
	NOT_FOUND: 'NOT_FOUND',
	CONFLICT: 'CONFLICT',
	UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',

	// Server errors
	INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
	SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
};

module.exports = { HttpStatus, HttpStatusCode };
