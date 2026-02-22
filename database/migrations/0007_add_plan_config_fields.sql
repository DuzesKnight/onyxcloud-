ALTER TABLE plans
  ADD COLUMN price DECIMAL(14,2) NULL AFTER price_monthly,
  ADD COLUMN ram INT UNSIGNED NULL AFTER cpu_limit,
  ADD COLUMN cpu INT UNSIGNED NULL AFTER ram,
  ADD COLUMN disk INT UNSIGNED NULL AFTER disk_mb,
  ADD COLUMN egg_id BIGINT UNSIGNED NULL AFTER disk,
  ADD COLUMN docker_image VARCHAR(255) NULL AFTER egg_id;

UPDATE plans
   SET price = price_monthly,
       ram = memory_mb,
       cpu = cpu_limit,
       disk = disk_mb,
       egg_id = 1,
       docker_image = 'ghcr.io/pterodactyl/yolks:java_17'
 WHERE price IS NULL;

ALTER TABLE plans
  MODIFY COLUMN price DECIMAL(14,2) NOT NULL,
  MODIFY COLUMN ram INT UNSIGNED NOT NULL,
  MODIFY COLUMN cpu INT UNSIGNED NOT NULL,
  MODIFY COLUMN disk INT UNSIGNED NOT NULL,
  MODIFY COLUMN egg_id BIGINT UNSIGNED NOT NULL,
  MODIFY COLUMN docker_image VARCHAR(255) NOT NULL;
