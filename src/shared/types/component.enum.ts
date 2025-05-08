export const Component = {
  Config: Symbol.for('Config'),
  Logger: Symbol.for('Logger'),
  RestApplication: Symbol.for('RestApplication'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  OfferService: Symbol.for('OfferService'),
  OfferModel: Symbol.for('OfferModel'),
} as const;
