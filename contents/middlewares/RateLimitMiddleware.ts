
export function MakeRateLimiter(windowMS:number,max:number,message:string){


return `const limiter = rateLimit({
	windowMs: ${windowMS}, // 15 minutes
	max: ${max}, // Limit each IP to 100 requests per window (here, per 15 minutes)
    message: ${message},
	standardHeaders: 'draft-7', // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
	legacyHeaders: false, // X-RateLimit-* headers
	// store: ... , // Use an external store for more precise rate limiting
})`

}

