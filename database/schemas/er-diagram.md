# ER Relationship Summary

```text
users (1) ────────< servers >──────── (1) plans
  │                    │
  │                    └───────< transactions >───────┐
  │                                                   │
  ├────────< deposits >────────(0..1) admin_users     │
  │                    │                              │
  │                    └────────< transactions >──────┘
  │
  └────────(0..1) admin_users
```

Legend:
- `1` = exactly one
- `<` = many side
- `(0..1)` = optional single reference
