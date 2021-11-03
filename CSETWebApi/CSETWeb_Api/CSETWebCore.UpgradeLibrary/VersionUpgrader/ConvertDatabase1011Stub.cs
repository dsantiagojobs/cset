﻿using System;
using Microsoft.Data.SqlClient;
using System.IO;

namespace UpgradeLibrary.Upgrade
{
    public class ConvertDatabase1011Stub : ConvertSqlDatabase
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        public ConvertDatabase1011Stub(string path) : base(path)
        {
            myVersion = new Version("10.1.1.0");
        }


        /// <summary>
        /// Runs the database update script
        /// </summary>
        /// <param name="conn"></param>
        public override void Execute(SqlConnection conn)
        {
            try
            {
                //nothing here just upgrade from non zero to adding zero
                this.UpgradeToVersionLocalDB(conn, myVersion);
            }
            catch (Exception ex)
            {
                log.Fatal("Error in upgrading assessment version 10.1.0 file to 10.1.1", ex);
                throw new DatabaseUpgradeException("Error in upgrading assessment version 10.1.0 file to 10.1.1");
            }
        }
    }
}