# Trading Rooms Table Schema

## Table Name: `trading_rooms`

### Required Columns:

| Column               | Type      | Constraints                                                                      | Description                            |
| -------------------- | --------- | -------------------------------------------------------------------------------- | -------------------------------------- |
| `id`                 | UUID      | PRIMARY KEY, DEFAULT gen_random_uuid()                                           | Unique room identifier                 |
| `name`               | TEXT      | NOT NULL                                                                         | Room name                              |
| `creator_id`         | UUID      | NOT NULL, REFERENCES users(id)                                                   | User who created the room              |
| `symbol`             | TEXT      | NOT NULL                                                                         | Trading symbol (e.g., "BTCUSDT")       |
| `category`           | TEXT      | NOT NULL, CHECK (category IN ('regular', 'voice'))                               | Room type                              |
| `privacy`            | TEXT      | NOT NULL, CHECK (privacy IN ('public', 'private'))                               | Room privacy setting                   |
| `password`           | TEXT      | NULLABLE                                                                         | Room password (only for private rooms) |
| `created_at`         | TIMESTAMP | NOT NULL, DEFAULT now()                                                          | Room creation timestamp                |
| `updated_at`         | TIMESTAMP | NOT NULL, DEFAULT now()                                                          | Last update timestamp                  |
| `is_active`          | BOOLEAN   | NOT NULL, DEFAULT true                                                           | Room active status                     |
| `participants_count` | INTEGER   | NOT NULL, DEFAULT 0                                                              | Current number of participants         |
| `max_participants`   | INTEGER   | NULLABLE                                                                         | Maximum room capacity                  |
| `room_status`        | TEXT      | NOT NULL, DEFAULT 'active', CHECK (room_status IN ('active', 'ended', 'paused')) | Current room state                     |

### Optional/Additional Columns:

| Column          | Type      | Constraints                    | Description                              |
| --------------- | --------- | ------------------------------ | ---------------------------------------- |
| `description`   | TEXT      | NULLABLE                       | Room description                         |
| `tags`          | TEXT[]    | NULLABLE                       | Room tags for categorization             |
| `settings`      | JSONB     | NULLABLE                       | Room-specific settings                   |
| `last_activity` | TIMESTAMP | NULLABLE                       | Last activity timestamp                  |
| `host_id`       | UUID      | NULLABLE, REFERENCES users(id) | Current host (if different from creator) |

### Indexes:

- `idx_trading_rooms_creator_id` on `creator_id`
- `idx_trading_rooms_privacy` on `privacy`
- `idx_trading_rooms_category` on `category`
- `idx_trading_rooms_created_at` on `created_at`
- `idx_trading_rooms_is_active` on `is_active`

### Triggers:

- Auto-update `updated_at` on row modification
- Auto-update `last_activity` when participants join/leave

### Foreign Key Relationships:

- `creator_id` → `users.id`
- `host_id` → `users.id` (optional)

### Usage Notes:

- Private rooms require password validation
- Voice rooms may have additional audio/video settings in JSONB
- Room status tracks whether room is active, ended, or paused
- Participants count should be updated via triggers or application logic
