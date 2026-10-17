# Firestore Security Specification (`security_spec.md`)

## 1. Data Invariants
1. **Global Default Deny**: Any path not explicitly matched is denied for both `read` and `write`.
2. **PII Isolation (`users_private/{userId}`)**: A user profile containing email and phone number can ONLY be read (`get`) or written (`create`, `update`) by the authenticated owner (`request.auth.uid == userId`) with a verified email (`request.auth.token.email_verified == true`). Blanket `list` on `users_private` is forbidden.
3. **Feedback Integrity (`feedbacks/{feedbackId}`)**: A feedback entry can only be created if `authorUid == request.auth.uid`, `email_verified == true`, `rating` is an integer between 1 and 5, `message` is 1..2000 chars, and `createdAt == request.time`. Reading/listing feedbacks requires `resource.data.authorUid == request.auth.uid`.
4. **Custom Topic Pages (`custom_topics/{topicPageId}`)**: Custom topic pages can only be created, read, updated, or deleted by their authenticated owner (`authorUid == request.auth.uid`), with strict string length bounds and `createdAt == request.time`.

## 2. The "Dirty Dozen" Payloads
1. **Unauthenticated Profile Write**: `auth = null`, writing to `/users_private/user_1` -> `PERMISSION_DENIED`.
2. **Unverified Email Profile Write**: `auth = { uid: 'user_1', token: { email_verified: false } }`, writing to `/users_private/user_1` -> `PERMISSION_DENIED`.
3. **Cross-User Profile Read (PII Leak)**: `auth = { uid: 'attacker' }`, `get(/users_private/victim)` -> `PERMISSION_DENIED`.
4. **Identity Spoofing on Profile**: `auth = { uid: 'user_1' }`, payload sets `uid: 'user_2'` in `/users_private/user_1` -> `PERMISSION_DENIED`.
5. **Shadow Field Injection on Profile**: Payload includes `isAdmin: true` alongside valid fields in `/users_private/user_1` -> `PERMISSION_DENIED`.
6. **Client Timestamp Forgery on Profile**: Payload sets `updatedAt` to a past timestamp instead of `request.time` -> `PERMISSION_DENIED`.
7. **Oversized Phone Number DoS**: Payload sets `phoneNumber` to a 500-char string (`> 30`) -> `PERMISSION_DENIED`.
8. **Feedback Spoofed Author**: `auth = { uid: 'user_1' }`, payload sets `authorUid: 'user_2'` in `/feedbacks/fb_1` -> `PERMISSION_DENIED`.
9. **Feedback Invalid Rating**: Payload sets `rating: 99` (outside `1..5`) in `/feedbacks/fb_1` -> `PERMISSION_DENIED`.
10. **Feedback Unauthorized List Scraping**: `auth = { uid: 'attacker' }` querying `/feedbacks` where `authorUid != 'attacker'` -> `PERMISSION_DENIED`.
11. **ID Poisoning Attack**: Creating `/feedbacks/invalid$id!with*spaces` -> `PERMISSION_DENIED`.
12. **Custom Topic Immutable Field Tampering**: Updating `authorUid` or `createdAt` on `/custom_topics/topic_1` -> `PERMISSION_DENIED`.
