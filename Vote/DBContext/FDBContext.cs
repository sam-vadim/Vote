using System.Collections.Generic;
using System.Data;
using FirebirdSql.Data.FirebirdClient;

namespace Vote.DBContext
{
    public class FDBContext
    {
        public static DataTable Select(string sqlStr, string connStr, string name = "Default")
        {
            DataTable dt = new DataTable(name);
            using (FbConnection conn = new FbConnection(connStr))
            {
                conn.Open();
                try
                {
                    FbDataAdapter da = new FbDataAdapter(sqlStr, conn);
                    da.Fill(dt);
                }
                finally
                {
                    conn.Close();
                }
            }
            return dt;
        }

        public static bool Insert(string sqlStr, string connStr)
        {
            return ExecuteCommands(sqlStr, connStr);
        }

        public static bool Delete(string sqlStr, string connStr)
        {
            return ExecuteCommands(sqlStr, connStr);
        }

        public static bool Update(string sqlStr, string connStr)
        {
            return ExecuteCommands(sqlStr, connStr);
        }


        private static bool ExecuteCommands(string sqlStr, string connStr)
        {
            using (FbConnection conn = new FbConnection(connStr))
            {
                conn.Open();
                FbTransactionOptions transactOptions = new FbTransactionOptions()
                {
                    TransactionBehavior = FbTransactionBehavior.NoWait |
                        FbTransactionBehavior.ReadCommitted |
                        FbTransactionBehavior.RecVersion
                };
                FbTransaction transact = conn.BeginTransaction(transactOptions);
                try
                {
                    FbCommand cmd = new FbCommand(sqlStr, conn, transact);
                    cmd.ExecuteNonQuery();
                    transact.Commit();
                }
                catch
                {
                    transact.Rollback();
                    return false;
                }
                finally
                {
                    conn.Close();
                }
                return true;
            }
        }
        public static bool ExecuteAllCommands(List<string> sqlStrs, string connStr)
        {
            using (FbConnection conn = new FbConnection(connStr))
            {
                conn.Open();
                FbTransactionOptions transactOptions = new FbTransactionOptions()
                {
                    TransactionBehavior = FbTransactionBehavior.NoWait |
                        FbTransactionBehavior.ReadCommitted |
                        FbTransactionBehavior.RecVersion
                };
                FbTransaction transact = conn.BeginTransaction(transactOptions);
                try
                {
                    foreach (string str in sqlStrs)
                    {
                        FbCommand cmd = new FbCommand(str, conn, transact);
                        cmd.ExecuteNonQuery();
                    }

                    transact.Commit();
                }
                catch
                {
                    transact.Rollback();
                    return false;
                }
                finally
                {
                    conn.Close();
                }
                return true;
            }
        }

    }
}
