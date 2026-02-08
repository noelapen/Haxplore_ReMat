import { useState } from 'react';
import { Calendar, Clock, MapPin, Package, Truck, Check } from 'lucide-react';

export function SchedulingSystem() {
  const [selectedService, setSelectedService] = useState<'drop-off' | 'pickup' | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [itemType, setItemType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [address, setAddress] = useState('');
  const [scheduled, setScheduled] = useState(false);

  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:00 AM - 01:00 PM',
    '01:00 PM - 03:00 PM',
    '03:00 PM - 05:00 PM',
    '05:00 PM - 07:00 PM',
  ];

  const itemTypes = [
    'Large Appliances (Refrigerator, Washing Machine)',
    'Computer Equipment (Desktop, Monitor, Printer)',
    'Small Electronics (Phone, Tablet, Cables)',
    'Audio/Video Equipment (TV, Speakers)',
    'Other E-Waste',
  ];

  const handleSchedule = () => {
    setScheduled(true);
    setTimeout(() => setScheduled(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Calendar className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Scheduling System</h3>
          <p className="text-sm text-gray-600">Book slots for disposal or pickup service</p>
        </div>
      </div>

      {/* Service Selection */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => setSelectedService('drop-off')}
          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
            selectedService === 'drop-off'
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-indigo-300'
          }`}
        >
          <MapPin className={`w-6 h-6 ${selectedService === 'drop-off' ? 'text-indigo-600' : 'text-gray-400'}`} />
          <div className="text-left">
            <div className="font-semibold text-gray-900 text-sm">Drop-off</div>
            <div className="text-xs text-gray-500">Visit a collection center</div>
          </div>
        </button>

        <button
          onClick={() => setSelectedService('pickup')}
          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
            selectedService === 'pickup'
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-indigo-300'
          }`}
        >
          <Truck className={`w-6 h-6 ${selectedService === 'pickup' ? 'text-indigo-600' : 'text-gray-400'}`} />
          <div className="text-left">
            <div className="font-semibold text-gray-900 text-sm">Pickup</div>
            <div className="text-xs text-gray-500">We come to you</div>
          </div>
        </button>
      </div>

      {selectedService && (
        <div className="space-y-4">
          {/* Item Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Package className="w-4 h-4 inline mr-1" />
              Item Type
            </label>
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select item type...</option>
              {itemTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="How many items?"
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Preferred Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Time Slot
            </label>
            <div className="grid grid-cols-1 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    selectedTime === slot
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-200 text-gray-700 hover:border-indigo-300'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Address for Pickup */}
          {selectedService === 'pickup' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Pickup Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full address..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          {/* Schedule Button */}
          <button
            onClick={handleSchedule}
            disabled={!itemType || !selectedDate || !selectedTime || (selectedService === 'pickup' && !address)}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {scheduled ? (
              <>
                <Check className="w-5 h-5" />
                Scheduled Successfully!
              </>
            ) : (
              <>
                <Calendar className="w-5 h-5" />
                Confirm Booking
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
