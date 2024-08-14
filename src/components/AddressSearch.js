import React, { useEffect, useRef, useState } from 'react';

const AddressSearch = () => {
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'fr' } // Remplacez 'fr' par votre code pays si nécessaire
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place) {
          setAddress(place.formatted_address);
          setDetails({
            name: place.name,
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        }
      });
    }
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Entrez une adresse"
        style={{ width: '300px', padding: '10px' }}
      />
      {details && (
        <div style={{ marginTop: '20px' }}>
          <h4>Détails de l'adresse :</h4>
          <p><strong>Nom :</strong> {details.name}</p>
          <p><strong>Adresse :</strong> {details.address}</p>
          <p><strong>Latitude :</strong> {details.lat}</p>
          <p><strong>Longitude :</strong> {details.lng}</p>
        </div>
      )}
    </div>
  );
};

export default AddressSearch;
