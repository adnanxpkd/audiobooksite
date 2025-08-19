import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const PurchaseModal = ({ isOpen, onClose, audiobook, onPurchaseComplete }) => {
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    agreeTerms: false,
    newsletter: true
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const paymentMethods = [
    {
      id: 'razorpay',
      name: 'Razorpay',
      description: 'UPI, Cards, Net Banking, Wallets',
      icon: 'CreditCard',
      popular: true
    },
    {
      id: 'upi',
      name: 'UPI Direct',
      description: 'Pay directly with UPI ID',
      icon: 'Smartphone',
      popular: false
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      description: 'Paytm, PhonePe, Google Pay',
      icon: 'Wallet',
      popular: false
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData?.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid Indian phone number';
    }
    
    if (!formData?.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleContinue = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep(3);
      
      // Call completion handler after a short delay
      setTimeout(() => {
        onPurchaseComplete(audiobook);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Audiobook Summary */}
      <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
        <img
          src={audiobook?.cover}
          alt={audiobook?.title}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-body font-semibold text-foreground truncate">
            {audiobook?.title}
          </h4>
          <p className="text-sm text-muted-foreground font-body truncate">
            by {audiobook?.author}
          </p>
          <p className="text-lg font-bold text-primary font-data mt-1">
            {formatPrice(audiobook?.price)}
          </p>
        </div>
      </div>

      {/* User Details Form */}
      <div className="space-y-4">
        <h4 className="font-body font-medium text-foreground">
          Contact Information
        </h4>
        
        <Input
          label="Email Address"
          type="email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          placeholder="your.email@example.com"
          required
        />
        
        <Input
          label="Phone Number"
          type="tel"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          placeholder="9876543210"
          required
        />
      </div>

      {/* Terms and Newsletter */}
      <div className="space-y-3">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={formData?.agreeTerms}
          onChange={(e) => handleInputChange('agreeTerms', e?.target?.checked)}
          error={errors?.agreeTerms}
          required
        />
        
        <Checkbox
          label="Subscribe to newsletter for updates and offers"
          checked={formData?.newsletter}
          onChange={(e) => handleInputChange('newsletter', e?.target?.checked)}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4">
        <Button
          variant="outline"
          fullWidth
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="default"
          fullWidth
          onClick={handleContinue}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="font-body font-medium text-foreground mb-3">Order Summary</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground font-body">Audiobook Price</span>
            <span className="font-data text-foreground">{formatPrice(audiobook?.price)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground font-body">GST (18%)</span>
            <span className="font-data text-foreground">{formatPrice(audiobook?.price * 0.18)}</span>
          </div>
          <div className="border-t border-border pt-2 flex justify-between font-semibold">
            <span className="text-foreground font-body">Total Amount</span>
            <span className="font-data text-foreground">{formatPrice(audiobook?.price * 1.18)}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <h4 className="font-body font-medium text-foreground mb-4">Choose Payment Method</h4>
        <div className="space-y-3">
          {paymentMethods?.map((method) => (
            <label
              key={method?.id}
              className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                paymentMethod === method?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/20'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method?.id}
                checked={paymentMethod === method?.id}
                onChange={(e) => setPaymentMethod(e?.target?.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === method?.id ? 'border-primary' : 'border-muted-foreground'
              }`}>
                {paymentMethod === method?.id && (
                  <div className="w-2 h-2 bg-primary rounded-full" />
                )}
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                paymentMethod === method?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                <Icon name={method?.icon} size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-body font-medium text-foreground">{method?.name}</span>
                  {method?.popular && (
                    <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full font-caption">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground font-caption">{method?.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4">
        <Button
          variant="outline"
          fullWidth
          onClick={() => setStep(1)}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back
        </Button>
        <Button
          variant="default"
          fullWidth
          onClick={handlePayment}
          loading={isProcessing}
          iconName="Lock"
          iconPosition="left"
        >
          {isProcessing ? 'Processing...' : `Pay ${formatPrice(audiobook?.price * 1.18)}`}
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto">
        <Icon name="CheckCircle" size={40} />
      </div>

      {/* Success Message */}
      <div>
        <h3 className="font-heading font-semibold text-2xl text-foreground mb-2">
          Purchase Successful!
        </h3>
        <p className="text-muted-foreground font-body">
          Your audiobook has been added to your library
        </p>
      </div>

      {/* Purchase Details */}
      <div className="bg-muted/30 rounded-lg p-4 text-left">
        <h4 className="font-body font-medium text-foreground mb-3">Purchase Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-data text-foreground">#AV{Date.now()?.toString()?.slice(-6)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount Paid</span>
            <span className="font-data text-foreground">{formatPrice(audiobook?.price * 1.18)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method</span>
            <span className="font-data text-foreground">
              {paymentMethods?.find(m => m?.id === paymentMethod)?.name}
            </span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="text-left">
            <p className="text-primary font-medium font-body mb-1">What's Next?</p>
            <p className="text-sm text-muted-foreground font-caption">
              You can now listen to your audiobook from the My Library section. 
              A confirmation email has been sent to {formData?.email}.
            </p>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="flex items-center justify-center space-x-2 text-muted-foreground">
        <Icon name="Loader2" size={16} className="animate-spin" />
        <span className="text-sm font-caption">Redirecting to your library...</span>
      </div>
    </div>
  );

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Purchase Details';
      case 2: return 'Payment';
      case 3: return 'Success';
      default: return 'Purchase';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
      <div className="bg-card border border-border rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-elevated">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <h3 className="font-heading font-semibold text-xl text-foreground">
              {getStepTitle()}
            </h3>
            <div className="flex items-center space-x-1">
              {[1, 2, 3]?.map((stepNum) => (
                <div
                  key={stepNum}
                  className={`w-2 h-2 rounded-full ${
                    stepNum <= step ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
          {step !== 3 && (
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;