package cloud

import (
	"log"

	"github.com/Xebec19/e-commerce-admin/admin-api/util"
	"github.com/resend/resend-go/v2"
)

var ResendClient *resend.Client

func NewEmailClient() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	apiKey := config.ResendApiKey
	ResendClient = resend.NewClient(apiKey)
}
