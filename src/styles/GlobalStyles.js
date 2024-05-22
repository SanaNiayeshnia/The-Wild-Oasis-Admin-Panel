import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{
    /* Indigo */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;

  /* Gray */
  --color-Gray-0: #fff;
  --color-Gray-50: #f9fafb;
  --color-Gray-100: #f3f4f6;
  --color-Gray-200: #e5e7eb;
  --color-Gray-300: #d1d5db;
  --color-Gray-400: #9ca3af;
  --color-Gray-500: #6b7280;
  --color-Gray-600: #4b5563;
  --color-Gray-700: #374151;
  --color-Gray-800: #1f2937;
  --color-Gray-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-400:#4ade80;
  --color-green-500:#22c55e;
  --color-green-600:#16a34a;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);

}
body{
    padding: 0;
    margin: 0;
}

*{
  box-sizing: border-box;
  font-family: "poppins";
}`;
export default GlobalStyles;
