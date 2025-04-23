import React, { useState } from 'react';
import { Service } from '../types/service';

interface BusinessServicesProps {
  services: Service[];
  onAdd?: (service: Omit<Service, 'id'>) => void;
  onEdit?: (service: Service) => void;
  onToggleAvailability?: (id: number) => void;
}

const BusinessServices: React.FC<BusinessServicesProps> = ({
  services,
  onAdd,
  onEdit,
  onToggleAvailability
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '',
    description: '',
    price: 0,
    duration: '',
    availability: true
  });

  const handleAdd = () => {
    if (onAdd) {
      onAdd(newService);
      setNewService({
        name: '',
        description: '',
        price: 0,
        duration: '',
        availability: true
      });
      setIsAdding(false);
    }
  };

  const handleEdit = (service: Service) => {
    if (onEdit) {
      onEdit(service);
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">خدمات</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          افزودن خدمت جدید
        </button>
      </div>

      {isAdding && (
        <div className="bg-gray-100 p-4 rounded">
          <input
            type="text"
            placeholder="نام خدمت"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            className="w-full p-2 mb-2 rounded"
          />
          <textarea
            placeholder="توضیحات"
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            className="w-full p-2 mb-2 rounded"
          />
          <input
            type="number"
            placeholder="قیمت"
            value={newService.price}
            onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
            className="w-full p-2 mb-2 rounded"
          />
          <input
            type="text"
            placeholder="مدت زمان"
            value={newService.duration}
            onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
            className="w-full p-2 mb-2 rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsAdding(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              انصراف
            </button>
            <button
              onClick={handleAdd}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              ثبت
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-4 rounded shadow">
            {editingId === service.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={service.name}
                  onChange={(e) => handleEdit({ ...service, name: e.target.value })}
                  className="w-full p-2 rounded"
                />
                <textarea
                  value={service.description}
                  onChange={(e) => handleEdit({ ...service, description: e.target.value })}
                  className="w-full p-2 rounded"
                />
                <input
                  type="number"
                  value={service.price}
                  onChange={(e) => handleEdit({ ...service, price: Number(e.target.value) })}
                  className="w-full p-2 rounded"
                />
                <input
                  type="text"
                  value={service.duration}
                  onChange={(e) => handleEdit({ ...service, duration: e.target.value })}
                  className="w-full p-2 rounded"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    انصراف
                  </button>
                  <button
                    onClick={() => handleEdit(service)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    ذخیره
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingId(service.id)}
                      className="text-blue-500"
                    >
                      ویرایش
                    </button>
                    <label className="flex items-center space-x-2">
                      <span>{service.availability ? 'موجود' : 'ناموجود'}</span>
                      <input
                        type="checkbox"
                        checked={service.availability}
                        onChange={() => onToggleAvailability?.(service.id)}
                        className="form-checkbox h-5 w-5 text-blue-500"
                      />
                    </label>
                  </div>
                </div>
                <p>{service.description}</p>
                <p className="text-gray-600">{service.price.toLocaleString()} تومان</p>
                <p className="text-gray-600">مدت زمان: {service.duration}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessServices; 