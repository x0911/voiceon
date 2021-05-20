module.exports = {
  methods: {
    ...require('./HexToRGB.js'),
    ...require('./Global.js'),
    ...require('./VoiceOn.js'),
  },
  data: () => ({
    mask: {
      nomask: {
        mask: '*'.repeat(255),
        tokens: {
          '*': {
            pattern: /./,
          },
        },
      },
      allowSpace: {
        lowercase: {
          mask: 'L'.repeat(50),
          tokens: {
            L: {
              pattern: /[a-zA-Z ]/,
              transform: (v) => v.toLocaleLowerCase(),
            },
          },
        },
        UPPERCASE: {
          mask: 'C'.repeat(50),
          tokens: {
            C: {
              pattern: /[a-zA-Z ]/,
              transform: (v) => v.toLocaleUpperCase(),
            },
          },
        },
      },
    },
  }),
}
