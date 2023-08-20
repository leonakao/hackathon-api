export type StoreEntity<Entity> = Omit<
  Entity,
  'createdAt' | 'updatedAt' | 'deletedAt'
>;
