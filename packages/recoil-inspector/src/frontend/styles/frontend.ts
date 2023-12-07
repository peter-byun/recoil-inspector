import { colors } from '../../styles/colors';

const globalStyle = {
  colorScheme: 'light dark',
  color: colors.dark.fontColor,
  backgroundColor: colors.dark.background,
  fontFamily: 'Roboto, Inter, Avenir, Helvetica, Arial, sans-serif',
  fontSynthesis: 'none',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  WebkitTextSizeAdjust: '100%',
  textRendering: 'optimizeLegibility',
} as const;

const buttonResetStyle = {
  all: 'unset',
} as const;

const codeBlockStyle = {
  pre: {
    display: 'block',
    overflowX: 'auto',
    padding: '1em',
  },
  code: {
    padding: '3px 5px',
  },
  hljs: {
    color: '#24292e',
    background: '#fff',
  },
  'hljs-doctag, .hljs-keyword, .hljs-meta .hljs-keyword, .hljs-template-tag, .hljs-template-variable, .hljs-type, .hljs-variable.language_':
    {
      color: '#d73a49',
    },
  'hljs-title, .hljs-title.class_, .hljs-title.class_.inherited__, .hljs-title.function_':
    {
      color: '#6f42c1',
    },
  'hljs-attr, .hljs-attribute, .hljs-literal, .hljs-meta, .hljs-number, .hljs-operator, .hljs-selector-attr, .hljs-selector-class, .hljs-selector-id, .hljs-variable':
    {
      color: '#005cc5',
    },
  'hljs-meta .hljs-string, .hljs-regexp, .hljs-string': {
    color: '#032f62',
  },
  'hljs-built_in, .hljs-symbol': {
    color: '#e36209',
  },
  'hljs-code, .hljs-comment, .hljs-formula': {
    color: '#6a737d',
  },
  'hljs-name, .hljs-quote, .hljs-selector-pseudo, .hljs-selector-tag': {
    color: '#22863a',
  },
  'hljs-subst': {
    color: '#24292e',
  },
  'hljs-section': {
    color: '#005cc5',
    fontWeight: 700,
  },
  'hljs-bullet': {
    color: '#735c0f',
  },
  'hljs-emphasis': {
    color: '#24292e',
    fontStyle: 'italic',
  },
  'hljs-strong': {
    color: '#24292e',
    fontWeight: 700,
  },
  'hljs-addition': {
    color: '#22863a',
    backgroundColor: '#f0fff4',
  },
  'hljs-deletion': {
    color: '#b31d28',
    backgroundColor: '#ffeef0',
  },
} as const;

export const appStyle = {
  maxWidth: '100%',
  margin: '0 auto',
  padding: '1rem',
  ...globalStyle,
  ...buttonResetStyle,
  ...codeBlockStyle,
} as const;

export const buttonStyle = {
  position: 'fixed',
  left: '0',
  bottom: '0',

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  padding: '4px',
  border: 'none',
  borderRadius: '50%',
  outline: 'none',
  appearance: 'none',
  transition: 'box-shadow 0.2s ease-out',
  // '&:active, &:focus': {
  //   outline: 'none',
  // },
  // '&:hover': {
  //   cursor: 'pointer',
  //   boxShadow: '2px 2px 5px 1px #181818d6',
  // },
} as const;
