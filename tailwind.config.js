module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {

    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },

    fontSize: {
      'sz1': '0.75rem',
      'sz2': '1rem',
    },

    // colors: {
    //   green: {
    //     100: '#d7ffd9',
    //     200: '#a5d6a7',
    //     400: '#75a478',
    //   },
    //   grey: {
    //     100: '#ffffff',
    //     200: '#f1f3f4',
    //     250: '#5f5f5',
    //     300: '#c2c2c2',
    //     400: '#e5e5e5',
    //   },
    //   red: {
    //     100: '#fce8e6',
    //     400: '#e15d54'
    //   }
    // },

    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  // corePlugins: {
  //   padding: false,
  // }
}
