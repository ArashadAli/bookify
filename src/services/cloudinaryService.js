const UPLOAD_URL    = import.meta.env.VITE_CLOUDINARY_URL;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload a file to Cloudinary and return the secure URL.
 * @param {File} file
 * @returns {Promise<string>} secure_url
 */
export const uploadImage = async (file) => {
  if (!file) throw new Error('No file provided to uploadImage');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  const res = await fetch(UPLOAD_URL, { method: 'POST', body: formData });
  if (!res.ok) throw new Error(`Cloudinary upload failed: ${res.statusText}`);

  const data = await res.json();
  return data.secure_url;
};