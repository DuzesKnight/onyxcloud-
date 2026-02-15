# Index Recommendations

## Included in Schema

### users
- `uq_users_email` for login lookups
- `uq_users_uuid` for external-safe references
- `idx_users_active_created` for admin user listing/filtering

### admin_users
- `uq_admin_users_user_id` for 1:1 mapping
- `idx_admin_users_role_active` for admin authorization/roster queries

### plans
- `uq_plans_code` for plan API identifiers
- `idx_plans_active_price` for active catalog listing/sorting

### servers
- `uq_servers_pterodactyl_server_id` to prevent remote server duplication
- `idx_servers_user_status` for dashboard/server list
- `idx_servers_billing_due` for renewal cron and overdue scan
- `idx_servers_plan` for plan utilization analytics

### deposits
- `uq_deposits_utr` duplicate-payment protection
- `uq_deposits_deposit_ref` external/internal reconciliation
- `idx_deposits_status_requested` admin approval queue
- `idx_deposits_user_requested` user deposit history

### transactions
- `uq_transactions_txn_ref` idempotent wallet posting
- `idx_transactions_user_created` wallet statement queries
- `idx_transactions_user_type` filtered financial reports
- `idx_transactions_status_created` reconciliation jobs
- `idx_transactions_deposit` + `idx_transactions_server` source tracing

## Optional Additions (when data grows)
- Partition `transactions` by `created_at` month for very high write volume.
- Add generated-column indexes for common JSON keys in `metadata_json`.
- Add covering composite index `(user_id, status, created_at)` on `deposits` if user+status filters are frequent.
