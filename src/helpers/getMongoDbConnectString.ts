const getMongoDbConnectString = ({ dbHost, dbPort, dbName }: {dbHost?: string, dbPort?: string, dbName?: string}) => `mongodb://${dbHost}:${dbPort}/${dbName}`;

export default getMongoDbConnectString;
