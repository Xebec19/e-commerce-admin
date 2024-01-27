package cloud

import (
	"fmt"
	"log"
	"mime/multipart"

	"github.com/Xebec19/e-commerce-admin/admin-api/util"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

var Uploader *s3manager.Uploader

func SetupSession() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	var region string = config.AWSRegion
	var accessKey string = config.AWSAccessKey
	var secretKey string = config.AWSSecretKey

	awsSession, err := session.NewSessionWithOptions(
		session.Options{
			Config: aws.Config{
				Region: aws.String(region),
				Credentials: credentials.NewStaticCredentials(
					accessKey,
					secretKey,
					"",
				),
			},
		})

	if err != nil {
		panic(err)
	}

	Uploader = s3manager.NewUploader(awsSession)
}

func UploadImage(file *multipart.FileHeader) (string, error) {

	src, err := file.Open()
	if err != nil {
		return "", err
	}
	defer src.Close()

	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}
	var bucketName string = config.AWSBucketName

	_, err = Uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(file.Filename),
		Body:   src, // add file body here
	})
	if err != nil {
		return "", err
	}

	url := fmt.Sprintf("https://%s.s3.amazonaws.com/%s", bucketName, file.Filename)

	return url, nil
}
