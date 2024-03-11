package util

import (
	"github.com/spf13/viper"
)

type Config struct {
	DBDriver            string `mapstructure:"DB_DRIVER"`
	DBSource            string `mapstructure:"DB_SOURCE"`
	ServerAddress       string `mapstructure:"SERVER_ADDRESS"`
	JwtSecret           string `mapstructure:"JWT_SECRET"`
	Env                 string `mapstructure:"ENV"`
	AWSAccessKey        string `mapstructure:"AWS_ACCESS_KEY"`
	AWSSecretKey        string `mapstructure:"AWS_SECRET_KEY"`
	AWSBucketName       string `mapstructure:"AWS_BUCKET_NAME"`
	AWSRegion           string `mapstructure:"AWS_REGION"`
	ResendApiKey        string `mapstructure:"RESEND_API_KEY"`
	ResendEmail         string `mapstructure:"RESEND_EMAIL"`
	Currency            string `mapstructure:"CURRENCY"`
	Currency_Code       string `mapstructure:"CURRENCY_CODE"`
	Algolia_Application string `mapstructure:"ALGOLIA_APPLICATION"`
	Algolia_Write_Key   string `mapstructure:"ALGOLIA_WRITE_KEY"`
	Algolia_Index       string `mapstructure:"ALGOLIA_INDEX"`
}

func LoadConfig(path string) (config Config, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigName("app")
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		return
	}

	err = viper.Unmarshal(&config)
	return
}
