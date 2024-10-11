const modelDefinitions: Record<string, any> = {};

export function Field(columnType: string) {
  return function (target: any, propertyKey: string) {
    const modelName = target.constructor.name;

    if (!modelDefinitions[modelName]) {
      modelDefinitions[modelName] = { fields: [] };
    }

    modelDefinitions[modelName].fields.push({
      name: propertyKey,
      type: columnType,
    });
  };
}

export function Table(tableName: string) {
  return function (constructor: any) {
    modelDefinitions[constructor.name].tableName =
      tableName || constructor.name.toLowerCase();
  };
}

export function getModelDefinition(model: any) {
  return modelDefinitions[model.constructor.name];
}
