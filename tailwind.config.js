module.exports = {
  content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
  theme: {
    extend: {
      maxHeight: {
        'modal-description': 'calc(100vh - 24rem)'
      }
    }
  },
  plugins: []
};
