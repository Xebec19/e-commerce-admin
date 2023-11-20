// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.23.0

package db

import (
	"database/sql"
	"database/sql/driver"
	"fmt"

	"github.com/google/uuid"
)

type EnumAccess string

const (
	EnumAccessUser  EnumAccess = "user"
	EnumAccessAdmin EnumAccess = "admin"
)

func (e *EnumAccess) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = EnumAccess(s)
	case string:
		*e = EnumAccess(s)
	default:
		return fmt.Errorf("unsupported scan type for EnumAccess: %T", src)
	}
	return nil
}

type NullEnumAccess struct {
	EnumAccess EnumAccess `json:"enum_access"`
	Valid      bool       `json:"valid"` // Valid is true if EnumAccess is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullEnumAccess) Scan(value interface{}) error {
	if value == nil {
		ns.EnumAccess, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.EnumAccess.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullEnumAccess) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.EnumAccess), nil
}

type EnumGender string

const (
	EnumGenderMale      EnumGender = "male"
	EnumGenderFemale    EnumGender = "female"
	EnumGenderUndefined EnumGender = "undefined"
)

func (e *EnumGender) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = EnumGender(s)
	case string:
		*e = EnumGender(s)
	default:
		return fmt.Errorf("unsupported scan type for EnumGender: %T", src)
	}
	return nil
}

type NullEnumGender struct {
	EnumGender EnumGender `json:"enum_gender"`
	Valid      bool       `json:"valid"` // Valid is true if EnumGender is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullEnumGender) Scan(value interface{}) error {
	if value == nil {
		ns.EnumGender, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.EnumGender.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullEnumGender) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.EnumGender), nil
}

type EnumStatus string

const (
	EnumStatusActive   EnumStatus = "active"
	EnumStatusInactive EnumStatus = "inactive"
)

func (e *EnumStatus) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = EnumStatus(s)
	case string:
		*e = EnumStatus(s)
	default:
		return fmt.Errorf("unsupported scan type for EnumStatus: %T", src)
	}
	return nil
}

type NullEnumStatus struct {
	EnumStatus EnumStatus `json:"enum_status"`
	Valid      bool       `json:"valid"` // Valid is true if EnumStatus is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullEnumStatus) Scan(value interface{}) error {
	if value == nil {
		ns.EnumStatus, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.EnumStatus.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullEnumStatus) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.EnumStatus), nil
}

type EnumType string

const (
	EnumTypeVoucher EnumType = "voucher"
	EnumTypeCoupon  EnumType = "coupon"
)

func (e *EnumType) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = EnumType(s)
	case string:
		*e = EnumType(s)
	default:
		return fmt.Errorf("unsupported scan type for EnumType: %T", src)
	}
	return nil
}

type NullEnumType struct {
	EnumType EnumType `json:"enum_type"`
	Valid    bool     `json:"valid"` // Valid is true if EnumType is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullEnumType) Scan(value interface{}) error {
	if value == nil {
		ns.EnumType, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.EnumType.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullEnumType) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.EnumType), nil
}

type Cart struct {
	CartID       uuid.UUID      `json:"cart_id"`
	UserID       uuid.NullUUID  `json:"user_id"`
	DiscountCode sql.NullString `json:"discount_code"`
	CreatedOn    sql.NullTime   `json:"created_on"`
	UpdatedOn    sql.NullTime   `json:"updated_on"`
}

type CartDetail struct {
	CdID          uuid.UUID      `json:"cd_id"`
	CartID        uuid.NullUUID  `json:"cart_id"`
	ProductID     uuid.NullUUID  `json:"product_id"`
	ProductPrice  sql.NullString `json:"product_price"`
	Quantity      sql.NullString `json:"quantity"`
	DeliveryPrice sql.NullString `json:"delivery_price"`
}

type Category struct {
	CategoryID   uuid.UUID      `json:"category_id"`
	CategoryName string         `json:"category_name"`
	CreatedOn    sql.NullTime   `json:"created_on"`
	ImageUrl     sql.NullString `json:"image_url"`
	Status       NullEnumStatus `json:"status"`
}

type Country struct {
	CountryID      uuid.UUID `json:"country_id"`
	CountryName    string    `json:"country_name"`
	Currency       string    `json:"currency"`
	CurrencySymbol string    `json:"currency_symbol"`
}

type Discount struct {
	DiscountID uuid.UUID      `json:"discount_id"`
	Code       string         `json:"code"`
	Status     NullEnumStatus `json:"status"`
	Type       NullEnumType   `json:"type"`
	Value      sql.NullInt32  `json:"value"`
	CreatedOn  sql.NullTime   `json:"created_on"`
	UpdatedOn  sql.NullTime   `json:"updated_on"`
	CreatedBy  uuid.NullUUID  `json:"created_by"`
	UpdatedBy  uuid.NullUUID  `json:"updated_by"`
	ExpiredOn  sql.NullTime   `json:"expired_on"`
}

type Order struct {
	OrderID           uuid.UUID      `json:"order_id"`
	UserID            uuid.NullUUID  `json:"user_id"`
	Price             sql.NullString `json:"price"`
	DeliveryPrice     sql.NullString `json:"delivery_price"`
	Total             sql.NullString `json:"total"`
	CreatedOn         sql.NullTime   `json:"created_on"`
	BillingFirstName  string         `json:"billing_first_name"`
	BillingLastName   string         `json:"billing_last_name"`
	BillingEmail      string         `json:"billing_email"`
	BillingAddress    sql.NullString `json:"billing_address"`
	ShippingFirstName string         `json:"shipping_first_name"`
	ShippingLastName  string         `json:"shipping_last_name"`
	ShippingEmail     string         `json:"shipping_email"`
	ShippingAddress   sql.NullString `json:"shipping_address"`
}

type OrderDetail struct {
	OdID          uuid.UUID     `json:"od_id"`
	OrderID       uuid.NullUUID `json:"order_id"`
	ProductID     uuid.NullUUID `json:"product_id"`
	ProductPrice  string        `json:"product_price"`
	Quantity      string        `json:"quantity"`
	DeliveryPrice string        `json:"delivery_price"`
}

type Product struct {
	ProductID     uuid.UUID      `json:"product_id"`
	CategoryID    uuid.NullUUID  `json:"category_id"`
	ProductName   string         `json:"product_name"`
	Price         sql.NullString `json:"price"`
	DeliveryPrice sql.NullString `json:"delivery_price"`
	Gender        NullEnumGender `json:"gender"`
	ProductDesc   sql.NullString `json:"product_desc"`
	Quantity      sql.NullString `json:"quantity"`
	CountryID     uuid.NullUUID  `json:"country_id"`
	CreatedOn     sql.NullTime   `json:"created_on"`
	UpdatedOn     sql.NullTime   `json:"updated_on"`
	Status        NullEnumStatus `json:"status"`
}

type ProductImage struct {
	ImgID     uuid.UUID      `json:"img_id"`
	ProductID uuid.NullUUID  `json:"product_id"`
	ImageUrl  string         `json:"image_url"`
	CreatedOn sql.NullTime   `json:"created_on"`
	UpdatedOn sql.NullTime   `json:"updated_on"`
	UpdatedBy uuid.NullUUID  `json:"updated_by"`
	Status    NullEnumStatus `json:"status"`
}

type User struct {
	UserID    uuid.UUID      `json:"user_id"`
	FirstName string         `json:"first_name"`
	LastName  sql.NullString `json:"last_name"`
	Email     sql.NullString `json:"email"`
	Phone     sql.NullString `json:"phone"`
	Password  string         `json:"password"`
	CreatedOn sql.NullTime   `json:"created_on"`
	UpdatedOn sql.NullTime   `json:"updated_on"`
	Status    NullEnumStatus `json:"status"`
	Access    NullEnumAccess `json:"access"`
}
