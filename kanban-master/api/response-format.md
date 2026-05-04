# Response Format Recommendations

Saat ini, format response backend mungkin belum sepenuhnya konsisten. Dokumen ini mendefinisikan standar rekomendasi format respons untuk masa depan.

*Catatan: Jangan mengubah format kode backend saat ini secara massal tanpa audit mendalam. Ini hanya panduan.*

## Recommended Success Response
```json
{
  "success": true,
  "data": {
    // payload
  }
}
```

## Recommended Error Response
```json
{
  "success": false,
  "message": "Error message describing what went wrong",
  "errors": [] // Optional field for validation errors
}
```

## Recommended Pagination Response
```json
{
  "success": true,
  "data": [
    // array of items
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```
