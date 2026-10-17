import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  Image as ImageIcon, 
  DollarSign, 
  Check, 
  Copy, 
  Sparkles, 
  HelpCircle, 
  Camera, 
  Layers, 
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { MenuItem, ProductCategory, GalleryItem } from '../types';

interface AdminMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onUpdateItems: (newItems: MenuItem[]) => void;
  galleryPhotos: GalleryItem[];
  onUpdateGallery: (newPhotos: GalleryItem[]) => void;
}

export const AdminMenuModal: React.FC<AdminMenuModalProps> = ({
  isOpen,
  onClose,
  menuItems,
  onUpdateItems,
  galleryPhotos,
  onUpdateGallery,
}) => {
  const [activeTab, setActiveTab] = useState<'manage' | 'add' | 'ambience' | 'guide'>('manage');
  const [copiedCode, setCopiedCode] = useState(false);

  // Quick edit product state
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editImage, setEditImage] = useState<string>('');

  // Quick edit ambience photo state
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [editPhotoUrl, setEditPhotoUrl] = useState<string>('');
  const [editPhotoTitle, setEditPhotoTitle] = useState<string>('');
  const [editPhotoCaption, setEditPhotoCaption] = useState<string>('');

  // New Ambience Photo form
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<'counter' | 'cakes' | 'ovens' | 'lounge'>('counter');
  const [newPhotoUrl, setNewPhotoUrl] = useState('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');

  // New product form
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('pastries');
  const [newPrice, setNewPrice] = useState<number>(150);
  const [newOrigPrice, setNewOrigPrice] = useState<number>(180);
  const [newPortion, setNewPortion] = useState('1 Slice (140g)');
  const [newDescription, setNewDescription] = useState('');
  const [newIngredients, setNewIngredients] = useState('Belgian Chocolate, Dairy Cream, Cocoa Sponge');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80');
  const [newIsVeg, setNewIsVeg] = useState(true);

  if (!isOpen) return null;

  // PRODUCT HANDLERS
  const handleStartEdit = (item: MenuItem) => {
    setEditingItemId(item.id);
    setEditPrice(item.price);
    setEditImage(item.image);
  };

  const handleSaveEdit = (itemId: string) => {
    const updated = menuItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          price: editPrice,
          image: editImage.trim() || item.image,
        };
      }
      return item;
    });
    onUpdateItems(updated);
    setEditingItemId(null);
  };

  const handleDeleteItem = (itemId: string) => {
    if (confirm('Are you sure you want to remove this item from the menu?')) {
      const updated = menuItems.filter(item => item.id !== itemId);
      onUpdateItems(updated);
    }
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newDescription.trim()) return;

    const created: MenuItem = {
      id: 'custom-' + Date.now(),
      name: newName.trim(),
      category: newCategory === 'all' ? 'pastries' : newCategory,
      price: Number(newPrice),
      originalPrice: newOrigPrice ? Number(newOrigPrice) : undefined,
      rating: 4.9,
      reviewCount: 1,
      description: newDescription.trim(),
      ingredients: newIngredients.split(',').map(s => s.trim()).filter(Boolean),
      isVeg: newIsVeg,
      portion: newPortion.trim() || '1 Pc',
      prepTime: 'Fresh daily batch',
      image: newImage.trim() || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    };

    onUpdateItems([created, ...menuItems]);
    setActiveTab('manage');
    setNewName('');
    setNewDescription('');
  };

  // AMBIENCE PHOTO HANDLERS
  const handleStartEditPhoto = (photo: GalleryItem) => {
    setEditingPhotoId(photo.id);
    setEditPhotoUrl(photo.image);
    setEditPhotoTitle(photo.title);
    setEditPhotoCaption(photo.caption);
  };

  const handleSaveEditPhoto = (photoId: string) => {
    const updated = galleryPhotos.map(p => {
      if (p.id === photoId) {
        return {
          ...p,
          image: editPhotoUrl.trim() || p.image,
          title: editPhotoTitle.trim() || p.title,
          caption: editPhotoCaption.trim() || p.caption,
        };
      }
      return p;
    });
    onUpdateGallery(updated);
    setEditingPhotoId(null);
  };

  const handleDeletePhoto = (photoId: string) => {
    if (confirm('Delete this photo from the ambience showcase?')) {
      const updated = galleryPhotos.filter(p => p.id !== photoId);
      onUpdateGallery(updated);
    }
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim() || !newPhotoUrl.trim()) return;

    const categoryLabels: Record<string, string> = {
      counter: 'Display Counter',
      cakes: 'Cake Artistry',
      ovens: 'Warm Ovens',
      lounge: 'Highway Cafe Lounge',
    };

    const newPhoto: GalleryItem = {
      id: 'gallery-' + Date.now(),
      title: newPhotoTitle.trim(),
      category: newPhotoCategory,
      categoryLabel: categoryLabels[newPhotoCategory] || 'Bakery Showcase',
      image: newPhotoUrl.trim(),
      caption: newPhotoCaption.trim() || 'Fresh daily craft at Pastry Inn.',
    };

    onUpdateGallery([newPhoto, ...galleryPhotos]);
    setNewPhotoTitle('');
    setNewPhotoCaption('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-2xl border border-[#E5D7C2] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        {/* Header */}
        <div className="bg-[#1D1412] text-[#FDFBF7] px-6 py-4 flex items-center justify-between border-b border-[#3D2924]">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#E58B1B]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                PASTRY INN · Master Admin & Media Center
              </h3>
              <p className="text-[11px] text-[#D8CCC1]">
                Live control for menu prices, bakery products, and ambience showcase photos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#D8CCC1] hover:text-white rounded-lg hover:bg-[#3D2924] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#F6EFE3] px-6 py-2.5 border-b border-[#E5D7C2] flex flex-wrap items-center gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'manage' ? 'bg-[#1D1412] text-white shadow-xs' : 'text-[#4A3A35] hover:bg-[#EAE0D1]'
            }`}
          >
            Manage Products & Prices ({menuItems.length})
          </button>
          
          <button
            onClick={() => setActiveTab('add')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
              activeTab === 'add' ? 'bg-[#BA2D27] text-white shadow-xs' : 'text-[#4A3A35] hover:bg-[#EAE0D1]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Product</span>
          </button>

          <button
            onClick={() => setActiveTab('ambience')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'ambience' ? 'bg-[#E58B1B] text-white shadow-xs' : 'text-[#4A3A35] hover:bg-[#EAE0D1]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Ambience & Gallery Photos ({galleryPhotos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
              activeTab === 'guide' ? 'bg-[#1D1412] text-white shadow-xs' : 'text-[#4A3A35] hover:bg-[#EAE0D1]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#E58B1B]" />
            <span>Access Links & Guide</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
          
          {/* TAB 1: MANAGE EXISTING PRODUCTS */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#5A4E48] bg-[#F6EFE3] p-3 rounded-xl border border-[#E5D7C2]">
                <span>Tap <strong>Edit Price/Photo</strong> on any item to update it in real-time. Changes save automatically!</span>
                <span className="font-semibold text-[#BA2D27]">{menuItems.length} active menu items</span>
              </div>

              <div className="space-y-3">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-3.5 rounded-xl border border-[#E5D7C2] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={editingItemId === item.id ? editImage || item.image : item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover bg-[#F6EFE3] shrink-0 border border-[#E5D7C2]"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-[#1D1412] text-sm truncate">{item.name}</h4>
                          {item.isVeg && (
                            <span className="text-[10px] text-[#2E7D32] bg-[#E8F5E9] px-1.5 py-0.5 rounded-sm font-semibold">Veg</span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#786A63] flex items-center gap-2 mt-0.5">
                          <span className="capitalize text-[#BA2D27] font-semibold">{item.category}</span>
                          <span>·</span>
                          <span>{item.portion}</span>
                          <span>·</span>
                          <span className="font-bold text-[#BA2D27] text-xs">₹{item.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Inline Editor or Action Buttons */}
                    {editingItemId === item.id ? (
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-[#F6EFE3] p-2.5 rounded-xl border border-[#E5D7C2] shrink-0">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-[#1D1412]">₹</span>
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(Number(e.target.value))}
                            className="w-20 px-2 py-1 bg-white border border-[#DDD0BC] rounded-lg text-xs font-bold text-[#BA2D27]"
                          />
                        </div>

                        <input
                          type="text"
                          value={editImage}
                          onChange={(e) => setEditImage(e.target.value)}
                          placeholder="Paste new photo URL"
                          className="w-48 px-2 py-1 bg-white border border-[#DDD0BC] rounded-lg text-[11px] font-mono"
                        />

                        <button
                          onClick={() => handleSaveEdit(item.id)}
                          className="px-3 py-1 bg-[#2E7D32] text-white font-bold rounded-lg hover:bg-[#256829] cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingItemId(null)}
                          className="px-2 py-1 bg-[#DDD0BC] text-[#1D1412] rounded-lg hover:bg-[#c9bbaa] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-[#F6EFE3] hover:bg-[#EAE0D1] text-[#1D1412] border border-[#DDD0BC] rounded-lg transition-colors cursor-pointer font-medium"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#BA2D27]" />
                          <span>Edit Price / Photo</span>
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1.5 text-[#A6978C] hover:text-[#BA2D27] transition-colors cursor-pointer"
                          title="Delete item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ADD NEW PRODUCT FORM */}
          {activeTab === 'add' && (
            <form onSubmit={handleAddNewItem} className="bg-white p-6 rounded-2xl border border-[#E5D7C2] space-y-4 text-xs">
              <div className="border-b border-[#EFE5D5] pb-3">
                <h4 className="font-serif text-lg font-bold text-[#1D1412]">
                  Add a New Pastry, Cake, or Beverage to Menu
                </h4>
                <p className="text-[11px] text-[#786A63]">
                  Newly added items appear immediately at the top of the menu and can be ordered by customers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#1D1412] block mb-1">Item Name *</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Pistachio Raspberry Tart"
                    className="w-full px-3 py-2 bg-[#FDFBF7] rounded-xl border border-[#E5D7C2] text-[#1D1412] focus:outline-hidden focus:border-[#BA2D27]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1D1412] block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] rounded-xl border border-[#E5D7C2] text-[#1D1412] focus:outline-hidden focus:border-[#BA2D27]"
                  >
                    <option value="pastries">Pastries & Slices</option>
                    <option value="cakes">Celebration Cakes</option>
                    <option value="viennoiserie">Viennoiserie & Breads</option>
                    <option value="savouries">Savouries & Puffs</option>
                    <option value="cookies">Artisan Cookies</option>
                    <option value="beverages">Cafe Beverages</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-[#1D1412] block mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FDFBF7] rounded-xl border border-[#E5D7C2] text-[#BA2D27] font-bold"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1D1412] block mb-1">Original Price (₹ Strike)</label>
                  <input
                    type="number"
                    value={newOrigPrice}
                    onChange={(e) => setNewOrigPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FDFBF7] rounded-xl border border-[#E5D7C2] text-[#1D1412]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1D1412] block mb-1">Portion / Weight</label>
                  <input
                    type="text"
                    value={newPortion}
                    onChange={(e) => setNewPortion(e.target.value)}
                    placeholder="e.g. 1 Pc (120g) or 500g"
                    className="w-full px-3 py-2 bg-[#FDFBF7] rounded-xl border border-[#E5D7C2] text-[#1D1412]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#1D1412] block mb-1">Photo Image URL</label>
                <input
                  type="text"
                  required
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-[#FDFBF7] rounded-xl border border-[#E5D7C2] text-[#1D1412] font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#1D1412] block mb-1">Description *</label>
                <textarea
                  rows={2}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Appetizing description of ingredients, flavor notes, and freshness..."
                  className="w-full px-3 py-2 bg-[#FDFBF7] rounded-xl border border-[#E5D7C2] text-[#1D1412]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#1D1412] block mb-1">Ingredients (comma separated)</label>
                <input
                  type="text"
                  value={newIngredients}
                  onChange={(e) => setNewIngredients(e.target.value)}
                  placeholder="Belgian Cocoa, Dairy Butter, Madagascar Vanilla"
                  className="w-full px-3 py-2 bg-[#FDFBF7] rounded-xl border border-[#E5D7C2] text-[#1D1412]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="veg-check"
                  checked={newIsVeg}
                  onChange={(e) => setNewIsVeg(e.target.checked)}
                  className="w-4 h-4 rounded text-[#2E7D32]"
                />
                <label htmlFor="veg-check" className="font-semibold text-[#1D1412]">
                  100% Pure Vegetarian / Eggless (Green Tag)
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#BA2D27] hover:bg-[#961E19] text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer text-sm"
              >
                Add Product to Live Menu
              </button>
            </form>
          )}

          {/* TAB 3: AMBIENCE & GALLERY PHOTO MANAGER */}
          {activeTab === 'ambience' && (
            <div className="space-y-6">
              
              {/* Add New Ambience Photo Card */}
              <form onSubmit={handleAddPhoto} className="bg-white p-5 rounded-2xl border border-[#E5D7C2] space-y-3.5 text-xs">
                <div className="flex items-center justify-between border-b border-[#EFE5D5] pb-2">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#E58B1B]" />
                    <h4 className="font-serif font-bold text-sm text-[#1D1412]">Add New Ambience Photo</h4>
                  </div>
                  <span className="text-[10px] text-[#786A63]">Counter, Cake Art, Ovens, or Cafe Lounge</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#1D1412] block mb-1">Photo Title *</label>
                    <input
                      type="text"
                      required
                      value={newPhotoTitle}
                      onChange={(e) => setNewPhotoTitle(e.target.value)}
                      placeholder="e.g. Fresh Artisan Morning Loaves"
                      className="w-full px-3 py-2 bg-[#FDFBF7] rounded-xl border border-[#E5D7C2] text-[#1D1412]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#1D1412] block mb-1">Showcase Section</label>
                    <select
                      value={newPhotoCategory}
                      onChange={(e) => setNewPhotoCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[#FDFBF7] rounded-xl border border-[#E5D7C2] text-[#1D1412]"
                    >
                      <option value="counter">Display Counter</option>
                      <option value="cakes">Cake Artistry Studio</option>
                      <option value="ovens">Warm Deck Ovens</option>
                      <option value="lounge">Highway Cafe Lounge</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#1D1412] block mb-1">Photo Image URL *</label>
                  <input
                    type="text"
                    required
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3 py-2 bg-[#FDFBF7] rounded-xl border border-[#E5D7C2] text-[#1D1412] font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1D1412] block mb-1">Caption / Description</label>
                  <input
                    type="text"
                    value={newPhotoCaption}
                    onChange={(e) => setNewPhotoCaption(e.target.value)}
                    placeholder="Brief caption describing the craftsmanship or atmosphere..."
                    className="w-full px-3 py-2 bg-[#FDFBF7] rounded-xl border border-[#E5D7C2] text-[#1D1412]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#E58B1B] hover:bg-[#c97510] text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Add Photo to Ambience Showcase
                </button>
              </form>

              {/* List of Ambience Photos */}
              <div className="space-y-3">
                <h4 className="font-serif text-sm font-bold text-[#1D1412]">
                  Existing Ambience Photos ({galleryPhotos.length})
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {galleryPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="bg-white p-3 rounded-xl border border-[#E5D7C2] flex flex-col justify-between space-y-3 text-xs"
                    >
                      <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-[#F6EFE3] border border-[#E5D7C2]">
                        <img
                          src={editingPhotoId === photo.id ? editPhotoUrl || photo.image : photo.image}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-[#1D1412]/80 text-white text-[10px] px-2 py-0.5 rounded-sm font-semibold uppercase">
                          {photo.categoryLabel}
                        </span>
                      </div>

                      {editingPhotoId === photo.id ? (
                        <div className="space-y-2 bg-[#FDFBF7] p-2.5 rounded-lg border border-[#E5D7C2]">
                          <div>
                            <label className="text-[10px] font-bold text-[#1D1412] block">Title</label>
                            <input
                              type="text"
                              value={editPhotoTitle}
                              onChange={(e) => setEditPhotoTitle(e.target.value)}
                              className="w-full px-2 py-1 bg-white border border-[#DDD0BC] rounded-md text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-[#1D1412] block">Image URL</label>
                            <input
                              type="text"
                              value={editPhotoUrl}
                              onChange={(e) => setEditPhotoUrl(e.target.value)}
                              className="w-full px-2 py-1 bg-white border border-[#DDD0BC] rounded-md text-[11px] font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-[#1D1412] block">Caption</label>
                            <input
                              type="text"
                              value={editPhotoCaption}
                              onChange={(e) => setEditPhotoCaption(e.target.value)}
                              className="w-full px-2 py-1 bg-white border border-[#DDD0BC] rounded-md text-[11px]"
                            />
                          </div>
                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={() => handleSaveEditPhoto(photo.id)}
                              className="w-1/2 py-1.5 bg-[#2E7D32] text-white font-bold rounded-lg"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingPhotoId(null)}
                              className="w-1/2 py-1.5 bg-[#DDD0BC] text-[#1D1412] font-semibold rounded-lg"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h5 className="font-bold text-[#1D1412] text-sm">{photo.title}</h5>
                          <p className="text-[11px] text-[#786A63] line-clamp-1">{photo.caption}</p>
                          <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#EFE5D5]">
                            <button
                              onClick={() => handleStartEditPhoto(photo)}
                              className="flex items-center gap-1 text-[#BA2D27] hover:underline font-semibold cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Change Photo</span>
                            </button>
                            <button
                              onClick={() => handleDeletePhoto(photo.id)}
                              className="text-[#A6978C] hover:text-[#BA2D27] cursor-pointer"
                              title="Delete photo"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: ACCESS LINKS & STEP-BY-STEP EXPLANATION */}
          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs text-[#5A4E48]">
              
              {/* How ?admin=true works */}
              <div className="bg-white p-5 rounded-2xl border border-[#E5D7C2] space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#2E7D32]" />
                  <h4 className="font-serif text-base font-bold text-[#1D1412]">
                    How '?admin=true' Works & Direct Access Links
                  </h4>
                </div>
                <p className="leading-relaxed">
                  When someone opens the URL ending with <code className="bg-[#F6EFE3] text-[#BA2D27] px-1.5 py-0.5 rounded font-mono font-bold">?admin=true</code>, 
                  the application automatically checks the browser address bar with <code className="font-mono">URLSearchParams</code> on load. 
                  If detected, it directly launches this full <strong>Master Admin & Media Center</strong> modal!
                </p>

                <div className="bg-[#FDFBF7] p-3 rounded-xl border border-[#E5D7C2] space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#8C5E48]">Direct Admin Link to Bookmark:</span>
                  <div className="flex items-center justify-between gap-2 bg-white p-2 rounded-lg border border-[#DDD0BC] font-mono text-[11px]">
                    <span className="truncate text-[#1D1412]">
                      https://ais-pre-gh7t45gjfo2vdj4wuoz3sg-513039726570.asia-northeast1.run.app?admin=true
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('https://ais-pre-gh7t45gjfo2vdj4wuoz3sg-513039726570.asia-northeast1.run.app?admin=true');
                        alert('Admin URL copied to clipboard!');
                      }}
                      className="px-2.5 py-1 bg-[#1D1412] text-white rounded font-sans text-xs hover:bg-[#3D2924] cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="bg-[#FDFBF7] p-3 rounded-xl border border-[#E5D7C2] space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#8C5E48]">Customer Link to Share Publicly:</span>
                  <div className="flex items-center justify-between gap-2 bg-white p-2 rounded-lg border border-[#DDD0BC] font-mono text-[11px]">
                    <span className="truncate text-[#1D1412]">
                      https://ais-pre-gh7t45gjfo2vdj4wuoz3sg-513039726570.asia-northeast1.run.app
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('https://ais-pre-gh7t45gjfo2vdj4wuoz3sg-513039726570.asia-northeast1.run.app');
                        alert('Customer URL copied to clipboard!');
                      }}
                      className="px-2.5 py-1 bg-[#BA2D27] text-white rounded font-sans text-xs hover:bg-[#961E19] cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              {/* How updates work */}
              <div className="bg-white p-4 rounded-xl border border-[#E5D7C2] space-y-2">
                <h4 className="font-serif text-sm font-bold text-[#1D1412]">
                  How Dynamic Updating Works
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-[11px]">
                  <li>Any price change or photo URL pasted into this panel updates the React application state immediately.</li>
                  <li>The data is saved to the browser's persistent storage (<code className="font-mono text-[#BA2D27]">localStorage</code>), keeping your customizations intact across page reloads.</li>
                  <li>Both customers and staff see the new prices and new photos reflected instantly in the menu cards, cart, and payment gateway.</li>
                </ul>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#F6EFE3] px-6 py-3 border-t border-[#E5D7C2] flex items-center justify-between text-xs text-[#786A63]">
          <span className="font-medium text-[#1D1412]">
            Website engineered by <strong>Agraharapu Bala Venkatesh</strong> (+91 9391233769)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1D1412] text-white font-semibold rounded-lg hover:bg-[#3D2924] transition-colors cursor-pointer"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};
