import { Request, Response } from 'express';
import Menu from '../models/Menu';
import cloudinary from '../config/cloudinary';

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
export const getMenu = async (req: Request, res: Response) => {
  try {
    const filter: any = {};
    
    // Optional filters for the frontend
    if (req.query.category) filter.category = req.query.category;
    if (req.query.isAvailable) filter.isAvailable = req.query.isAvailable === 'true';
    if (req.query.badge) filter.badges = req.query.badge;
    
    const menuItems = await Menu.find(filter);
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create menu item
// @route   POST /api/menu
// @access  Private/Admin
export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, badges, isAvailable } = req.body;
    
    let imageUrl = '';
    
    if (req.file) {
      // Convert buffer to base64 for Cloudinary upload
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        folder: 'ever_house_menu',
      });
      imageUrl = uploadResponse.secure_url;
    }

    // Process badges if sent as string
    let parsedBadges = badges;
    if (typeof badges === 'string') {
      parsedBadges = badges.split(',').map(b => b.trim()).filter(b => b !== '');
    }

    const menuItem = await Menu.create({
      name,
      description,
      price: Number(price),
      category,
      badges: parsedBadges || [],
      isAvailable: isAvailable !== undefined ? isAvailable === 'true' || isAvailable === true : true,
      imageUrl
    });

    res.status(201).json(menuItem);
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, badges, isAvailable } = req.body;
    
    const menuItem = await Menu.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    if (name) menuItem.name = name;
    if (description) menuItem.description = description;
    if (price) menuItem.price = Number(price);
    if (category) menuItem.category = category;
    
    if (badges) {
      if (typeof badges === 'string') {
        menuItem.badges = badges.split(',').map(b => b.trim()).filter(b => b !== '');
      } else {
        menuItem.badges = badges;
      }
    }
    
    if (isAvailable !== undefined) {
      menuItem.isAvailable = isAvailable === 'true' || isAvailable === true;
    }

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        folder: 'ever_house_menu',
      });
      menuItem.imageUrl = uploadResponse.secure_url;
    }

    const updatedItem = await menuItem.save();
    res.json(updatedItem);
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    await Menu.deleteOne({ _id: req.params.id });
    res.json({ message: 'Menu item removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
