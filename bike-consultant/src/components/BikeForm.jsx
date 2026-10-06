import { useEffect, useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";
import { brands, bikeTypes } from "../data/brands";

const emptyBike = {
  title: "",
  brand: "Yamaha",
  price: "",
  year: "2025",
  km: "",
  fuel: "Petrol",
  type: "Sport",
  location: "Madurai",
  sellerPhone: "",
  thumbnail: "",
  description: "Well maintained bike. Contact the seller for more details.",
  condition: "Good Condition"
};

function BikeForm({ editingBike, onClose, onSave }) {
  const [form, setForm] = useState(editingBike || emptyBike);
  const [saving, setSaving] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    setForm(editingBike || emptyBike);
    setImageError("");
  }, [editingBike]);

  function changeField(name, value) {
    setForm({ ...form, [name]: value });
  }

  function compressImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (event) {
        const image = new Image();

        image.onload = function () {
          const maxSize = 1280;
          let width = image.width;
          let height = image.height;

          if (width > maxSize || height > maxSize) {
            if (width > height) {
              height = Math.round((height * maxSize) / width);
              width = maxSize;
            } else {
              width = Math.round((width * maxSize) / height);
              height = maxSize;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, width, height);

          const dataUrl = canvas.toDataURL("image/jpeg", 0.78);
          resolve(dataUrl);
        };

        image.onerror = function () {
          reject(new Error("Could not read this image."));
        };

        image.src = event.target.result;
      };

      reader.onerror = function () {
        reject(new Error("Could not open this image."));
      };

      reader.readAsDataURL(file);
    });
  }

  async function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    setImageError("");

    if (!file.type.startsWith("image/")) {
      setImageError("Please select a JPG, PNG, WEBP or other image file.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setImageError("Please choose an image below 8 MB.");
      return;
    }

    setImageLoading(true);

    try {
      const imageData = await compressImage(file);
      setForm({ ...form, thumbnail: imageData });
    } catch (error) {
      setImageError("This image could not be processed. Please try another photo.");
    }

    setImageLoading(false);
  }

  async function submitForm(e) {
    e.preventDefault();

    if (!form.thumbnail) {
      setImageError("Please add a bike photo before publishing.");
      return;
    }

    setSaving(true);
    await onSave(form);
    setSaving(false);
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-head">
          <div>
            <p className="eyebrow">BIKE LISTING</p>
            <h2>{editingBike ? "Update bike" : "Upload your bike"}</h2>
          </div>
          <button type="button" className="close-btn" onClick={onClose}><X /></button>
        </div>

        <form onSubmit={submitForm}>
          <div className="photo-upload-box">
            <div className="photo-preview">
              {form.thumbnail ? (
                <img src={form.thumbnail} alt="Bike preview" />
              ) : (
                <div className="photo-empty"><ImagePlus size={30} /><span>Add bike photo</span></div>
              )}
              {imageLoading && <div className="photo-loading">Processing...</div>}
            </div>
            <div className="photo-upload-content">
              <p className="photo-title">{editingBike ? "Change bike photo" : "Add real bike photo"}</p>
              <p className="photo-subtitle">Select a real bike photo from your phone or computer. JPG, PNG and WEBP are supported.</p>
              <label className="upload-photo-btn">
                <ImagePlus size={16} />
                {editingBike ? "Choose another photo" : "Choose photo"}
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
              {imageError && <p className="image-error">{imageError}</p>}
            </div>
          </div>

          <div className="form-grid">
            <label>Bike name<input required value={form.title} onChange={(e) => changeField("title", e.target.value)} placeholder="Example: MT 15 V2" /></label>
            <label>Brand<select value={form.brand} onChange={(e) => changeField("brand", e.target.value)}>{brands.slice(1).map((brand) => <option key={brand}>{brand}</option>)}</select></label>
            <label>Price<input required type="number" min="1" value={form.price} onChange={(e) => changeField("price", e.target.value)} placeholder="125000" /></label>
            <label>Year<input required type="number" min="1990" max="2030" value={form.year} onChange={(e) => changeField("year", e.target.value)} /></label>
            <label>Kilometres<input required type="number" min="0" value={form.km} onChange={(e) => changeField("km", e.target.value)} placeholder="15000" /></label>
            <label>Type<select value={form.type} onChange={(e) => changeField("type", e.target.value)}>{bikeTypes.slice(1).map((type) => <option key={type}>{type}</option>)}</select></label>
            <label>Fuel<select value={form.fuel} onChange={(e) => changeField("fuel", e.target.value)}><option>Petrol</option><option>Electric</option></select></label>
            <label>Location<input value={form.location} onChange={(e) => changeField("location", e.target.value)} /></label>
            <label className="full">Phone number<input required value={form.sellerPhone} onChange={(e) => changeField("sellerPhone", e.target.value)} placeholder="919876543210" /></label>
            <label className="full">Description<textarea rows="3" value={form.description} onChange={(e) => changeField("description", e.target.value)} /></label>
          </div>

          <div className="form-note"><Upload size={16} /> Your real photo is compressed in the browser and saved with this listing. No image URL or backend is required.</div>
          <button className="primary-btn full-btn" type="submit" disabled={saving || imageLoading}>{saving ? "Saving..." : editingBike ? "Update bike" : "Publish bike"}</button>
        </form>
      </div>
    </div>
  );
}

export default BikeForm;
