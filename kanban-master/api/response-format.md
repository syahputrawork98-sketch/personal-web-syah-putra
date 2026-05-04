# Recommended API Response Format

Dokumen ini mendefinisikan standar format respons yang direkomendasikan untuk API backend agar konsisten di seluruh aplikasi.

## Recommended Success Response
```json
{
  "success": true,
  "data": {
    // Payload data goes here
  }
}
```

## Recommended Error Response
```json
{
  "success": false,
  "message": "Pesan error yang menjelaskan apa yang salah"
}
```

---

**Catatan Penting:**
- Response backend saat ini perlu diaudit secara menyeluruh agar mengikuti standar konsistensi di atas.
- **DILARANG** mengubah kode aplikasi pada task dokumentasi ini. Standar ini hanya sebagai panduan audit dan perbaikan di masa mendatang.
