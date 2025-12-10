// Database/models/Product.js
const productSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  deskripsi: String,
  harga: { type: Number, required: true },
  kategori: { type: String, enum: ['kopi', 'makanan', 'snack', 'minuman'] },
  gambar: String,
  stok: { type: Number, default: 0 },
  tersedia: { type: Boolean, default: true }
});