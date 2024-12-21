package handlers

import (
	"craft-fusion/craft-go/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetRecordsHandler serves user records based on limit.
func GetRecordsHandler(c *gin.Context) {
	limitParam := c.DefaultQuery("limit", "1000")
	limit, err := strconv.Atoi(limitParam)
	if err != nil || limit <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid limit parameter"})
		return
	}

	if limit > 1000000 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Limit cannot exceed 1,000,000 records"})
		return
	}

	records := services.GetRecords(limit)
	c.JSON(http.StatusOK, gin.H{
		"records": records,
	})
}
