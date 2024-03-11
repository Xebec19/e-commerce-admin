package cloud

import (
	"github.com/algolia/algoliasearch-client-go/v3/algolia/search"
)

var SearchIndex *search.Index

type Record struct {
	Product_Name   string `json:"product_name"`
	Category_Name  string `json:"category_name"`
	Product_Desc   string `json:"product_desc"`
	Product_Id     int    `json:"product_id"`
	Image_Url      string `json:"image_url"`
	Quantity       int    `json:"quantity"`
	Price          int    `json:"price"`
	Delivery_Price int    `json:"delivery_price"`
	Category_Id    int    `json:"category_id"`
	Gender         string `json:"gender"`
}

func SearchIndexInit(applicationID string, writeKey string, indexName string) {

	client := search.NewClient(applicationID, writeKey)

	SearchIndex = client.InitIndex(indexName)

}

func SaveProduct(record Record) {
	go SearchIndex.SaveObject(record)
}

// todo delete product
// func Remove
