import './globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Персонажка | My Own Story',
  description: 'Создавайте уникальные сказки для своих детей',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
