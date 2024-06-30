import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{

  &.light-mode{
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
  --color-blue-500:#3b82f6;
  --color-blue-600:#2563eb;
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
  --color-red-300:#fca5a5;
  --color-red-400:#f87171;
  --color-red-500:#ef4444;
  --color-red-600:#dc2626;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);
  --shadow-color:#cbd5e1;

  }

  &.dark-mode{
    
  --color-Gray-0: #18212f;
  --color-Gray-50: #111827;
  --color-Gray-100: #1f2937;
  --color-Gray-200: #374151;
  --color-Gray-300: #4b5563;
  --color-Gray-400: #6b7280;
  --color-Gray-500: #9ca3af;
  --color-Gray-600: #d1d5db;
  --color-Gray-700: #e5e7eb;
  --color-Gray-800: #f3f4f6;
  --color-Gray-900: #f9fafb;
  
  --color-blue-100: #075985;
  --color-blue-700: #e0f2fe;
  --color-green-100: #166534;
  --color-green-700: #dcfce7;
  --color-yellow-100: #854d0e;
  --color-yellow-700: #fef9c3;
  --color-silver-100: #374151;
  --color-silver-700: #f3f4f6;
  --color-indigo-100: #3730a3;
  --color-indigo-700: #e0e7ff;
  
  --color-red-100: #fee2e2;
  --color-red-500: #ef4444;
  --color-red-700: #ef4444;
  --color-red-800: #991b1b;

  --color-green-400:#22c55e;
  --color-green-500:#16a34a;
  --color-green-600:#15803d;
  
  --backdrop-color: rgba(0, 0, 0, 0.3);
  
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);
  
  --image-grayscale: 10%;
  --image-opacity: 90%;

  --shadow-color:#1e293b;
  }
 
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
