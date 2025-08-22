package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func MainMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")
		if token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token is required"})
			c.Abort()
			return
		}

		if strings.HasPrefix(token, "Bearer") {
			token = strings.TrimPrefix(token, "Bearer ")
		}

		if CheckTokenValid(token) != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
			c.Abort()
			return
		}

		c.Next()
	}
}
