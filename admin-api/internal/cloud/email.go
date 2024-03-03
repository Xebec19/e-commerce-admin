package cloud

import (
	"html/template"
	"log"

	"github.com/Xebec19/e-commerce-admin/admin-api/internal/util"
	"github.com/resend/resend-go/v2"
)

var ResendClient *resend.Client

type MailData struct {
	To      string
	From    string
	Subject string
	Content template.HTML
}

func NewEmailClient() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	apiKey := config.ResendApiKey
	ResendClient = resend.NewClient(apiKey)
}
