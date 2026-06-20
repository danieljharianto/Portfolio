# Portfolio Dev Notes

## File Structure

| File | Fungsi |
|---|---|
| `data.js` | Semua konten project (satu-satunya file yang diedit untuk tambah/ubah konten) |
| `project.js` | Logic render halaman project |
| `project.css` | Styling halaman project |
| `style.css` | Styling global (font, warna, header, footer) |
| `index.html` | Halaman utama (Work) |
| `project.html` | Template halaman tiap project |
| `about.html` | Halaman About |

---

## Font

`--font-body` dan `--font-display` pakai **PP Mori** (file lokal di `/fonts/`).

PP Mori hanya punya 2 weight yang di-load:
- `400` → Regular
- `500` → SemiBold ← ini yang paling "bold" yang bisa dipakai

Untuk bold, gunakan `font-weight: 500`. Weight 700 tidak akan berpengaruh karena file `PPMori-Bold.woff2` tidak ada.

---

## Struktur Tiap Project di `data.js`

```js
{
  id: "02",                          // nomor urut (string)
  title: "Fizzy Frenzy",             // judul project
  italicWord: "Frenzy",              // kata yang jadi italic di hero
  tags: ["Game", "Arduino"],         // tag di hero section
  desc: "Deskripsi singkat",         // teks di card index.html
  long: "Teks panjang overview.",    // teks di section Overview
  year: "2026",
  medium: "Industrial Design",
  location: "Cambridge, MA",
  status: "Completed",
  color: "linear-gradient(...)",     // warna background placeholder (jika tidak ada image)
  image: "Image/cover.png",          // cover image
  video: "https://youtube...",       // cover video — override image jika ada
  prototype: {
    url: "https://...",
    label: "Launch Prototype"        // teks tombol
  },
  images: [ ... ]                    // array image grid (lihat section di bawah)
}
```

---

## Layout Types — `images[]` di `data.js`

### `single` — gambar 50% + teks 50% sejajar
```js
{
  src: "Image/Project_X/01.png",
  title: "Judul",
  text: "Teks deskripsi.",
  reverse: false,   // true = teks kiri, gambar kanan
  layout: "single"
}
```

### `full` — gambar full width, teks di bawah (2 kolom: judul kiri / teks kanan)
```js
{
  layout: "full",
  src: "Image/Project_X/02.png",
  title: "Judul (opsional)",
  text: "Teks (opsional)"
}
```

### `duo` — 2 gambar sejajar, masing-masing punya caption
```js
{
  layout: "duo",
  srcs: [
    { src: "Image/Project_X/03.png", title: "Judul 1", text: "Teks 1" },
    { src: "Image/Project_X/04.png", title: "Judul 2", text: "Teks 2" },
  ]
}
```

### `feature` *(baru)* — gambar 2/3 + teks 1/3 sejajar
```js
// single image
{
  src: "Image/Project_X/05.png",
  title: "Judul",
  text: "Teks.",
  reverse: false,   // true = teks 1/3 kiri, gambar 2/3 kanan
  layout: "feature"
}

// multi-image: 1 besar atas + 2 kecil bawah (opsi C)
{
  layout: "feature",
  srcs: [
    "Image/Project_X/besar.png",    // [0] gambar besar atas
    "Image/Project_X/kecil1.png",   // [1] kecil kiri bawah
    "Image/Project_X/kecil2.png",   // [2] kecil kanan bawah
  ],
  title: "Judul",
  text: "Teks.",
  reverse: false
}
```

| `reverse` | Hasil |
|---|---|
| `false` | Gambar 2/3 kiri · Teks 1/3 kanan |
| `true` | Teks 1/3 kiri · Gambar 2/3 kanan |

---

## Layout Halaman Project (project.html)

Urutan section dari atas ke bawah:

1. **Hero** — dark green gradient, judul putih besar, tags
2. **Cover** — gambar/video full width (max-height 110vh)
3. **Info bar** — horizontal: Year · Medium · Location · Status
4. **Overview** — grid 2 kolom: label kiri (220px) + teks `long` kanan
5. **Prototype link** — muncul jika project punya field `prototype`
6. **Image grid** — urutan dari array `images[]`
7. **Navigation** — ← All Projects · Next Project →

---

## Perubahan yang Sudah Dilakukan (Sesi Ini)

### Tambah layout `feature` (`project.js` + `project.css`)
- Layout baru `"feature"` dengan proporsi **2/3 gambar + 1/3 teks**
- Support `reverse: true` untuk balik posisi (teks kiri, gambar kanan)
- Support `srcs[]` untuk komposisi multi-gambar: 1 besar atas + 2 kecil bawah
- CSS fix: `.image-block--feature.image-block--reverse { grid-template-columns: 1fr 2fr }`

### Fix GIF full width (`project.css`)
- `.image-block--full` diubah dari `align-items: center` → `align-items: stretch`
- Tambah `width: 100%` pada `.image-block--full .grid-img-wrap` dan `.grid-img-inner`
- Sebelumnya GIF tidak stretch penuh di layout `full`
