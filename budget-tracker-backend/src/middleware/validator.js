// Validator untuk Transaction
export const validateTransaction = (req, res, next) => {
  const { type, category, amount, description } = req.body;
  const errors = [];

  // Validasi type
  if (!type) {
    errors.push('Type is required');
  } else if (!['income', 'expense'].includes(type)) {
    errors.push('Type must be either income or expense');
  }

  // Validasi category
  if (!category) {
    errors.push('Category is required');
  } else if (typeof category !== 'string' || category.trim().length === 0) {
    errors.push('Category must be a non-empty string');
  } else if (category.length > 50) {
    errors.push('Category must not exceed 50 characters');
  }

  // Validasi amount
  if (!amount && amount !== 0) {
    errors.push('Amount is required');
  } else if (isNaN(amount)) {
    errors.push('Amount must be a number');
  } else if (parseFloat(amount) <= 0) {
    errors.push('Amount must be greater than 0');
  } else if (parseFloat(amount) > 999999999.99) {
    errors.push('Amount is too large');
  }

  // Validasi description (optional)
  if (description !== undefined && description !== null) {
    if (typeof description !== 'string') {
      errors.push('Description must be a string');
    } else if (description.length > 500) {
      errors.push('Description must not exceed 500 characters');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// Validator untuk Update Transaction
export const validateTransactionUpdate = (req, res, next) => {
  const { type, category, amount, description } = req.body;
  const errors = [];

  // Cek apakah ada field yang akan diupdate
  if (!type && !category && !amount && description === undefined) {
    return res.status(400).json({
      success: false,
      message: 'At least one field must be provided for update'
    });
  }

  // Validasi type jika ada
  if (type && !['income', 'expense'].includes(type)) {
    errors.push('Type must be either income or expense');
  }

  // Validasi category jika ada
  if (category !== undefined) {
    if (typeof category !== 'string' || category.trim().length === 0) {
      errors.push('Category must be a non-empty string');
    } else if (category.length > 50) {
      errors.push('Category must not exceed 50 characters');
    }
  }

  // Validasi amount jika ada
  if (amount !== undefined) {
    if (isNaN(amount)) {
      errors.push('Amount must be a number');
    } else if (parseFloat(amount) <= 0) {
      errors.push('Amount must be greater than 0');
    } else if (parseFloat(amount) > 999999999.99) {
      errors.push('Amount is too large');
    }
  }

  // Validasi description jika ada
  if (description !== undefined && description !== null) {
    if (typeof description !== 'string') {
      errors.push('Description must be a string');
    } else if (description.length > 500) {
      errors.push('Description must not exceed 500 characters');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// Validator untuk Category
export const validateCategory = (req, res, next) => {
  const { name, type } = req.body;
  const errors = [];

  // Validasi name
  if (!name) {
    errors.push('Name is required');
  } else if (typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name must be a non-empty string');
  } else if (name.length > 50) {
    errors.push('Name must not exceed 50 characters');
  }

  // Validasi type
  if (!type) {
    errors.push('Type is required');
  } else if (!['income', 'expense'].includes(type)) {
    errors.push('Type must be either income or expense');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// Validator untuk UUID params
export const validateUUID = (req, res, next) => {
  const { id } = req.params;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format'
    });
  }

  next();
};

// Sanitize input untuk mencegah XSS
export const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        // Remove HTML tags
        obj[key] = obj[key].replace(/<[^>]*>/g, '');
        // Trim whitespace
        obj[key] = obj[key].trim();
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitize(obj[key]);
      }
    }
  };

  if (req.body) {
    sanitize(req.body);
  }

  next();
};