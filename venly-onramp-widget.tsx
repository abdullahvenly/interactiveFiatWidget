import React, { useState, useEffect } from 'react';
import { Copy, ExternalLink, Play, Code, Settings, CreditCard, Globe, Shield, Check, AlertCircle } from 'lucide-react';

const VenlyOnrampWidget = () => {
  const [selectedProvider, setSelectedProvider] = useState('transak');
  const [formData, setFormData] = useState({
    fiatAmount: '300',
    fiatCurrency: 'USD',
    cryptoAmount: '0.15',
    cryptoCurrency: { network: 'ETHEREUM', symbol: 'ETH' },
    email: 'user@example.com',
    walletAddress: '0x3FE9a7D68C6a4a2d6575A6C803E4CDF9340E370E',
    redirectUrl: 'https://yourapp.com/success'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [activeTab, setActiveTab] = useState('configure');
  const [showCode, setShowCode] = useState(false);

  const providers = {
    transak: {
      name: 'Transak',
      description: 'Global coverage with 100+ countries',
      features: ['KYC/AML compliant', 'Credit/Debit cards', 'Bank transfers', 'Apple Pay/Google Pay'],
      fees: '0.99% - 5.5%',
      processingTime: '10-30 minutes',
      supported: ['150+ countries', '100+ cryptocurrencies', '50+ fiat currencies'],
      logo: '🏦'
    },
    moonpay: {
      name: 'MoonPay',
      description: 'Simple and fast crypto purchases',
      features: ['Fast processing', 'Low fees', 'Mobile optimized', 'Instant purchases'],
      fees: '1% - 4.5%',
      processingTime: '5-15 minutes',
      supported: ['160+ countries', '80+ cryptocurrencies', '40+ fiat currencies'],
      logo: '🌙'
    },
    'ramp-network': {
      name: 'Ramp Network',
      description: 'Enterprise-grade solution',
      features: ['Enterprise focused', 'API-first', 'White-label', 'Custom branding'],
      fees: '0.49% - 2.9%',
      processingTime: '5-10 minutes',
      supported: ['170+ countries', '60+ cryptocurrencies', '45+ fiat currencies'],
      logo: '🚀'
    }
  };

  const currencies = {
    fiat: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR', 'BRL'],
    crypto: [
      { symbol: 'ETH', network: 'ETHEREUM', name: 'Ethereum' },
      { symbol: 'BTC', network: 'BITCOIN', name: 'Bitcoin' },
      { symbol: 'MATIC', network: 'MATIC', name: 'Polygon' },
      { symbol: 'USDC', network: 'ETHEREUM', name: 'USD Coin' },
      { symbol: 'USDT', network: 'ETHEREUM', name: 'Tether' }
    ]
  };

  const generateOnrampUrl = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const baseUrls = {
        transak: 'https://global-stg.transak.com',
        moonpay: 'https://buy-sandbox.moonpay.com',
        'ramp-network': 'https://app.demo.ramp.network'
      };
      
      const url = `${baseUrls[selectedProvider]}?amount=${formData.fiatAmount}&currency=${formData.fiatCurrency}&crypto=${formData.cryptoCurrency.symbol}&wallet=${formData.walletAddress}&email=${formData.email}&redirect=${encodeURIComponent(formData.redirectUrl)}`;
      
      setGeneratedUrl(url);
      setIsLoading(false);
    }, 1500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getApiEndpoint = () => {
    return `https://api-sandbox.venly.io/fiat-ramp/${selectedProvider}/on`;
  };

  const getRequestBody = () => {
    const body = {
      fiatAmount: formData.fiatAmount,
      fiatCurrency: formData.fiatCurrency,
      cryptoAmount: formData.cryptoAmount,
      cryptoCurrency: formData.cryptoCurrency,
      redirectUrl: formData.redirectUrl,
      email: formData.email,
      walletAddress: formData.walletAddress
    };

    if (selectedProvider === 'ramp-network') {
      body.selectedCountryCode = 'US';
    }

    return JSON.stringify(body, null, 2);
  };

  const getCodeExample = () => {
    return `// Initialize Venly Onramp
const venly = new VenlyOnramp({
  apiKey: 'your-api-key',
  environment: 'sandbox'
});

// Generate onramp URL
const onrampUrl = await venly.createOnrampUrl({
  provider: '${selectedProvider}',
  fiatAmount: ${formData.fiatAmount},
  fiatCurrency: '${formData.fiatCurrency}',
  cryptoCurrency: {
    network: '${formData.cryptoCurrency.network}',
    symbol: '${formData.cryptoCurrency.symbol}'
  },
  walletAddress: '${formData.walletAddress}',
  email: '${formData.email}',
  redirectUrl: '${formData.redirectUrl}'
});

// Open onramp in popup or redirect
window.open(onrampUrl, '_blank');`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Venly Onramp Integration
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interactive widget to test and implement Venly's fiat-to-crypto onramp solutions. 
            Choose your provider, configure parameters, and generate integration code.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Panel - Configuration */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4">
              
              {/* Tab Navigation */}
              <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('configure')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'configure' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Settings className="w-4 h-4 inline mr-2" />
                  Configure
                </button>
                <button
                  onClick={() => setActiveTab('providers')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'providers' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Globe className="w-4 h-4 inline mr-2" />
                  Providers
                </button>
              </div>

              {activeTab === 'configure' && (
                <div className="space-y-4">
                  {/* Provider Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provider
                    </label>
                    <select
                      value={selectedProvider}
                      onChange={(e) => setSelectedProvider(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {Object.entries(providers).map(([key, provider]) => (
                        <option key={key} value={key}>
                          {provider.logo} {provider.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Fiat Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fiat Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.fiatAmount}
                        onChange={(e) => setFormData({...formData, fiatAmount: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="300"
                      />
                    </div>
                  </div>

                  {/* Fiat Currency */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fiat Currency
                    </label>
                    <select
                      value={formData.fiatCurrency}
                      onChange={(e) => setFormData({...formData, fiatCurrency: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {currencies.fiat.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>

                  {/* Crypto Currency */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cryptocurrency
                    </label>
                    <select
                      value={formData.cryptoCurrency.symbol}
                      onChange={(e) => {
                        const crypto = currencies.crypto.find(c => c.symbol === e.target.value);
                        setFormData({...formData, cryptoCurrency: crypto});
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {currencies.crypto.map(crypto => (
                        <option key={crypto.symbol} value={crypto.symbol}>
                          {crypto.symbol} - {crypto.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Wallet Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Wallet Address
                    </label>
                    <input
                      type="text"
                      value={formData.walletAddress}
                      onChange={(e) => setFormData({...formData, walletAddress: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0x..."
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="user@example.com"
                    />
                  </div>

                  {/* Redirect URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Redirect URL
                    </label>
                    <input
                      type="url"
                      value={formData.redirectUrl}
                      onChange={(e) => setFormData({...formData, redirectUrl: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://yourapp.com/success"
                    />
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={generateOnrampUrl}
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <Play className="w-5 h-5 mr-2" />
                    )}
                    Generate Onramp URL
                  </button>
                </div>
              )}

              {activeTab === 'providers' && (
                <div className="space-y-4">
                  {Object.entries(providers).map(([key, provider]) => (
                    <div
                      key={key}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedProvider === key
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedProvider(key)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{provider.logo}</span>
                        <span className="text-sm text-gray-500">{provider.fees}</span>
                      </div>
                      <h3 className="font-medium text-gray-900">{provider.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{provider.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {provider.features.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Output & Code */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              
              {/* Provider Info */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{providers[selectedProvider].logo}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {providers[selectedProvider].name}
                    </h2>
                    <p className="text-gray-600">{providers[selectedProvider].description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Processing Time</h4>
                    <p className="text-sm text-gray-600">{providers[selectedProvider].processingTime}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Fees</h4>
                    <p className="text-sm text-gray-600">{providers[selectedProvider].fees}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Coverage</h4>
                    <p className="text-sm text-gray-600">{providers[selectedProvider].supported[0]}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {providers[selectedProvider].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generated URL */}
              {generatedUrl && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Generated Onramp URL</h3>
                    <button
                      onClick={() => copyToClipboard(generatedUrl)}
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <code className="text-sm break-all">{generatedUrl}</code>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => window.open(generatedUrl, '_blank')}
                      className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in New Tab
                    </button>
                    <button
                      onClick={() => setShowCode(!showCode)}
                      className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Code className="w-4 h-4 mr-2" />
                      {showCode ? 'Hide' : 'Show'} Code
                    </button>
                  </div>
                </div>
              )}

              {/* API Request/Response */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">API Integration</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Endpoint
                    </label>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <code className="text-sm">POST {getApiEndpoint()}</code>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Request Body
                    </label>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <pre className="text-sm overflow-x-auto"><code>{getRequestBody()}</code></pre>
                    </div>
                  </div>

                  {showCode && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        JavaScript Integration
                      </label>
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
                        <pre className="text-sm overflow-x-auto"><code>{getCodeExample()}</code></pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">Security & Compliance</h4>
                    <p className="text-sm text-yellow-700">
                      This is a sandbox environment for testing. In production, ensure proper API key management, 
                      validate all user inputs, and implement proper error handling. All providers are KYC/AML compliant.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p>
            Built with Venly API • <a href="#" className="text-blue-600 hover:text-blue-700">Documentation</a> • 
            <a href="#" className="text-blue-600 hover:text-blue-700 ml-2">Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VenlyOnrampWidget;