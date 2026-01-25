import { Timestamp } from 'firebase/firestore';

export type TilItem = {
  id: string;
  title: string;
  preview: string;
  createdAt: number;
};

export type TilDoc = {
  title: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
