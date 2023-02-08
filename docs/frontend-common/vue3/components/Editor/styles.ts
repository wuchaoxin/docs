export const weChat = {
  '*': {
    'font-size': '17px',
    'line-height': 1.6,
    color: '#333',
  },
  p: {
    'margin-top': 0,
    'margin-bottom': '24px',
  },
  'h1,h2,h3,h4,h5': {
    margin: '20px 0',
  },
  blockquote: {
    'padding-left': '10px',
    'border-left': '3px solid #dbdbdb',
    color: '#9a9a9a',
    'line-height': 1.6,
    'font-size': '15px',
    'padding-top': '4px',
    margin: '1em 0',
  },
  img: {
    'min-height': '20px',
    'min-width': '20px',
    'max-width': '100%',
    height: 'auto',
    'vertical-align': 'bottom',
  },
  'ul,ol': {
    'padding-inline-start': '1.2em',
  },
}

export const styleMap = {
  weChat,
} as const
