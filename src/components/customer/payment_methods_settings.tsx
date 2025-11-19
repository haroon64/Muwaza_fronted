"use client";
import { useState } from 'react';
import { 
  User, CreditCard, HelpCircle, Shield, Briefcase,
  Camera, Mail, Phone, MapPin, Edit2, Plus, Trash2, 
  Check, ChevronRight, Star, Calendar, Clock, FileText,
  Building, MessageSquare, Bell, Lock, Eye
} from 'lucide-react';



const PaymentMethodsSettings = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Payment Methods</h2>
          <p className="text-gray-500">Manage your saved payment methods securely</p>
        </div>
        <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Card
        </button>
      </div>

      <div className="space-y-4">
        {[
          { type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true, gradient: 'from-blue-600 to-cyan-600' },
          { type: 'Mastercard', last4: '8888', expiry: '09/26', isDefault: false, gradient: 'from-orange-600 to-red-600' }
        ].map((card, idx) => (
          <div key={idx} className={`bg-gradient-to-r ${card.gradient} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full -mr-24 -mt-24"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
            
            <div className="relative">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-white text-opacity-80 text-sm mb-1">Card Number</p>
                  <p className="text-2xl font-bold tracking-wider">•••• •••• •••• {card.last4}</p>
                </div>
                {card.isDefault && (
                  <span className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                    Default
                  </span>
                )}
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white text-opacity-80 text-sm mb-1">Card Holder</p>
                  <p className="font-semibold">JOHN DOE</p>
                </div>
                <div>
                  <p className="text-white text-opacity-80 text-sm mb-1">Expires</p>
                  <p className="font-semibold">{card.expiry}</p>
                </div>
                <div className="flex gap-2">
                  {!card.isDefault && (
                    <button className="bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-full hover:bg-opacity-30 transition">
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button className="bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-full hover:bg-opacity-30 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Secure & Encrypted</h3>
            <p className="text-gray-600">All your payment information is encrypted with industry-standard SSL technology. We never share your card details with third parties.</p>
          </div>
        </div>
      </div>
    </div>
  );


export default PaymentMethodsSettings;