ALTER TABLE servers
  ADD COLUMN expiry_date DATETIME NULL AFTER next_billing_at,
  ADD KEY idx_servers_expiry_status (status, expiry_date);

UPDATE servers
   SET expiry_date = COALESCE(next_billing_at, DATE_ADD(created_at, INTERVAL renew_interval_days DAY))
 WHERE expiry_date IS NULL;

ALTER TABLE servers
  MODIFY COLUMN expiry_date DATETIME NOT NULL;
