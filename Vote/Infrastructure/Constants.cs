namespace Vote.Infrastructure
{
    public class Constants
    {
        //****************************************************************************************************************************
        //Подключение к voteFDB
        //****************************************************************************************************************************
        // для включение соединение переименуйте в             connectionStringSites

        //Тестовое подключение к VOTE.FDB для сайта ECO.DMKD.DP.UA
        public const string connectionStringSites1 = @"User = SYSDBA; Password = testsite; Database = D:\DatabaseFB\SITES.FDB; DataSource = DMK-TEST; 
                                        Port = 3050; Dialect = 3; character set = UTF8; Role =; Connection lifetime = 15; Pooling = true; 
                                        MinPoolSize = 0; MaxPoolSize = 50; Packet Size = 8192; ServerType = 0; ";

        //Домашнее подключение  LOCALHOST
        public const string connectionStringSites = @"User = SYSDBA; Password = masterkey; Database = d:\vote.fdb; DataSource = localhost; 
                                        Port = 3050; Dialect = 3; character set = UTF8; Role =; Connection lifetime = 15; Pooling = true; 
                                        MinPoolSize = 0; MaxPoolSize = 50; Packet Size = 8192; ServerType = 0; ";

  

    }
}
