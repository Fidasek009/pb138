```mermaid
erDiagram
    MCP_POSTGRES{
        uuid id PK
        uuid client_id FK
        string context_name
        JSONB context_json_data
    }
```