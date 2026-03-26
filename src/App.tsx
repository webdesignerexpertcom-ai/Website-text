/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { QRCodeSVG } from 'qrcode.react';
import { ShoppingCart, Menu as MenuIcon, X, ChevronRight, Phone, Mail, MapPin, CheckCircle2, Truck, ShieldCheck, Heart, Plus, Minus, CreditCard, QrCode, Download, Trash2 } from 'lucide-react';
import { motion, AnimatePresence, useTransform, useScroll } from 'motion/react';

const WhatsAppIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.754a8.117 8.117 0 0 1-4.126-1.127l-.297-.175-3.068.805.819-2.991-.192-.306a8.103 8.103 0 0 1-1.243-4.3c0-4.483 3.645-8.128 8.128-8.128 2.173 0 4.217.846 5.754 2.382 1.535 1.536 2.382 3.579 2.382 5.754 0 4.483-3.645 8.128-8.128 8.128m8.129-17.415C18.683 1.103 15.919.25 13.005.25 6.91.25 1.948 5.212 1.948 11.308c0 1.948.51 3.85 1.475 5.516l-1.567 5.72 5.851-1.534a11.015 11.015 0 0 0 5.294 1.354h.005c6.094 0 11.056-4.962 11.056-11.058 0-2.953-1.149-5.73-3.235-7.816" />
  </svg>
);
import { toast, Toaster } from 'sonner';
import { products } from './data';
import { Category, Product, CartItem, ProductPrice } from './types';

const ProductCard = React.memo(({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product, selectedPrice: ProductPrice, quantity: number) => void }) => {
  const [selectedPrice, setSelectedPrice] = useState<ProductPrice>(product.prices[0]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedPrice(product.prices[0]);
    setQuantity(1);
  }, [product.id]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[40px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col h-full border border-gray-50 relative p-4"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-6">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Content */}
      <div className="px-2 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-2xl font-serif font-bold text-[#4a1c1c] mb-2 leading-tight">
            {product.teluguName ? `${product.teluguName} (${product.name})` : product.name}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-bold text-[#4a1c1c] mb-2">Key Benefits:</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            {product.benefits && product.benefits.length > 0 ? (
              product.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-secondary rounded-full" />
                  {benefit}
                </li>
              ))
            ) : (
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-secondary rounded-full" />
                Traditional & Authentic Taste
              </li>
            )}
          </ul>
        </div>
        
        {/* Select Size */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-[#4a1c1c] mb-3">Select Size</h4>
          <div className="grid grid-cols-3 gap-3">
            {product.prices.map((p, idx) => (
              <button 
                key={`${product.id}-${p.weight}-${idx}`}
                onClick={() => setSelectedPrice(p)}
                className={`flex flex-col items-center justify-center py-3 rounded-2xl border transition-all duration-300
                  ${selectedPrice.weight === p.weight 
                    ? 'bg-white border-secondary shadow-[0_8px_20px_rgba(0,0,0,0.08)] scale-105' 
                    : 'bg-white border-gray-100 text-gray-400 hover:border-secondary/30'
                  }`}
              >
                <span className={`text-sm font-bold ${selectedPrice.weight === p.weight ? 'text-[#4a1c1c]' : 'text-gray-500'}`}>{p.weight}</span>
                <span className="text-[10px] text-gray-400">₹{p.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-[#4a1c1c] mb-3">Quantity</h4>
          <div className="flex items-center justify-between bg-[#e9f2eb] rounded-2xl p-2 h-14">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#4a1c1c] shadow-sm active:scale-90 transition-transform"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-bold text-[#4a1c1c]">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#4a1c1c] shadow-sm active:scale-90 transition-transform"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-auto">
          <button 
            onClick={() => onAddToCart(product, selectedPrice, quantity)}
            className="w-full bg-white text-[#4a1c1c] py-4 rounded-2xl font-bold text-sm shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.1)] transition-all active:scale-[0.98] border border-gray-50 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
});

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedHeroImage, setSelectedHeroImage] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'phonepe'>('whatsapp');
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState<{ items: CartItem[], total: number, id: string } | null>(null);
  const [showPhonePeQR, setShowPhonePeQR] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const addToCart = React.useCallback((product: Product, selectedPrice: ProductPrice, quantity: number) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id && item.selectedWeight === selectedPrice.weight);
      if (existingItem) {
        return prev.map(item => 
          (item.id === product.id && item.selectedWeight === selectedPrice.weight)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      const cartItem: CartItem = {
        ...product,
        selectedWeight: selectedPrice.weight,
        selectedPrice: selectedPrice.price,
        cartId: `${product.id}-${selectedPrice.weight}`,
        quantity: quantity
      };
      return [...prev, cartItem];
    });
    setIsCartOpen(true);
    toast.success(`${product.name} (${selectedPrice.weight}) added to cart!`, {
      description: `Quantity: ${quantity} | Price: ₹${selectedPrice.price * quantity}`,
      position: 'bottom-right',
    });
  }, []);

  const updateQuantity = React.useCallback((cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const generateInvoice = React.useCallback((order: { items: CartItem[], total: number, id: string }) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(44, 62, 80);
    doc.text('Brahmin Foods', 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Authentic Vegetarian Since 2000', 105, 28, { align: 'center' });
    doc.text('Contact: +91 97011 21967', 105, 33, { align: 'center' });
    
    doc.setDrawColor(200);
    doc.line(20, 40, 190, 40);
    
    // Order Info
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Invoice No: ${order.id}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 57);
    
    // Table
    const tableData = order.items.map((item, index) => [
      index + 1,
      item.name,
      item.selectedWeight,
      item.quantity,
      `INR ${item.selectedPrice}`,
      `INR ${item.selectedPrice * item.quantity}`
    ]);
    
    autoTable(doc, {
      startY: 70,
      head: [['#', 'Item', 'Weight', 'Qty', 'Price', 'Total']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [44, 62, 80] },
      foot: [['', '', '', '', 'Grand Total', `INR ${order.total}`]],
      footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' }
    });
    
    // Footer
    const finalY = (doc as any).lastAutoTable.finalY || 150;
    doc.setFontSize(10);
    doc.text('Thank you for ordering with Brahmin Foods!', 105, finalY + 20, { align: 'center' });
    doc.text('Visit us again for authentic flavours.', 105, finalY + 25, { align: 'center' });
    
    doc.save(`BrahminFoods_Invoice_${order.id}.pdf`);
  }, []);

  const handleCheckout = React.useCallback(() => {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + (item.selectedPrice * item.quantity), 0);
    const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const orderDetails = { items: [...cart], total, id: orderId };

    if (paymentMethod === 'whatsapp') {
      const phoneNumber = "919701121967";
      const businessName = "Brahmin Foods";
      
      let message = `*${businessName} - New Order*\n`;
      message += `Order ID: ${orderId}\n`;
      message += `--------------------------\n`;
      
      cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (${item.selectedWeight}) x ${item.quantity} - ₹${item.selectedPrice * item.quantity}\n`;
      });
      
      message += `--------------------------\n`;
      message += `*Total Amount: ₹${total}*\n\n`;
      message += `Please confirm my order. Thank you!`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      setLastOrder(orderDetails);
      setIsOrderSuccess(true);
      setCart([]);
      setIsCartOpen(false);
    } else {
      // PhonePe flow - Show QR
      setShowPhonePeQR(true);
      setLastOrder(orderDetails);
    }
  }, [cart, paymentMethod]);

  const confirmPhonePePayment = React.useCallback(() => {
    if (!lastOrder) return;
    setShowPhonePeQR(false);
    setIsOrderSuccess(true);
    setCart([]);
    setIsCartOpen(false);
    toast.success("Payment Successful!", {
      description: "Your order has been booked successfully.",
    });
  }, [lastOrder]);

  const filteredProducts = React.useMemo(() => products.filter(p => 
    activeCategory === 'all' ? true : p.category === activeCategory
  ), [activeCategory]);

  const categories = [
    { id: 'all', label: 'All', icon: '🛍️', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800' },
    { id: 'pickles', label: 'Pickles', icon: '🌶️', image: 'https://images.unsplash.com/photo-1589135340847-57a6b32368a7?auto=format&fit=crop&q=80&w=800' },
    { id: 'powders', label: 'Powders', icon: '✨', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800' },
    { id: 'snacks', label: 'Snacks', icon: '🥨', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=800' },
    { id: 'sweets', label: 'Sweets', icon: '🍬', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Toaster richColors />
      
      {/* Top Banner */}
      <div className="bg-primary text-white py-2 px-4 text-center text-[10px] md:text-xs font-medium tracking-wide">
        PURE VEGETARIAN | శుద్ధ శాకాహారం
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#ffcc00] border-b border-[#4a1c1c]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-lg border-2 border-[#4a1c1c]">
                <div className="px-3 py-1 bg-white border border-[#4a1c1c] rounded flex flex-col items-center">
                  <span className="text-[10px] font-bold text-[#4a1c1c] leading-none tracking-tighter">THE</span>
                  <span className="text-xl font-black text-[#4a1c1c] leading-none tracking-tighter">TUKARAM</span>
                  <span className="text-[8px] font-bold text-[#4a1c1c] leading-none tracking-widest border-t border-[#4a1c1c] mt-0.5 pt-0.5">FOODS</span>
                </div>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
                <a href="#categories" className="text-gray-400 hover:text-primary transition-colors">Categories</a>
                <a href="#menu" className="text-gray-400 hover:text-primary transition-colors">Menu</a>
                <a href="#about" className="text-gray-400 hover:text-primary transition-colors">Our Story</a>
                <a href="tel:+919701121967" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
                  <Phone className="w-4 h-4" />
                  97011 21967
                </a>
              </div>
              
              <div className="flex items-center gap-6">
                <a 
                  href="https://wa.me/919701121967" 
                  target="_blank"
                  className="bg-whatsapp text-white px-6 py-2.5 rounded-full flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-whatsapp/20 transition-all active:scale-95"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  WhatsApp Order
                </a>
                
                <div 
                  className="relative cursor-pointer group p-2"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="w-6 h-6 text-[#4a1c1c] group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-[#4a1c1c] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-[#ffcc00] shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <div 
                className="relative cursor-pointer p-2"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-6 h-6 text-[#4a1c1c]" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#4a1c1c] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-[#ffcc00]">
                    {cartCount}
                  </span>
                )}
              </div>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-[#4a1c1c]">
                {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <a href="tel:+919701121967" className="flex items-center gap-3 text-lg font-medium">
                  <Phone className="w-5 h-5 text-primary" />
                  Call Us
                </a>
                <a href="https://wa.me/919701121967" className="flex items-center gap-3 text-lg font-medium text-whatsapp">
                  <WhatsAppIcon className="w-5 h-5" />
                  WhatsApp Us
                </a>
                <a href="#menu" onClick={() => setIsMenuOpen(false)} className="block w-full bg-primary text-white py-3 rounded-xl font-bold text-center">View Menu</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-1.5 border-b border-gray-100 flex flex-col items-center">
                <div className="w-full flex justify-end mb-0">
                  <button onClick={() => setIsCartOpen(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
                <h2 className="text-lg font-serif font-bold text-[#4a1c1c] text-center leading-tight">Shopping Cart</h2>
              </div>

              <div className="flex-grow overflow-y-auto px-2 py-1 space-y-1 bg-[#fdfaf2]">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg font-medium">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.cartId} className="bg-white rounded-2xl p-2 shadow-sm border border-gray-50 relative overflow-hidden">
                        <div className="flex gap-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          
                          <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-start">
                              <div className="min-w-0">
                                <h4 className="text-sm font-serif font-bold text-[#4a1c1c] leading-tight truncate">
                                  {item.teluguName ? item.teluguName : item.name}
                                </h4>
                                <p className="text-[10px] text-gray-500 mt-0.5">{item.name} • {item.selectedWeight}</p>
                              </div>
                              <button 
                                onClick={() => setCart(prev => prev.filter(i => i.cartId !== item.cartId))}
                                className="p-1 text-red-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between mt-1">
                              <div className="flex items-center border border-gray-100 rounded-lg p-0.5 bg-white">
                                <button 
                                  onClick={() => updateQuantity(item.cartId, -1)}
                                  className="p-0.5 hover:bg-gray-50 text-gray-400 transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-1.5 text-xs font-bold text-[#4a1c1c]">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => updateQuantity(item.cartId, 1)}
                                  className="p-0.5 hover:bg-gray-50 text-gray-400 transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              
                              <div className="text-right">
                                <p className="text-base font-bold text-[#4a1c1c]">₹{item.selectedPrice * item.quantity}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Summary Card moved to footer */}
                  </div>
                )}
              </div>

              <div className="px-3 py-1 pb-1.5 bg-[#fdfaf2] space-y-0">
                {cart.length > 0 && (
                  <div className="bg-white rounded-xl p-1.5 shadow-sm border border-gray-50 space-y-0 mb-1">
                    <div className="flex justify-between items-center text-[10px] text-gray-500">
                      <span>Subtotal</span>
                      <span className="font-bold">₹{cart.reduce((sum, item) => sum + (item.selectedPrice * item.quantity), 0)}</span>
                    </div>
                    <div className="h-px bg-gray-50 my-0.5" />
                    <div className="flex justify-between items-center text-sm text-[#4a1c1c]">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">₹{cart.reduce((sum, item) => sum + (item.selectedPrice * item.quantity), 0)}</span>
                    </div>
                  </div>
                )}
                <div className="space-y-1">
                  <button 
                    disabled={cart.length === 0}
                    onClick={handleCheckout}
                    className="w-full py-2 bg-whatsapp text-white rounded-xl font-bold text-xs shadow-md shadow-whatsapp/10 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Finalize Order via WhatsApp
                  </button>
                  
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-1 text-gray-400 font-bold text-[9px] uppercase tracking-widest hover:text-primary transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* PhonePe QR Modal */}
        {showPhonePeQR && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
              onClick={() => setShowPhonePeQR(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white z-[110] rounded-2xl shadow-2xl p-8 text-center"
            >
              <h3 className="text-xl font-bold text-primary mb-1">Payment</h3>
              <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest">Scan QR to pay ₹{lastOrder?.total}</p>
              
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex justify-center">
                <QRCodeSVG 
                  value={`upi://pay?pa=9701121967@ybl&pn=BrahminFoods&am=${lastOrder?.total}&cu=INR`}
                  size={180}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <div className="space-y-3">
                <button 
                  onClick={confirmPhonePePayment}
                  className="w-full bg-[#5f259f] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#5f259f]/10 active:scale-95 transition-all"
                >
                  I have paid
                </button>
                <button 
                  onClick={() => setShowPhonePeQR(false)}
                  className="w-full text-gray-400 py-2 text-xs font-bold uppercase tracking-widest hover:text-primary transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}

        {/* Success Modal */}
        {isOrderSuccess && lastOrder && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white z-[110] rounded-2xl shadow-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-serif font-bold text-primary mb-2">Order Placed!</h3>
              <p className="text-sm text-gray-500 mb-6">Order ID: <span className="font-bold text-primary">#{lastOrder.id}</span></p>
              
              <div className="bg-gray-50 rounded-xl p-5 mb-6 text-left">
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {lastOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-gray-600">{item.name} x {item.quantity}</span>
                      <span className="font-bold text-primary">₹{item.selectedPrice * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Total</span>
                  <span className="text-lg font-bold text-primary">₹{lastOrder.total}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => generateInvoice(lastOrder)}
                  className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-secondary hover:text-primary transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download Invoice
                </button>
                <button 
                  onClick={() => setIsOrderSuccess(false)}
                  className="w-full text-gray-400 py-2 text-xs font-bold uppercase tracking-widest hover:text-primary transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-primary">
          <motion.div 
            className="absolute inset-0"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <motion.div 
              className="absolute inset-0"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            >
              <img 
                src="https://picsum.photos/seed/indian-spices/1920/1080?blur=2" 
                alt="Indian Spices" 
                className="w-full h-full object-cover opacity-40"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
            </motion.div>
          </motion.div>
          
          {/* Floating Elements Removed */}

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-block bg-accent text-primary text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.3em] mb-6 shadow-lg shadow-accent/20"
              >
                Pure Vegetarian Excellence
              </motion.span>
              <h2 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight tracking-tight">
                Authentic <br />
                <span className="text-accent italic">Brahmin</span> <br />
                Flavours
              </h2>
              <p className="text-lg md:text-xl font-serif text-white/80 italic mb-10 max-w-lg leading-relaxed">
                "Experience the timeless tradition of Andhra's finest vegetarian recipes, crafted with love and purity."
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a 
                  whileTap={{ scale: 0.95 }}
                  href="#menu" 
                  className="bg-white text-primary px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-accent transition-all"
                >
                  Explore Menu
                </motion.a>
                <motion.a 
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/919701121967" 
                  target="_blank"
                  className="bg-whatsapp text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Order Now
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements Removed */}
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: <ShieldCheck className="w-8 h-8" />, title: "100% Pure", desc: "Strictly vegetarian kitchen with traditional standards." },
                { icon: <Heart className="w-8 h-8" />, title: "Handmade", desc: "Small batches crafted with authentic family recipes." },
                { icon: <Truck className="w-8 h-8" />, title: "Fast Delivery", desc: "Fresh products delivered straight to your doorstep." },
                { icon: <CheckCircle2 className="w-8 h-8" />, title: "Quality First", desc: "Premium ingredients sourced directly from farmers." },
              ].map((feature, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-gray-100 transition-all"
                >
                  <div className="w-16 h-16 bg-paper rounded-2xl flex items-center justify-center text-primary mb-6 transition-colors">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-serif font-bold text-primary mb-2">{feature.title}</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed max-w-[200px]">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Shop by Category Section */}
        <section id="categories" className="py-12 bg-white relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-4 inline-block"
              >
                Browse Our Collection
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-serif font-bold text-primary"
              >
                Shop by Category
              </motion.h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => {
                    setActiveCategory(cat.id as Category);
                    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`relative aspect-square rounded-3xl overflow-hidden cursor-pointer group depth-shadow-hover transition-all duration-500
                    ${activeCategory === cat.id ? 'ring-4 ring-primary ring-offset-4' : ''}`}
                >
                  <img 
                    src={cat.image} 
                    alt={cat.label} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                    <span className="text-3xl mb-2 transform group-hover:scale-125 transition-transform duration-500">{cat.icon}</span>
                    <h4 className="text-white font-serif font-bold text-lg">{cat.label}</h4>
                    <p className="text-white/60 text-[10px] uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">View All</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart} 
                />
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-paper py-12 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                  <img 
                    src="https://picsum.photos/seed/brahmin-tradition/800/1000" 
                    alt="Brahmin Foods Tradition" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Our Legacy</span>
                <h2 className="text-5xl font-serif text-primary mb-6 leading-tight">The Art of <br /> <span className="italic">Traditional</span> Cooking</h2>
                <p className="text-gray-500 text-base mb-8 leading-relaxed">
                  For over two decades, Brahmin Foods has been the custodian of authentic Andhra vegetarian heritage. Every jar of pickle and every packet of snack tells a story of tradition, purity, and uncompromising quality.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-white rounded-2xl border border-gray-100">
                    <p className="text-3xl font-serif font-bold text-primary mb-1">24+</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Years of Trust</p>
                  </div>
                  <div className="p-6 bg-white rounded-2xl border border-gray-100">
                    <p className="text-3xl font-serif font-bold text-primary mb-1">100%</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Natural Ingredients</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12 border-b border-white/10 pb-12">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">Brahmin Foods</h2>
              <p className="text-white/60 leading-relaxed">
                Authentic Andhra vegetarian cuisine delivered to your doorstep. Experience the taste of tradition.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-secondary">Contact</h4>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-secondary" />
                  +91 97011 21967
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-secondary" />
                  contact@brahminfoods.in
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-secondary">Location</h4>
              <p className="text-white/80">Vijayawada, Andhra Pradesh, India</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
            <p>&copy; {new Date().getFullYear()} Brahmin Foods. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">About Us</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a 
        href="https://wa.me/919701121967" 
        target="_blank"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[100] bg-whatsapp text-white p-5 rounded-full shadow-2xl flex items-center justify-center group"
        style={{ transformStyle: "preserve-3d" }}
      >
        <WhatsAppIcon className="w-7 h-7" style={{ transform: "translateZ(20px)" }} />
        <span className="absolute right-full mr-4 bg-white text-gray-900 px-4 py-2 rounded-lg text-xs font-bold shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-gray-100">
          Order on WhatsApp
        </span>
        <div className="absolute inset-0 rounded-full bg-whatsapp blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
      </motion.a>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedHeroImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedHeroImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-video rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedHeroImage} 
                alt="Enlarged Product" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setSelectedHeroImage(null)}
                className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
