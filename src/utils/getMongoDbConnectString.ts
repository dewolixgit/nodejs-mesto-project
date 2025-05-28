const getMongoDbConnectString = ({
  dbHost,
  dbPort,
  dbName,
}: {
  dbHost?: string,
  dbPort?: string | number,
  dbName?: string
}) => `mongodb://${dbHost}:${dbPort}/${dbName}`;

export default getMongoDbConnectString;
