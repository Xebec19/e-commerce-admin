package cloud

import (
	"log"

	"github.com/Xebec19/e-commerce-admin/admin-api/internal/util"
	"github.com/resend/resend-go/v2"
)

type EmailClient struct {
	client *resend.Client
}

var Email EmailClient

type MailData struct {
	To       string
	From     string
	Subject  string
	Template string
}

func (c *EmailClient) NewEmailClient() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	apiKey := config.ResendApiKey
	c.client = resend.NewClient(apiKey)
}

func (c *EmailClient) sendMsg(m MailData) {
	// if m.Template != "" {
	// 	data, err := os.ReadFile(fmt.Sprintf("./templates/%s", m.Template))
	// 	if err != nil {
	// 		log.Fatal("could not fetch template:", err)
	// 	}
	// 	mailTemplate := string(data)
	// }

}
