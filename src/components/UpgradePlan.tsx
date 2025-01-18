import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '$29',
    features: [
      'Up to 5 research projects',
      'Basic analytics',
      'Email support',
      '5 team members',
    ],
    current: true,
  },
  {
    name: 'Pro',
    price: '$79',
    features: [
      'Unlimited research projects',
      'Advanced analytics',
      'Priority support',
      'Unlimited team members',
      'Custom reporting',
      'API access',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'Custom training',
      'Advanced security',
    ],
  },
];

export const UpgradePlan: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Upgrade Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-white rounded-lg shadow-sm border ${
              plan.popular
                ? 'border-indigo-500'
                : plan.current
                ? 'border-green-500'
                : 'border-gray-200'
            } p-6`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Popular
                </span>
              </div>
            )}
            {plan.current && (
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Current Plan
                </span>
              </div>
            )}

            <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
            <p className="mt-2">
              <span className="text-3xl font-bold text-gray-900">
                {plan.price}
              </span>
              {plan.price !== 'Custom' && (
                <span className="text-gray-500">/month</span>
              )}
            </p>

            <ul className="mt-6 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="ml-3 text-sm text-gray-500">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`mt-8 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                plan.current
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : plan.popular
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50'
              }`}
            >
              {plan.current
                ? 'Current Plan'
                : plan.name === 'Enterprise'
                ? 'Contact Sales'
                : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};