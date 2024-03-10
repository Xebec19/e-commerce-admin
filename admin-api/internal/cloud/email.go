package cloud

import (
	"bytes"
	"context"
	"fmt"
	"log"
	"strconv"

	db "github.com/Xebec19/e-commerce-admin/admin-api/db/sqlc"
	"github.com/Xebec19/e-commerce-admin/admin-api/internal/util"
	"github.com/Xebec19/e-commerce-admin/admin-api/templates"
	"github.com/resend/resend-go/v2"
)

type EmailClient struct {
	client *resend.Client
}

var Email EmailClient

func (c *EmailClient) NewEmailClient() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	apiKey := config.ResendApiKey
	c.client = resend.NewClient(apiKey)
}

func (c *EmailClient) SendMsg(m *resend.SendEmailRequest) error {
	_, err := c.client.Emails.Send(m)
	return err
}

func (c *EmailClient) OrderConfirmationEmail(order db.Order, orderItems []db.ReadOrderItemsRow) error {

	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	products := []templates.Product{}

	for _, p := range orderItems {
		temp := templates.Product{
			Name:     p.ProductName,
			Quantity: strconv.Itoa(int(p.Quantity)),
			Price:    fmt.Sprintf("%v %v %v", config.Currency_Code, strconv.Itoa(int(p.Price.Int32)), config.Currency),
		}
		products = append(products, temp)
	}

	payload := &templates.OrderConfirmedProps{
		OrderId:         order.OrderID,
		Email:           order.ShippingEmail,
		ShippingAddress: order.ShippingAddress.String,
		Products:        products,
		Subtotal:        fmt.Sprintf("%v %v %v", config.Currency_Code, strconv.Itoa(int(order.Price.Int32)), config.Currency),
		DeliveryTotal:   fmt.Sprintf("%v %v %v", config.Currency_Code, strconv.Itoa(int(order.DeliveryPrice.Int32)), config.Currency),
		Discount:        order.DiscountCode.String,
		DiscountAmt:     fmt.Sprintf("%v %v %v", config.Currency_Code, strconv.Itoa(int(order.DiscountAmount.Int32)), config.Currency),
		Total:           fmt.Sprintf("%v %v %v", config.Currency_Code, strconv.Itoa(int(order.Total.Int32)), config.Currency),
	}

	body := templates.OrderConfirmed(*payload)

	var buf bytes.Buffer

	if err := body.Render(context.Background(), &buf); err != nil {
		return err
	}

	html := buf.String()

	emailRequest := &resend.SendEmailRequest{
		From:    config.ResendEmail,
		To:      []string{payload.Email},
		Subject: "Order Confirmed " + payload.OrderId,
		Html:    html,
	}

	c.SendMsg(emailRequest)
	return nil
}

func (c *EmailClient) OrderCancellationEmail(order db.Order, orderItems []db.ReadOrderItemsRow) error {

	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	products := []templates.Product{}

	for _, p := range orderItems {
		temp := templates.Product{
			Name:     p.ProductName,
			Quantity: strconv.Itoa(int(p.Quantity)),
			Price:    fmt.Sprintf("%v %v %v", config.Currency_Code, strconv.Itoa(int(p.Price.Int32)), config.Currency),
		}
		products = append(products, temp)
	}

	payload := &templates.OrderCancelledProps{
		OrderId:         order.OrderID,
		Email:           order.ShippingEmail,
		ShippingAddress: order.ShippingAddress.String,
		Products:        products,
		Subtotal:        fmt.Sprintf("%v %v %v", config.Currency_Code, strconv.Itoa(int(order.Price.Int32)), config.Currency),
		DeliveryTotal:   fmt.Sprintf("%v %v %v", config.Currency_Code, strconv.Itoa(int(order.DeliveryPrice.Int32)), config.Currency),
		Discount:        order.DiscountCode.String,
		DiscountAmt:     fmt.Sprintf("%v %v %v", config.Currency_Code, strconv.Itoa(int(order.DiscountAmount.Int32)), config.Currency),
		Total:           fmt.Sprintf("%v %v %v", config.Currency_Code, strconv.Itoa(int(order.Total.Int32)), config.Currency),
	}

	body := templates.OrderCancelled(*payload)

	var buf bytes.Buffer

	if err := body.Render(context.Background(), &buf); err != nil {
		return err
	}

	html := buf.String()

	emailRequest := &resend.SendEmailRequest{
		From:    config.ResendEmail,
		To:      []string{payload.Email},
		Subject: "Order Cancelled " + payload.OrderId,
		Html:    html,
	}

	c.SendMsg(emailRequest)
	return nil
}
