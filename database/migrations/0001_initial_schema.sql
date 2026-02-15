-- 0001_initial_schema.sql
-- Production-ready core schema for OnyxCloud hosting platform

SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  uuid CHAR(36) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NULL,
  full_name VARCHAR(120) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  wallet_balance DECIMAL(14,2) NOT NULL DEFAULT 0.00,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  email_verified_at DATETIME NULL,
  last_login_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_uuid (uuid),
  UNIQUE KEY uq_users_email (email),
  KEY idx_users_phone (phone),
  KEY idx_users_active_created (is_active, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE admin_users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  role ENUM('super_admin','finance_admin','support_admin','ops_admin') NOT NULL,
  can_approve_deposits TINYINT(1) NOT NULL DEFAULT 0,
  can_manage_users TINYINT(1) NOT NULL DEFAULT 0,
  can_manage_servers TINYINT(1) NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admin_users_user_id (user_id),
  KEY idx_admin_users_role_active (role, is_active),
  CONSTRAINT fk_admin_users_user_id
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE plans (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  code VARCHAR(64) NOT NULL,
  name VARCHAR(120) NOT NULL,
  description TEXT NULL,
  price_monthly DECIMAL(14,2) NOT NULL,
  billing_cycle_days SMALLINT UNSIGNED NOT NULL DEFAULT 30,
  cpu_limit INT UNSIGNED NOT NULL,
  memory_mb INT UNSIGNED NOT NULL,
  disk_mb INT UNSIGNED NOT NULL,
  max_backups SMALLINT UNSIGNED NOT NULL DEFAULT 2,
  max_databases SMALLINT UNSIGNED NOT NULL DEFAULT 1,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_plans_code (code),
  KEY idx_plans_active_price (is_active, price_monthly)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE servers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  uuid CHAR(36) NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  plan_id BIGINT UNSIGNED NOT NULL,
  pterodactyl_server_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(120) NOT NULL,
  game VARCHAR(80) NOT NULL,
  status ENUM('provisioning','active','suspended','cancelled','failed') NOT NULL DEFAULT 'provisioning',
  billing_status ENUM('paid','due','overdue','cancelled') NOT NULL DEFAULT 'paid',
  next_billing_at DATETIME NOT NULL,
  last_billed_at DATETIME NULL,
  renew_interval_days SMALLINT UNSIGNED NOT NULL DEFAULT 30,
  monthly_price DECIMAL(14,2) NOT NULL,
  auto_renew TINYINT(1) NOT NULL DEFAULT 1,
  suspended_reason VARCHAR(255) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_servers_uuid (uuid),
  UNIQUE KEY uq_servers_pterodactyl_server_id (pterodactyl_server_id),
  KEY idx_servers_user_status (user_id, status),
  KEY idx_servers_billing_due (billing_status, next_billing_at),
  KEY idx_servers_plan (plan_id),
  CONSTRAINT fk_servers_user_id
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_servers_plan_id
    FOREIGN KEY (plan_id) REFERENCES plans(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE deposits (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  deposit_ref VARCHAR(40) NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  amount DECIMAL(14,2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  upi_id VARCHAR(120) NULL,
  utr VARCHAR(32) NOT NULL,
  qr_payload VARCHAR(255) NULL,
  status ENUM('pending','approved','rejected','expired') NOT NULL DEFAULT 'pending',
  requested_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  approved_at DATETIME NULL,
  rejected_at DATETIME NULL,
  reviewed_by_admin_user_id BIGINT UNSIGNED NULL,
  review_note VARCHAR(255) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_deposits_deposit_ref (deposit_ref),
  UNIQUE KEY uq_deposits_utr (utr),
  KEY idx_deposits_user_requested (user_id, requested_at),
  KEY idx_deposits_status_requested (status, requested_at),
  KEY idx_deposits_reviewed_by (reviewed_by_admin_user_id),
  CONSTRAINT fk_deposits_user_id
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_deposits_reviewed_by_admin_user_id
    FOREIGN KEY (reviewed_by_admin_user_id) REFERENCES admin_users(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE transactions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  txn_ref VARCHAR(40) NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  type ENUM('deposit_credit','manual_adjustment_credit','server_charge_debit','refund_credit','penalty_debit') NOT NULL,
  direction ENUM('credit','debit') NOT NULL,
  amount DECIMAL(14,2) NOT NULL,
  opening_balance DECIMAL(14,2) NOT NULL,
  closing_balance DECIMAL(14,2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  status ENUM('pending','posted','failed','reversed') NOT NULL DEFAULT 'posted',
  description VARCHAR(255) NULL,
  deposit_id BIGINT UNSIGNED NULL,
  server_id BIGINT UNSIGNED NULL,
  created_by_admin_user_id BIGINT UNSIGNED NULL,
  metadata_json JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  posted_at DATETIME NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_transactions_txn_ref (txn_ref),
  KEY idx_transactions_user_created (user_id, created_at),
  KEY idx_transactions_user_type (user_id, type),
  KEY idx_transactions_deposit (deposit_id),
  KEY idx_transactions_server (server_id),
  KEY idx_transactions_status_created (status, created_at),
  CONSTRAINT fk_transactions_user_id
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_transactions_deposit_id
    FOREIGN KEY (deposit_id) REFERENCES deposits(id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_transactions_server_id
    FOREIGN KEY (server_id) REFERENCES servers(id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_transactions_created_by_admin_user_id
    FOREIGN KEY (created_by_admin_user_id) REFERENCES admin_users(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Operational guardrails:
-- 1) Update users.wallet_balance only in a transaction that also inserts into transactions.
-- 2) Use SELECT ... FOR UPDATE on users row before balance mutation.
-- 3) Deposit approval must insert a transactions row linked via transactions.deposit_id.
