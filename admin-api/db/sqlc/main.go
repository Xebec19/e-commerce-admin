/*
package db contains models and functions required to connect to database
*/
package db

import (
	"database/sql"
	"log"

	"github.com/Xebec19/e-commerce-admin/admin-api/util"
	_ "github.com/lib/pq"
)

var DBQuery *Queries

func Connect() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}
	conn, err := sql.Open(config.DBDriver, config.DBSource)
	if err != nil {
		log.Fatal("cannot connect database:", err)
	}
	DBQuery = New(conn)
	log.Printf("Database connected successfully")
}
