# Motora - Bike Consultant

React + Vite frontend-only bike consultant application.

## Features
- Home, Bikes, Brandwise, Search, Filters
- Customer and Admin login through REST API
- Customer and Admin can upload real bike photos from device
- Admin-only update and delete
- Customer-to-customer contact with Call and WhatsApp buttons
- Favourites
- My Upload Bikes
- Account page
- Responsive professional UI
- No backend server required
- No template literals used in the main JS/JSX code

## Real photo upload
The upload form uses a real `<input type="file">`. The selected JPG/PNG/WEBP image is compressed in the browser and converted to an image data URL. The listing is then saved in browser localStorage, so the actual uploaded photo remains after refresh on the same browser/device.

For a production application with many large images, replace this browser storage approach with Cloudinary, Firebase Storage, or Supabase Storage.

## Login
There is intentionally **no Customer/Admin role button in the login UI**.

The login role is decided internally after authentication:
- `emilys` is treated as Admin
- other successful users are treated as Customer

Demo accounts:
- Customer: `michaelw` / `michaelwpass`
- Admin: `emilys` / `emilyspass`

## Run
```bash
npm install
npm run dev
```

## API
The project uses DummyJSON REST endpoints for product data and authentication. Product write endpoints are simulated by DummyJSON, while local listings are kept in browser storage so the frontend demo can show uploaded/edited/deleted state.
