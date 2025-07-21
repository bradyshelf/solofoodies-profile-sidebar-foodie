
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Edit, Plus, MapPin, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RestaurantProfile {
  id?: string;
  restaurant_name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  website_url: string;
  cuisine_type: string;
}

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  contact_person: string;
  country: string;
}

// Location data for cascading dropdowns
const countryData = {
  'España': {
    'Madrid': ['Madrid', 'Alcalá de Henares', 'Leganés', 'Fuenlabrada', 'Alcorcón'],
    'Barcelona': ['Barcelona', 'Hospitalet de Llobregat', 'Badalona', 'Terrassa', 'Sabadell'],
    'Valencia': ['Valencia', 'Alicante', 'Elche', 'Castellón de la Plana', 'Torrent'],
    'Andalucía': ['Sevilla', 'Málaga', 'Córdoba', 'Granada', 'Jerez de la Frontera'],
    'Galicia': ['A Coruña', 'Vigo', 'Ourense', 'Lugo', 'Santiago de Compostela']
  }
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<RestaurantProfile>({
    restaurant_name: 'Lisa Burger',
    description: 'Delicious burgers and amazing atmosphere in the heart of Madrid',
    address: 'Calle Mesón de Paredes 5',
    city: 'Madrid',
    state: 'Madrid',
    zip_code: '28012',
    phone: '+34 912 345 678',
    website_url: 'https://lisaburger.es',
    cuisine_type: 'Burger Restaurant'
  });
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      name: 'Malasaña',
      address: 'Calle Mesón de Paredes 5',
      city: 'Madrid',
      state: 'Madrid',
      zip_code: '28012',
      phone: '+34 912 345 678',
      contact_person: 'María García',
      country: 'España'
    }
  ]);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [newLocation, setNewLocation] = useState<Omit<Location, 'id'>>({
    name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    phone: '',
    contact_person: '',
    country: ''
  });

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Profile saved successfully"
    });
    setIsEditing(false);
  };

  const handleAddLocation = () => {
    const location: Location = {
      id: Math.random().toString(36).substr(2, 9),
      ...newLocation
    };
    setLocations([...locations, location]);
    setNewLocation({
      name: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
      phone: '',
      contact_person: '',
      country: ''
    });
    setShowAddLocation(false);
  };

  const handleDeleteLocation = (id: string) => {
    setLocations(locations.filter(loc => loc.id !== id));
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-semibold">EDITAR PERFIL</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Image Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="/lovable-uploads/26ce4d51-7cef-481d-8b86-af6c758c3760.png"
                  alt="Restaurant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="space-y-2">
                  <div>
                    <Label className="text-sm text-gray-600">Nombre</Label>
                    {isEditing ? (
                      <Input
                        value={profile.restaurant_name}
                        onChange={(e) => setProfile({...profile, restaurant_name: e.target.value})}
                        placeholder="Nombre del restaurante"
                      />
                    ) : (
                      <p className="font-medium">{profile.restaurant_name}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Nombre de usuario</Label>
                    <p className="text-gray-500">@{profile.restaurant_name?.toLowerCase().replace(/\s+/g, '')}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label className="text-sm text-gray-600">Biografía</Label>
              {isEditing ? (
                <Textarea
                  value={profile.description}
                  onChange={(e) => setProfile({...profile, description: e.target.value})}
                  placeholder="Describe tu restaurante..."
                  rows={3}
                />
              ) : (
                <p className="text-gray-900">{profile.description}</p>
              )}
            </div>
            
            <div>
              <Label className="text-sm text-gray-600">Teléfono</Label>
              {isEditing ? (
                <Input
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  placeholder="Número de teléfono"
                />
              ) : (
                <p className="text-gray-900">{profile.phone}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-600">Ocultar perfil</Label>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Locations Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Mis ubicaciones</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddLocation(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Añadir
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {locations.map((location) => (
              <div key={location.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <h3 className="font-medium">{location.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{location.address}</p>
                    <p className="text-sm text-gray-600 mb-2">{location.city}, {location.state} {location.zip_code}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>PERSONA DE CONTACTO: {location.contact_person}</span>
                      <span>TELÉFONO: {location.phone}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteLocation(location.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}

            {showAddLocation && (
              <div className="border rounded-lg p-4 bg-blue-50">
                <h3 className="font-medium text-blue-700 mb-4">Nueva ubicación</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Ubicación *</Label>
                    <Input
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                      placeholder="Ej. Malasaña"
                    />
                  </div>
                  <div>
                    <Label>Calle *</Label>
                    <Input
                      value={newLocation.address}
                      onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
                      placeholder="Ej. Calle Mayor, 15"
                    />
                  </div>
                  <div>
                    <Label>País *</Label>
                    <Select
                      value={newLocation.country}
                      onValueChange={(value) => setNewLocation({
                        ...newLocation,
                        country: value,
                        state: '',
                        city: ''
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un país" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(countryData).map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Provincia *</Label>
                    <Select
                      value={newLocation.state}
                      onValueChange={(value) => setNewLocation({
                        ...newLocation,
                        state: value,
                        city: ''
                      })}
                      disabled={!newLocation.country}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una provincia" />
                      </SelectTrigger>
                      <SelectContent>
                        {newLocation.country && countryData[newLocation.country as keyof typeof countryData] && 
                          Object.keys(countryData[newLocation.country as keyof typeof countryData]).map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Ciudad *</Label>
                    <Select
                      value={newLocation.city}
                      onValueChange={(value) => setNewLocation({
                        ...newLocation,
                        city: value
                      })}
                      disabled={!newLocation.state}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una ciudad" />
                      </SelectTrigger>
                      <SelectContent>
                        {newLocation.country && newLocation.state && 
                          countryData[newLocation.country as keyof typeof countryData]?.[newLocation.state]?.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Persona de contacto *</Label>
                    <Input
                      value={newLocation.contact_person}
                      onChange={(e) => setNewLocation({...newLocation, contact_person: e.target.value})}
                      placeholder="Ej. María García"
                    />
                  </div>
                  <div>
                    <Label>Teléfono *</Label>
                    <Input
                      value={newLocation.phone}
                      onChange={(e) => setNewLocation({...newLocation, phone: e.target.value})}
                      placeholder="Ej. 912345678"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddLocation} className="flex-1">
                      Guardar ubicación
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowAddLocation(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Business Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Datos de facturación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm text-gray-600">Razón social</Label>
              <p className="text-gray-900">LISA BURGER SL</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">CIF</Label>
              <p className="text-gray-900">B72613250</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Dirección</Label>
              <p className="text-gray-900">Calle Mesón de Paredes 5</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Ciudad</Label>
              <p className="text-gray-900">Madrid</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Est./Provincia</Label>
              <p className="text-gray-900">Madrid</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Código postal</Label>
              <p className="text-gray-900">28012</p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        {isEditing && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
            <div className="flex space-x-3">
              <Button onClick={handleSave} className="flex-1">
                Guardar cambios
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
