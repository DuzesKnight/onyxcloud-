# Core MySQL Schema (Production-Ready)

## SQL Schema
The executable SQL DDL is stored in:
- `database/migrations/0001_initial_schema.sql`

It defines the required core tables:
- `users`
- `plans`
- `servers`
- `deposits`
- `transactions`
- `admin_users`

## Table Relationships

- `admin_users.user_id` → `users.id` (1:1 user-to-admin profile)
- `servers.user_id` → `users.id` (1:N user-to-servers)
- `servers.plan_id` → `plans.id` (N:1 server-to-plan)
- `deposits.user_id` → `users.id` (1:N user-to-deposits)
- `deposits.reviewed_by_admin_user_id` → `admin_users.id` (N:1 deposit reviewer)
- `transactions.user_id` → `users.id` (1:N wallet ledger)
- `transactions.deposit_id` → `deposits.id` (optional N:1, for approved/reversed deposits)
- `transactions.server_id` → `servers.id` (optional N:1, for billing/renewal charges)
- `transactions.created_by_admin_user_id` → `admin_users.id` (optional N:1, for manual adjustments)

## Wallet & Billing Notes

- `users.wallet_balance` is the fast-read wallet snapshot.
- `transactions` is the immutable financial ledger (`opening_balance`, `closing_balance`, type, direction).
- All balance writes must be backend-only and wrapped in DB transactions with row locking.
- Server renewals are driven by `servers.next_billing_at`, `servers.billing_status`, and corresponding debit rows in `transactions`.

## UPI Deposit Tracking Notes

- `deposits.utr` is unique to avoid duplicate settlement.
- `deposits.status` supports manual approval lifecycle (`pending`, `approved`, `rejected`, `expired`).
- `deposits.screenshot_url` optionally stores uploaded payment proof URL/path.
- Admin action traceability is captured with `reviewed_by_admin_user_id`, review timestamps, and `review_note`.
