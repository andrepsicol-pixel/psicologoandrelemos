import { drAndreProfile } from '../data/authorData';

const PHOTO_STORAGE_KEY = 'dr_andre_custom_photo_base64';

export function getDoctorPhotoUrl(): string {
  try {
    const customPhoto = localStorage.getItem(PHOTO_STORAGE_KEY);
    if (customPhoto && customPhoto.trim().length > 0) {
      return customPhoto;
    }
  } catch (e) {
    // Ignore localStorage access errors
  }
  return drAndreProfile.avatarUrl || '/dr-andre.jpg';
}

export function saveDoctorPhotoUrl(photoDataOrUrl: string): void {
  try {
    localStorage.setItem(PHOTO_STORAGE_KEY, photoDataOrUrl);
    window.dispatchEvent(new Event('dr_andre_photo_updated'));
  } catch (e) {
    console.error('Failed to save doctor photo to localStorage', e);
  }
}

export function resetDoctorPhoto(): void {
  try {
    localStorage.removeItem(PHOTO_STORAGE_KEY);
    window.dispatchEvent(new Event('dr_andre_photo_updated'));
  } catch (e) {
    console.error('Failed to reset doctor photo', e);
  }
}

