import { useState, useEffect } from 'react';
import { getDoctorPhotoUrl } from '../utils/profileStorage';

export function useDoctorPhoto() {
  const [photoUrl, setPhotoUrl] = useState<string>(() => getDoctorPhotoUrl());

  useEffect(() => {
    const handleUpdate = () => {
      setPhotoUrl(getDoctorPhotoUrl());
    };

    window.addEventListener('dr_andre_photo_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('dr_andre_photo_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    photoUrl
  };
}
