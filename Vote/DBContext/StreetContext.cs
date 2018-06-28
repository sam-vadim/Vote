using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using Vote.Models;
using Vote.Infrastructure;

namespace Vote.DBContext
{
    public class StreetContext
    {
        public static List<Street> AllStreets()
        {
            string sqlStringRooms = "SELECT id,  trim(NAME_STREET)||' '||trim(TYPE_STREET) as NAME_STREET  FROM STREETS ORDER BY NAME_STREET";

            DataTable dtp = FDBContext.Select(sqlStringRooms, Constants.connectionStringSites);

            List <Street> Streets = new List<Street>();

            if (dtp.Rows.Count != 0)
            {
                foreach (DataRow dataRow in dtp.Rows)
                {
                    Streets.Add(new Street
                    {
                        Id = (int)dataRow["ID"],
                        NAME_STREET = dataRow["NAME_STREET"].ToString().Trim()
                    });
                }
            }
            return Streets;
        }

    }
}
