# Security Audit Report

## Executive Summary
This audit identifies several security concerns, particularly around Redis access, authentication, and XSS vulnerabilities. Most issues are medium to low risk for a personal portfolio site, but should be addressed for production use.

---

## 🔴 Critical Issues

### 1. **Timing Attack Vulnerability in Token Comparison**
**Location:** `app/api/top40/[year]/route.ts:97`, `app/api/auth/edit-token/route.ts:24`

**Issue:** The token comparison uses `===` which is NOT constant-time. This allows timing attacks where an attacker can determine the correct token by measuring response times.

```typescript
// CURRENT (VULNERABLE):
return token === validToken;

// SHOULD BE:
import crypto from 'crypto';
return crypto.timingSafeEqual(
  Buffer.from(token || ''),
  Buffer.from(validToken || '')
);
```

**Risk:** Medium - Allows token brute-forcing over time
**Recommendation:** Implement constant-time comparison using Node.js `crypto.timingSafeEqual()`

---

### 2. **XSS Vulnerabilities via dangerouslySetInnerHTML**
**Location:** Multiple files using `dangerouslySetInnerHTML`

**Issue:** HTML content from Redis (user-controlled via editor) is rendered without proper sanitization. The `cleanHtml()` function only removes `<mark>` tags and background styles, but doesn't prevent:
- `<script>` tags
- Event handlers (`onclick`, `onerror`, etc.)
- `<iframe>` tags
- JavaScript in URLs (`href="javascript:..."`)
- Other malicious HTML

**Risk:** High - Could allow XSS attacks if editor is compromised
**Recommendation:** 
- Use a proper HTML sanitization library like `DOMPurify` or `sanitize-html`
- Implement Content Security Policy (CSP) headers
- Consider using a whitelist of allowed HTML tags

---

## 🟡 Medium Priority Issues

### 3. **Token Exposure in URL Query Parameters**
**Location:** Token passed via `?token=...` in URLs

**Issue:** Edit tokens appear in:
- Browser history
- Server access logs
- Referrer headers when linking to other sites
- Browser developer tools

**Risk:** Medium - If token is leaked, unauthorized access is possible
**Recommendation:**
- Use HTTP-only cookies for token storage instead of URL params
- Or use short-lived tokens with refresh mechanism
- Implement token rotation

---

### 4. **No Rate Limiting on API Endpoints**
**Location:** `app/api/top40/[year]/route.ts`, `app/api/auth/edit-token/route.ts`

**Issue:** No rate limiting on:
- GET requests (could be abused for DoS)
- PUT requests (could be abused to spam Redis)
- Token validation endpoint (could be brute-forced)

**Risk:** Medium - Could lead to DoS or resource exhaustion
**Recommendation:**
- Implement rate limiting using `next-rate-limit` or similar
- Limit PUT requests to prevent Redis spam
- Add exponential backoff for failed token attempts

---

### 5. **No Input Size Limits**
**Location:** `app/api/top40/[year]/route.ts:124`

**Issue:** No limits on:
- Description length (could be huge HTML)
- Lyrics array size
- Individual lyric text length

**Risk:** Medium - Could cause memory issues or Redis storage problems
**Recommendation:**
- Add max length validation (e.g., description: 50KB, lyrics: 100 items)
- Validate before processing JSON

---

### 6. **Insufficient JSON Validation**
**Location:** `app/api/top40/[year]/route.ts:124-125`

**Issue:** JSON is parsed without:
- Schema validation
- Type checking
- Structure validation

**Risk:** Medium - Malformed data could cause errors
**Recommendation:**
- Use a schema validator like `zod` or `joi`
- Validate data structure before saving to Redis

---

## 🟢 Low Priority / Best Practices

### 7. **Redis Connection Security**
**Location:** `lib/redis.ts`

**Current State:** ✅ Good
- Uses environment variable for connection URL
- Proper error handling
- Connection pooling (singleton pattern)

**Recommendations:**
- Ensure `REDIS_URL` uses TLS in production (`rediss://` not `redis://`)
- Consider adding connection timeout
- Add retry logic for connection failures

---

### 8. **Error Message Information Leakage**
**Location:** Various API endpoints

**Issue:** Some error messages might reveal:
- Internal structure
- Redis connection status
- Token validation details

**Risk:** Low - Information disclosure
**Recommendation:**
- Use generic error messages for clients
- Log detailed errors server-side only
- Don't expose stack traces in production

---

### 9. **No CORS Configuration**
**Location:** API routes

**Issue:** No explicit CORS policy defined

**Risk:** Low - For a portfolio site, this is usually fine
**Recommendation:**
- Add explicit CORS headers if you need cross-origin access
- Otherwise, Next.js defaults are sufficient

---

### 10. **Year Validation**
**Location:** `app/api/top40/[year]/route.ts:34, 109`

**Current State:** ✅ Good
- Validates year is a number
- Checks range (2020-2026)
- Prevents injection in Redis keys

**Note:** This is well-implemented and prevents key injection attacks.

---

## 🔒 Redis-Specific Security Recommendations

### Current Redis Security:
- ✅ Connection string from environment variable
- ✅ Token required for write operations
- ✅ Year validation prevents key injection
- ⚠️ No authentication beyond connection string
- ⚠️ No encryption in transit (unless using `rediss://`)

### Recommendations:
1. **Use TLS:** Ensure `REDIS_URL` uses `rediss://` (note the double 's') for encrypted connections
2. **Redis AUTH:** If your Redis instance supports it, use password authentication
3. **Network Isolation:** Keep Redis on a private network, not publicly accessible
4. **Key Prefixes:** Current `top40:${year}` format is good - consider adding environment prefix: `prod:top40:${year}`
5. **TTL/Expiration:** Consider adding expiration to keys if data should be temporary
6. **Backup Strategy:** Ensure Redis data is backed up regularly

---

## 📋 Action Items (Priority Order)

### Immediate (Critical):
1. ✅ Fix timing attack vulnerability in token comparison
2. ✅ Implement proper HTML sanitization for XSS prevention
3. ✅ Move token from URL to HTTP-only cookie

### Short-term (Medium):
4. ✅ Add rate limiting to API endpoints
5. ✅ Add input size validation
6. ✅ Implement JSON schema validation

### Long-term (Best Practices):
7. ✅ Add Content Security Policy headers
8. ✅ Implement token rotation
9. ✅ Add comprehensive logging and monitoring
10. ✅ Set up Redis TLS connection verification

---

## 🛡️ Additional Security Hardening Suggestions

1. **Content Security Policy (CSP):**
   ```typescript
   // In next.config.ts or middleware
   headers: [
     {
       key: 'Content-Security-Policy',
       value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
     }
   ]
   ```

2. **Security Headers:**
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `X-XSS-Protection: 1; mode=block`
   - `Referrer-Policy: strict-origin-when-cross-origin`

3. **Environment Variables:**
   - Ensure `.env.local` is in `.gitignore` ✅ (already done)
   - Use different tokens for dev/staging/prod
   - Rotate tokens periodically

4. **Monitoring:**
   - Log all PUT requests with timestamps
   - Monitor for unusual patterns
   - Set up alerts for failed authentication attempts

---

## Summary

**Overall Security Posture:** 🟡 Moderate

The codebase has good foundations but needs hardening in several areas:
- **Authentication:** Token comparison needs constant-time implementation
- **Input Validation:** Needs proper sanitization and size limits
- **Rate Limiting:** Should be implemented to prevent abuse
- **XSS Prevention:** Needs proper HTML sanitization library

For a personal portfolio site with controlled access, the current security is acceptable, but implementing the critical fixes would significantly improve the security posture.

