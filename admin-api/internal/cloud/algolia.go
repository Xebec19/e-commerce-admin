package cloud

import (
	"context"
	"fmt"

	db "github.com/Xebec19/e-commerce-admin/admin-api/db/sqlc"
	"github.com/algolia/algoliasearch-client-go/v3/algolia/opt"
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

func SaveProduct(id int) {

	product, err := db.DBQuery.ReadOneProduct(context.Background(), int32(id))
	if err != nil {
		fmt.Printf("Could not fetch product")
	}

	payload := &Record{
		Product_Name:   product.ProductName,
		Category_Name:  product.CategoryName,
		Product_Desc:   product.ProductDesc.String,
		Product_Id:     int(product.ProductID),
		Image_Url:      product.ImageUrl,
		Quantity:       int(product.Quantity.Int32),
		Price:          int(product.Price.Int32),
		Delivery_Price: int(product.DeliveryPrice.Int32),
		Category_Id:    int(product.CategoryID),
		Gender:         string(product.Gender.EnumGender),
	}
	_, err = SearchIndex.SaveObject(*payload)
	if err != nil {
		fmt.Printf("Could not save product to index")
	}
}

func RemoveProduct(id int) {
	_, err := SearchIndex.DeleteBy(
		opt.Filters(fmt.Sprintf("product_id:%v", id)),
	)
	if err != nil {
		fmt.Printf("product coult not be removed from index")
	}

}
