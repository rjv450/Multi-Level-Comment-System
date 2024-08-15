export const errorHandler = (err, req, res, next) => {

    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error', errors: err.errors });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
    }

    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
};
