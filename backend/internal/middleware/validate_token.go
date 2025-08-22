package middleware

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// ValidateToken парсит токен и проверяет подпись
func ValidateToken(tokenString string) (*jwt.Token, error) {
	secretKey := []byte(os.Getenv("JWT_SECRET_KEY"))

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrTokenSignatureInvalid
		}
		return secretKey, nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, errors.New("invalid token")
	}

	return token, nil
}

func CheckExpireToken(token *jwt.Token) (bool, error) {
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return false, errors.New("invalid token claims")
	}

	exp, ok := claims["exp"].(float64)
	if !ok {
		return false, errors.New("token does not contain expiration time")
	}

	if int64(exp) < time.Now().Unix() {
		return true, nil
	}

	return false, nil
}

func CheckTokenValid(tokenString string) error {
	token, err := ValidateToken(tokenString)
	if err != nil {
		return err
	}

	expired, err := CheckExpireToken(token)
	if err != nil {
		return err
	}
	if expired {
		return errors.New("token expired")
	}

	return nil
}
