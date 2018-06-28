using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vote.Infrastructure;
using Vote.Models;

namespace Vote.DBContext
{
    public class ReviewContext
    {
        //Добавление записи
        public static bool Add(Review review)
        {
            string sqlStr = "INSERT INTO VOTE (FAM,IM,OT,STREET_ID,HOME_NUM,FLAT_NUM,PASSPORT,CONTENT,DATE_INSERT) " +
                           " VALUES('" +
                                    review.Fam + "','" +
                                    review.Im + "','" +
                                    review.Ot + "'," +
                                    review.Street_id + ",'" +
                                    review.Home_num + "','" +
                                    review.Flat_num + "','" +
                                    review.Passport + "','" +
                                    review.Content + "','now')" ;

            return FDBContext.Insert(sqlStr, Constants.connectionStringSites);
        }
        //Проверка на дублирование паспортных данных
        public static int CheckPassport(string Passport)
        {
            string sqlStr = "SELECT FAM,IM,OT FROM VOTE WHERE PASSPORT='" +Passport + "'";

            return FDBContext.Select(sqlStr, Constants.connectionStringSites).Rows.Count;
        }
    }
}
