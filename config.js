'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/dogood-db';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/dogood-test';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.NODE_ENV = process.env.NODE_ENV || 'development' ;