class AuthError extends Error {
  constructor(message, context) {
    super(message);
    this.name = "AuthError";
    this.payload = context;
  }
}

module.exports = AuthError;
