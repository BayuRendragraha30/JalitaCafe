// Database/models/User.js
const userSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  telepon: { type: String },
  alamat: [
    {
      jalan: String,
      kota: String,
      provinsi: String,
      kodePos: String,
      utama: Boolean
    }
  ],
  createdAt: { type: Date, default: Date.now }
});