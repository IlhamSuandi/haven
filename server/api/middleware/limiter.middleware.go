package middleware

import (
	"haven/pkg/response"
	"haven/types"
	"haven/utils"
	"net/http"

	"golang.org/x/time/rate"
)

func Limiter(limit rate.Limit, burst *int, next http.Handler) http.Handler {
	log := utils.Log

	// Set a default burst value if it's not provided (i.e., burst is nil)
	log.Info("creating limiter")
	defaultBurst := int(limit * 2)

	if burst == nil {
		burst = &defaultBurst
	}

	limiter := rate.NewLimiter(limit, *burst)

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !limiter.Allow() {
			log.Error("too many requests")
			response.WriteError(w, http.StatusTooManyRequests, types.ErrorResponse{
				Message: "Too many requests",
				Error:   "Too many requests",
				Status:  http.StatusTooManyRequests,
			})
			return
		}

		next.ServeHTTP(w, r)
	})
}
